import Link from 'next/link'
import type { Item } from '@/lib/agents'
import { itemTypeLabel } from '@/lib/agents'

const typeColor: Record<Item['type'], string> = {
  skill:   'text-accent-soft border-accent/30 bg-accent/8',
  command: 'text-blue-700 border-blue-500/30 bg-blue-500/8',
  agent:   'text-purple-700 border-purple-500/30 bg-purple-500/8',
  post:    'text-amber-700 border-amber-500/30 bg-amber-500/8',
}

export default function ItemCard({ user, item }: { user: string; item: Item }) {
  return (
    <Link
      href={`/${user}/${item.slug}`}
      className="group block rounded-lg border border-line bg-paper-soft hover:bg-paper-muted hover:border-ink-faint/40 transition-colors p-5"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="font-mono text-sm text-ink group-hover:text-accent-glow transition-colors truncate">
          {item.type === 'command' ? '/' : ''}
          {item.name}
        </div>
        <span
          className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-mono ${typeColor[item.type]}`}
        >
          {itemTypeLabel(item.type)}
        </span>
      </div>

      {item.description ? (
        <p className="text-sm text-ink-muted line-clamp-3">{item.description}</p>
      ) : null}

      {item.argumentHint ? (
        <div className="mt-3 font-mono text-xs text-ink-dim truncate">
          <span className="text-ink-faint">args: </span>
          {item.argumentHint}
        </div>
      ) : null}
    </Link>
  )
}
