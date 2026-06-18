export default function Projects() {
  return (
    <section className="mx-auto max-w-[1100px] border-t border-rule px-6 py-32 md:px-12 md:py-36">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        § 3 — Personal projects
      </p>
      <h2
        className="mb-16 font-serif font-light leading-[0.95] tracking-[-0.03em]"
        style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
      >
        What I&apos;ve <span className="italic text-accent">built.</span>
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
        {/* FEATURED — Now / In progress */}
        <a
          href="#"
          className="group col-span-1 row-span-1 flex flex-col justify-between rounded-sm bg-accent p-8 transition-all duration-500 hover:-translate-y-1 md:col-span-2 md:row-span-2 md:p-10"
          style={{ boxShadow: '0 0 0 0 rgba(255, 107, 71, 0)' }}
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-background/70">
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
        </a>

        {/* JiraGenie */}
        <a
          href="https://github.com/justomsharma/jiragenie"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 row-span-1 flex flex-col justify-between rounded-sm border border-rule bg-ink/[0.025] p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.04] md:col-span-2"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            2026 · Open source
          </p>
          <div>
            <h3 className="font-serif text-[32px] font-normal leading-[1.05] tracking-[-0.02em]">
              <span className="italic">JiraGenie</span>
            </h3>
            <p className="mt-2 text-[13px] leading-[1.55] text-muted">
              Natural-language CLI for Jira. LLM intent parser. Self-healing workflow transition engine — walks workflow graphs with a loop guard, auto-repairs failed transitions.
            </p>
          </div>
        </a>

        {/* OncoVision */}
        <a
          href="#"
          className="col-span-1 row-span-1 flex flex-col justify-between rounded-sm border border-rule bg-ink/[0.025] p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.04] md:col-span-2"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            2024 · PyTorch
          </p>
          <div>
            <h3 className="font-serif text-[32px] font-normal leading-[1.05] tracking-[-0.02em]">
              Onco<span className="italic">Vision</span>
            </h3>
            <p className="mt-2 text-[13px] leading-[1.55] text-muted">
              Convolutional neural network for cancer pattern detection in medical imaging. Custom preprocessing pipelines for normalization and augmentation.
            </p>
          </div>
        </a>

        {/* Latency visualizer */}
        <a
          href="#"
          className="col-span-1 row-span-1 flex flex-col justify-between rounded-sm border border-rule bg-ink/[0.025] p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.04] md:col-span-2"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            Forthcoming · July 2026
          </p>
          <div>
            <h3 className="font-serif text-[32px] font-normal leading-[1.05] tracking-[-0.02em]">
              Latency <span className="italic">visualizer</span>
            </h3>
            <p className="mt-2 text-[13px] leading-[1.55] text-muted">
              Interactive widget showing real-time STT → LLM → TTS latency breakdown. Embedded on this site once shipped. Demo of the work, on the work.
            </p>
          </div>
        </a>

        {/* This site */}
        <a
          href="https://github.com/justomsharma/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 row-span-1 flex flex-col justify-between rounded-sm border border-rule bg-ink/[0.025] p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.04] md:col-span-2"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            2026 · Next.js 16
          </p>
          <div>
            <h3 className="font-serif text-[32px] font-normal leading-[1.05] tracking-[-0.02em]">
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
