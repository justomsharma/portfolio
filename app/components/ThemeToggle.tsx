'use client'

import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

// View Transitions API isn't in the lib DOM types across all TS versions yet.
type DocumentWithVT = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> }
}

const THEME_COLOR = { dark: '#050505', light: '#f7f4ec' } as const

function SunIcon() {
  return (
    <svg className="tt-icon tt-sun" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4
        const x1 = 12 + Math.cos(a) * 7.2
        const y1 = 12 + Math.sin(a) * 7.2
        const x2 = 12 + Math.cos(a) * 9.8
        const y2 = 12 + Math.sin(a) * 9.8
        return (
          <line
            key={i}
            x1={x1.toFixed(2)}
            y1={y1.toFixed(2)}
            x2={x2.toFixed(2)}
            y2={y2.toFixed(2)}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="tt-icon tt-moon" viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* crescent: a filled disc with an offset disc punched out via even-odd */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M12 3a9 9 0 1 0 9 9 7 7 0 1 1-9-9Z"
      />
    </svg>
  )
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  // start as dark to match SSR/default; the effect syncs to the real attribute
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    setTheme(current === 'light' ? 'light' : 'dark')
  }, [])

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement

    const apply = () => {
      root.setAttribute('data-theme', next)
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* storage may be unavailable (private mode) — the swap still works */
      }
      setTheme(next)
      // MotionLayer re-reads its base colours on this event
      window.dispatchEvent(new CustomEvent('themechange', { detail: next }))
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', THEME_COLOR[next])
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = document as DocumentWithVT

    if (reduce || typeof doc.startViewTransition !== 'function') {
      apply()
      return
    }

    // radial wipe: reveal the new theme through a circle growing from the toggle
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )
    root.style.setProperty('--vt-x', `${x}px`)
    root.style.setProperty('--vt-y', `${y}px`)
    root.style.setProperty('--vt-r', `${radius}px`)
    root.classList.add('vt-wipe')

    const transition = doc.startViewTransition!(apply)
    transition.finished.finally(() => root.classList.remove('vt-wipe'))
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === 'light'}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      onClick={toggle}
      data-theme-state={theme}
      className={`theme-toggle ${className}`}
    >
      <span className="tt-track">
        <SunIcon />
        <MoonIcon />
        <span className="tt-thumb" aria-hidden />
      </span>
    </button>
  )
}
