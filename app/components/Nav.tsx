const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <a
          href="#top"
          className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-ink"
        >
          Om Sharma<span className="text-accent">.</span>
        </a>
        <ul className="flex items-center gap-7 md:gap-9">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-[12px] uppercase tracking-[0.15em] text-muted transition-colors duration-200 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
