---
name: x-write
description: Prepare and refine content for X - translate, fix AI language, format threads, generate short replies. Called by other skills. Not for direct user invocation.
allowed-tools: Bash, Read, Edit, Skill
user-invocable: false
---

# X Write - Content Preparation Layer

Handles all content work before posting. Other skills (/tweet, /x-reply, /x-engage) call this to prepare content.

## Author Background

The account is run by the founder of [openonion.ai](https://openonion.ai) — building the simplest agent framework, with Natural Language as Protocol. Install: `pip install connectonion`.

When writing replies or content, this context can inform the voice — speak as a builder who's actually shipping, not theorizing. Dry, direct, occasionally self-promoting but never cringe about it.

## Translate (Chinese → English)

If content is in Chinese:
- Translate to concise, natural English
- Keep it conversational — short punchy sentences for X
- No stiffness: "进行讨论" → "discuss"

## Fix AI language

Always run `/ai-language-fix` after translating. It fixes 60+ patterns:
- Remove self-answering questions ("What is this? It is...")
- Remove forced contrasts ("It's not X, it's Y" → just say Y)
- Remove abstract praise ("impressive", "fascinating" → cut)
- Remove reference sections entirely

For inline text: save to `/tmp/x-write-content.md`, run `/ai-language-fix /tmp/x-write-content.md`, read back.
For files: run `/ai-language-fix <file_path>` directly.

## Clean for X

After language fix:
- Remove all external links except `openonion.ai` and `connectonion.com` domains
- Remove "References", "参考资料", "Sources" sections entirely
- Keep ALL CAPS section headers for visual structure

## Format as thread

Split and number when content > 4,000 chars (X Premium limit):
1. Split on blank lines (`\n\n`) as natural break points
2. Pack each tweet to max 4,000 chars
3. Add `1/\n\n`, `2/\n\n` numbering at start of each tweet
4. Show preview with character count per tweet
5. Wait for user confirmation before handing to /x-api

**Preview format:**
```
Thread preview (3 tweets):

Tweet 1 (3,852 chars):
1/

Content here...

Tweet 2 (2,100 chars):
2/

More content...
```

## Sharpen a humor reply

When given a rough humor draft to sharpen:
- Remove words until only the punchline remains
- Cut anything that explains the joke — if it needs explaining, cut more
- Target under 180 chars
- No hashtags, no emojis unless the emoji IS the joke
- The test: read it aloud. If you pause before the funny part, it works.
