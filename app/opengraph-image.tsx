import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Om Sharma — Engineer building real-time AI systems'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG() {
  const [cormorantNormal, cormorantItalic, geistMono] = await Promise.all([
    readFile(join(process.cwd(), 'assets/Cormorant-Normal.woff')),
    readFile(join(process.cwd(), 'assets/Cormorant-Italic.woff')),
    readFile(join(process.cwd(), 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000000',
          padding: '80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'Cormorant',
        }}
      >
        {/* top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 18,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(232, 226, 213, 0.6)',
            fontFamily: 'Geist Mono',
          }}
        >
          <div>OM SHARMA · BANGALORE</div>
          <div style={{ color: '#FF6B47' }}>OMSHARMA.DEV</div>
        </div>

        {/* name */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 200,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: '#E8E2D5',
              fontWeight: 300,
              display: 'flex',
            }}
          >
            Om{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#FF6B47', marginLeft: 24 }}>
              Sharma.
            </span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 36,
              fontStyle: 'italic',
              color: 'rgba(232, 226, 213, 0.7)',
              maxWidth: '900px',
              lineHeight: 1.3,
            }}
          >
            Engineer building real-time AI systems.
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
          <div>2026</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cormorant', data: cormorantNormal, style: 'normal', weight: 300 },
        { name: 'Cormorant', data: cormorantItalic, style: 'italic', weight: 400 },
        { name: 'Geist Mono', data: geistMono, style: 'normal', weight: 400 },
      ],
    }
  )
}
