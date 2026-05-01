---
name: x-reply
description: Auto-generate a witty humor reply to a tweet, polish it, and post it. Fully automatic. Use when user wants to reply to a tweet with humor.
argument-hint: "<tweet_id or tweet_url>"
allowed-tools: Bash, Read, Skill
---

# X Reply - Auto Humor Mode

**Account**: @ConnectOnionAI

Find the angle, write the punchline, polish, post. No user input needed.

---

## ✅ TODO CHECKLIST — You MUST complete ALL items before this skill is done:

- [ ] 1. Read the tweet (or use provided text)
- [ ] 2. Find the humor angle
- [ ] 3. Write 2-3 punchline candidates, pick the best
- [ ] 4. Run `/x-tone-check` and get approval
- [ ] 5. Check if already replied (read `~/.co/x/replied_ids.json`)
- [ ] 6. **POST the reply** (run the bash command in step 6 below)
- [ ] 7. **VERIFY it posted** (use browser to confirm)

**The skill is NOT complete until items 6 and 7 are checked off. Do not stop after tone-check.**

---

## Workflow

### 1. Read the tweet

If tweet text is already provided (from `/x-engage`), use it directly — **do not call any script or API to re-fetch it**.

If only a URL is given and no text, fetch via browser (free, no API cost):
```bash
co --no-headless -b "You are already logged into x.com. Do NOT call wait_for_manual_login. Go to $ARGUMENTS and tell me the tweet text and author username."
```

**Never use `get_tweet.py` — it costs X API credits.**

### 2. Find the angle

Analyze what's joke-able. Pick the sharpest:
- **Confident take easy to subvert** — "X will replace Y in 2 years"
- **Humblebrag gap** — "we did X with zero Y" (find the hidden Y)
- **Irony gap** — claims simplicity while being obviously complex
- **Universal pain** — something every engineer/builder silently suffers but never says
- **Absurd extension** — take their premise one step further until it breaks
- **Engineer joy** — the quiet satisfaction only engineers feel, e.g. the PR that finally got merged after 3 weeks
- **Founder reality** — the gap between how founders describe things publicly and what actually happened
- **Tech community self-roast** — we all hyped this thing last year, now we're hyping the thing that replaces it

### 3. Write the punchline

## First Principles

A reply lands when it creates surprise + recognition in the same beat. The reader expects one thing, gets another — and immediately knows exactly what you mean.

**Dry beats clever.** Dry states the absurd truth flatly and walks away. Clever explains itself on the way out.

**One beat only.** No lists. No rhythm. No structure. If it sounds like it has a format, it's AI.

**Punch at the idea, not the person.** The tweet is the setup. You're the punchline.

---

## Good vs Bad — Real World Examples

---

**Tweet:** "Coding will be a useless skill by 2026"

❌ Bad — explains, hedges:
> Interesting take! While AI is advancing fast, human creativity and judgment will remain essential for complex problem solving.

❌ Bad — AI 排比:
> no code, no engineers, no problem. just vibes and prompts. love the future.

✅ Good — historical counter, no editorializing:
> this is also what they said about Excel

✅ Good — dry one beat:
> see you on the other side of that one

---

**Tweet:** "Just hit $1M ARR. Team of 2. Zero VC money. 🚀"

❌ Bad — explains the irony:
> Impressive, though "zero VC money" might be misleading if you used personal savings or loans.

❌ Bad — AI parallel list:
> no investors, no team, no runway. just pure grit. love to see it.

✅ Good — finds what's missing:
> what's the AWS bill

✅ Good — flips the frame:
> the inbound VC DMs are going to be something

---

**Tweet:** "We're excited to announce our AI-powered platform that transforms how teams collaborate"

❌ Bad — corporate reply to corporate:
> Congrats on the launch! Excited to see how AI will revolutionize collaboration for teams everywhere.

✅ Good — one question that exposes everything:
> what does AI-powered mean here

✅ Good — the apology arc:
> looking forward to the "we're sunsetting" email in 18 months

---

**Tweet:** "Nobody needs more than 8 hours of sleep. Top performers sleep 5."

✅ Good — deadpan historical fact:
> Thomas Edison said this. He also hallucinated frequently.

---

**Tweet:** "Shipping fast is the only thing that matters"

✅ Good — engineer in-joke, we've all been there:
> the prod incident is also fast 😅

---

**Tweet:** "We got our first 1000 users in a week!"

❌ Bad — sounds like a gotcha:
> users or signups

✅ Good — in on it together:
> week 2 retention update when 😅

---

**Tweet:** "We're moving from microservices back to a monolith for simplicity"

✅ Good — tech community laughing at itself, not the person:
> see you back here in 4 years 🫠

---

**Rules:**
- Under 180 chars
- No hashtags, no emojis unless the emoji IS the joke
- No parallel lists, no 排比, no "X, Y, Z. love the [word]" format
- Don't explain the joke — if it needs explaining, cut more
- Read it aloud. If you pause before the funny part, it works.

Write 2-3 candidates. Pick the one that lands fastest.

### 4. Tone check → use `/x-tone-check`

Pass the original tweet and the chosen punchline to `/x-tone-check`. Use its output:
- **APPROVED** → the reply text to post is confirmed. Mark ✅ item 4, **proceed to step 5 immediately.**
- **SOFTENED** → the softened version is confirmed. Mark ✅ item 4, **proceed to step 5 immediately.**
- **RETHINK** → write a new punchline using the suggested angle, re-run tone check, then proceed to step 5.

**After this step, check off:** `- [x] 4. Run /x-tone-check and get approval`

> ⚠️ Do NOT stop here. Do NOT output "Post as-is: ..." and end the skill. TODO items 5, 6, 7 are still unchecked.

### 5. Check for duplicate reply

Read the replied IDs cache:
```bash
cat ~/.co/x/replied_ids.json 2>/dev/null || echo '{"ids":[]}'
```

If `<tweet_id>` is in `ids`, skip — do not post again. Otherwise, proceed to step 6.

**Check off:** `- [x] 5. Check if already replied`

### 6. POST the reply ← **CRITICAL STEP**

The tweet ID is the number after `/status/` in the URL.

**Step 6a: Post via browser agent**
```bash
co --no-headless -b "You are already logged into x.com. Do NOT call wait_for_manual_login. Go to <tweet_url>, click the reply icon to open the composer, type this exact text: '<reply text>', then click the blue Reply button to submit."
```

**Step 6b: Write tweet ID to cache** (prevents duplicate replies)
```bash
python3 -c "
import json, os, time
f = os.path.expanduser('~/.co/x/replied_ids.json')
os.makedirs(os.path.dirname(f), exist_ok=True)
cache = json.load(open(f)) if os.path.exists(f) else {'ts': time.time(), 'ids': []}
if '<tweet_id>' not in cache['ids']:
    cache['ids'].append('<tweet_id>')
json.dump(cache, open(f, 'w'))
print('Cached tweet ID <tweet_id>')
"
```

**After both commands run, check off:** `- [x] 6. POST the reply (browser + cache)`

> ⚠️ The skill is INCOMPLETE until BOTH bash commands execute successfully. Outputting "Post as-is: X" is NOT the same as posting.

### 7. VERIFY it posted ← **FINAL STEP**

Use the browser agent to confirm the reply is visible:
```bash
co --no-headless -b "You are already logged into x.com. Do NOT call wait_for_manual_login. Go to <tweet_url>, scroll to replies, and tell me: did @ConnectOnionAI reply? What does the reply say?"
```

**After verification, check off:** `- [x] 7. VERIFY it posted`

**NOW the skill is complete.** Report: `Posted to <tweet_url> with reply: "<reply text>"`

---

## ✅ COMPLETION CHECK — Before ending this skill, verify ALL items are checked:

```
- [x] 1. Read the tweet
- [x] 2. Find the humor angle
- [x] 3. Write punchline candidates, pick best
- [x] 4. Run /x-tone-check and get approval
- [x] 5. Check if already replied
- [x] 6. POST the reply (bash command executed)
- [x] 7. VERIFY it posted (browser confirmed)
```

**If items 6 or 7 are unchecked, the skill is INCOMPLETE. Go back and complete them.**

---

## Browser Agent (`co -b`) Tips

`co -b` is a full browser agent — you can ask it anything in natural language:
- **Check tweet content**: `"go to https://x.com/user/status/ID and tell me what this tweet says"`
- **Verify a reply posted**: `"go to https://x.com/user/status/ID and check replies for @ConnectOnionAI"`
- **Read a thread**: `"go to https://x.com/user/status/ID and summarize the full thread"`
- **Check engagement**: `"go to https://x.com/user/status/ID and tell me likes, retweets, and reply count"`

Always prepend: `"You are already logged into x.com. Do NOT call wait_for_manual_login."` for stability.
