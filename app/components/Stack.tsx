// CAPABILITIES — a calm capability index. The eye processes ten things, not a
// hundred: each row is one capability with a one-line essence. The full tool
// list lives inside a native <details> (the same zero-JS, keyboard-accessible
// expand/collapse used in Experience), so depth is on demand, not dumped. Pure
// CSS + native HTML — no JS, no images, nothing added to the render path.

type Capability = {
  num: string
  title: string
  essence: string
  tools: string[]
}

const CAPABILITIES: Capability[] = [
  {
    num: '01',
    title: 'Languages',
    essence: 'The everyday tools.',
    tools: ['Python', 'C++', 'C', 'SQL', 'TypeScript', 'JavaScript', 'Go', 'Bash'],
  },
  {
    num: '02',
    title: 'AI / ML',
    essence: 'Models from first principles to fine-tune.',
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
        What I <span className="italic text-accent">build with.</span>
      </h2>

      <div>
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
                <span className="font-serif text-[26px] font-normal leading-[1.1] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent md:text-[30px]">
                  {cap.title}
                </span>
                <span className="mt-1 block text-[14px] leading-[1.5] text-muted">
                  {cap.essence}
                </span>
              </span>
              {/* expand marker — rotates open, the calm signal there's more */}
              <span
                aria-hidden
                className="stack-mark mt-1 font-mono text-[13px] text-muted transition-transform duration-300 group-open:rotate-45 group-hover:text-accent"
              >
                +
              </span>
            </summary>

            {/* the tools — revealed on demand, never dumped on the reader */}
            <p className="-mt-1 pb-8 pl-[44px] pr-8 font-mono text-[13px] leading-[1.9] tracking-[0.01em] text-muted">
              {cap.tools.join('  ·  ')}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
