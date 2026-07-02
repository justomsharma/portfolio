import type { CSSProperties } from 'react'

// CERTIFICATIONS — "The Constellation". Each credential is a star on a horizontal
// coral rail. As the section scrolls into view the rail draws left-to-right and
// the nodes ignite in sequence — a lit dot fills coral and casts the same
// three-blade fan glow the experience rail uses, so this reads as a sibling of
// § 2, not a bolt-on. The card beneath each star fades up on its own timeline.
//
// All motion is pure CSS scroll-driven animation (animation-timeline: view()) —
// no JS, no IntersectionObserver, no listeners, nothing on the main thread, and
// zero bytes added to the critical path. Defaults are the finished, fully-lit
// state, so with no JS / under prefers-reduced-motion / on older browsers it
// reads as a complete, legible index. It holds one star gracefully and grows
// into a row (wrapping) as more are added.

type Cert = {
  title: string
  issuer: string
  date: string
  credentialId: string
  url: string
}

const CERTS: Cert[] = [
  {
    title: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic',
    date: 'Jul 2026',
    credentialId: 'etenep6o89iu',
    url: 'https://verify.skilljar.com/c/etenep6o89iu',
  },
]

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="mx-auto max-w-[1180px] border-t border-rule px-6 py-32 md:px-12 md:py-36"
    >
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        § 4 — Certifications
      </p>
      <h2
        className="mb-16 font-serif font-light leading-[0.95] tracking-[-0.03em]"
        style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
      >
        What I&apos;ve <span className="italic text-accent">earned.</span>
      </h2>

      <div className="cert-field">
        {/* the horizontal rail — purely decorative, drawn by CSS on scroll.
            Desktop only; on mobile the cards simply stack. */}
        <div className="cert-rail hidden md:block" aria-hidden>
          <span className="cert-rail-base" />
          <span className="cert-rail-coral" />
        </div>

        <ul className="cert-stars">
          {CERTS.map((c, i) => (
            <li
              key={c.credentialId}
              className="cert-star"
              style={{ ['--i' as string]: i }}
            >
              {/* the node that sits on the rail — ignites in sequence on scroll */}
              <span className="cert-node hidden md:flex" aria-hidden>
                <span className="cert-dot" />
              </span>

              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card group block"
              >
                <p className="cert-issuer font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 group-hover:text-accent">
                  {c.issuer}
                </p>
                <h3 className="cert-title mt-2 font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent md:text-[28px]">
                  {c.title}
                </h3>
                <p className="cert-meta mt-4 font-mono text-[11px] tracking-[0.06em] text-muted">
                  Issued {c.date}
                  <span className="cert-sep"> · </span>
                  <span className="cert-id">ID {c.credentialId}</span>
                </p>
                <span className="cert-verify mt-6 inline-flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 group-hover:text-accent">
                  Verify
                  <span aria-hidden className="cert-arrow transition-transform duration-300">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
