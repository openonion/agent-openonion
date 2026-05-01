This is the actual Claude Code setup I run on my machine — every skill, slash command, and subagent here is something I use weekly or more. Nothing aspirational, nothing demo-only.

It clusters around four workflows:

**Shipping software.** `/release` runs a 12-step PyPI release end to end (version bump → tests → build → upload → tag → docs site → announcement tweet). `ship-feature` is the higher-level orchestrator. `migrate-to-ts` ports one Python feature at a time to the TypeScript SDK. `sync-docs` and `update-docs` keep the docs site honest after every change.

**Writing in two languages.** A pipeline of small skills that compose: `outline-plan` → `nonfiction-structure` → `nonfiction-scene` → `nonfiction-depth` → `wenbai-jiehe` (文白结合) → `ai-language-fix` (strip AI-isms) → `reader-feel` (critical pass) → `title-refine` → `translate-to-english`. Each skill does one thing well; together they take a rough Chinese draft to a polished bilingual essay.

**Cross-posting & engagement.** `tweet` and `post` push to X and LinkedIn from a single command (X Premium, 4000-char threads). `x-engage`, `x-reply`, `x-tone-check`, and `x-write` are the toolkit for replying with the right voice. `make-cover` and `make-poster` generate the visuals — Bauhaus posters via `nano-banana` (Imagen 4 / gemini-3.1-flash-image-preview).

**Specialist subagents.** Six narrow-focus reviewers I summon for specific work: `simplicity-engineer` (kills over-engineering), `ui-ux-design-auditor` (catches UX issues), `code-documentation-writer` (10-principle docstrings), `nextjs-landing-page-architect` and `landing-page-design-architect` (paired build+design), and `seo-optimization-analyst` (Next.js-specific SEO).

The meta-skill that holds it all together is `skill-sediment`: every time I correct Claude in a way I'd want to apply again, that lesson goes back into the relevant skill file. The setup compounds because the skills compound.

Subscribe and you get the same tools, namespaced under `changxing/` so they don't clash with anything you already have.
