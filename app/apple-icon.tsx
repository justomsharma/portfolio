import { ImageResponse } from 'next/og'
import BrandMark from './components/BrandMark'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* a touch smaller than full-bleed so it breathes on the home screen */}
        <BrandMark size={132} />
      </div>
    ),
    size
  )
}
