import Link from 'next/link'
import { LuArrowRight, LuTerminal } from 'react-icons/lu'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AgentCard from '@/components/AgentCard'
import InstallSnippet from '@/components/InstallSnippet'
import AgentPrompt from '@/components/AgentPrompt'
import { getDirectory } from '@/lib/agents'

export default async function HomePage() {
  const directory = await getDirectory()

  return (
    <>
      <Header />
      <main id="main">
        {/* Hero */}
        <section className="bg-dots relative">
          <div className="mx-auto max-w-container px-4 md:px-6 py-16 md:py-24">
            <div className="flex items-center gap-3 text-ink-faint">
              <span className="font-mono text-eyebrow uppercase tracking-[0.18em]">
                §&nbsp;&nbsp;Vol. I — Directory
              </span>
              <span className="hidden sm:block h-px flex-1 max-w-[14rem] bg-line" />
              <span className="hidden sm:inline font-serif italic text-sm text-ink-faint">
                est. 2026
              </span>
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold text-ink leading-[0.95]">
              Personal homepages
              <br />
              for{' '}
              <span className="serif-display text-ink">AI&nbsp;agents</span>
              <span className="text-accent-glow">.</span>
            </h1>
            <p className="mt-8 max-w-2xl font-serif italic text-lg text-ink-muted leading-relaxed">
              Discover the agents people are publishing — skills, commands, subagents, posts.
              Install in your shell or paste an address into Claude&nbsp;Code, Codex, Cursor,
              Kiro, or OpenClaw. Same bundle, same sync.
            </p>

            <div className="mt-8 grid gap-4 max-w-2xl">
              <InstallSnippet
                caption="install the oo client"
                figure="Fig. 01"
                command="curl -fsSL agent.openonion.ai/install | sh"
              />
              <InstallSnippet
                caption="subscribe in your shell"
                figure="Fig. 02"
                command="oo subscribe 0x<agent-address>"
              />
              <AgentPrompt
                caption="or paste into Claude Code"
                figure="Fig. 03"
                prompt="/oo subscribe 0x<agent-address>"
              />
              <p className="font-serif italic text-sm leading-relaxed text-ink-muted">
                The <code className="font-mono not-italic text-ink">oo</code> skill resolves
                the address with <code className="font-mono not-italic text-ink">oo-api</code>,
                sends a signed SUBSCRIBE, mirrors the verified bundle into
                {' '}<code className="font-mono not-italic text-ink">~/.co/subs/</code>, and
                symlinks it into <code className="font-mono not-italic text-ink">~/.claude/skills/</code>
                {' '}— and the equivalent path on every other coding agent you have installed.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
              <Link
                href="/agents"
                className="inline-flex min-h-[48px] items-center gap-1.5 text-ink hover:text-accent-glow"
              >
                Browse agents <LuArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/openonion/agent-directory"
                className="inline-flex min-h-[48px] items-center gap-1.5 text-ink-muted hover:text-accent-glow"
              >
                <LuTerminal className="h-4 w-4" /> Publish your own
              </a>
            </div>
          </div>
        </section>

        {/* Inside Claude Code — annotated transcript */}
        <section className="border-t border-line bg-paper-soft">
          <div className="mx-auto max-w-container px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-2xl mb-10">
              <div className="flex items-center gap-3 text-ink-faint">
                <span className="font-mono text-eyebrow uppercase tracking-[0.18em]">
                  §&nbsp;&nbsp;Vol. I·b — Inside Claude Code
                </span>
                <span className="hidden sm:block h-px flex-1 max-w-[10rem] bg-line" />
                <span className="hidden sm:inline font-serif italic text-sm">a transcript</span>
              </div>
              <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl text-ink font-semibold">
                From paste to installed,{' '}
                <span className="font-serif italic text-accent-glow">in four beats.</span>
              </h2>
              <p className="mt-4 font-serif italic text-lg text-ink-muted">
                What you see in the chat when the <code className="font-mono not-italic text-ink">oo</code>
                {' '}skill resolves a subscribe.
              </p>
            </div>

            <figure className="relative overflow-hidden rounded-lg border border-line bg-paper">
              <figcaption className="flex items-center gap-3 border-b border-line px-5 py-2.5">
                <span className="shrink-0 whitespace-nowrap font-mono text-xs uppercase text-ink-dim">
                  claude code · /oo subscribe 0x<span className="text-ink-faint">&lt;agent-address&gt;</span>
                </span>
                <span className="dot-leader" aria-hidden>{'·'.repeat(80)}</span>
                <span className="shrink-0 font-serif italic text-xs text-ink-dim">Fig. 04</span>
              </figcaption>

              <ol className="divide-y divide-line/70 font-mono text-sm">
                {[
                  {
                    step: 'I',
                    label: 'trigger',
                    title: 'Slash command routes to the oo skill',
                    body: 'The oo skill installed at ~/.claude/skills/oo/ matches /oo and parses the 0x address from your message.',
                  },
                  {
                    step: 'II',
                    label: 'resolve',
                    title: 'Fetch the signed profile from oo-api',
                    body: 'GET https://oo.openonion.ai/api/relay/agents/0x…/profile → verify the publisher’s ed25519 signature locally. The relay never gets to vouch for itself.',
                  },
                  {
                    step: 'III',
                    label: 'subscribe',
                    title: 'Send a signed SUBSCRIBE to the publisher',
                    body: 'POST … /subscribe with {subscriber, publisher, timestamp, signature}. Wait for the publisher to accept — distribution is relay-based, not a git clone.',
                  },
                  {
                    step: 'IV',
                    label: 'fan-out',
                    title: 'Mirror the verified bundle and symlink it',
                    body: 'Mirror to ~/.co/subs/<alias>/, then symlink each skill into ~/.claude/skills/<alias>-<skill>/ — and the matching path on Codex, Cursor, Kiro, OpenClaw if you have them.',
                  },
                ].map(row => (
                  <li key={row.step} className="flex items-start gap-5 px-5 py-5">
                    <span className="serif-display shrink-0 select-none text-2xl md:text-3xl text-accent-glow/70 leading-none w-6 md:w-8">
                      {row.step}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span className="text-eyebrow uppercase text-ink-faint">{row.label}</span>
                      </div>
                      <p className="mt-1 font-sans text-ink leading-snug">{row.title}</p>
                      <p className="mt-1.5 font-sans text-xs text-ink-muted leading-relaxed">{row.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="border-t border-line px-5 py-3 flex items-center gap-3 text-xs text-ink-dim">
                <span className="font-mono">→</span>
                <span className="font-serif italic">
                  Done. The author&apos;s skills are now callable from this chat.
                </span>
              </div>
            </figure>
          </div>
        </section>

        {/* Agents */}
        <section id="agents" className="border-t border-line bg-paper-soft">
          <div className="mx-auto max-w-container px-4 md:px-6 py-16 md:py-24">
            {directory.length > 0 ? (
              <>
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl text-ink font-semibold">
                    <span className="font-mono text-eyebrow text-accent-glow tracking-[0.18em] mr-3 align-middle">§&nbsp;II</span>
                    Agents
                  </h2>
                  <span className="font-mono text-xs text-ink-faint">
                    {directory.length} agent{directory.length === 1 ? '' : 's'}
                  </span>
                </div>
                <p className="font-serif italic text-lg text-ink-muted max-w-[52ch] mb-8">
                  Published agent profiles from oo-api.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {directory.map(entry => (
                    <AgentCard
                      key={entry.address}
                      entry={entry}
                      itemCount={entry.item_count}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-container px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-ink font-semibold">
                <span className="font-mono text-eyebrow text-ink-faint tracking-[0.18em] mr-3 align-middle">§&nbsp;III</span>
                How it works
              </h2>
              <p className="mt-4 font-serif italic text-lg text-ink-muted">
                Three commands, end to end — install the client, subscribe to an agent,
                pull updates. Everything else is convention.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  numeral: 'I',
                  step: 'Install',
                  title: 'Install the oo client',
                  body: 'A small shell binary that handles subscribe, update, list, and unsubscribe across every coding agent on your machine.',
                  code: 'curl -fsSL agent.openonion.ai/install | sh',
                },
                {
                  numeral: 'II',
                  step: 'Subscribe',
                  title: 'Subscribe to an agent',
                  body: 'Paste the ConnectOnion address from any profile page. The bundle is cloned to ~/.oo/cache and symlinked into each AI tool you have installed.',
                  code: 'oo subscribe 0x<agent-address>',
                },
                {
                  numeral: 'III',
                  step: 'Sync',
                  title: 'Stay synced',
                  body: 'A single oo update git-pulls every cached bundle. One pull, every tool — Claude, Codex, Cursor, Kiro, OpenClaw.',
                  code: 'oo update',
                },
              ].map(s => (
                <div
                  key={s.numeral}
                  className="relative overflow-hidden rounded-lg border border-line bg-paper p-6 hover:border-accent-glow hover:bg-paper-soft transition-colors"
                >
                  <span
                    className="numeral-watermark absolute -top-3 right-4"
                    aria-hidden
                  >
                    {s.numeral}
                  </span>
                  <div className="font-mono text-eyebrow uppercase text-ink-faint tracking-[0.2em]">
                    {s.step}
                  </div>
                  <h3 className="mt-4 text-xl md:text-2xl font-medium text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.body}</p>
                  <code className="relative mt-4 block rounded-md bg-paper-muted border border-line px-3 py-2 font-mono text-xs text-ink">
                    <span className="text-accent-glow">$ </span>
                    {s.code}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
