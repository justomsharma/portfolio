'use client'

import { useEffect } from 'react'

/**
 * The site's entire scroll-driven motion runs through this one component.
 * It does no layout — it renders only the fixed scroll indicator. Everything
 * else it does is set CSS custom properties on <html> and data-attributes on
 * <body>; the actual transforms/transitions live in globals.css. One rAF-
 * throttled scroll listener, so the main thread stays quiet.
 *
 *   --hero           0 → 1   across the first viewport (drives hero shrink)
 *   --scroll         raw scrollY in px (drives tagline parallax)
 *   --page-progress  0 → 1   across the whole document (drives accent fade + indicator)
 *   --color-accent   coral → ink, interpolated by page-progress
 *   data-scrolled    present once scrolled past ~10px (nav gets its blur)
 *   data-nav         present once past 60% of the hero (nav slides in)
 */

const ACCENT = [255, 107, 71] // #ff6b47 coral
const INK = [232, 226, 213] // #e8e2d5 — accent "resolves" to the ink as you descend

export default function MotionLayer() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    const body = document.body

    let ticking = false

    const apply = () => {
      ticking = false
      const y = window.scrollY
      const vh = window.innerHeight
      const max = document.documentElement.scrollHeight - vh

      const hero = Math.min(1, Math.max(0, y / vh))
      const page = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0

      root.style.setProperty('--scroll', String(y))
      root.style.setProperty('--hero', hero.toFixed(4))
      root.style.setProperty('--page-progress', page.toFixed(4))

      // accent gradually resolves from coral toward the ink through the page
      const r = Math.round(ACCENT[0] + (INK[0] - ACCENT[0]) * page)
      const g = Math.round(ACCENT[1] + (INK[1] - ACCENT[1]) * page)
      const b = Math.round(ACCENT[2] + (INK[2] - ACCENT[2]) * page)
      root.style.setProperty('--color-accent', `rgb(${r}, ${g}, ${b})`)

      if (y > 10) body.setAttribute('data-scrolled', '')
      else body.removeAttribute('data-scrolled')

      if (y > vh * 0.6) body.setAttribute('data-nav', '')
      else body.removeAttribute('data-nav')
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(apply)
    }

    apply() // set initial state (covers reloads at a scrolled position)

    if (!reduce) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="seq-scroll pointer-events-none fixed bottom-6 left-6 z-40 hidden flex-col items-center gap-3 md:flex"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl]">
        Scroll
      </span>
      <span
        className="w-px bg-accent/60"
        style={{ height: 'calc(16px + 56px * var(--page-progress, 0))' }}
      />
    </div>
  )
}
