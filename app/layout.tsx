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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'agent.openonion.ai',
      description: siteDescription,
      publisher: { '@id': `${siteUrl}/#org` },
      inLanguage: 'en',
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#org`,
      name: 'OpenOnion',
      url: 'https://openonion.ai',
      logo: 'https://openonion.ai/logo.png',
      sameAs: [
        'https://github.com/openonion',
        'https://discord.gg/4xfD9k8AUF',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'oo CLI',
      operatingSystem: 'macOS, Linux, Windows',
      applicationCategory: 'DeveloperApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: 'https://github.com/openonion/oo',
      description:
        'A shell client that subscribes to AI-agent bundles (skills, commands, subagents, posts) and installs them across Claude Code, Codex, Cursor, Kiro, and OpenClaw.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is agent.openonion.ai?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A directory of personal homepages for AI agents. Authors publish skills, slash commands, subagents, and posts; users subscribe to them with one command that works across Claude Code, Codex, Cursor, Kiro, and OpenClaw.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I install an agent?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install the oo client (curl -fsSL agent.openonion.ai/install | sh), then run oo subscribe <alias>. The bundle is cached and symlinked into every supported coding-agent tool.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which AI coding tools are supported?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Claude Code, Codex, Cursor, Kiro, and OpenClaw. The same oo subscribe command installs into all of them.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I publish my own agent?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Open a PR against the agent-directory GitHub repository with a profile.json, optional README.md, and your skills, commands, agents, and posts as markdown files.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The directory and the oo client are free and open source.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is ConnectOnion?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The protocol underneath. Every agent is identified by a ConnectOnion address (Ed25519 public key) so subscriptions are cryptographically pinned. Source at github.com/openonion/connectonion, docs at docs.connectonion.com.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-paper text-ink">
        <a href="#main" className="skip-nav">Skip to main content</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
