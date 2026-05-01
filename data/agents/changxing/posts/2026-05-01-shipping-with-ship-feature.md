---
title: "Shipping a release in one command — `/release` end to end"
date: "2026-05-01"
tags: ["workflow", "release", "automation"]
---

Releasing used to be a checklist of 12 things — bump version, run tests, build wheel, upload to PyPI, tag, push, update changelog, regenerate docs site, post the announcement. Each step a 30-second decision.

So I wrote `/release`. One command, all twelve. The skill is opinionated: it knows our project structure, knows the docs live in `docs-site/`, knows the announcement goes to `@ConnectOnionAI` on X. It doesn't ask. It does.

The lesson: **automation that asks you questions isn't automation, it's a wizard**. The right scope for a skill is "I know exactly what to do — just do it."
