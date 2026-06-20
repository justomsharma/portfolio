import type { CSSProperties } from 'react'

type Role = {
  company: string
  role: string
  location: string
  dates: string
  bullets: string[]
}

const ROLES: Role[] = [
  {
    company: 'Jobtwine',
    role: 'Associate Software Engineer',
    location: 'Bangalore',
    dates: 'Jul 2025 — Present',
    bullets: [
      'Architected a real-time AI interviewer with a streaming STT → LLM → TTS pipeline at sub-2-second p50 latency, used by enterprise clients including Meesho, Brillio, and Deutsche Bank.',
      'Implemented streaming orchestration over Twilio Programmable Voice (inbound and outbound calls) bridged to LiveKit (WebRTC / SIP) with token-level TTS streaming and endpoint prediction, reducing per-turn latency by ~3 seconds.',
      'Built queue-based dispatch with fallback across multiple LLM providers, supporting peak loads of 300+ interviews per day with reliability under provider failures.',
    ],
  },
  {
    company: 'Darwix AI',
    role: 'Software Engineer, AI Systems',
    location: 'Gurugram',
    dates: 'May 2025 — Jul 2025',
    bullets: [
      'Built a scalable document ingestion engine using Pinecone and PostgreSQL with automated document-type detection, improving chunking accuracy by 40%.',
      'Developed a real-time sales call analysis platform with speaker diarization, live transcription, and performance scoring for coaching workflows.',
      'Engineered a cross-platform Windows / Linux desktop client streaming dual-channel call audio over WebSocket pipelines.',
    ],
  },
  {
    company: 'VDOIT Technologies',
    role: 'Software Engineer, AI / ML',
    location: 'Gurugram',
    dates: 'Jan 2024 — Apr 2025',
    bullets: [
      'Built backend systems supporting 100K+ concurrent users using Django and multithreaded architecture.',
      'Designed retrieval-augmented generation (RAG) pipelines with vector databases for contextual document search.',
      'Fine-tuned large language models using LoRA and QLoRA techniques for domain-specific use cases. Awarded STAR Performer.',
    ],
  },
]

// Circuit-trace rail: vertical runs joined by short diagonal jogs. Each role's
// node sits on the segment that runs past its height — RAIL_X is that segment's
// x (in the 0–32 viewBox) per node, so the dot can be nudged onto the line.
const RAIL_PATH =
  'M16,0 L16,150 L10,180 L10,440 L22,470 L22,860 L16,890 L16,1000'
const RAIL_X = [16, 10, 22]
const VIEWBOX_W = 32
const RAIL_PX = 40 // .exp-rail width — viewBox x maps to px at RAIL_PX / VIEWBOX_W

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-[1180px] border-t border-rule px-6 py-32 md:px-12 md:py-36"
    >
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        § 2 — Experience
      </p>
      <h2
        className="mb-16 font-serif font-light leading-[0.95] tracking-[-0.03em]"
        style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
      >
        Where I&apos;ve <span className="italic text-accent">shipped.</span>
      </h2>

      <div className="exp">
        {/* the geometric line itself — purely decorative, drawn by CSS */}
        <div className="exp-rail hidden md:block" aria-hidden>
          <svg
            className="exp-svg"
            viewBox="0 0 32 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* circuit-trace route: vertical runs joined by short diagonal jogs */}
            <path
              className="rail-base"
              d={RAIL_PATH}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="rail-coral"
              d={RAIL_PATH}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray={1}
            />
          </svg>
        </div>

        {/* content rows — each role sits beside its node, on the same grid row */}
        <div className="exp-rows grid grid-cols-1 md:grid-cols-[160px_1fr]">
          {ROLES.map((r, i) => (
            <div key={r.company} className="contents">
              {/* rail node, aligned to this role's heading */}
              <div
                className={`exp-node hidden md:flex md:items-start md:gap-3 md:pl-[15px] ${
                  i === 0 ? 'pt-0' : 'pt-12'
                }`}
                style={
                  {
                    '--at': (i / ROLES.length).toFixed(3),
                    // shift the dot from its column slot (x=16) onto this
                    // node's rail segment, without reflowing the labels
                    '--dot-shift': `${(((RAIL_X[i] ?? 16) - 16) * RAIL_PX) / VIEWBOX_W}px`,
                  } as CSSProperties
                }
                aria-hidden
              >
                <span className="exp-dot mt-[6px] h-2.5 w-2.5 shrink-0 rounded-full border" />
                <span className="flex flex-col gap-1">
                  <span className="exp-num font-mono text-[11px] tracking-[0.1em]">
                    0{i + 1}
                  </span>
                  <span className="exp-company max-w-[110px] font-mono text-[10px] uppercase leading-[1.3] tracking-[0.2em]">
                    {r.company}
                  </span>
                </span>
              </div>

              {/* role content — unchanged */}
              <article
                className={`group border-t border-rule py-12 transition-all duration-500 ${
                  i === 0 ? 'border-t-0 pt-0' : ''
                }`}
              >
                <header className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-[40px] font-normal leading-none tracking-[-0.02em] md:text-[48px]">
                    <span className="italic text-accent">{r.company}</span>
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {r.dates}
                  </p>
                </header>

                <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                  {r.role} · {r.location}
                </p>

                <ul className="space-y-4">
                  {r.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="grid grid-cols-[16px_1fr] gap-3 text-[16px] leading-[1.6] text-ink/80 md:text-[17px]"
                    >
                      <span className="pt-[10px] font-mono text-[10px] text-accent">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
