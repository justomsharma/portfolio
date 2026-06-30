'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

/* Loads the canvas portrait only on the client, after hydration — it never
   touches the server render or the initial JS critical path. The reserved box
   keeps its footprint so there's no layout shift when it mounts. */
const AsciiPortrait = dynamic(() => import('./AsciiPortrait'), {
  ssr: false,
  loading: () => <div aria-hidden style={{ width: 420, height: 420 }} />,
})

/* The portrait is only ever shown at lg+ (the wrapper is `hidden lg:flex`).
   CSS `display:none` would still mount the component below lg, fetching the
   image and running the canvas scan on phones that never see it. Gate the
   mount on an actual lg media-query so small screens do zero portrait work. */
export default function AsciiPortraitLazy() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setShow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  if (!show) return <div aria-hidden style={{ width: 420, height: 420 }} />
  return <AsciiPortrait />
}
