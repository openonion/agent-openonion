---
name: x-tone-check
description: Check if a reply will make people laugh or angry. Soften with emoji or suggest angle change. Posts automatically after approval. Called by x-reply before posting. Not for direct user invocation.
allowed-tools: Read, Bash
user-invocable: false
---

# X Tone Check

Takes a draft reply + the original tweet context. Evaluates tone, then posts automatically if approved/softened.

## Input

Receives via context:
- `ORIGINAL_TWEET`: the tweet being replied to
- `DRAFT_REPLY`: the draft reply text
- `TWEET_URL`: the full tweet URL (e.g., https://x.com/user/status/123)
- `TWEET_ID`: the tweet ID (e.g., 123)

## Evaluation

Ask two questions:

**1. Who might feel attacked?**
- If the reply targets an *idea or situation* → safe
- If the reply targets *how the person writes or behaves* → risky
- If the reply could read as passive-aggressive to a follower or someone influential → risky

**2. Is the landing clear without context?**
- Dry humor lands when the setup is visible (the original tweet provides it)
- If a stranger sees only the reply with no context and it reads as a rude non-sequitur → risky

## Output — pick one and execute

**APPROVED**: funny, lands on an idea, no personal attack.
- Action: POST immediately using post_reply.sh with the draft reply text
- Report: "✅ APPROVED and posted to <tweet_url>"

**SOFTENED**: risky but salvageable. Add one emoji that signals playfulness (😅 🫠 💀 👀) at the end.
- Action: POST immediately using post_reply.sh with the softened version
- Report: "⚠️ SOFTENED with emoji and posted to <tweet_url>"

**RETHINK**: the angle punches at the person, not the idea. Too risky even with emoji.
- Action: Do NOT post. Suggest a new angle that hits the same tweet from a safer direction.
- Report: "❌ RETHINK: <reason and suggested new angle>"

## Posting Command

When APPROVED or SOFTENED:

**Step 1** — Run in background:
```bash
bash /Users/changxing/project/OnCourse/platform/one-person-company-skills/x-api/scripts/post_reply.sh "$TWEET_URL" "$TWEET_ID" "$FINAL_REPLY_TEXT"
```
Use `run_in_background: true` on the Bash tool call.

**Step 2** — Monitor live via log (run with timeout 120s):
```bash
tail -f ~/.co/logs/browser_cli.log
```
Watch for `Browser post succeeded` or `Browser post failed`. Stop tailing once either appears.

**Step 3** — Verify cache:
```bash
cat ~/.co/x/replied_ids.json | grep "$TWEET_ID"
```
If found: report ✅. If not: report ❌.

## Rules

- Emoji should be rare — only when it actually defuses something
- Never add emoji just to be safe; if the joke is clean, keep it clean
- "Softened" is for borderline cases. "Rethink" is for replies that would make the author defensive or followers uncomfortable
- Timeline replies (people the account follows) get stricter judgment than search replies
- **CRITICAL**: Always execute the post command after APPROVED/SOFTENED. The task is incomplete without posting.
