---
name: engage-linkedin
description: React and comment on LinkedIn feed. Picks appropriate reactions based on content, leaves short authentic comments.
argument-hint: "[number of posts to engage, default: 5]"
allowed-tools: Bash, Read
---

# Engage LinkedIn

Scroll through LinkedIn feed, pick appropriate reactions based on content, and leave short authentic comments. Builds presence without being spammy.

**Account**: Aaron xie on LinkedIn

## Comment Guide

For 2-3 posts total, leave a short comment. Rules:
- Under 100 chars
- Speak as a builder who ships, not a cheerleader
- No "Great post!", "Love this!", "So true!" — be specific
- Reference something concrete from the post
- OK to mention ConnectOnion only if genuinely relevant (max once per session)

Good examples:
- "we hit the same wall with shadow DOM — ended up traversing shadow roots"
- "shipping > planning, every time"
- "this is why I default to gemini for agents — price/perf ratio"

Bad examples:
- "Great insight!"
- "Totally agree with this!"
- "Check out ConnectOnion for this!"

## Workflow

### 1. Engage on LinkedIn via co browser

```bash
cd /Users/changxing/project/OnCourse/platform/connectonion && co browser "You are already logged into linkedin.com. Do NOT call wait_for_manual_login.

Go to linkedin.com/feed. Process posts ONE AT A TIME. Keep a counter starting at 0.

For each post:

STEP 1 — Take a screenshot to see the current post. Read the post author and text. Note the author name.
STEP 2 — React. Use hover() with the author name to target the correct Like button:
  hover('the Like button below the post by [Author Name]')
  This reveals a popup with reaction icons above the Like button. The popup icons have aria-labels: Celebrate, Insightful, Funny, Support, Love, Like.
  IMPORTANT: After hover, click the reaction icon IN THE POPUP — these are small 48x48 buttons with NO text and aria-label like 'Celebrate'. Do NOT click buttons with text like 'Insightful' or aria like 'Reaction button state: ...' — those are already-reacted state buttons from other posts.
  Use descriptions like:
  - click('the Celebrate icon in the reaction popup')
  - click('the Insightful icon in the reaction popup')
  - click('the Funny icon in the reaction popup')
  - click('the Support icon in the reaction popup')
  Pick based on content: Celebrate for achievements/launches, Insightful for analysis/data, Funny for humor, Support for struggles. Default to Like if unsure.
  Increment the counter after each successful reaction.
STEP 3 — Leave a comment if the post is from a founder, CEO, or indie hacker. Also comment on 2-3 other interesting posts. Click the Comment button below that post, type a short reply (under 100 chars, specific to the content, no generic praise like 'Great post'), and click the Post button to submit.
STEP 4 — Move to the next post. Use keyboard_press('Space') to scroll down gently (about half a viewport). Do NOT use scroll() — it scrolls too far and skips posts. Press Space 1-2 times until the next post's Like button is visible.

Repeat for $ARGUMENTS posts total. Skip ads, promoted content, and suggested content — do NOT react to or engage with anything marked as 'Promoted' or 'Suggested'. If a post is already reacted to (the Like button shows a reaction name instead of 'Like'), skip it.

After finishing, report: how many posts reacted to, which reactions used, and which posts got comments with the comment text."
```

### 2. Report results

Show the user:
- Number of posts reacted to
- Which reactions were used
- Which posts got comments and what was said
