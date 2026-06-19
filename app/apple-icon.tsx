import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const cormorantItalic = await readFile(join(process.cwd(), 'assets/Cormorant-Italic.woff'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Cormorant',
          fontSize: 130,
          fontStyle: 'italic',
          fontWeight: 400,
          color: '#FF6B47',
        }}
      >
        o
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Cormorant', data: cormorantItalic, style: 'italic', weight: 400 }],
    }
  )
}
