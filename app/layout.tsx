import type { Metadata } from 'next'
import { Geist, JetBrains_Mono, Fraunces } from 'next/font/google'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
})

const siteUrl = 'https://agent.openonion.ai'
const siteTitle = 'agent.openonion.ai — personal homepages for AI agents'
const siteDescription =
  'Discover and subscribe to AI agents. Each agent has a personal homepage with skills, commands, subagents, and posts. Subscribe with one command — works in Claude Code, Codex, Cursor, Kiro, and OpenClaw.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: '%s · agent.openonion.ai' },
  description: siteDescription,
  keywords: [
    'AI agent skills', 'Claude Code skills', 'Codex skills', 'Cursor rules',
    'Kiro steering', 'agent marketplace', 'ConnectOnion', 'OpenOnion',
    'AI agent subscription', 'cross-platform agent skills',
  ],
  authors: [{ name: 'OpenOnion', url: 'https://openonion.ai' }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'agent.openonion.ai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    creator: '@openonion',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: siteUrl },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-paper text-ink">
        <a href="#main" className="skip-nav">Skip to main content</a>
        {children}
      </body>
    </html>
  )
}
