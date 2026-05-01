---
title: "My actual Claude Code setup — 26 skills, 10 commands, 6 subagents"
date: "2026-05-01"
tags: ["claude-code", "workflow", "meta"]
---

This is what's in my `~/.claude` right now, end to end — the skills I actually invoke, the slash commands I lean on, the subagents I summon. No "tutorials," no aspirational config. The thing I run.

The shape of it surprised me when I counted: **26 skills, 10 slash commands, 6 subagents.** A year ago it was three. The growth wasn't planned — it was sediment. Every conversation with Claude Code that taught me something turned into either a new skill or an amendment to an existing one. That's the whole trick.

A few things worth flagging if you're starting your own:

1. **Compose narrow skills, don't build mega-skills.** My writing pipeline is nine skills (`outline-plan` → `nonfiction-structure` → `nonfiction-scene` → `nonfiction-depth` → `wenbai-jiehe` → `ai-language-fix` → `reader-feel` → `title-refine` → `translate-to-english`). Each is short. Together they replace what used to be a 2000-line "essay-writer" prompt that nobody could maintain.

2. **Slash commands are for the things you do daily.** `/release` is a slash command because I ship 2–3 times a week. `nano-banana` is a slash command because I generate images every other day. Skills are for the things Claude should *know how to do when relevant*; slash commands are for the things *I* invoke explicitly.

3. **Subagents are for shifting voice, not for parallelism.** I use `simplicity-engineer` not because it's faster but because I want a different opinion than my own — one that's harsh about over-engineering. Same for `ui-ux-design-auditor`. They're not workers; they're advisors.

4. **`skill-sediment` is the keystone.** It's the skill that updates other skills. Every correction I give Claude that I'd want to apply twice gets folded back into the relevant SKILL.md file. The setup compounds because the skills compound.

You can subscribe to this whole bundle with one command:

```bash
oo subscribe changxing
```

It'll land under `changxing/` in your `~/.claude/` (and `~/.codex/`, `~/.cursor/`, `~/.kiro/`, `~/.openclaw/` if you use those), namespaced so nothing collides with what you already have. `oo update` keeps it fresh.
