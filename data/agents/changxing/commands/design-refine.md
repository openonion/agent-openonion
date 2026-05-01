---
allowed-tools: Bash, Read, Task, Glob, Grep, MultiEdit, Write, Edit, TodoWrite
argument-hint: [optional-url]
description: Analyze and iteratively refine website design until it meets professional standards
---

# Design Analysis and Refinement Loop

## Step 0: Commit to an aesthetic direction — and know when to escalate to `/loop`

Before any code, pick **one** intentional aesthetic tone. Don't let the design drift into generic SaaS. Real choices:

- brutally minimal · maximalist chaos · retro-futuristic · organic/natural · luxury/refined · playful/toy-like · **editorial/magazine** · brutalist/raw · art deco/geometric · soft/pastel · industrial/utilitarian · literary developer-journal · zine/riso-print

**Ask: what's the ONE thing someone will remember after closing the tab?**
- A distinctive headline typography treatment (one italic serif word in accent color)
- A page-load orchestration (staggered reveal ending on a Fig. 01 annotation)
- A texture/atmosphere (grain overlay + dot grid + paper-warm sections)
- A grid-breaking moment (hero headline spilling past the container; asymmetric sidebar)

If the answer is "it looks clean and professional", that's not a memory — that's wallpaper. Pick something.

### Match complexity to vision

- **Maximalist** direction → elaborate code: multi-layer backgrounds, custom cursors, scroll-triggered reveals, decorative SVG.
- **Minimalist / refined** direction → restraint and precision: perfect spacing, careful font optical sizing, one tiny texture, generous negative space.

Elegance = executing the chosen vision well, **not** cramming both.

### Escalate to `/loop` when one round isn't enough

A single round of this skill covers one target (URL, page, or narrow scope). Use `/loop` when **any** of the following is true:

- Multi-round refinement is needed (each pass changes direction based on visual feedback you can only see after shipping).
- The scope spans the homepage **plus** subpages + shared components, and fixing them in one pass would produce a ~2000-line diff the user can't meaningfully review.
- The user explicitly asked for "refine until it's great" / "keep improving" / "until world-class" — this is a multi-iteration directive, not a one-shot task.
- You've finished one iteration and new critiques emerge that deserve a standalone pass.

Escalation pattern (dynamic self-pacing):

```
/loop refine the design until it's world-class
```

Each `/loop` tick = one design round through this skill. Between rounds: commit + push, take screenshots, optionally `ScheduleWakeup` 20–30 min out so the user has time to steer before the next autonomous refinement. If user feedback lands mid-round, fold it into the current iteration before scheduling the next tick.

### Anti-convergence rule

Never use the same font/palette/layout pattern you used on the previous project. Specifically avoid:

- **Fonts:** Inter, Roboto, Arial, system-ui, Space Grotesk (overused to the point of default-AI). Vary each generation.
- **Color schemes:** purple gradient on white (the canonical "AI slop" signal); rainbow gradient text; glowing emerald on dark purple.
- **Patterns:** 3-column feature grid with rounded cards and emoji icons; Stripe-copy hero with centered headline + two-button stack; hero with floating glass-morph cards.

Previous projects: note what you used. Pick a different axis this time.

## Step 1: Determine the target URL
- If provided: use $1
- Otherwise: auto-detect from running dev server:
  - Next.js/React: localhost:3000
  - Vite: localhost:5173
  - Vue: localhost:8080
  - Nuxt: localhost:3000
  - Angular: localhost:4200
  - Python/Django: localhost:8000
  - Rails: localhost:3000
- Check package.json dev script for actual port configuration
- **Before starting the dev server, check the port is free:** `lsof -i :3000`. If another project owns it, start on a different port: `PORT=3005 npm run dev`. Do not assume the browser agent will hit your project just because you ran `npm run dev` — you may screenshot someone else's app and waste an iteration.

## Step 1.5: Scope — list every route before refining
Before touching any component, list every page under `app/` (or `pages/`):
- `find app -name "page.tsx"` (Next.js App Router) or equivalent.
- Note each route. The refinement loop must cover ALL of them, not just the homepage.
- A design refresh that only updates `/` and leaves `/manifesto`, `/careers`, `/login`, etc. on the old theme is a failed iteration — the user will notice.

## Step 2: Initial Screenshot Capture

**Default tool: `playwright screenshot` CLI.** It's a one-liner per URL, parallelizable across multiple Bash calls, no shared-profile lock conflicts, and ~3× faster than agentic browsers.

```bash
playwright screenshot --full-page --wait-for-timeout 1500 http://localhost:3000 /tmp/design-refine/baseline-desktop.png
playwright screenshot --full-page --wait-for-timeout 1500 --viewport-size=375,812 http://localhost:3000 /tmp/design-refine/baseline-mobile.png
```

When iterating across many pages, fire 5–10 of these as separate Bash calls **in parallel** (one tool_use block, multiple Bash blocks). Don't loop sequentially.

**Why not `co browser --headless "…"`:** ConnectOnion shares a single Chromium profile (`~/.co/browser_profile/`). When another `co` instance is open (the user's, an earlier loop tick, etc.), the new launch fails with `Failed to create … SingletonLock`. The agent then dies mid-batch and you waste an iteration. Prefer `playwright`. Use `co browser` only if the user explicitly asks for it or if Playwright isn't installed.

**If the project has a Playwright MCP server** (`mcp__playwright__*` tools): prefer those over the CLI — they keep screenshots in conversation context without a separate Read step. Install once with `claude mcp add playwright npx @playwright/mcp@latest`; tools register on the next Claude Code restart.

**Save path:** always `/tmp/design-refine/…` (or another git-ignored absolute path). Never let the screenshot tool drop PNGs into the project's `.tmp/` — those leak into commits. If you find leaked PNGs, add the path to `.gitignore` as part of the cleanup commit, don't just delete them.

Then `Read` each saved PNG to analyze it. Always take separate full-page + mobile + tablet screenshots per iteration — a layout that looks fine at 1440 can break at 375.

(Replace `localhost:3000` with the detected URL.)

## Step 3: Comprehensive Design Analysis
Use Task tool with ui-ux-design-auditor agent to analyze against the core design principles below.

### 0. Typography Personality ⭐ CRITICAL
**Target:** A distinctive display font + a refined body font + a characterful monospace — chosen with intent, not defaulted.
- **Default failure:** shipping `Inter` / `Roboto` / system-ui for everything. It reads as "unbranded SaaS template". A top designer will notice within 1 second.
- **Distinctive pairings worth considering (vary per project, never converge on the same choice):** Bricolage Grotesque + Fraunces + JetBrains Mono; Instrument Serif italic + Geist Sans; IBM Plex Serif + IBM Plex Sans; GT Sectra + GT America; Fraunces + Söhne.
- **Italic accent on one word per headline** is a high-leverage editorial move: bold sans for the full phrase, serif italic in the accent color for one emphasized noun. It replaces gradient-text as the "signature" element.
- **Variable-font settings matter:** enable `font-optical-sizing: auto` and set `opsz` / `SOFT` axis values for display vs body so large headings look like display cuts, not scaled-up body.
- **Anti-pattern:** loading 5 Google Fonts "to be safe"; using Inter for a product that has a strong editorial voice; switching typefaces mid-page without reason.

### 1. Visual Hierarchy ⭐ CRITICAL
**Target:** 5 clear levels of importance (H1 → H2 → H3 → Body → Caption)
- **Check:** Can user scan page in 5 seconds and understand structure?
- **Metrics:** Title = 2-3x body text size, H2 = 1.5-2x body, H3 = 1.25x body
- **Anti-pattern:** All text similar size, gradient text everywhere, competing focal points

### 2. Consistency ⭐ CRITICAL
**Target:** Same element = same style across entire site
- **Check:** Headers, buttons, cards, spacing uniform everywhere?
- **Metrics:** Max 3 button styles, max 5 text sizes, max 4 spacing values per section type
- **Anti-pattern:** py-12, py-16, py-20, py-24 mixed randomly; inconsistent button sizes

### 3. Typography Scale
**Target:** Systematic font size progression
- **Tailwind Scale:** text-xs (12px), text-sm (14px), text-base (16px), text-lg (18px), text-xl (20px), text-2xl (24px), text-3xl (30px), text-4xl (36px), text-5xl (48px), text-6xl (64px)
- **Recommended:**
  - Hero: text-6xl or text-5xl
  - Section H2: text-4xl or text-3xl
  - Section H3: text-2xl or text-xl
  - Body: text-base or text-lg
  - Small: text-sm
  - Caption: text-xs
- **Anti-pattern:** Random sizes like text-3xl and text-4xl for same heading level

### 4. Spacing System ⭐ CRITICAL
**Target:** 8px grid rhythm throughout
- **Tailwind Values:** 2 (8px), 4 (16px), 6 (24px), 8 (32px), 12 (48px), 16 (64px), 24 (96px), 32 (128px)
- **Section Padding:** py-12 (small), py-16 (medium), py-20 (large), py-24 (xl)
- **Element Spacing:** mb-4 (tight), mb-6 (normal), mb-8 (comfortable), mb-12 (spacious)
- **Anti-pattern:** mb-3, mb-5, mb-7, mb-9, mb-11 (breaks rhythm)

### 5. Color Harmony ⭐ CRITICAL
**Target:** Dominant neutral foundation + one sharp accent used sparingly. NOT evenly distributed color.
- **The rule users consistently reinforce:** if you pick "white + black + green", the page must read as white/black first, and green should appear on maybe 5–10% of pixels — status dots, one italic emphasis word per heading, code `$` prompt, numbered tag pills, active/hover states. Not backgrounds, not borders, not large text, not buttons.
- **Symptom that accent is overused:** reviewer says "are you giving too many X?" or "main color is white and black, why is this green?" → immediately pull the accent out of: primary buttons (switch to ink/black), section backgrounds, card hover fills, body headings.
- **Symptom that accent is underused:** the page looks identical to a generic black-on-white SaaS template; no visual signature.
- **3-color palette max** (primary neutral, paper/bg neutral, accent). More than one accent = noise, unless the brand explicitly has a second accent with a distinct semantic job.
- **WCAG AA:** Text contrast ratio ≥ 4.5:1, large text ≥ 3:1.
- **Anti-pattern:** purple gradients on white (flagged by the frontend-design skill as "AI slop"); gradient text on every heading; 6+ colors; "primary button green, secondary button blue, tertiary button purple".

### 6. Responsive Layout
**Target:** Mobile-first, test at 375px, 768px, 1024px, 1440px
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Check:** Content readable without horizontal scroll at all sizes?
- **Anti-pattern:** Fixed pixel widths, content overflow, tiny mobile text

### 7. Alignment Grid
**Target:** Elements snap to invisible columns
- **Check:** Draw vertical lines - do elements align?
- **Max-width:** max-w-7xl (1280px) for most content, max-w-5xl (1024px) for text-heavy
- **Anti-pattern:** Random max-w-* values, elements not aligned, offset content

### 8. Interactive States
**Target:** All clickable elements have hover/focus/active states
- **Hover:** Color change, scale, shadow, underline
- **Focus:** Visible outline for keyboard navigation
- **Active:** Visual feedback on click
- **Anti-pattern:** No hover state, identical hover/default states

### 9. Accessibility
**Target:** WCAG AA compliance minimum
- **Keyboard:** Tab through all interactive elements
- **ARIA:** Labels on icons, descriptions on complex widgets
- **Focus indicators:** Visible outline on all focusable elements
- **Touch targets:** Minimum 44x44px (iOS) or 48x48px (Android)
- **Anti-pattern:** 32x32px buttons, no focus outline, unlabeled icons

### 10. User Flow
**Target:** Clear primary action per screen
- **Check:** What should user do first? Is it obvious?
- **CTA hierarchy:** 1 primary (bright/large), 2-3 secondary (subtle)
- **Anti-pattern:** 5 equal CTAs, no clear next step, buried main action

### 11. White Space
**Target:** 30-50% of page should be empty space
- **Check:** Does content breathe or feel cramped?
- **Sections:** 64-96px vertical spacing between major sections
- **Content:** 16-24px between paragraphs, 32-48px after headers
- **Anti-pattern:** Wall of text, no margins, cluttered layouts

### 12. Performance
**Target:** LCP < 2.5s, CLS < 0.1, FID < 100ms
- **Images:** Next.js Image component, WebP format, lazy loading
- **Layout shift:** Reserve space for images/ads, no pop-ins
- **Fonts:** Preload critical fonts, font-display: swap
- **Anti-pattern:** Huge images, no loading states, layout jumps

### 13. Iconography — real icons, not placeholder glyphs
**Target:** Every UI affordance that needs a symbol uses a real icon library, never a unicode/emoji stand-in.
- **Use `react-icons`** (Feather for neutral, Font Awesome 6 Brands for social, Simple Icons for pkg logos). Do NOT leave `◎`, `⇄`, `{ }`, `★` etc. as text in cards — users read it as placeholder work.
- **Brand icons for social links:** `FaGithub`, `FaDiscord`, `FaYoutube`, `FaLinkedin`, `FaInstagram`, `FaTiktok` from `react-icons/fa6`; `SiPypi` from `react-icons/si`. Every social/brand entry in a directory/footer/card should have its real mark.
- **Icon tile convention:** a `9-10×9-10` rounded-lg border + bg-neutral container, icon sized 16-18px inside. On hover, border + icon flip to the accent color. This reads as considered, not decorative.
- **Anti-pattern:** using emoji characters as icons in production cards; leaving placeholder unicode symbols the team clearly meant to replace.

### 14. Scope completeness — the whole app, not just `/`
**Target:** Every route uses the same design system, same theme tokens, same typography.
- A design refresh that only updates the homepage and leaves `/manifesto`, `/careers`, `/login`, `/pricing`, `/blog` on the old theme is incomplete. Users click around and immediately see the mismatch.
- Before declaring "done", `find app -name "page.tsx"` and visit each route. Screenshot each.
- Also check **shared components** referenced from subpages (e.g. `Poetry.tsx` used by `/manifesto`) — they must use the new tokens too.

### 16. Motion & reveal orchestration
**Target:** ONE well-orchestrated page-load moment > scattered micro-interactions everywhere.
- **Page load:** stagger reveals with `animation-delay` — eyebrow → headline (3 beats) → subtitle → CTA → hero image → feature grid. Each element should land ~120–180ms after the prior. The whole sequence should complete under 1.2s.
- **Hover states should surprise, not just change color:** subtle lift + shadow on primary buttons; icon fill shift on cards; underline slide on text links. Never "0.1s color change and done".
- **Scroll-triggered reveals** are high-leverage for long pages — fade + 8–12px rise when sections enter viewport. Use IntersectionObserver or CSS `@starting-style` if available.
- **Respect `prefers-reduced-motion`** — disable non-essential animations.
- **Motion library:** prioritize CSS-only. For React use Motion (Framer) only when the effect genuinely needs it (spring physics, gesture-driven).
- **Anti-pattern:** hover scale on every card, bouncing arrows everywhere, marquee banners nobody asked for, autoplay videos.

### 17. Spatial asymmetry & grid-breaking
**Target:** Controlled asymmetry. NOT everything centered in a 1200px column.
- **Break the grid deliberately on at least one moment:** hero headline pulling past the container; a decorative element in the margin (folio number, running head, vertical rule with metadata); a sidebar offset against the main column; a pull-quote spilling into negative space.
- **Editorial conventions that work:** sticky index sidebar (§ I / II / III); running head in top margin; figure numbers in a side gutter; chapter-style horizontal rules with dates/section labels.
- **Directory / index sections — use dot-leaders and epigraphs to defeat monotony.** When a section is a long list of categorized rows (Community, Social, Resources, …), the default treatment — identical rows × 12 — reads as a spreadsheet. Two moves that validate well:
  - **Dot-leaders** between the entry title and its action label (`GitHub Repository ············· VISIT ↗`). Classic print-index convention; immediately signals "this is an index, not a feature grid". Render as a long `·····` string with `letterSpacing: '0.35em'`, `flex-1`, `whitespace-nowrap`, `overflow-hidden`, translated up ~3px to sit on the baseline.
  - **Section epigraphs** — a single italic serif line (~15–16px, moss-muted, `max-w-[52ch]`) under each `§` heading stating the section's voice in one clause ("Where the protocol lives — source, package, canonical docs."). Gives the reader a chapter intro, not just a label.
- **Anti-pattern:** every section is a centered container with identical max-width; all headings perfectly stacked with equal spacing.

### 18. Atmosphere & texture
**Target:** Solid hex-color backgrounds are the default fail. Real designs have atmosphere.
- **Techniques (pick one or two, don't stack all):**
  - Paper-warm alternating sections (`#FAFAF7` vs `#FFFFFF`) for rhythm
  - SVG grain/noise overlay (3–8% opacity, multiply blend) to fight flatness
  - Dot-grid background with radial mask fading to edges
  - Asymmetric gradient mesh in accent color at 5–15% opacity behind a hero block
  - Dotted horizontal rules (editorial) instead of solid 1px lines everywhere
  - Soft halos behind CTAs (blur-3xl accent color at 20–30% opacity)
- **Paper+ink-based palettes** beat "pure white + pure black" by a mile for readability and warmth.
- **Anti-pattern:** every section `bg-white` with no transitions; drop-shadows on every card; glassmorphism applied uniformly (looks cheap unless the whole aesthetic supports it).

### 19a. Common mid-conversion defect patterns (when refreshing an existing site)

When the skill is invoked on a site mid-way through a theme conversion (e.g. dark → light), the same broken patterns repeat across dozens of pages. Search for these first — they explain ~80% of "this page looks broken" reports:

- **Translucent dark callouts on a now-light page:** `bg-gray-900/50 border border-gray-700`, `bg-gray-950/50 border border-gray-300/40`, `bg-gray-900/5`. Read as ghosted/disabled cards. **Fix:** `bg-gray-50 border border-gray-200`. Solid `bg-gray-900` (no `/N`) wrapping content is also broken; convert it the same way. **Don't touch** `bg-gray-900/80` or `bg-gray-900` wrapping a `<pre>` / SyntaxHighlighter — those are intentional code blocks.
- **Pale font-mono headings on light cards:** `text-{green,blue,yellow,cyan,red,amber,teal}-{300,400} font-mono` for method/API names. Invisible on the new light cards. **Fix:** bump to `-700` for headings, `-600` for icons.
- **Dark wrappers around tables:** `bg-gray-900 border border-gray-700 rounded-lg overflow-hidden` containing a table whose `text-gray-700` rows became invisible against the dark wrapper. **Fix:** wrapper → `bg-white border border-gray-200`; `<thead className="bg-gray-800">` → `bg-gray-100`; `divide-y divide-gray-700` → `divide-y divide-gray-200`.
- **Stale dark page roots:** `<div className="min-h-screen bg-gray-950 text-white">` on routes the conversion missed. **Fix:** `<div className="bg-white text-gray-900">`. Grep `min-h-screen.*(bg-black|bg-slate-9|bg-gray-9|bg-zinc-9)` to find them all.
- **Inline `<code className="bg-gray-800 px-1 rounded">`** for inline code spans IS intentional dark — leave alone. Only the standalone wrapper divs are broken.
- **Dark "Next Steps" link cards** with `bg-gray-900 hover:bg-gray-800` on the bottom of articles read as out-of-place. **Fix:** `bg-white border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all`.

**Triage order:** dark page roots first (most visible), then dark wrappers around content, then text-color accents, then atmosphere polish. Each is one scope-contained iteration.

### 19. Memorable figure / signature element
**Target:** Every great landing page has ONE unforgettable element — the thing people screenshot.
- Examples: Stripe's customers-as-constellations, Vercel's gradient edge, Linear's perfect hover states, Supabase's terminal hero, Composio's compact developer proof blocks.
- For a developer product: a line-numbered, annotated code figure with margin callouts and `Fig. 01` label is high-leverage.
- For an editorial/publication site: a giant decorative serif quotation mark behind a pull quote.
- For a creative tool: a single interactive canvas / live preview that responds to cursor or scroll.
- **Ghost-italic chapter numerals on card triptychs.** Default SaaS stat trios have `01 / 02 / 03` pill badges, which read generic. Replace with oversized Fraunces/Instrument italic Roman numerals (`I / II / III`), absolute-positioned in the card's top-right corner, ~5.5rem, `color: rgba(accent, 0.08–0.10)`, `select-none`, `pointer-events-none`. They act as a quiet watermark, not a label. This lifts the trio from "SaaS grid" to "editorial triptych".
- **One numeric marker per card, not three.** If you add a ghost corner numeral, do NOT also keep the pill `01` badge AND an inline `i.` next to the icon. Pick one level. (Bad: pill + corner numeral + inline italic numeral layered on the same card. Good: corner numeral as watermark, tag as text, icon plain.)
- **Anti-pattern:** the page has no one thing that would survive in a tweet screenshot.

### 15. Metadata & positioning identity
**Target:** `<title>`, `<meta description>`, OG image, JSON-LD, and `llms.txt` all match the current product positioning.
- A design refresh that changes the hero headline from "Technology Never Neutral" to "Decentralized AI Agent Protocol" must also update `app/layout.tsx` metadata, `opengraph-image.tsx`, `llms.txt`, and every subpage's per-page metadata. Stale metadata is an invisible but glaring defect.
- **Per-page metadata:** each route should export its own `metadata` with a unique title, description, canonical URL, and OG/Twitter cards. Subpages inheriting the root metadata is a failure.
- **GEO (AI answer engines):** `public/llms.txt` (short canonical summary + Q&As) and optionally `public/llms-full.txt` (detailed context). Allow `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `CCBot` explicitly in `robots.txt`.
- **JSON-LD:** expand beyond a bare `Organization` to a `@graph` with `WebSite`, `SoftwareApplication`, `FAQPage` (6+ Q&As answering "What is X?", "How is X different from Y?", "How do I install X?"), and `JobPosting` on careers pages.
- **Quick verify:** `curl -s <url>/ | grep -E '<title>|description|og:title|canonical'` → check each page has the right tags rendered, not inherited defaults.

## Step 4: Create Prioritized Fix List
Use TodoWrite to track all issues found, categorized by severity:
- **Critical**: Accessibility failures, broken layouts, unreadable text
- **High**: Poor hierarchy, inconsistent spacing, bad contrast
- **Medium**: Missing hover states, alignment issues
- **Low**: Minor polish items

## Step 5: Iterative Refinement Loop
Repeat until all Critical and High issues are resolved.

Each iteration looks like:

0. **Check what changed since last tick.** Run `git log --since="1 hour ago" --oneline --name-only` and `git status -s`. The user (or a parallel agent) may have already fixed the thing you were planning to fix, or committed work you should rebase onto. Skip duplicate work.
1. **Pick one scope-contained change** from the todo list. Don't refactor three sections at once — the user can't critique what they can't isolate. **A scope-contained change can still touch many files** if it's the same pattern repeated (e.g. "all `bg-gray-900/50` callouts → light"); apply it everywhere in one iteration so the diff reads as one decision.
2. **Edit the component(s) — Edit tool per file, never bash sed/awk loops.** If the change involves a design token (color, spacing, font), update the token in `tailwind.config.js` / `globals.css` first, then let components inherit — do not sprinkle hardcoded values. For pattern replacements across N files: use `Grep` to list the files (NOT `bash grep -r`), then issue one Edit call per file with `replace_all: true`, **in parallel** (one tool_use block, multiple Edit blocks). Bash sed/awk loops have failed silently in this skill before — they're banned.
3. **Propagate to ALL affected pages.** If you touched a shared component (Footer, Hero, Header) or a theme token, every route consumes it. If you touched an isolated component used only on one route, just that route. List the routes you need to re-verify.
4. **Re-screenshot** every affected route via `playwright screenshot` CLI, parallel Bash calls:
   ```bash
   playwright screenshot --full-page --wait-for-timeout 1500 http://localhost:3000 /tmp/design-refine/iter<N>-home.png
   playwright screenshot --full-page --wait-for-timeout 1500 http://localhost:3000/manifesto /tmp/design-refine/iter<N>-manifesto.png
   ```
   Fire each URL as its own Bash call in the same tool_use block — they run in parallel. Then `Read` each and judge visually. Do not declare the iteration done without looking at the output.
5. **Commit.** Short imperative message describing what changed (e.g. `iter04: convert dark content panels on cli/host/llm_do/prompts/xray`). No Co-Authored-By lines (user preference). Do NOT `git add .` — stage explicit paths. Do NOT stage `.tmp/`, `.co/logs/`, `.claude/` — these should be in `.gitignore`; add them there if they aren't.
   - **Use plain `git`, not `git -C /abs/path`.** The shell cwd is already the repo root. User said verbatim "why not directly use git instead of git -C" — so `git add …`, `git commit -m "…"`, `git push origin main` with no `-C` prefix. Only reach for `-C` when genuinely operating on a *different* repo than the cwd. This is the same anti-pattern the system prompt flags as "never prepend `cd <current-directory>` to a git command".
   - **Branch strategy:** if the cumulative loop diff crosses ~10 files / many routes, work on a dedicated branch (e.g. `git checkout -b design-refine`) and commit per iteration there. Never push to `main` and never merge to `main` without explicit user ask. The user has stopped this skill before with "this is a very big change, save it to another branch" — pre-empt that by branching as soon as scope grows.
6. **Mark todo item complete, move to next.**

### Meta-rules for the loop

- **Course-correct fast when the user reacts.** If they say "too much green" / "main color is X and Y", that's a type-A correction — rebalance immediately, don't defend the current choice. Save the rule to memory so the next iteration doesn't re-drift.
- **Don't add sections speculatively.** If the homepage has a `macOS Download` / `Pricing` / `Roadmap` block that the user wants hidden, remove it from the homepage composition (don't delete the component — just stop rendering it). Shipping fewer visible sections is almost always the right call until the user asks for more.
- **Listen for scope expansion.** When the user says "refine SEO and GEO", "update all pages", "add social icons", treat it as a mandatory expansion of the refinement loop, not a side quest. Add a todo and execute in the same iteration.
- **Accent-color discipline check.** At the end of each iteration, scan the page: how many distinct uses of the accent color appear above the fold? More than ~5 and you've probably over-used it. Pull it out of buttons and borders first.
- **No `.tmp/` or browser-agent screenshots in commits.** If you see PNGs appearing in `git status`, they belong in `.gitignore` — fix the ignore file as part of the cleanup commit, don't commit the garbage.

## Step 6: Final Quality Check
Design is considered "good" when **all** of these are true:
- ✅ Distinctive typography stack (display + body + mono all intentional, no default Inter/system)
- ✅ Dominant neutral + one sharp accent used sparingly — accent shows up on ≤10% of pixels
- ✅ Clear visual hierarchy with proper emphasis
- ✅ Consistent spacing using 8px grid system
- ✅ All text meets WCAG AA contrast requirements
- ✅ Responsive at mobile, tablet, desktop breakpoints
- ✅ Professional typography with proper scale and variable-font optical sizing
- ✅ All interactive elements have clear states
- ✅ Proper alignment and grid structure
- ✅ Adequate white space and breathing room
- ✅ Clear user flow with prominent CTAs
- ✅ **All routes** under `app/` use the same design system (not just `/`)
- ✅ Real icons (`react-icons`) on every card/link — no placeholder glyphs
- ✅ **Header logo lockup is a link to `/`.** Easy to miss during visual-first refinement: the logo + wordmark often lives in a `<div>` because the design work focuses on type/spacing, not interactivity. Grep the header for `<a href="/"` around the logo — if absent, wrap the logo + wordmark in one, add `aria-label="<Brand> — back to home"`, and give the wordmark a hover accent tint. (Caught post-refresh: "now home page if we click the logo not back to home".)
- ✅ Metadata, OG image, `llms.txt`, JSON-LD match the current positioning on every page
- ✅ No `.tmp/` screenshots, `.co/logs/`, or `.claude/` state tracked in git

## Step 7: Summary Report
Provide before/after comparison showing:
- Number of issues fixed
- Design score improvement
- Key transformations made
- Any remaining optional enhancements

Keep refining until the design looks professional and polished. Remember: keep simple things simple while ensuring the design is visually appealing and functional.