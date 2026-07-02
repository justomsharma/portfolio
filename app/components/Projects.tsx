export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-[1100px] border-t border-rule px-6 py-32 md:px-12 md:py-36">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        § 5 — Personal projects
      </p>
      <h2
        className="mb-16 font-serif font-light leading-[0.95] tracking-[-0.03em]"
        style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
      >
        What I&apos;ve <span className="italic text-accent">built.</span>
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
        {/* FEATURED — Now / In progress. No destination yet, so it's a
            non-interactive card, not a dead link. */}
        <div
          className="proj-still proj-still--on-accent col-span-1 row-span-1 flex cursor-default flex-col justify-between rounded-sm bg-accent p-8 transition-transform duration-500 ease-out hover:-translate-y-1 md:col-span-2 md:row-span-2 md:p-10"
        >
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-background/70">
              <span
                aria-hidden
                className="proj-dot--live inline-block h-1.5 w-1.5 rounded-full bg-background text-background"
              />
              Now · June 2026
            </p>
            <h3 className="mt-4 font-serif text-[42px] font-normal leading-[0.95] tracking-[-0.02em] text-background md:text-[56px]">
              Speculative<br />
              <span className="italic">decoding,</span><br />
              in progress.
            </h3>
          </div>
          <p className="text-[14px] leading-[1.6] text-background/75 md:text-[15px]">
            Building a toy implementation of the Leviathan et al. paper — draft model + target model + measured speedup. Companion blog post in July.
          </p>
        </div>

        {/* JiraGenie */}
        <a
          href="https://github.com/justomsharma/jiragenie"
          target="_blank"
          rel="noopener noreferrer"
          className="group col-span-1 row-span-1 flex flex-col justify-between rounded-sm border border-rule bg-ink/[0.025] p-7 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-ink/25 md:col-span-2"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            2026 · Open source
          </p>
          <div>
            <h3 className="font-serif text-[32px] font-normal leading-[1.05] tracking-[-0.02em] text-ink/85 transition-colors duration-300 group-hover:text-ink">
              <span className="italic">JiraGenie</span>
            </h3>
            <p className="mt-2 text-[13px] leading-[1.55] text-muted">
              Natural-language CLI for Jira. LLM intent parser. Self-healing workflow transition engine — walks workflow graphs with a loop guard, auto-repairs failed transitions.
            </p>
          </div>
        </a>

        {/* OncoVision — no public link yet, so non-interactive. */}
        <div
          className="proj-still col-span-1 row-span-1 flex cursor-default flex-col justify-between rounded-sm border border-rule bg-ink/[0.025] p-7 transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-accent/30 md:col-span-2"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            2024 · PyTorch
          </p>
          <div>
            <h3 className="font-serif text-[32px] font-normal leading-[1.05] tracking-[-0.02em] text-ink/85">
              Onco<span className="italic">Vision</span>
            </h3>
            <p className="mt-2 text-[13px] leading-[1.55] text-muted">
              Convolutional neural network for cancer pattern detection in medical imaging. Custom preprocessing pipelines for normalization and augmentation.
            </p>
          </div>
        </div>

        {/* Latency visualizer — forthcoming, no destination yet. */}
        <div
          className="proj-still col-span-1 row-span-1 flex cursor-default flex-col justify-between rounded-sm border border-rule bg-ink/[0.025] p-7 transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-accent/30 md:col-span-2"
        >
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full border border-accent"
            />
            Forthcoming · July 2026
          </p>
          <div>
            <h3 className="font-serif text-[32px] font-normal leading-[1.05] tracking-[-0.02em] text-ink/85">
              Latency <span className="italic">visualizer</span>
            </h3>
            <p className="mt-2 text-[13px] leading-[1.55] text-muted">
              Interactive widget showing real-time STT → LLM → TTS latency breakdown. Embedded on this site once shipped. Demo of the work, on the work.
            </p>
          </div>
        </div>

        {/* This site */}
        <a
          href="https://github.com/justomsharma/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="group col-span-1 row-span-1 flex flex-col justify-between rounded-sm border border-rule bg-ink/[0.025] p-7 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-ink/25 md:col-span-2"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            2026 · Next.js 16
          </p>
          <div>
            <h3 className="font-serif text-[32px] font-normal leading-[1.05] tracking-[-0.02em] text-ink/85 transition-colors duration-300 group-hover:text-ink">
              This <span className="italic">site</span>
            </h3>
            <p className="mt-2 text-[13px] leading-[1.55] text-muted">
              Designed and built solo. Geist + Cormorant Garamond, monochrome dark with one accent. Lighthouse 100/100/100/100 target.
            </p>
          </div>
        </a>
      </div>
    </section>
  )
}
