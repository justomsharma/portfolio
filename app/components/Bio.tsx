export default function Bio() {
  return (
    <section className="mx-auto max-w-[720px] border-t border-rule px-6 py-32 md:px-12 md:py-36">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        § 1 — Introduction
      </p>

      <div className="font-serif text-[22px] leading-[1.65] text-ink">
        <p className="mb-6 first:first-letter:float-left first:first-letter:mr-3 first:first-letter:mt-2 first:first-letter:font-serif first:first-letter:text-[80px] first:first-letter:font-normal first:first-letter:italic first:first-letter:leading-[0.85] first:first-letter:text-accent">
          I&apos;m an engineer at <em className="not-italic text-accent">Jobtwine</em>, where our team builds real-time voice AI for enterprise interview screening — the kind of system where latency, reliability, and conversation quality decide whether the product works. Earlier I worked on RAG pipelines and LLM fine-tuning at <em className="not-italic text-accent">Darwix AI</em> and <em className="not-italic text-accent">VDOIT Technologies</em>.
        </p>

        <p className="text-muted">
          On my own time I build small tools that scratch real itches — <em className="not-italic text-accent">JiraGenie</em>, a natural-language CLI for Jira with a self-healing workflow engine, is the current one. I write about what I learn shipping models into production: the gaps where the model second-guesses itself, the network hops that quietly cost you a turn.
        </p>
      </div>
    </section>
  )
}
