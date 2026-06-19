export default function Footer() {
  const cols = [
    {
      label: 'Reach',
      items: [
        { text: 'justomsharma@gmail.com', href: 'mailto:justomsharma@gmail.com' },
        { text: '+91 81789 80973', href: 'tel:+918178980973' },
      ],
    },
    {
      label: 'Code',
      items: [
        { text: 'GitHub', href: 'https://github.com/justomsharma' },
        { text: 'Résumé · PDF', href: '/resume.pdf' },
      ],
    },
    {
      label: 'Words',
      items: [
        { text: 'Medium', href: 'https://medium.com/@OmsharmaOfficial' },
        { text: 'LinkedIn', href: 'https://linkedin.com/in/omsharmaofficial' },
      ],
    },
    {
      label: 'Location',
      items: [
        { text: 'Bangalore, India', href: '#' },
        { text: 'UTC+5:30', href: '#' },
      ],
    },
  ]

  return (
    <footer id="contact" className="mx-auto max-w-[1100px] border-t border-rule px-6 pb-16 pt-32 md:px-12 md:pb-20 md:pt-36">
      <p
        className="mb-20 max-w-[900px] font-serif font-light italic leading-[1.15] tracking-[-0.02em]"
        style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
      >
        I&apos;m interested in the unglamorous infrastructure of intelligence — the queues, the streaming, the <span className="text-accent">two-second pipelines</span> that decide whether the model feels alive.
      </p>

      <div className="grid grid-cols-2 gap-8 border-t border-rule pt-12 md:grid-cols-4">
        {cols.map((col) => (
          <div key={col.label}>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {col.label}
            </p>
            {col.items.map((item) => (
              <a
                key={item.text}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block py-1 text-[14px] text-ink transition-colors duration-200 hover:text-accent"
              >
                {item.text}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-between border-t border-rule pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
        <div>© Om Sharma · 2026</div>
        <div>Built solo</div>
      </div>
    </footer>
  )
}
