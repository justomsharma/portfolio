'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * VoiceLab — a real, working speech round-trip: speech in (live transcription)
 * → speech out (spoken back), with the ONE latency that matters measured for
 * real — time to first audio.
 *
 * Nothing here is faked:
 *   • The waveform is your live mic (getUserMedia + AnalyserNode).
 *   • The transcript is real Web Speech API recognition of what you say.
 *   • "Time to first audio" is performance.now() from the moment we ask TTS to
 *     speak to the moment it actually starts — a measured number, not a script.
 *
 * There is no LLM call (no backend), and the demo says so plainly — in a
 * production agent the model turn slots in between transcribe and speak.
 *
 * Graceful: browsers without SpeechRecognition (Safari/Firefox) still get the
 * live waveform and an honest note. prefers-reduced-motion disables the live
 * run and explains why.
 */

// Minimal typings for the Web Speech API (absent from the DOM lib).
interface SpeechResultAlt {
  transcript: string
}
interface SpeechResult {
  readonly isFinal: boolean
  readonly length: number
  [index: number]: SpeechResultAlt
}
interface SpeechRecognitionEventLike {
  readonly resultIndex: number
  readonly results: ArrayLike<SpeechResult>
}
interface SpeechRecognitionLike {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((e: SpeechRecognitionEventLike) => void) | null
  onspeechstart: (() => void) | null
  onend: (() => void) | null
  onerror: ((e: unknown) => void) | null
  start(): void
  stop(): void
  abort(): void
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor
    webkitSpeechRecognition?: SpeechRecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

type Phase = 'idle' | 'listening' | 'speaking' | 'done'

export default function VoiceLab() {
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const [phase, setPhase] = useState<Phase>('idle')
  const [transcript, setTranscript] = useState('')
  const [firstAudioMs, setFirstAudioMs] = useState<number | null>(null)
  const [captureMs, setCaptureMs] = useState<number | null>(null)
  const [words, setWords] = useState<number | null>(null)
  const [note, setNote] = useState('')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recRef = useRef<SpeechRecognitionLike | null>(null)
  const finalRef = useRef('')
  const listenStartRef = useRef(0)
  const finalizedRef = useRef(false)
  const synthLevelRef = useRef(0)

  // ── teardown ──────────────────────────────────────────────────────────
  const stopWaveform = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])

  const stopMic = useCallback(() => {
    stopWaveform()
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      void audioCtxRef.current.close()
    }
    audioCtxRef.current = null
    analyserRef.current = null
  }, [stopWaveform])

  useEffect(() => {
    return () => {
      stopMic()
      try {
        recRef.current?.abort()
      } catch {
        /* already stopped */
      }
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
    }
  }, [stopMic])

  // ── waveform (real mic if we have an analyser, else a quiet idle shimmer) ─
  const drawLoop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1

    const render = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      const accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-accent')
          .trim() || '#ff6b47'

      ctx.clearRect(0, 0, w, h)
      const bars = 48
      const gap = 3
      const bw = (w - gap * (bars - 1)) / bars
      const mid = h / 2

      const analyser = analyserRef.current
      let data: Uint8Array<ArrayBuffer> | null = null
      if (analyser) {
        data = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount))
        analyser.getByteFrequencyData(data)
      } else {
        synthLevelRef.current += (0.18 - synthLevelRef.current) * 0.05
      }

      for (let i = 0; i < bars; i++) {
        let amp: number
        if (data) {
          amp = data[Math.floor((i / bars) * data.length)] / 255
        } else {
          const t = performance.now() / 320
          amp = (0.5 + 0.5 * Math.sin(i * 0.5 + t)) * synthLevelRef.current
        }
        const barH = Math.max(2, amp * (h * 0.86))
        const x = i * (bw + gap)
        ctx.fillStyle = accent
        ctx.globalAlpha = 0.3 + amp * 0.7
        ctx.beginPath()
        ctx.roundRect(x, mid - barH / 2, bw, barH, Math.min(bw / 2, 2))
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(render)
    }
    render()
  }, [])

  // ── speak the transcript back, measuring real time-to-first-audio ───────
  const speakBack = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || !text) {
      setPhase('done')
      return
    }
    setPhase('speaking')
    try {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.rate = 1.04
      const askedAt = performance.now()
      u.onstart = () => setFirstAudioMs(Math.round(performance.now() - askedAt))
      u.onend = () => setPhase('done')
      u.onerror = () => setPhase('done')
      window.speechSynthesis.speak(u)
    } catch {
      setPhase('done')
    }
  }, [])

  // ── finalize one turn (idempotent — button or recognition can trigger) ──
  const finalize = useCallback(() => {
    if (finalizedRef.current) return
    finalizedRef.current = true

    setCaptureMs(Math.round(performance.now() - listenStartRef.current))
    stopMic()
    try {
      recRef.current?.stop()
    } catch {
      /* already stopped */
    }

    const said = finalRef.current.trim()
    if (said) {
      setWords(said.split(/\s+/).length)
      speakBack(said)
    } else {
      setNote('Didn’t catch anything — tap start and speak a little louder.')
      setPhase('done')
    }
  }, [stopMic, speakBack])

  // ── start a turn ────────────────────────────────────────────────────────
  const start = useCallback(async () => {
    if (phase === 'listening') {
      finalize()
      return
    }
    // reset
    finalizedRef.current = false
    finalRef.current = ''
    setTranscript('')
    setFirstAudioMs(null)
    setCaptureMs(null)
    setWords(null)
    setNote('')
    window.speechSynthesis?.cancel()
    setPhase('listening')
    listenStartRef.current = performance.now()

    // live mic → waveform
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      const ctx = new AC()
      audioCtxRef.current = ctx
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 128
      analyser.smoothingTimeConstant = 0.7
      ctx.createMediaStreamSource(stream).connect(analyser)
      analyserRef.current = analyser
    } catch {
      setNote('Mic blocked — allow microphone access to run the demo.')
      setPhase('idle')
      return
    }
    drawLoop()

    // live transcription
    const Ctor = getRecognitionCtor()
    if (!Ctor) {
      setNote(
        'Live transcription needs Chrome or Edge. The waveform is your real mic — stop to finish.'
      )
      return
    }
    try {
      const rec = new Ctor()
      rec.continuous = true
      rec.interimResults = true
      rec.lang = 'en-US'
      rec.onresult = (e) => {
        let interim = ''
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i]
          if (r.isFinal) finalRef.current += r[0].transcript
          else interim += r[0].transcript
        }
        setTranscript((finalRef.current + interim).trim())
      }
      rec.onend = () => {
        if (phase !== 'idle') finalize()
      }
      rec.onerror = () => {
        /* keep the waveform; user can still stop manually */
      }
      recRef.current = rec
      rec.start()
    } catch {
      setNote('Couldn’t start transcription — stop to finish the waveform.')
    }
  }, [phase, finalize, drawLoop])

  const listening = phase === 'listening'
  const STAGES: { label: string; sub: string; value: string; lit: boolean }[] = [
    {
      label: 'Listen',
      sub: 'live mic',
      value: captureMs != null ? `${(captureMs / 1000).toFixed(1)}s` : listening ? '●' : '—',
      lit: listening || captureMs != null,
    },
    {
      label: 'Transcribe',
      sub: 'web speech',
      value: words != null ? `${words} words` : transcript ? '…' : '—',
      lit: !!transcript,
    },
    {
      label: 'Speak',
      sub: 'time to first audio',
      value: firstAudioMs != null ? `${firstAudioMs}ms` : phase === 'speaking' ? '…' : '—',
      lit: phase === 'speaking' || firstAudioMs != null,
    },
  ]

  return (
    <section
      id="latency"
      className="mx-auto max-w-[1100px] border-t border-rule px-6 py-32 md:px-12 md:py-36"
    >
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        Try it — Live demo
      </p>
      <h2
        className="mb-5 font-serif font-light leading-[0.95] tracking-[-0.03em]"
        style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
      >
        Hear it <span className="italic text-accent">think.</span>
      </h2>
      <p className="mb-14 max-w-[600px] text-[15px] leading-[1.7] text-muted">
        Speech in, speech out — the round-trip a real-time voice agent runs on
        every turn. Tap start, say something, and tap stop. It transcribes your
        words live and speaks them back, timing the one number that matters.
      </p>

      <div className="rounded-sm border border-rule bg-ink/[0.025] p-6 md:p-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            disabled={reduced || phase === 'speaking'}
            onClick={start}
            className="group inline-flex select-none items-center gap-3 rounded-full border px-6 py-3 font-mono text-[12px] uppercase tracking-[0.15em] transition-colors duration-300 disabled:opacity-40"
            style={{
              color: 'var(--color-ink)',
              borderColor: listening ? 'var(--color-accent)' : 'var(--color-rule)',
              background: listening
                ? 'color-mix(in srgb, var(--color-accent) 14%, transparent)'
                : 'transparent',
            }}
            aria-pressed={listening}
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-accent transition-transform duration-300"
              style={{
                transform: listening ? 'scale(1.6)' : 'scale(1)',
                boxShadow: listening
                  ? '0 0 10px color-mix(in srgb, var(--color-accent) 70%, transparent)'
                  : 'none',
              }}
            />
            {listening ? 'Stop' : phase === 'speaking' ? 'Speaking…' : 'Start speaking'}
          </button>

          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-whisper">
              Time to first audio
            </div>
            <div className="font-mono text-[34px] font-medium leading-none tracking-tight text-accent tabular-nums md:text-[42px]">
              {firstAudioMs != null ? firstAudioMs : '—'}
              <span className="ml-1 text-[16px] text-muted">ms</span>
            </div>
          </div>
        </div>

        <div className="mt-8 h-20 w-full overflow-hidden rounded-sm border border-rule-soft bg-background/40">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        <ol className="mt-8 grid grid-cols-3 gap-3">
          {STAGES.map((s) => (
            <li
              key={s.label}
              className="rounded-sm border p-4 transition-colors duration-300"
              style={{
                borderColor: s.lit
                  ? 'color-mix(in srgb, var(--color-accent) 55%, transparent)'
                  : 'var(--color-rule)',
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-[13px] font-medium tracking-wide transition-colors duration-300"
                  style={{ color: s.lit ? 'var(--color-accent)' : 'var(--color-ink)' }}
                >
                  {s.label}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-whisper">
                  {s.value}
                </span>
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-whisper">
                {s.sub}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 border-t border-rule-soft pt-6">
          <div className="flex gap-3">
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-whisper">
              Heard
            </span>
            <p className="flex-1 text-[15px] leading-[1.6] text-ink">
              {transcript || (
                <span className="text-whisper">
                  {listening ? 'Listening…' : 'Your words appear here, live.'}
                </span>
              )}
              {listening && (
                <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-accent align-middle" />
              )}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-5 font-mono text-[10px] leading-[1.6] tracking-[0.05em] text-whisper">
        {note && <span className="text-accent">{note} </span>}
        Real mic, real transcription, real measured time-to-first-audio. No LLM
        is wired in — in a production agent the model turn slots in between
        transcribe and speak.
        {reduced && ' Motion is reduced, so the live run is disabled.'}
      </p>
    </section>
  )
}
