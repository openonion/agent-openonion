import Image from 'next/image'
import { LuGithub, LuGlobe } from 'react-icons/lu'
import { FaXTwitter } from 'react-icons/fa6'
import type { Profile } from '@/lib/agents'
import { shortAddress } from '@/lib/agents'
import CopyButton from './CopyButton'

const linkIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  github: LuGithub,
  x: FaXTwitter,
  website: LuGlobe,
}

export default function ProfileHeader({
  profile,
  itemCount,
}: {
  profile: Profile
  itemCount: number
}) {
  return (
    <div className="border-b border-line bg-paper-soft">
      <div className="mx-auto max-w-container px-6 lg:px-8 py-14 lg:py-20">
        <div className="flex items-center gap-3 text-ink-faint mb-8">
          <span className="font-mono text-eyebrow uppercase tracking-[0.18em]">
            §&nbsp;&nbsp;Profile
          </span>
          <span className="hidden sm:block h-px flex-1 max-w-[14rem] bg-line" />
          <span className="hidden sm:inline font-serif italic text-sm">
            agent dossier
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={`${profile.name} avatar`}
              width={96}
              height={96}
              className="rounded-2xl border border-line"
            />
          ) : (
            <div className="h-24 w-24 rounded-2xl bg-paper border border-line flex items-center justify-center text-3xl text-ink font-serif italic">
              {profile.name.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 className="text-h1 font-semibold text-ink">{profile.name}</h1>
              {profile.alias ? (
                <span className="font-mono text-ink-muted">@{profile.alias}</span>
              ) : null}
            </div>
            {profile.bio ? (
              <p className="mt-3 font-serif italic text-ink-muted text-lg max-w-2xl leading-relaxed">{profile.bio}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-md border border-line bg-paper-soft px-2.5 py-1 font-mono text-xs text-ink-dim">
                <span className="text-accent-glow">●</span>
                {shortAddress(profile.address)}
                <CopyButton value={profile.address} label="" />
              </span>
              {Object.entries(profile.links || {}).map(([key, url]) => {
                const Icon = linkIcon[key] || LuGlobe
                return (
                  <a
                    key={key}
                    href={url}
                    className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="capitalize">{key}</span>
                  </a>
                )
              })}
              <span className="ml-auto text-sm text-ink-dim">
                <span className="text-ink">{itemCount}</span> published item
                {itemCount === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
