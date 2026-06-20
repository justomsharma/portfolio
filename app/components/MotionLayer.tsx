'use client'

import { useEffect } from 'react'

/**
 * The site's entire scroll-driven motion runs through this one component.
 * It renders nothing — it only sets CSS custom properties on <html> and
 * data-attributes on <body>; the actual transforms/transitions live in
 * globals.css. One rAF-throttled scroll listener, so the main thread stays
 * quiet.
 *
 *   --hero           0 → 1   across the first viewport (drives hero shrink)
 *   --scroll         raw scrollY in px (drives tagline parallax)
 *   --page-progress  0 → 1   across the whole document (drives accent fade + indicator)
 *   --exp-progress   0 → 1   across the experience section (draws the timeline rail)
 *   --color-accent   accent → ink, interpolated by page-progress
 *   data-scrolled    present once scrolled past ~10px (nav gets its blur)
 *   data-nav         present once past 60% of the hero (nav slides in)
 *   data-motion      present once JS motion is live (CSS switches static → dynamic)
 *
 * The accent→ink resolve reads the LIVE theme: --accent-rgb / --ink-rgb are
 * bare "r g b" triples defined per theme in globals.css, so the same loop works
 * in dark and light. They're re-read on the 'themechange' event the toggle fires.
 */

export default function MotionLayer() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    const body = document.body
    const expEl = document.getElementById('experience')

    // read a "r g b" custom-property triple off <html>; fall back to the dark palette
    const readTriple = (name: string, fallback: number[]) => {
      const raw = getComputedStyle(root).getPropertyValue(name).trim()
      const parts = raw.split(/[\s,]+/).map(Number).filter((n) => !Number.isNaN(n))
      return parts.length === 3 ? parts : fallback
    }

    let accent = readTriple('--accent-rgb', [255, 107, 71])
    let ink = readTriple('--ink-rgb', [232, 226, 213])

    // the toggle clears the inline --color-accent override so the new theme's
    // base accent shows through, then we re-read both bases and repaint
    const onThemeChange = () => {
      root.style.removeProperty('--color-accent')
      accent = readTriple('--accent-rgb', accent)
      ink = readTriple('--ink-rgb', ink)
      apply()
    }

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

      // experience timeline: 0 as the section top reaches ~70% of the viewport,
      // 1 as its bottom passes the same line — drives the rail draw + node glow
      if (expEl) {
        const rect = expEl.getBoundingClientRect()
        const exp = Math.min(1, Math.max(0, (vh * 0.7 - rect.top) / rect.height))
        root.style.setProperty('--exp-progress', exp.toFixed(4))
      }

      // accent gradually resolves from the theme accent toward its ink down the page
      const r = Math.round(accent[0] + (ink[0] - accent[0]) * page)
      const g = Math.round(accent[1] + (ink[1] - accent[1]) * page)
      const b = Math.round(accent[2] + (ink[2] - accent[2]) * page)
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

    // repaint the accent whenever the theme flips (works under reduced motion too)
    window.addEventListener('themechange', onThemeChange)

    if (!reduce) {
      body.setAttribute('data-motion', '') // CSS switches the rail from static to scroll-driven
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
    }

    return () => {
      window.removeEventListener('themechange', onThemeChange)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // No visible output — this component only drives scroll state via CSS vars.
  return null
}
