import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto max-w-container px-6 lg:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-ink-dim">
        <div className="flex items-center gap-2">
          <span className="text-accent-glow">●</span>
          <span className="font-mono">agent.openonion.ai</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/" className="hover:text-ink transition-colors">Browse agents</Link>
          <a href="https://github.com/openonion/oo" className="hover:text-ink transition-colors">oo CLI</a>
          <a href="https://github.com/openonion/agent-directory" className="hover:text-ink transition-colors">Publish your own</a>
          <a href="https://docs.connectonion.com" className="hover:text-ink transition-colors">Docs</a>
          <a href="https://discord.gg/4xfD9k8AUF" className="hover:text-ink transition-colors">Discord</a>
        </div>
      </div>
      <div className="mx-auto max-w-container px-6 lg:px-8 pb-10 text-xs text-ink-faint">
        <span>An </span>
        <a href="https://openonion.ai" className="text-ink-dim hover:text-ink">OpenOnion</a>
        <span> property. Built on </span>
        <a href="https://github.com/openonion/connectonion" className="text-ink-dim hover:text-ink">ConnectOnion</a>.
      </div>
    </footer>
  )
}
