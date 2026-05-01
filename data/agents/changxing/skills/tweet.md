---
name: tweet
description: Post a tweet or thread to X. Handles content from text, files, or Chinese input. Use when user wants to post something to X/Twitter.
argument-hint: "<content or file path> [image1.jpg] [image2.png] ..."
allowed-tools: Bash, Read, Skill
---

# Tweet - Post to X

**Account**: @ConnectOnionAI (X Premium, 4,000 chars/tweet)

## Workflow

### 1. Get content
- If `$ARGUMENTS` is a file path → read it with Read tool
- Otherwise use `$ARGUMENTS` directly
- If user mentions images/media → ask for file paths

### 2. Prepare content → use `/x-write`
Hand content to `/x-write` to:
- Translate if Chinese
- Fix AI language patterns
- Remove references and external links
- Format + preview thread split (confirm with user before continuing)

### 3. Post → use `/x-api`
Once user confirms the preview, post via the X API script:
```bash
source ~/.secrets/x && python /Users/changxing/project/OnCourse/platform/one-person-company-skills/x-api/scripts/post_tweet.py "<prepared content>" [media_path ...]
```

Show the returned tweet URL to the user.
