import AsciiPortraitLazy from './AsciiPortraitLazy'

const SKILLS = [
  { num: '01', label: 'Voice Agents' },
  { num: '02', label: 'LLM Orchestration' },
  { num: '03', label: 'Inference Infrastructure' },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col px-6 pb-16 pt-20 md:px-12 md:pb-20"
    >
      {/* status bar */}
      <div className="seq-status flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Bangalore, India
        </span>
      </div>

      {/* the part that shrinks as you scroll away from it */}
      <div className="hero-shrink flex flex-1 flex-col justify-center">
        {/* name — spans the full width so it's never constrained by the portrait */}
        <h1
          className="seq-name font-sans font-bold leading-[0.9] tracking-[-0.04em] text-ink"
          style={{ fontSize: 'clamp(64px, 13vw, 200px)' }}
        >
          Om Sharma<span className="text-accent">.</span>
        </h1>

        {/* below the name: text on the left, interactive portrait on the right.
            A real grid on lg+ (the portrait is in normal flow, so it can never
            overlap the text or steal its pointer events). Stacks to single
            column below lg, where the portrait is simply hidden. */}
        <div className="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 xl:gap-16">
          <div>
            {/* tagline — parallax wrapper is separate from the entrance-animated text */}
            <div className="hero-parallax max-w-[820px]">
              <p
                className="seq-tagline font-sans font-semibold leading-[1.05] tracking-[-0.02em] text-ink"
                style={{ fontSize: 'clamp(28px, 4.5vw, 56px)' }}
              >
                Building real-time AI systems that feel instant.
              </p>
            </div>

            {/* skill row */}
            <ul className="mt-14 grid max-w-[820px] grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12">
              {SKILLS.map((s, i) => (
                <li key={s.num} className={`group seq-skill-${i + 1}`}>
                  <div className="font-mono text-[11px] tracking-[0.15em] text-whisper">
                    {s.num}
                  </div>
                  <div className="mt-2 font-sans text-[15px] font-medium tracking-[-0.01em] text-ink">
                    {s.label}
                  </div>
                  {/* a line that grows on hover — width only, 0.3s */}
                  <div className="mt-3 h-px w-6 bg-accent transition-[width] duration-300 ease-out group-hover:w-full" />
                </li>
              ))}
            </ul>

            {/* paragraph */}
            <p className="seq-para mt-12 max-w-[460px] text-[15px] leading-[1.7] text-muted">
              I engineer voice agents, orchestrate LLM workflows, and build the
              infrastructure that makes models feel alive inside two seconds.
            </p>

            {/* CTAs */}
            <div className="seq-cta mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-sm border border-rule px-6 py-3 font-mono text-[12px] uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:border-ink/40"
              >
                View Work
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 text-accent">
                  &rarr;
                </span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.15em] text-muted transition-colors duration-300 hover:text-ink"
              >
                View Resume
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* interactive ASCII portrait — move your cursor over it. Hidden below
              lg to keep narrow screens clean and light. */}
          <div className="hidden justify-center lg:flex">
            <AsciiPortraitLazy />
          </div>
        </div>
      </div>
    </section>
  )
}
