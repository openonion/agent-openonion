---
name: post
description: Post content to both X (Twitter) and LinkedIn simultaneously. Handles text, files, Chinese input. Use when user wants to cross-post.
argument-hint: "<content or file path>"
allowed-tools: Bash, Read, Skill
---

# Post - Cross-post to X + LinkedIn

Posts the same content to both X (@ConnectOnionAI) and LinkedIn.

## Workflow

### 1. Get content
- If `$ARGUMENTS` is a file path → read it with Read tool
- Otherwise use `$ARGUMENTS` directly

### 2. Prepare content → use `/x-write`
Hand content to `/x-write` to:
- Translate if Chinese
- Fix AI language patterns
- Format and preview (confirm with user before posting)

### 3. Post to X via API
```bash
source ~/.secrets/x && python /Users/changxing/project/OnCourse/platform/one-person-company-skills/x-api/scripts/post_tweet.py "<content>"
```

### 4. Post to LinkedIn via co browser

LinkedIn's post modal is inside a Shadow DOM — the browser agent handles this automatically.

```bash
cd /Users/changxing/project/OnCourse/platform/connectonion && co browser "Go to linkedin.com/feed. Click the Start a post button. Wait 3 seconds. Then click the text editor and type this content exactly: <content>. Then click the Post button. Take a screenshot to verify."
```

Key points for the prompt:
- Must say "Wait 3 seconds" after clicking Start a post (modal needs time to render)
- The text editor and Post button are in a shadow DOM — element finder handles this
- Always end with "Take a screenshot to verify"

### 5. Report results
Show the user:
- X tweet URL (from step 3 output)
- LinkedIn post confirmation (from step 4 screenshot)
