type Post = {
  num: string
  title: string
  italicWord: string
  prefix: string
  suffix: string
  meta: string
  href: string
  forthcoming?: boolean
}

const POSTS: Post[] = [
  {
    num: '№ 01',
    prefix: 'Where the milliseconds ',
    italicWord: 'go',
    suffix: ': anatomy of a sub-2-second voice AI pipeline',
    title: '',
    meta: 'Medium · May 2026 · 9 min',
    href: 'https://medium.com/@OmsharmaOfficial/where-the-milliseconds-go-f43cbb30f716',
  },
  {
    num: '№ 02',
    prefix: 'On speculative decoding — ',
    italicWord: 'draft, verify, accept',
    suffix: '',
    title: '',
    meta: 'Forthcoming · July 2026',
    href: '#',
    forthcoming: true,
  },
]

export default function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-[1100px] border-t border-rule px-6 py-32 md:px-12 md:py-36">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        § 6 — Selected writing
      </p>
      <h2
        className="mb-12 font-serif font-light leading-[0.95] tracking-[-0.03em]"
        style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
      >
        Notes from <span className="italic text-accent">production.</span>
      </h2>

      <div>
        {POSTS.map((p, i) => (
          <a
            key={i}
            href={p.href}
            target={p.href.startsWith('http') ? '_blank' : undefined}
            rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`grid cursor-pointer grid-cols-1 items-baseline gap-2 border-t border-rule py-10 transition-all duration-500 hover:pl-4 md:grid-cols-[80px_1fr_auto] md:gap-10 md:py-10 ${i === POSTS.length - 1 ? 'border-b border-rule' : ''}`}
          >
            <div className={`font-mono text-[12px] tracking-[0.05em] ${p.forthcoming ? 'text-muted' : 'text-accent'}`}>
              {p.num}
            </div>
            <h3
              className={`font-serif font-normal leading-[1.2] tracking-[-0.01em] ${p.forthcoming ? 'text-muted' : ''}`}
              style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
            >
              {p.prefix}
              <span className="italic">{p.italicWord}</span>
              {p.suffix}
            </h3>
            <div className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
              {p.meta}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
