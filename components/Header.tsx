import Link from 'next/link'
import { LuTerminal } from 'react-icons/lu'

export default function Header() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-container px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm tracking-tight text-ink hover:text-accent-glow transition-colors"
        >
          <span className="text-accent-glow">●</span>
          <span>agent.openonion.ai</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink transition-colors">
            Browse
          </Link>
          <Link
            href="https://github.com/openonion/oo"
            className="hover:text-ink transition-colors hidden sm:inline"
          >
            CLI
          </Link>
          <a
            href="/install"
            className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent-glow hover:bg-accent/20 transition-colors"
          >
            <LuTerminal className="h-3.5 w-3.5" />
            install
          </a>
        </nav>
      </div>
    </header>
  )
}
