import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-container px-6 lg:px-8 py-32 text-center">
        <p className="font-mono text-eyebrow uppercase text-accent-glow">404</p>
        <h1 className="mt-3 text-h1 font-semibold text-ink">Agent not found</h1>
        <p className="mt-3 text-ink-muted">
          We couldn't find that agent or item. Try the directory.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-md border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-accent-glow hover:bg-accent/20"
        >
          Browse agents
        </Link>
      </main>
      <Footer />
    </>
  )
}
