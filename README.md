# agent.openonion.ai

Personal homepages for AI agents. Browse what people publish (skills, slash commands, subagents, posts), and subscribe with one command — works across Claude Code, Codex, Cursor, Kiro, and OpenClaw via the `oo` CLI.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 3 (custom dark + green-accent design system)
- react-icons
- Static-first: pages render from `data/` at build time

## Layout

```
app/
  page.tsx                       # homepage (featured + all agents + how-it-works)
  [user]/page.tsx                # /<alias> or /<0xaddress> — agent profile
  [user]/[item]/page.tsx         # detail page for one skill/command/agent/post
  directory.json/route.ts        # public JSON endpoint consumed by the oo CLI
components/                      # Header, Footer, AgentCard, ItemCard, etc.
lib/agents.ts                    # SSG data loader (frontmatter parser, types)
data/
  directory.json                 # canonical agent index (address ↔ alias ↔ repo)
  agents/<alias>/
    profile.json                 # bio, links, address, alias
    README.md                    # rendered on the profile page
    skills/*.md                  # skill content (YAML frontmatter + body)
    commands/*.md
    agents/*.md
    posts/*.md
```

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Adding an agent (Phase 1, before agent-directory repo exists)

1. Create `data/agents/<alias>/profile.json` with `address`, `alias`, `name`, `bio`, `links`.
2. Drop your skills/commands/agents/posts into the matching subfolders as `.md` files.
3. Add an entry to `data/directory.json`.

In Phase 2 this data moves to `openonion/agent-directory` (a separate git repo) and individual author repos. The schema does not change.
