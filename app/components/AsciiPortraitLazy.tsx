'use client'

import dynamic from 'next/dynamic'

/* Loads the canvas portrait only on the client, after hydration — it never
   touches the server render or the initial JS critical path. The reserved box
   keeps its footprint so there's no layout shift when it mounts. */
const AsciiPortrait = dynamic(() => import('./AsciiPortrait'), {
  ssr: false,
  loading: () => <div aria-hidden style={{ width: 420, height: 420 }} />,
})

export default function AsciiPortraitLazy() {
  return <AsciiPortrait />
}
