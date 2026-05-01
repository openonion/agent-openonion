'use client'

import { useState } from 'react'
import { LuCheck, LuCopy } from 'react-icons/lu'

export default function CopyButton({ value, label = 'Copy' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs text-ink-muted hover:text-ink hover:border-ink-dim transition-colors"
      aria-label={copied ? 'Copied' : label}
    >
      {copied ? <LuCheck className="h-3 w-3 text-accent-glow" /> : <LuCopy className="h-3 w-3" />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  )
}
