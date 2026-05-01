import fs from 'node:fs'
import path from 'node:path'

const DATA_DIR = path.join(process.cwd(), 'data')
const AGENTS_DIR = path.join(DATA_DIR, 'agents')

export type ItemType = 'skill' | 'command' | 'agent' | 'post'

export type Item = {
  type: ItemType
  slug: string
  name: string
  description: string
  argumentHint?: string
  allowedTools?: string
  date?: string
  tags: string[]
  body: string
  frontmatter: Record<string, string>
}

export type Profile = {
  address: string
  alias: string
  name: string
  bio: string
  avatar: string
  links: Record<string, string>
  tags: string[]
}

export type Agent = {
  profile: Profile
  readme: string
  skills: Item[]
  commands: Item[]
  subagents: Item[]
  posts: Item[]
  itemCount: number
}

export type DirectoryEntry = {
  address: string
  alias: string
  name: string
  tagline: string
  repo: string
  ref: string
  tags: string[]
  featured: boolean
}

// ----- frontmatter (tiny, no dependency) -----------------------------------

function parseFrontmatter(raw: string): { fm: Record<string, string>; body: string } {
  if (!raw.startsWith('---')) return { fm: {}, body: raw }
  const end = raw.indexOf('\n---', 3)
  if (end < 0) return { fm: {}, body: raw }
  const block = raw.slice(3, end).trim()
  const body = raw.slice(end + 4).replace(/^\n+/, '')
  const fm: Record<string, string> = {}
  for (const line of block.split('\n')) {
    const colon = line.indexOf(':')
    if (colon < 0) continue
    const key = line.slice(0, colon).trim()
    let value = line.slice(colon + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (key) fm[key] = value
  }
  return { fm, body }
}

function readMarkdownItem(filePath: string, type: ItemType): Item | null {
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { fm, body } = parseFrontmatter(raw)
  const slug = path.basename(filePath, '.md')
  const tags = (fm.tags || '').replace(/[\[\]]/g, '').split(',').map(t => t.trim()).filter(Boolean)

  let description = fm.description || ''
  if (!description && type === 'post') {
    description = body.split('\n').find(l => l.trim() && !l.startsWith('#'))?.trim() || ''
  }

  return {
    type,
    slug,
    name: fm.name || fm.title || slug,
    description,
    argumentHint: fm['argument-hint'],
    allowedTools: fm['allowed-tools'],
    date: fm.date,
    tags,
    body,
    frontmatter: fm,
  }
}

function readDir(dir: string, type: ItemType): Item[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => readMarkdownItem(path.join(dir, f), type))
    .filter((x): x is Item => Boolean(x))
}

// ----- public API ----------------------------------------------------------

export function getDirectory(): DirectoryEntry[] {
  const file = path.join(DATA_DIR, 'directory.json')
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  return data.agents as DirectoryEntry[]
}

export function getAllAgentAliases(): string[] {
  return getDirectory().map(a => a.alias).filter(Boolean)
}

export function getAgent(alias: string): Agent | null {
  const agentDir = path.join(AGENTS_DIR, alias)
  const profilePath = path.join(agentDir, 'profile.json')
  if (!fs.existsSync(profilePath)) return null

  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8')) as Profile
  const readmePath = path.join(agentDir, 'README.md')
  const readme = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf8') : ''

  const skills = readDir(path.join(agentDir, 'skills'), 'skill')
  const commands = readDir(path.join(agentDir, 'commands'), 'command')
  const subagents = readDir(path.join(agentDir, 'agents'), 'agent')
  const posts = readDir(path.join(agentDir, 'posts'), 'post').sort((a, b) =>
    (b.date || '').localeCompare(a.date || ''),
  )

  return {
    profile,
    readme,
    skills,
    commands,
    subagents,
    posts,
    itemCount: skills.length + commands.length + subagents.length,
  }
}

export function getItem(alias: string, slug: string): { agent: Agent; item: Item } | null {
  const agent = getAgent(alias)
  if (!agent) return null
  const all = [...agent.skills, ...agent.commands, ...agent.subagents, ...agent.posts]
  const item = all.find(i => i.slug === slug)
  return item ? { agent, item } : null
}

export function getAllItemPaths(): { user: string; item: string }[] {
  const out: { user: string; item: string }[] = []
  for (const alias of getAllAgentAliases()) {
    const agent = getAgent(alias)
    if (!agent) continue
    for (const i of [...agent.skills, ...agent.commands, ...agent.subagents, ...agent.posts]) {
      out.push({ user: alias, item: i.slug })
    }
  }
  return out
}

export function shortAddress(address: string): string {
  if (!address.startsWith('0x') || address.length < 16) return address
  return `${address.slice(0, 10)}…${address.slice(-4)}`
}

export function itemTypeLabel(type: ItemType): string {
  switch (type) {
    case 'skill': return 'Skill'
    case 'command': return 'Command'
    case 'agent': return 'Subagent'
    case 'post': return 'Post'
  }
}

export function itemInstallTarget(type: ItemType, alias: string, slug: string): string {
  switch (type) {
    case 'skill':   return `~/.claude/skills/${alias}/${slug}/SKILL.md`
    case 'command': return `~/.claude/commands/${alias}/${slug}.md`
    case 'agent':   return `~/.claude/agents/${alias}/${slug}.md`
    case 'post':    return ''
  }
}
