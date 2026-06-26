// CAPABILITIES — "The Living Index". A calm capability index that plays like a
// score as you scroll: each row strikes as it crosses the viewport — the title
// rises in, the essence reveals, and a coral mastery-bar draws to its true
// weight. The bar length is honest: it encodes how deep the work actually goes
// (AI/ML, LLM, Realtime run full; Observability runs quiet), so the section is a
// self-portrait, not a flat word-list. Depth still lives in a native <details>
// (zero-JS, keyboard-accessible) and the tools stagger in like notes when opened.
//
// All motion is pure CSS scroll-driven animation (animation-timeline: view()) —
// no JS, no IntersectionObserver, no listeners, nothing on the main thread.
// Defaults are the finished, fully-visible state, so without JS / under
// prefers-reduced-motion / on older browsers it reads as a complete index.

type Capability = {
  num: string
  title: string
  essence: string
  weight: number // 0–1, honest depth — drives the mastery-bar length
  tools: string[]
}

const CAPABILITIES: Capability[] = [
  {
    num: '01',
    title: 'Languages',
    essence: 'The everyday tools.',
    weight: 0.8,
    tools: ['Python', 'C++', 'C', 'Java', 'SQL', 'TypeScript', 'JavaScript', 'Bash'],
  },
  {
    num: '02',
    title: 'AI / ML',
    essence: 'Models from first principles to fine-tune.',
    weight: 1,
    tools: [
      'PyTorch',
      'TensorFlow',
      'JAX',
      'Keras',
      'Hugging Face',
      'Transformers',
      'Diffusers',
      'scikit-learn',
      'XGBoost',
      'NumPy',
      'Pandas',
      'OpenCV',
      'CNNs',
      'LoRA / QLoRA',
    ],
  },
  {
    num: '03',
    title: 'LLM & Agents',
    essence: 'Orchestrating models into systems that act.',
    weight: 1,
    tools: [
      'OpenAI',
      'Anthropic Claude',
      'Gemini',
      'Llama',
      'Mistral',
      'LangChain',
      'LangGraph',
      'Langflow',
      'LlamaIndex',
      'Haystack',
      'CrewAI',
      'AutoGen',
      'Pydantic AI',
      'MCP',
      'RAG',
      'Function calling',
      'Prompt engineering',
    ],
  },
  {
    num: '04',
    title: 'Realtime & Voice',
    essence: 'Conversations that answer in under two seconds.',
    weight: 0.95,
    tools: [
      'LiveKit',
      'Twilio',
      'Pipecat',
      'Deepgram',
      'Cartesia',
      'ElevenLabs',
      'Whisper',
      'Silero VAD',
      'WebRTC',
      'SIP',
      'WebSockets',
      'Streaming STT / TTS',
    ],
  },
  {
    num: '05',
    title: 'Inference & Serving',
    essence: 'Making models fast and cheap in production.',
    weight: 0.75,
    tools: [
      'vLLM',
      'TensorRT',
      'CUDA',
      'Triton',
      'TGI',
      'llama.cpp',
      'Ollama',
      'ONNX',
      'Ray',
      'Modal',
      'Quantization',
    ],
  },
  {
    num: '06',
    title: 'Retrieval & Data',
    essence: 'Search, memory, and the stores behind them.',
    weight: 0.8,
    tools: [
      'Pinecone',
      'Weaviate',
      'Qdrant',
      'Chroma',
      'FAISS',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Elasticsearch',
      'Kafka',
      'Airflow',
      'Spark',
    ],
  },
  {
    num: '07',
    title: 'Backend',
    essence: 'APIs and services that hold up under load.',
    weight: 0.9,
    tools: [
      'FastAPI',
      'Django',
      'Flask',
      'Node.js',
      'Express',
      'REST',
      'gRPC',
      'GraphQL',
      'Celery',
      'Pydantic',
    ],
  },
  {
    num: '08',
    title: 'Infrastructure',
    essence: 'Where it all runs.',
    weight: 0.8,
    tools: [
      'Docker',
      'Kubernetes',
      'AWS',
      'GCP',
      'Vercel',
      'Linux',
      'NGINX',
      'Terraform',
      'Helm',
      'CI / CD',
      'GitHub Actions',
    ],
  },
  {
    num: '09',
    title: 'Observability',
    essence: 'Seeing what the system is actually doing.',
    weight: 0.6,
    tools: [
      'Prometheus',
      'Grafana',
      'Sentry',
      'OpenTelemetry',
      'LangSmith',
      'Langfuse',
      'Weights & Biases',
      'MLflow',
    ],
  },
  {
    num: '10',
    title: 'AI Dev Tools',
    essence: 'How the work gets shipped, faster.',
    weight: 0.8,
    tools: ['Claude Code', 'Cursor', 'Windsurf', 'GitHub Copilot', 'v0'],
  },
]

export default function Stack() {
  return (
    <section
      id="stack"
      className="mx-auto max-w-[920px] border-t border-rule px-6 py-32 md:px-12 md:py-36"
    >
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        § 4 — Capabilities
      </p>
      <h2
        className="mb-16 font-serif font-light leading-[0.95] tracking-[-0.03em]"
        style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
      >
        What I{' '}
        <span className="cap-underline italic text-accent">build with.</span>
      </h2>

      <div className="cap-index">
        {CAPABILITIES.map((cap, i) => (
          <details
            key={cap.title}
            className={`stack-row group border-t border-rule ${
              i === 0 ? 'border-t-0' : ''
            }`}
          >
            <summary className="flex cursor-pointer select-none items-baseline gap-5 py-7 list-none">
              <span className="font-mono text-[11px] tracking-[0.1em] text-whisper transition-colors duration-300 group-hover:text-accent">
                {cap.num}
              </span>
              <span className="flex-1">
                <span className="cap-title block font-serif text-[26px] font-normal leading-[1.1] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent md:text-[30px]">
                  {cap.title}
                </span>
                <span className="cap-essence mt-1 block text-[14px] leading-[1.5] text-muted">
                  {cap.essence}
                </span>
                {/* mastery-bar — honest depth, drawn on entry. Ghost track shows
                    the full scale; the coral fill scales to this capability's weight. */}
                <span className="cap-bar-track" aria-hidden>
                  <span
                    className="cap-bar"
                    style={{ ['--w' as string]: cap.weight }}
                  />
                </span>
              </span>
              {/* peek — the first tools, clipped into a fade. A visible
                  fade-to-nothing is the universal "there's more here" signal.
                  Desktop only; fades out on open so it doesn't duplicate the list. */}
              <span
                aria-hidden
                className="cap-peek hidden font-mono text-[11px] tracking-[0.08em] text-whisper transition-opacity duration-300 group-open:opacity-0 md:block"
              >
                {cap.tools.slice(0, 3).join('  ·  ')}
              </span>
              {/* count + arrow — the explicit affordance: how much is inside,
                  and that it opens. The arrow turns to point down on open. */}
              <span className="cap-count inline-flex items-baseline gap-1.5 whitespace-nowrap font-mono text-[11px] tracking-[0.1em] text-muted transition-colors duration-300 group-hover:text-accent">
                <span>{cap.tools.length} tools</span>
                <span
                  aria-hidden
                  className="cap-arrow transition-transform duration-300 group-open:rotate-90"
                >
                  →
                </span>
              </span>
            </summary>

            {/* the tools — revealed on demand, never dumped. Each stagger-fades
                in like a note when the row opens (CSS only). */}
            <p className="cap-tools -mt-1 pb-8 pl-[44px] pr-8 font-mono text-[13px] leading-[1.9] tracking-[0.01em] text-muted">
              {cap.tools.map((tool, k) => (
                <span
                  key={tool}
                  className="cap-tool"
                  style={{ ['--i' as string]: k }}
                >
                  {tool}
                </span>
              ))}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
