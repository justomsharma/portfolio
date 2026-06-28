# Om Sharma — Portfolio

> Engineer building real-time AI systems that feel instant.
> **Live → [omsharma.dev](https://omsharma.dev)**

This is my personal site. It's also a working sample of how I build: pick the
cheapest tool that does the job *correctly*, reach for the platform before a
dependency, and let performance and accessibility fall out of the architecture
rather than get bolted on at the end.

The whole thing is one editorial idea — monochrome, one coral accent, a serif
display voice over a technical mono one — held to that line in every section.

---

## Design principles

The constraints I held myself to. They're the actual point of the project.

- **Platform-first.** Expand/collapse is a native `<details>` — keyboard- and
  screen-reader-accessible for free, zero JS. Scroll reveals ride native
  scroll-driven animation (`animation-timeline: view()`), not an
  `IntersectionObserver`. If the browser can already do it, I don't ship code to
  redo it.
- **Animation belongs on the compositor.** Every transition animates only
  `transform` / `opacity` / `clip-path`, so it runs on the GPU and never blocks
  the main thread — the page stays responsive to input while it moves.
- **The static page is the real page.** Every animated element's *resting* state
  is its finished, fully-legible state. Motion lives only inside
  `prefers-reduced-motion: no-preference`. With no JS, reduced motion, or an
  older engine, the site reads as complete — nothing essential hides behind an
  effect.
- **No flash, ever.** Theme resolves in a tiny inline script before first paint,
  so dark/light is correct on the very first frame. The theme swap itself uses a
  View Transition radial wipe.
- **A small dependency tree is a feature.** Runtime deps: `next`, `react`,
  `react-dom`, `geist`. That's the list. Less to audit, less to break, less to
  ship.
- **Honest affordances.** A card that looks clickable *is* a link; one with no
  destination yet gets its own "in progress" hover language and a default
  cursor. The UI never lies about what it does.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Static pre-render, metadata/OG, font optimization, build pipeline |
| UI | **React 19** | Components driven from typed data, not copy-paste markup |
| Language | **TypeScript** | Section content is typed (`Role`, `Capability`, `Post`) — a missing field fails the build, not production |
| Styling | **Tailwind CSS v4** + a small `globals.css` motion layer | Utilities for layout, hand-written CSS for the scroll-driven animation system |
| Type | **Geist Sans / Mono** + **Cormorant Garamond** | Technical voice + editorial display voice, self-hosted via `next/font` |
| Icons / OG | **`next/og`** | Favicon and Open Graph image generated dynamically |
| Hosting | **Vercel** | — |

---

## Architecture notes

A few decisions worth calling out, since they're where the judgment lives:

- **`app/layout.tsx`** — sets all SEO/OG/Twitter metadata, loads and self-hosts
  fonts, and runs the pre-paint theme init. Dark is the intended first
  impression; only an explicit saved choice overrides it.
- **`app/globals.css`** — the motion system. Design tokens (`--c-*`) resolve per
  theme; every keyframe is gated behind `prefers-reduced-motion` and built so
  the default is the visible end-state.
- **`Experience.tsx`** — the circuit-trace rail is a single SVG path with a
  scroll-driven comet trail and pulsing nodes; the math (`RAIL_X` /
  `--dot-shift`) pins each role's node onto its segment without reflowing the
  labels.
- **`Stack.tsx`** — the "living index": each capability's coral mastery-bar
  draws to an *honest* weight, so the section is a self-portrait, not a flat
  word-list.
- **`Hero.tsx` / `AsciiPortrait.tsx`** — the genuinely interactive piece: a
  cursor-reactive ASCII portrait, lazy-loaded and hidden below `lg` to keep
  narrow screens light.

The split is deliberate: heavy framework where it earns its keep (typing,
rendering, SEO), the native platform where JS would just be bloat (animation,
disclosure).

---

## Performance & accessibility

- Target **Lighthouse 100 / 100 / 100 / 100**.
- No main-thread animation work; no layout thrash.
- Semantic landmarks, `aria-hidden` on every decorative SVG, native
  keyboard-accessible controls, and a full `prefers-reduced-motion` fallback.
- Self-hosted fonts with `display: swap` and adjusted fallback metrics — no
  layout shift, no third-party font request.

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the build
npm run lint     # eslint
```

> Note: this project tracks a specific, fast-moving Next.js — see `AGENTS.md`.
> When in doubt, the local docs in `node_modules/next/dist/docs/` are the source
> of truth over anything cached.

---

## Structure

```
app/
├─ layout.tsx              # metadata, fonts, no-flash theme init
├─ page.tsx                # section composition
├─ globals.css             # design tokens + scroll-driven motion system
├─ icon.tsx                # favicon       (next/og)
├─ apple-icon.tsx          # touch icon    (next/og)
├─ opengraph-image.tsx     # OG image      (next/og)
└─ components/
   ├─ Nav · Hero · Bio · Experience · Stack · Projects · Writing · Footer
   ├─ ThemeToggle · MotionLayer        # the interactive layer
   └─ AsciiPortrait(+Lazy) · BrandMark
```

---

<sub>Designed and built solo. © Om Sharma.</sub>
