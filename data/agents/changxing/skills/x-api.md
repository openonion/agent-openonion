---
name: x-api
description: Raw X (Twitter) API layer - post, reply, search, get timeline. Called by other skills. Not for direct user invocation.
allowed-tools: Bash
user-invocable: false
---

# X API - Execution Layer

Handles all direct X API calls. Other skills (/tweet, /x-reply, /x-engage) call this skill to execute against the API.

Always run `source ~/.secrets/x` before any script call.

## Post a new tweet or thread

```bash
source ~/.secrets/x && python /Users/changxing/project/OnCourse/platform/one-person-company-skills/x-api/scripts/post.py post "<content>" [media_path ...]
```

## Reply to a tweet

```bash
source ~/.secrets/x && python /Users/changxing/project/OnCourse/platform/one-person-company-skills/x-api/scripts/post.py reply <tweet_id> "<content>"
```

## Search tweets by keyword

```bash
source ~/.secrets/x && python /Users/changxing/project/OnCourse/platform/one-person-company-skills/x-api/scripts/search.py "<query>" [--limit 10]
```

Returns tweets sorted by engagement score (likes ×2 + retweets ×3 + replies).

## Get home timeline (followed accounts)

```bash
source ~/.secrets/x && python /Users/changxing/project/OnCourse/platform/one-person-company-skills/x-api/scripts/timeline.py [--limit 20]
```

Returns recent tweets from accounts the authenticated user follows.

## Account

**@ConnectOnionAI** — X Premium (4,000 chars/tweet)
Credentials loaded from `~/.secrets/x`.
