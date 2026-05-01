import Link from 'next/link'
import Image from 'next/image'
import type { DirectoryEntry } from '@/lib/agents'
import { shortAddress } from '@/lib/agents'

export default function AgentCard({
  entry,
  itemCount,
  avatar,
}: {
  entry: DirectoryEntry
  itemCount?: number
  avatar?: string
}) {
  return (
    <Link
      href={`/${entry.alias || entry.address}`}
      className="group block rounded-xl border border-line bg-paper-soft hover:bg-paper-muted hover:border-ink-faint/40 transition-colors p-6"
    >
      <div className="flex items-start gap-4">
        {avatar ? (
          <Image
            src={avatar}
            alt={`${entry.name} avatar`}
            width={48}
            height={48}
            className="rounded-full border border-line"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent-glow font-mono">
            {entry.name.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-ink font-medium group-hover:text-accent-glow transition-colors">
              {entry.name}
            </span>
            {entry.alias ? (
              <span className="font-mono text-xs text-ink-dim">@{entry.alias}</span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-ink-muted line-clamp-2">{entry.tagline}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-ink-faint font-mono">
        <span>{shortAddress(entry.address)}</span>
        {typeof itemCount === 'number' ? (
          <span>
            {itemCount} item{itemCount === 1 ? '' : 's'}
          </span>
        ) : null}
      </div>

      {entry.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-dim"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  )
}
