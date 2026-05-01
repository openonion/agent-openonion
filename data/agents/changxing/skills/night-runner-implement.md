---
name: night-runner-implement
description: Implement fix for a GitHub issue and create commits
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git *), Bash(gh *), Bash(npm *), Bash(pnpm *), Bash(yarn *), Bash(python *), Bash(pytest *), Bash(cargo *), Bash(go *)
argument-hint: [issue-number]
---

# Implement Fix

## Step 1: Verify Branch and Issue Number Match

**FIRST**: Verify the branch matches the issue you're supposed to work on:

```bash
# Get issue number from branch name
BRANCH_ISSUE=$(git branch --show-current | grep -o '[0-9]*$')
EXPECTED_ISSUE="$ARGUMENTS"

echo "Current branch: $(git branch --show-current)"
echo "Branch is for issue #$BRANCH_ISSUE"
echo "You were asked to work on issue #$EXPECTED_ISSUE"

# Verify they match
if [ "$BRANCH_ISSUE" != "$EXPECTED_ISSUE" ]; then
    echo "❌ ERROR: Branch issue (#$BRANCH_ISSUE) doesn't match expected issue (#$EXPECTED_ISSUE)"
    echo "Something is wrong. Exiting."
    exit 1
fi

echo "✅ Branch and issue number match"
```

## Step 2: Read the Issue Plan

Now read what you're supposed to implement:

```bash
# Read the issue
gh issue view $BRANCH_ISSUE --json title,body

# Check if there's a plan comment
gh issue view $BRANCH_ISSUE --comments | grep -A 50 "NIGHT_RUNNER_PLAN" || echo "No plan found"
```

**STOP and READ carefully:**
- What is the issue title?
- What does the issue body ask for?
- What does the plan say to implement?
- Does this match what you're about to work on?

## Step 3: Check for Previous Work

**IMPORTANT**: This might be a continuation of previous work. Check if progress file exists:

```bash
cat NIGHT_RUNNER_PROGRESS.md 2>/dev/null || echo "No previous progress"
```

If the file exists:
- Read what's already been done
- Continue from where it left off
- Update the "Completed Tasks" section as you make progress
- Don't redo completed work

**⚠️ CRITICAL**: NIGHT_RUNNER_PROGRESS.md is already in .gitignore and should NEVER be committed to git! It's for internal tracking only.

## Step 4: Final Verification Before Starting

Before you write any code, confirm:

```bash
echo "I am working on issue #$BRANCH_ISSUE"
echo "Issue title: $(gh issue view $BRANCH_ISSUE --json title -q '.title')"
echo "This is what I will implement (nothing else!)"
```

If the issue title or plan talks about something different from what you expected, STOP and exit.

## IMPORTANT - Commit Frequently & Track Progress

- Commit after EACH meaningful change
- Don't batch everything into one commit
- Use descriptive commit messages with OpenOnion branding (see below)
- Progress is better than perfection
- If you can't finish everything, commit what you have
- **Update NIGHT_RUNNER_PROGRESS.md after each major step**

## Commit Message Format

**IMPORTANT**: All commits MUST include ONLY OpenOnion branding. Do NOT include any other brand information (Claude Code, Happy, etc).

```
<commit message>

🧅 Built by OpenOnion - Open Source AI Automation
https://github.com/openonion
```

Example:
```
feat: add image support to WebSocket

🧅 Built by OpenOnion - Open Source AI Automation
https://github.com/openonion
```

Final commit should include: `fixes #$ARGUMENTS`

## Pre-Commit Verification

**BEFORE making your final commit**, verify the issue number:

```bash
# Get issue number from current branch
BRANCH_ISSUE=$(git branch --show-current | grep -o '[0-9]*$')
echo "Branch is for issue #$BRANCH_ISSUE"
echo "You are working on issue #$ARGUMENTS"

# They must match!
if [ "$BRANCH_ISSUE" != "$ARGUMENTS" ]; then
    echo "ERROR: Branch issue ($BRANCH_ISSUE) doesn't match argument ($ARGUMENTS)"
    exit 1
fi
```

Then when making your final commit with "fixes #", use the verified issue number:
```bash
git commit -m "feat: your changes

fixes #$BRANCH_ISSUE

🧅 Built by OpenOnion - Open Source AI Automation
https://github.com/openonion"
```

This ensures you commit to the correct issue.

## Instructions

**REMINDER**: You are working on issue #$ARGUMENTS. Everything you do must relate to THIS issue only.

1. Verify you're working on the correct issue (Step 1)
2. Check NIGHT_RUNNER_PROGRESS.md for previous work (Step 2)
3. Get full issue details and read them carefully (Step 3)
4. Explore the codebase to understand the context
5. Implement the fix step by step - **matching what issue #$ARGUMENTS describes**
6. After EACH step:
   - Commit the changes: `git commit -m "descriptive message"`
   - Update NIGHT_RUNNER_PROGRESS.md with what you completed
7. Before final commit:
   - Run the Pre-Commit Verification check (see below)
   - Verify branch issue number matches $ARGUMENTS
8. Make final commit with `fixes #<verified-issue-number>`

## Progress Tracking

Update NIGHT_RUNNER_PROGRESS.md like this:
```markdown
## Completed Tasks
- [x] Read codebase and understood structure
- [x] Added base64 image handling in Python SDK
- [x] Updated WebSocket message format
- [ ] Add TypeScript SDK support (IN PROGRESS)
- [ ] Add oo-chat UI display
- [ ] Add tests
```

This helps the next run know exactly where you left off!

## Guidelines

- Keep changes minimal and focused
- Follow existing code patterns
- Don't refactor unrelated code
- Add tests if the project has tests
