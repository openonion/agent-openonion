---
name: x-engage
description: Find hot tweets (by topic search or home timeline) and reply to them with humor. Fully automatic posting.
argument-hint: "[topic to search, default: 'AI agent']"
allowed-tools: Bash, Read, Skill, WebSearch, WebFetch, TaskCreate, TaskUpdate, TaskList
---

# X Engage - Auto Timeline Reply Bot

**Account**: @ConnectOnionAI

Finds timeline tweets, generates humor replies, posts them automatically. No nested skills — all posting logic is inline.

---

## Workflow (Process ONE tweet at a time)

### 1. Fetch timeline tweets

```bash
timeout 300 bash /Users/changxing/project/OnCourse/platform/one-person-company-skills/x-api/scripts/get_timeline_tweets.sh
```

Note: This script takes around 5 minutes to complete. Use `timeout 300`.

This script:
- Fetches up to 15 timeline tweets with URLs and text
- **Already filters out replied tweets** by reading ~/.co/x/replied_ids.json internally
- Returns only unreplied tweets

From the output:
- Extract tweet URLs and IDs (number after `/status/`)
- Skip pure retweets
- Keep first **6 unreplied tweets** with text

### 2. Process tweets SEQUENTIALLY (one at a time)

**CRITICAL: Process ONE tweet completely before starting the next.**
**DO NOT use `&` to background processes.**
**DO NOT run multiple posts in parallel.**

For each tweet, complete the full workflow (steps 3a-3d) and WAIT for completion before moving to the next tweet.

### 3. For each tweet — Generate and post reply

**Process this loop for each of the 6 tweets, ONE AT A TIME:**

#### 3a. Find humor angle

Analyze the tweet text. Pick the sharpest angle:
- Confident take easy to subvert
- Humblebrag gap
- Irony gap
- Universal pain
- Absurd extension
- Engineer joy / founder reality
- Tech community self-roast

#### 3b. Write punchline

Write 2-3 candidates. Pick the one that lands fastest. Rules:
- Under 180 chars
- No hashtags, no emojis unless emoji IS the joke
- No parallel lists, no 排比
- One beat only — dry beats clever

#### 3c. Tone check and post

Call `/x-tone-check` with all required parameters:
```bash
/x-tone-check "<tweet_url>" "<draft_reply>"
```

The tone check skill will:
- **If APPROVED**: Post immediately and report success
- **If SOFTENED**: Add emoji, post immediately, report success
- **If RETHINK**: Return new angle suggestion WITHOUT posting

If **RETHINK**, write new punchline based on suggestion and re-run tone check.

#### 3d. Post in background and monitor live

Run post_reply.sh in background (`run_in_background: true`):
```bash
bash /Users/changxing/project/OnCourse/platform/one-person-company-skills/x-api/scripts/post_reply.sh "<tweet_url>" "<tweet_id>" "<reply_text>"
```

Then immediately tail the browser log to watch live progress (timeout 120s):
```bash
tail -f ~/.co/logs/browser_cli.log
```

Watch for `Browser post succeeded` or `Browser post failed`. Stop tailing once either appears.

Then verify cache:
```bash
cat ~/.co/x/replied_ids.json | grep "<tweet_id>"
```

If verified: ✅ move to next tweet
If not found: ❌ log failure and continue

---

### 4. Phase 2 — Trending tweet (optional, skip if out of time)

Use WebSearch to find hot tweets about `$ARGUMENTS` (default: `"AI agent"`).
Pick the single tweet with sharpest humor angle.
Create a task for it, then run the same loop (3a → 3d) on that tweet.

---

## Key Rules

1. **Process 6 timeline tweets sequentially** (one at a time, wait for completion)
2. **Do not call `/x-reply` skill** — all logic is inline above
3. **Run post_reply.sh with `run_in_background: true`**, then tail `~/.co/logs/browser_cli.log` for live updates
4. **Stop tailing** once `Browser post succeeded` or `Browser post failed` appears
5. **Verify each post in cache** before moving to next tweet
6. **If posting fails**, log the error but continue to next tweet

---

## Browser Agent Tips

- **Headless mode** (default `co -b`) — faster, no GUI, no profile conflicts
- **Non-headless** (`co --no-headless -b`) — only for manual testing/debugging
- Always prepend: `"You are already logged into x.com. Do NOT call wait_for_manual_login."`
- Use `2>&1 | tail -50` to capture stdout (the browser agent returns results there)
- Screenshots work in headless mode (saved to disk, no display needed)
