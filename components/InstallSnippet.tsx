import CopyButton from './CopyButton'

export default function InstallSnippet({
  command,
  caption,
}: {
  command: string
  caption?: string
}) {
  return (
    <div className="rounded-lg border border-line bg-paper-soft overflow-hidden">
      {caption ? (
        <div className="px-4 py-2 border-b border-line text-eyebrow uppercase text-ink-faint">
          {caption}
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-3 px-4 py-3 font-mono text-sm">
        <code className="text-ink leading-relaxed break-all">
          <span className="text-ink-faint select-none">$ </span>
          {command}
        </code>
        <CopyButton value={command} />
      </div>
    </div>
  )
}
