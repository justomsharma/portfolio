/**
 * Brand mark — a deerstalker (Sherlock Holmes' cap) silhouette, front-facing.
 *
 * The clearest deerstalker signal at small size is the pair of ear-flaps
 * sticking straight OUT to the sides (untied), over a cap-shaped crown and a
 * thin brim. Drawn as a plain coral SVG on a transparent ground so it renders
 * identically through next/og's Satori at any size and stays legible down to
 * 16px on light or dark browser chrome.
 *
 * viewBox is a fixed 32-unit grid; pass the rendered pixel `size`.
 */

const CORAL = '#FF6B47'

export default function BrandMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={CORAL}>
      {/* ear-flaps sticking out horizontally at the sides of the crown */}
      <ellipse cx="6" cy="15" rx="4" ry="2.6" />
      <ellipse cx="26" cy="15" rx="4" ry="2.6" />
      {/* cap-shaped crown — flat-ish top, rounded shoulders */}
      <path d="M10 18 L 10 13 Q 10 8 16 8 Q 22 8 22 13 L 22 18 Z" />
      {/* thin front brim, slightly wider than the crown */}
      <ellipse cx="16" cy="18.3" rx="8.5" ry="1.8" />
      {/* round spectacles below the hat — frame only (no fill), black */}
      <circle cx="11.6" cy="24" r="3.3" fill="none" stroke="#000000" strokeWidth="1.3" />
      <circle cx="20.4" cy="24" r="3.3" fill="none" stroke="#000000" strokeWidth="1.3" />
      <line x1="14.9" y1="24" x2="17.1" y2="24" stroke="#000000" strokeWidth="1.3" />
    </svg>
  )
}
