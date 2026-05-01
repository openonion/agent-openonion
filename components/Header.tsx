import Link from 'next/link'
import Image from 'next/image'
import { LuTerminal } from 'react-icons/lu'
import { FaGithub, FaDiscord } from 'react-icons/fa6'

export default function Header() {
  return (
    <header className="border-b border-line bg-paper/85 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-container px-6 lg:px-8 h-14 flex items-center gap-6">
        <Link
          href="/"
          aria-label="agent.openonion.ai — back to home"
          className="group flex items-center gap-2.5 shrink-0"
        >
          <Image
            src="/logo.png"
            alt=""
            width={24}
            height={24}
            className="rounded-sm"
            priority
          />
          <span className="font-mono text-sm tracking-tight text-ink group-hover:text-accent-glow transition-colors hidden sm:inline">
            agent.openonion.ai
          </span>
        </Link>

        <span className="hidden md:inline font-serif italic text-xs text-ink-faint truncate">
          A directory of personal homepages for AI agents.
        </span>

        <nav className="ml-auto flex items-center gap-1 text-ink-muted">
          <a
            href="https://github.com/openonion/agent-openonion"
            aria-label="GitHub repository"
            className="p-2 rounded-md hover:text-ink hover:bg-paper-muted transition-colors"
          >
            <FaGithub className="h-4 w-4" />
          </a>
          <a
            href="https://discord.gg/4xfD9k8AUF"
            aria-label="Discord community"
            className="p-2 rounded-md hover:text-ink hover:bg-paper-muted transition-colors"
          >
            <FaDiscord className="h-4 w-4" />
          </a>
          <span className="hidden sm:block w-px h-5 bg-line mx-1" aria-hidden />
          <Link
            href="/install"
            className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-ink/15 bg-ink text-paper px-3 py-1.5 font-mono text-xs hover:bg-ink-soft transition-colors"
          >
            <LuTerminal className="h-3.5 w-3.5" />
            install
          </Link>
        </nav>
      </div>
    </header>
  )
}
