'use client'

import dynamic from 'next/dynamic'

/* Loads the voice demo only on the client, after hydration — it leans on
   browser-only APIs (getUserMedia, AudioContext, speechSynthesis) and never
   belongs in the server render. The reserved min-height keeps the section's
   footprint so the page below doesn't jump when it mounts. */
const VoiceLab = dynamic(() => import('./VoiceLab'), {
  ssr: false,
  loading: () => <div aria-hidden style={{ minHeight: 760 }} />,
})

export default function VoiceLabLazy() {
  return <VoiceLab />
}
