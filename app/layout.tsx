import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Cormorant_Garamond } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  )
}
