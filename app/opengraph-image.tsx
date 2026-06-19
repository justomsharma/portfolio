import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Om Sharma — Engineer building real-time AI systems'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG() {
  const [geistBold, geistSemiBold, geistMono] = await Promise.all([
    readFile(join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf')),
    readFile(join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf')),
    readFile(join(process.cwd(), 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#050505',
          padding: '80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'Geist',
        }}
      >
        {/* top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(232, 226, 213, 0.6)',
            fontFamily: 'Geist Mono',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: '#FF6B47' }} />
            AVAILABLE FOR AI ENGINEERING ROLES
          </div>
          <div style={{ color: '#FF6B47' }}>OMSHARMA.DEV</div>
        </div>

        {/* name + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 180,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: '#E8E2D5',
              fontWeight: 700,
              display: 'flex',
            }}
          >
            Om Sharma<span style={{ color: '#FF6B47' }}>.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 40,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#E8E2D5',
              maxWidth: '820px',
              lineHeight: 1.1,
            }}
          >
            Building real-time AI systems that feel instant.
          </div>
        </div>

        {/* bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 18,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(232, 226, 213, 0.4)',
            fontFamily: 'Geist Mono',
          }}
        >
          <div>VOICE · LLM · LATENCY</div>
          <div>BANGALORE · 2026</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Geist', data: geistBold, style: 'normal', weight: 700 },
        { name: 'Geist', data: geistSemiBold, style: 'normal', weight: 600 },
        { name: 'Geist Mono', data: geistMono, style: 'normal', weight: 400 },
      ],
    }
  )
}
