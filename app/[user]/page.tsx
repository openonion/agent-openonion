import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProfileHeader from '@/components/ProfileHeader'
import ItemCard from '@/components/ItemCard'
import InstallSnippet from '@/components/InstallSnippet'
import { getAgent, getAllAgentAliases, getDirectory } from '@/lib/agents'

type Params = { user: string }

export function generateStaticParams(): Params[] {
  const aliases = getAllAgentAliases()
  const directory = getDirectory()
  // Include both alias and full address routes
  return [
    ...aliases.map(user => ({ user })),
    ...directory.map(d => ({ user: d.address })),
  ]
}

function resolveAlias(userParam: string): string | null {
  if (getAgent(userParam)) return userParam
  const directory = getDirectory()
  const match = directory.find(d => d.address === userParam || d.alias === userParam)
  return match?.alias || null
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { user } = await params
  const alias = resolveAlias(user)
  if (!alias) return { title: 'Not found' }
  const agent = getAgent(alias)
  if (!agent) return { title: 'Not found' }
  return {
    title: `${agent.profile.name} (@${agent.profile.alias})`,
    description: agent.profile.bio,
  }
}

export default async function UserPage({ params }: { params: Promise<Params> }) {
  const { user } = await params
  const alias = resolveAlias(user)
  if (!alias) notFound()
  const agent = getAgent(alias!)
  if (!agent) notFound()

  return (
    <>
      <Header />
      <main id="main">
        <ProfileHeader profile={agent.profile} itemCount={agent.itemCount} />

        <div className="mx-auto max-w-container px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-[1fr,20rem] gap-10">
          <div className="min-w-0">
            {agent.readme ? (
              <section className="mb-12">
                <p className="text-ink-muted leading-relaxed whitespace-pre-line">
                  {agent.readme.trim()}
                </p>
              </section>
            ) : null}

            {agent.skills.length > 0 ? (
              <Section title="Skills" count={agent.skills.length}>
                <Grid>
                  {agent.skills.map(item => (
                    <ItemCard key={item.slug} user={agent.profile.alias} item={item} />
                  ))}
                </Grid>
              </Section>
            ) : null}

            {agent.commands.length > 0 ? (
              <Section title="Slash commands" count={agent.commands.length}>
                <Grid>
                  {agent.commands.map(item => (
                    <ItemCard key={item.slug} user={agent.profile.alias} item={item} />
                  ))}
                </Grid>
              </Section>
            ) : null}

            {agent.subagents.length > 0 ? (
              <Section title="Subagents" count={agent.subagents.length}>
                <Grid>
                  {agent.subagents.map(item => (
                    <ItemCard key={item.slug} user={agent.profile.alias} item={item} />
                  ))}
                </Grid>
              </Section>
            ) : null}

            {agent.posts.length > 0 ? (
              <Section title="Posts" count={agent.posts.length}>
                <div className="space-y-3">
                  {agent.posts.map(item => (
                    <ItemCard key={item.slug} user={agent.profile.alias} item={item} />
                  ))}
                </div>
              </Section>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start space-y-6">
            <div>
              <p className="text-eyebrow uppercase text-ink-faint mb-3">Subscribe</p>
              <InstallSnippet command={`oo subscribe ${agent.profile.alias}`} />
              <p className="mt-3 text-xs text-ink-dim leading-relaxed">
                Installs into Claude Code, Codex, Cursor, Kiro, and OpenClaw — wherever you
                have one. Re-run <code className="text-ink-muted">oo update</code> to refresh.
              </p>
            </div>
            <div>
              <p className="text-eyebrow uppercase text-ink-faint mb-3">Or by address</p>
              <InstallSnippet command={`oo subscribe ${agent.profile.address}`} />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({
  title,
  count,
  children,
}: {
  title: string
  count: number
  children: React.ReactNode
}) {
  return (
    <section className="mb-12">
      <div className="flex items-baseline justify-between mb-4 border-b border-line pb-2">
        <h2 className="text-h2 text-ink font-semibold">{title}</h2>
        <span className="font-mono text-xs text-ink-faint">{count}</span>
      </div>
      {children}
    </section>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
}
