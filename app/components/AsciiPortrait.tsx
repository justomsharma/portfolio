'use client'

import { useEffect, useRef, useState } from 'react'

/* ──────────────────────────────────────────────────────────────────────────
   ASCII portrait — an interactive particle field.

   The source photo (/profile.webp, a transparent cut-out) is scanned ONCE into
   a grid, storing only each cell's brightness. Each cell is a particle: it
   flies in on load and settles into the face, and the pointer pushes nearby
   glyphs away with a spring pulling them home — so the portrait ripples under
   the cursor and re-forms behind it.

   Theme-aware glyph mapping (this is what makes it read in BOTH themes):
   • DARK  → "light on black": bright pixels become dense bright glyphs, dark
             pixels fade to nothing, so the lit face emerges from the black and
             dark hair simply reads as the background.
   • LIGHT → "ink on paper": dark pixels (hair, beard, glasses, shadows) become
             dense ink glyphs, highlights fade to paper — a proper ink portrait
             where the hair is a solid mass, not missing.
   The char + alpha are recomputed from the stored brightness whenever the theme
   flips (the `themechange` event), so no re-scan and no flicker.

   • The brightest highlights pick up the coral accent in dark mode (where they
     pop); light mode stays pure ink for maximum legibility.
   • A linear mask fades only the lower body into the page — the head/hair are
     never cropped.

   Performance (sits in the hero, above the fold):
   • Scan runs once per size, cached at module scope — theme flips never re-scan.
   • rAF runs only while on-screen (IntersectionObserver) and the tab is visible.
     Under reduced-motion it idles to a full stop, waking only for pointer input.
   • DPR capped at 2.
   ────────────────────────────────────────────────────────────────────────── */

const CHARS = ' .:-=+*#%@'.split('')
const LAST = CHARS.length - 1
const SRC = '/profile.webp'

type RawParticle = { x: number; y: number; bright: number }
type Particle = {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  bright: number
  char: string
  hot: boolean
  baseAlpha: number
  currentAlpha: number
  delay: number
  shimmer: number
}

// One scan per size survives remounts and theme flips.
const rawCache = new Map<number, RawParticle[]>()

const FONT = 6

// kept small enough to clear the text column at each breakpoint (lg+ only)
function sizeFor(width: number) {
  if (width >= 1536) return 420
  if (width >= 1400) return 380
  return 340
}

// read a "r g b" theme triple, comma-joined for rgba()
function readTriple(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return (v || fallback).replace(/\s+/g, ',')
}

function isLight(): boolean {
  return document.documentElement.getAttribute('data-theme') === 'light'
}

function scanImage(img: HTMLImageElement, size: number): RawParticle[] {
  const off = document.createElement('canvas')
  off.width = size
  off.height = size
  const ctx = off.getContext('2d', { willReadFrequently: true })!

  // contain the (roughly square) cut-out at 92% so it breathes inside the box
  const scale = 0.92
  const aspect = img.width / img.height
  let h = size * scale
  let w = h * aspect
  if (w > size * scale) {
    w = size * scale
    h = w / aspect
  }
  ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h)

  const px = ctx.getImageData(0, 0, size, size).data
  const colGap = FONT * 0.62
  const rowGap = FONT * 1.0

  const out: RawParticle[] = []
  for (let y = 0; y < size; y += rowGap) {
    for (let x = 0; x < size; x += colGap) {
      const i = (Math.floor(y) * size + Math.floor(x)) * 4
      if (px[i + 3] <= 130) continue // transparent background → skip
      out.push({
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1)),
        bright: (px[i] + px[i + 1] + px[i + 2]) / 765,
      })
    }
  }
  return out
}

// derive glyph + alpha + accent from stored brightness, per the active theme
function style(p: Particle, light: boolean) {
  // "density" = how much ink this cell wants. Dark mode keys off brightness
  // (light builds the face on black); light mode inverts (ink builds it on paper).
  const v = light ? 1 - p.bright : p.bright
  const idx = Math.floor(v * LAST)
  p.char = CHARS[idx]
  p.baseAlpha = 0.6 + v * 0.4
  // coral only on the brightest highlights in dark mode; light mode stays ink
  p.hot = !light && idx >= 8
}

export default function AsciiPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouse = useRef({ x: -1000, y: -1000, active: false })
  const target = useRef({ x: -1000, y: -1000 })
  const [size, setSize] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setSize(sizeFor(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (size == null) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ink = readTriple('--ink-rgb', '232 226 213')
    let accent = readTriple('--accent-rgb', '255 107 71')
    let light = isLight()
    let start = 0
    let raf = 0
    let visible = true
    let cancelled = false

    const setType = () => {
      ctx.font = `${FONT}px ui-monospace, monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
    }

    const drawRest = () => {
      const particles = particlesRef.current
      ctx.clearRect(0, 0, size, size)
      if (!particles.length) return
      setType()
      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.hot ? accent : ink}, ${p.baseAlpha})`
        ctx.fillText(p.char, p.targetX, p.targetY)
      }
    }

    const frame = () => {
      if (cancelled) return
      raf = requestAnimationFrame(frame)
      const particles = particlesRef.current
      ctx.clearRect(0, 0, size, size)
      if (!particles.length) return

      const m = mouse.current
      const t = target.current
      const elapsed = (performance.now() - start) / 1000
      m.x += (t.x - m.x) * 0.15
      m.y += (t.y - m.y) * 0.15

      setType()
      const maxDist = size * 0.2
      let energy = 0

      for (const p of particles) {
        const life = elapsed - p.delay
        if (animate && life < 0) continue

        const fade = animate ? 1 - Math.pow(1 - Math.min(life / 1.5, 1), 2) : 1
        const settling = animate && (m.active || life < 3)
        const shimmer = settling ? Math.sin(elapsed * 2 + p.shimmer) * 0.1 : 0
        p.currentAlpha = Math.max(0, p.baseAlpha * fade + shimmer)

        const move = animate ? 1 - Math.pow(1 - Math.min(life / 2.5, 1), 3) : 1

        if (m.active) {
          const dx = p.x - m.x
          const dy = p.y - m.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < maxDist && d > 0) {
            const force = (1 - d / maxDist) * 4
            p.vx += (dx / d) * force
            p.vy += (dy / d) * force
          }
        }

        const tx = p.targetX - p.x
        const ty = p.targetY - p.y
        p.vx += tx * (0.01 + move * 0.08)
        p.vy += ty * (0.01 + move * 0.08)

        if (settling) {
          p.vx += Math.sin(elapsed * 0.5 + p.targetY * 0.1) * 0.15
          p.vy += Math.cos(elapsed * 0.5 + p.targetX * 0.1) * 0.15
          p.vx *= 0.92
          p.vy *= 0.92
        } else {
          p.vx *= 0.85
          p.vy *= 0.85
        }

        p.x += p.vx
        p.y += p.vy
        energy += Math.abs(p.vx) + Math.abs(p.vy)
        ctx.fillStyle = `rgba(${p.hot ? accent : ink}, ${p.currentAlpha})`
        ctx.fillText(p.char, p.x, p.y)
      }

      // reduced-motion: once the cursor leaves and the field settles, snap home
      // and stop the loop entirely — no idle repaints.
      if (!animate && !m.active && energy < 0.4) {
        for (const p of particles) {
          p.x = p.targetX
          p.y = p.targetY
          p.vx = p.vy = 0
        }
        drawRest()
        stopLoop()
      }
    }

    const startLoop = () => {
      if (raf || !visible) return
      if (animate) {
        // re-scatter so the face re-assembles each time it enters the viewport
        for (const p of particlesRef.current) {
          p.x = p.targetX + (Math.random() - 0.5) * 380
          p.y = p.targetY + (Math.random() - 0.5) * 380
          p.vx = p.vy = 0
        }
      }
      start = performance.now()
      frame()
    }
    function stopLoop() {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const restyle = () => {
      for (const p of particlesRef.current) style(p, light)
      if (!raf) drawRest()
    }

    const ready = (raw: RawParticle[]) => {
      particlesRef.current = raw.map((p) => {
        const part: Particle = {
          x: animate ? p.x + (Math.random() - 0.5) * 380 : p.x,
          y: animate ? p.y + (Math.random() - 0.5) * 380 : p.y,
          targetX: p.x,
          targetY: p.y,
          vx: 0,
          vy: 0,
          bright: p.bright,
          char: ' ',
          hot: false,
          baseAlpha: 0,
          currentAlpha: 0,
          delay: Math.random() * 0.4,
          shimmer: Math.random() * Math.PI * 2,
        }
        style(part, light)
        return part
      })
      if (animate) startLoop()
      else drawRest()
    }

    const cached = rawCache.get(size)
    if (cached) {
      ready(cached)
    } else {
      const img = new Image()
      img.decoding = 'async'
      img.src = SRC
      img.onload = () => {
        if (cancelled) return
        const raw = scanImage(img, size)
        rawCache.set(size, raw)
        ready(raw)
      }
    }

    // theme flip: re-read colours, re-map every glyph, repaint
    const onThemeChange = () => {
      ink = readTriple('--ink-rgb', '232 226 213')
      accent = readTriple('--accent-rgb', '255 107 71')
      light = isLight()
      restyle()
    }
    window.addEventListener('themechange', onThemeChange)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && document.visibilityState === 'visible') {
          if (animate) startLoop()
        } else {
          stopLoop()
        }
      },
      { threshold: 0.05 },
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && visible) {
        if (animate) startLoop()
      } else {
        stopLoop()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const aim = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect()
      target.current.x = clientX - r.left
      target.current.y = clientY - r.top
      mouse.current.active = true
      startLoop() // wakes the loop under reduced-motion
    }
    const onMove = (e: MouseEvent) => aim(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const tch = e.touches[0]
      if (tch) aim(tch.clientX, tch.clientY)
    }
    const onLeave = () => {
      mouse.current.active = false
      target.current.x = target.current.y = -1000
    }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('touchmove', onTouch, { passive: true })
    canvas.addEventListener('touchend', onLeave)

    return () => {
      cancelled = true
      stopLoop()
      io.disconnect()
      window.removeEventListener('themechange', onThemeChange)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('touchmove', onTouch)
      canvas.removeEventListener('touchend', onLeave)
    }
  }, [size])

  const dim = size ?? 400
  return (
    <canvas
      ref={canvasRef}
      aria-label="Interactive ASCII portrait of Om Sharma"
      role="img"
      style={{
        width: `${dim}px`,
        height: `${dim}px`,
        cursor: 'crosshair',
        touchAction: 'none',
        // fade only the lower body (shoulders/arms) into the page — the full
        // head + face stay solid so the likeness and hair are never cropped
        WebkitMaskImage:
          'linear-gradient(to bottom, #000 0%, #000 64%, rgba(0,0,0,0.35) 82%, transparent 96%)',
        maskImage:
          'linear-gradient(to bottom, #000 0%, #000 64%, rgba(0,0,0,0.35) 82%, transparent 96%)',
      }}
    />
  )
}
