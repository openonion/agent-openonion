# Update Documentation Command

Update all documentation for a feature with deep understanding first.

## Usage
```bash
/update-docs <feature-name>
```

Example:
```bash
/update-docs auto_debug
```

## Documentation Locations

**Source Documentation (Markdown):**
- `connectonion/docs/` - Main reference documentation

**Docs Website (Next.js):**
- `docs-site/` - Web documentation at https://docs.connectonion.com
- `docs-site/app/` - Page components
- `docs-site/lib/navigation.ts` - Navigation structure

## Workflow

### Step 1: Deep Understanding - Read Everything
**Goal: Understand WHY people use this feature, not just what it does**

Read in this order:
1. **Implementation code**:
   - Main feature files (e.g., `connectonion/auto_debug.py`, `connectonion/xray.py`)
   - Related files and dependencies
   - Test files to see real usage patterns

2. **Existing documentation**:
   - `connectonion/docs/<feature-name>.md` - Current docs
   - Related docs that mention the feature
   - Code comments and docstrings

3. **Examples and demos**:
   - Example files in `simple-agent/` or `examples/`
   - Test files showing usage patterns
   - README sections

4. **User perspective**:
   - What problem does this solve?
   - What pain points does it address?
   - What are the "aha!" moments?
   - When would someone reach for this feature?
   - What alternatives exist and why is this better?

Take notes on:
- Key use cases
- Common patterns
- Edge cases
- Integration points
- User mental model

### Step 2: Update Source Documentation (connectonion/docs/)
**Create comprehensive reference documentation**

Edit `connectonion/docs/<feature-name>.md`:
- Start with the problem/pain point
- Show simplest usage first (60-second success)
- Progressive disclosure of complexity
- Real-world examples, not abstract concepts
- Show actual output
- Include best practices
- Document edge cases
- Link to related features

Format:
```markdown
# Feature Name

One-sentence problem this solves.

## Quick Start (60 seconds)
[Minimal working example]

## Why Use This
[Problem/pain point it addresses]

## How It Works
[Core concepts]

## Complete Example
[Real-world usage]

## Best Practices
[Dos and don'ts]

## See Also
[Related features]
```

### Step 3: Update Docs Site Navigation (docs-site/)
**IMPORTANT: Docs site is a nested Git repository**

The docs-site is a **separate PRIVATE Git repository** inside `docs-site/`:
- Main repo ignores `docs-site/` (in `.gitignore`)
- Has its own `.git/` directory
- Must `cd docs-site/` and commit separately

**Navigate and check status:**
```bash
cd docs-site/
git status
git remote -v  # Should show private repo
```

**Update navigation (`lib/navigation.ts`):**
```typescript
{
  title: 'Feature Name',
  href: '/feature-name',
  icon: IconName,
  section: 'Section Name',
  difficulty: 'Essential', // or 'Beginner', 'Intermediate'
  keywords: ['keyword1', 'keyword2', 'usage', 'pattern'],
  prev: { href: '/previous-page', title: 'Previous' },
  next: { href: '/next-page', title: 'Next' }
}
```

### Step 4: Create/Update Docs Site Page (docs-site/)
**Create/refine the web page for best user experience**

Create or update `app/<feature-name>/page.tsx`:

Key principles:
- **Single column**: Easy to read on mobile
- **Copy button**: Let users copy all content as markdown
- **Progressive disclosure**: Simple -> Advanced
- **Real output**: Show what actually happens
- **Scannable**: Bullet points, short sections
- **Code first**: Show working code immediately

Structure:
1. **Hero section**: Problem + 60-second solution
2. **Quick start**: Minimal working code
3. **Key features**: What you can do
4. **Complete examples**: Real-world usage
5. **Best practices**: Tips and gotchas
6. **See also**: Related features

Use components:
- `<CommandBlock>` for terminal commands
- `<CodeBlock>` for code examples
- Proper syntax highlighting
- Responsive design

**Commit to docs-site repo:**
```bash
# In docs-site/ directory
git add app/ lib/
git commit -m "Add <feature-name> documentation"
git push origin main
cd ..  # Return to main repo
```

### Step 5: Update README.md and Quickstart
**Surface feature in main entry points**

Update `README.md`:
- Add to "What Makes ConnectOnion Special" section
- Add dedicated section with example
- Keep it concise

Update `connectonion/docs/quickstart.md`:
- Add practical example after basic setup
- Show when to use this feature
- Link to full documentation

### Step 6: Update CLI Embedded Documentation
**After adding to website, update the embedded docs**

Update `connectonion/cli/docs/co-vibecoding-principles-docs-contexts-all-in-one.md`:
- This is the all-in-one docs file included with `co create` projects
- Add the feature documentation from the website
- Keep format consistent with existing content
- Include practical examples

Why this matters:
- Users can access docs offline
- Vibe coding: drag file into AI coding tools
- Self-contained project documentation

### Step 7: Verification Checklist
Before completing, verify:

**Understanding & Content:**
- [ ] Deeply understand WHY users need this
- [ ] Source docs (`connectonion/docs/`) are comprehensive
- [ ] All code examples tested and work
- [ ] Links between docs are correct

**Docs Site (Nested Repo):**
- [ ] Docs site navigation updated (`docs-site/lib/navigation.ts`)
- [ ] Docs site page exists (`docs-site/app/<feature>/page.tsx`)
- [ ] Mobile-friendly
- [ ] **COMMITTED to docs-site repo** (`cd docs-site/` -> commit -> push)
- [ ] Verify: `cd docs-site && git log -1` shows your commit

**Main Repo:**
- [ ] README mentions feature (if main feature)
- [ ] Quickstart has practical example
- [ ] CLI embedded docs updated
- [ ] **COMMITTED to main repo**

**Architecture Verification:**
- [ ] Verify docs-site is ignored: `git check-ignore -v docs-site`

### Step 8: Summary
Provide summary of changes:
```
Updated documentation for <feature-name>

Understanding gathered from:
- [List files read and key insights]

Source Docs (connectonion/docs/):
- Updated: connectonion/docs/<feature-name>.md

Docs Site (docs-site/ - Nested Repo):
- Updated: docs-site/lib/navigation.ts
- Created/Updated: docs-site/app/<feature-name>/page.tsx
- Commit: <commit-hash>
- Status: Pushed to origin/main

Main Repo:
- Updated: README.md
- Updated: connectonion/docs/quickstart.md
- Updated: connectonion/cli/docs/co-vibecoding-principles-docs-contexts-all-in-one.md
- Commit: <commit-hash>

Next steps:
- Test all examples
- Get feedback from users
```

## Example: auto_debug

### Step 1: Understanding
Read:
- `connectonion/agent.py` - `.auto_debug()` method
- `connectonion/interactive_debugger.py` - Main implementation
- `connectonion/xray.py` - `@xray` decorator
- `connectonion/debugger_ui.py` - UI components
- `simple-agent/agent_debug.py` - Real usage
- `connectonion/docs/auto_debug.md` - Current docs

Key insights:
- Problem: Can't see why agents make decisions
- Solution: Pause at `@xray` tools, inspect state
- Why better: Like code debuggers but for AI agents
- Use cases: Understanding behavior, testing edge cases, prompt engineering

### Step 2-6: Update all docs following workflow above

## Notes

### Critical: Nested Repository Architecture

**docs-site is a SEPARATE Git repository:**

```
platform/
├── connectonion/
│   ├── docs/              # Source markdown documentation
│   └── cli/docs/          # CLI embedded docs
├── docs-site/             # Nested repo (IGNORED by main)
│   ├── .git/              # Independent git repo (PRIVATE)
│   ├── app/               # Page components
│   └── lib/navigation.ts  # Navigation config
└── README.md
```

**Workflow:**
1. Make changes in `connectonion/docs/` -> commit to main repo
2. Make changes in `docs-site/` -> `cd docs-site/` -> commit -> push -> `cd ..`

**Verify architecture:**
```bash
# Should show docs-site is ignored
git check-ignore -v docs-site

# Should show independent .git directory
ls -d docs-site/.git
```

### Documentation Best Practices

- **Test everything**: Run every code example
- **User perspective**: Write for people with the problem
- **Progressive disclosure**: Simple first, advanced later
- **Real output**: Show what actually happens
