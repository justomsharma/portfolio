/**
 * Brand mark — an audio waveform threaded through an "o" ring.
 *
 * The ring keeps the existing "o" identity (Om / the site's recurring letter);
 * the equalizer bars inside it say "real-time voice / AI" — the through-line of
 * the work. Drawn as a plain SVG (no font dependency) so it renders identically
 * through next/og's Satori at any size and stays crisp down to 16px.
 *
 * viewBox is a fixed 32-unit grid; pass the rendered pixel `size`.
 */

const CORAL = '#FF6B47'

// centered equalizer: [x-center, height] per bar, symmetric so it reads as a
// waveform rather than random noise. Bars stay inside the ring's inner radius.
const BARS: [number, number][] = [
  [9, 6],
  [12.5, 11],
  [16, 15],
  [19.5, 11],
  [23, 6],
]
const BAR_W = 2

export default function BrandMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* the "o" ring — slightly dimmed so the waveform reads as the figure */}
      <circle cx="16" cy="16" r="12.5" stroke={CORAL} strokeWidth="2" strokeOpacity="0.5" />
      {/* waveform bars */}
      {BARS.map(([cx, h]) => (
        <rect
          key={cx}
          x={cx - BAR_W / 2}
          y={16 - h / 2}
          width={BAR_W}
          height={h}
          rx={BAR_W / 2}
          fill={CORAL}
        />
      ))}
    </svg>
  )
}
