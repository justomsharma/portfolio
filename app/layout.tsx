import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Cormorant_Garamond } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
  variable: '--font-cormorant',
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://omsharma.dev'),
  title: { default: 'Om Sharma', template: '%s · Om Sharma' },
  description: 'Engineer building real-time AI systems. Bangalore.',
  openGraph: {
    title: 'Om Sharma',
    description: 'Engineer building real-time AI systems. Bangalore.',
    url: 'https://omsharma.dev',
    siteName: 'Om Sharma',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Sharma',
    description: 'Engineer building real-time AI systems. Bangalore.',
  },
  robots: { index: true, follow: true },
}

// dark is the default first impression; the toggle updates this meta live.
export const viewport: Viewport = {
  themeColor: '#050505',
}

// Runs synchronously before the body paints, so the resolved theme is on
// <html> in time for first paint — no flash. Default is always dark (the
// dark hero is the intended first impression); only an explicit saved
// choice from a previous visit overrides it.
const themeInit = `(function(){try{var s=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',s==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${cormorant.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  )
}
