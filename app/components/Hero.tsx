export default function Hero() {
  const bars = [0, 0.8, 1.4, 2.2] // animation-delay seconds for each bar

  return (
    <section className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 py-10 md:px-12">
      {/* top bar */}
      <div className="absolute left-6 right-6 top-8 flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:left-12 md:right-12">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-blink rounded-full bg-accent" />
          Available for AI eng roles
        </div>
        <div>Bangalore · IST</div>
      </div>

      {/* name */}
      <h1
        className="font-serif font-light leading-[0.85] tracking-[-0.04em]"
        style={{ fontSize: 'clamp(96px, 18vw, 280px)' }}
      >
        Om <span className="italic text-accent">Sharma.</span>
      </h1>

      {/* subtitle */}
      <p
        className="mt-6 max-w-[720px] font-serif font-light italic leading-[1.4] text-muted"
        style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}
      >
        Engineer building real-time AI systems. Voice, LLM orchestration, the infrastructure that
        makes models feel alive inside two seconds.
      </p>

      {/* latency visualizer */}
      <div className="mb-10 mt-20 border-y border-rule py-8">
        <div className="mb-6 flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <span>FIG · TYPICAL CONVERSATIONAL PIPELINE</span>
          <span className="text-accent">STT → LLM → TTS</span>
        </div>

        <div
          className="grid items-center gap-2 font-mono text-xs"
          style={{ gridTemplateColumns: '60px 1fr 60px 1fr 60px 1fr 60px 1fr 60px' }}
        >
          <div className="text-[10px] uppercase tracking-[0.15em] text-muted">AUDIO</div>
          <Bar delay={bars[0]} />
          <div className="text-[10px] uppercase tracking-[0.15em] text-muted">STT</div>
          <Bar delay={bars[1]} />
          <div className="text-[10px] uppercase tracking-[0.15em] text-muted">LLM</div>
          <Bar delay={bars[2]} />
          <div className="text-[10px] uppercase tracking-[0.15em] text-muted">TTS</div>
          <Bar delay={bars[3]} />
          <div className="text-[10px] uppercase tracking-[0.15em] text-accent">REPLY</div>
        </div>

        <p
          className="mt-6 font-serif italic leading-[1.5] text-muted"
          style={{ fontSize: '18px' }}
        >
          &ldquo;The seconds live in the gaps where you wait for certainty.&rdquo;
        </p>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        Scroll
        <div className="h-10 w-px animate-scrollHint bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  )
}

function Bar({ delay }: { delay: number }) {
  return (
    <div
      className="relative h-8 overflow-hidden rounded-sm"
      style={{ background: 'rgba(232, 226, 213, 0.04)' }}
    >
      <div
        className="absolute inset-0 animate-fill bg-accent"
        style={{ animationDelay: `${delay}s`, transform: 'translateX(-100%)' }}
      />
    </div>
  )
}
