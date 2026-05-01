---
name: frontend-test
description: Use browser agent to test frontend functionality and detect UI issues through automated testing and screenshot analysis
allowed-tools: Bash, Read, Glob, Grep, Task, Edit, Write, TodoWrite
argument-hint: [optional-url]
---

# Frontend Testing with Browser Agent

Automated frontend testing using browser agent to interact with the application, capture screenshots, and analyze UI issues.

## Proxy Configuration for Localhost Testing

**CRITICAL**: Before running any `co -b` commands for localhost testing, you MUST disable proxy settings. Proxies will block access to localhost.

### Disable Proxy Command
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "..."
```

### Why This is Needed
- Proxy settings block localhost connections
- Browser agent cannot reach localhost:3000 through proxy
- Must bypass proxy for local development servers

### Example Usage
```bash
# WRONG - Will fail with proxy
co -b "screenshot of localhost:3000"

# CORRECT - Disables proxy first
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "screenshot of localhost:3000" 2>&1
```

### Shortcut: Use Bash Alias (Optional)

To avoid typing the long proxy disable prefix, you can create an alias:

```bash
# Add to ~/.bashrc or ~/.zshrc
alias co-local='http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co'

# Then use it:
co-local -b "screenshot of localhost:3000" 2>&1
```

**For this skill, always use the full command** (don't assume alias exists).

## Screenshot Management

**IMPORTANT**: All screenshots MUST be saved to `/tmp/frontend-test-screenshots/` with descriptive filenames.

### Naming Convention
- Format: `{test-type}-{description}.png`
- Examples:
  - `baseline-full.png` - Initial full page screenshot
  - `flow-step1-homepage.png` - User flow step 1
  - `edge-long-text.png` - Edge case with long text
  - `bug-nav-overlap.png` - Bug found in navigation

### Screenshot Workflow
1. **Browser agent saves**: Use co -b with explicit save path
2. **Claude reads**: Use Read tool on the saved path
3. **Claude analyzes**: Examine screenshot for issues
4. **Document issues**: Add to todo list with screenshot reference

### Example Command Pattern
```bash
# Browser agent command (saves screenshot)
co -b "Take screenshot of localhost:3000 at mobile viewport and save to /tmp/frontend-test-screenshots/test-mobile.png"

# Claude reads and analyzes
Read /tmp/frontend-test-screenshots/test-mobile.png
```

## Step 1: Determine Target URL

- If provided: use $ARGUMENTS
- Otherwise: auto-detect from running dev server:
  - Next.js/React: localhost:3000
  - Vite: localhost:5173
  - Vue: localhost:8080
  - Nuxt: localhost:3000
  - Angular: localhost:4200
  - Python/Django: localhost:8000
  - Rails: localhost:3000
- Check package.json dev script for actual port configuration

## Step 2: Initial State Capture

Create screenshots directory and capture baseline screenshots:

```bash
mkdir -p /tmp/frontend-test-screenshots
```

Capture screenshots using co command with specific save paths (proxy disabled):

```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "Take a screenshot of localhost:3000 full page and save it to /tmp/frontend-test-screenshots/baseline-full.png" 2>&1

http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "Take a screenshot of localhost:3000 at mobile viewport (375px width) and save it to /tmp/frontend-test-screenshots/baseline-mobile.png" 2>&1

http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "Take a screenshot of localhost:3000 at tablet viewport (768px width) and save it to /tmp/frontend-test-screenshots/baseline-tablet.png" 2>&1
```

After screenshots are saved, use Read tool to analyze them:
```bash
Read /tmp/frontend-test-screenshots/baseline-full.png
Read /tmp/frontend-test-screenshots/baseline-mobile.png
Read /tmp/frontend-test-screenshots/baseline-tablet.png
```

(Replace localhost:3000 with detected URL)

## Step 3: Functional Testing Guide

Use browser agent to test key interactions:

### Test User Flows
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "guide to test the main user flow on localhost:3000:
1. Navigate to homepage and save screenshot to /tmp/frontend-test-screenshots/flow-step1-homepage.png
2. Click on primary CTA button and save screenshot to /tmp/frontend-test-screenshots/flow-step2-cta-clicked.png
3. Fill out any forms and save screenshot to /tmp/frontend-test-screenshots/flow-step3-form-filled.png
4. Submit and verify result, save screenshot to /tmp/frontend-test-screenshots/flow-step4-submitted.png
5. Return the list of all screenshot paths saved" 2>&1
```

After test completes, analyze all screenshots:
```bash
# Read and analyze each screenshot
Read /tmp/frontend-test-screenshots/flow-step1-homepage.png
Read /tmp/frontend-test-screenshots/flow-step2-cta-clicked.png
Read /tmp/frontend-test-screenshots/flow-step3-form-filled.png
Read /tmp/frontend-test-screenshots/flow-step4-submitted.png
```

### Test Interactive Elements
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "guide to test all interactive elements on localhost:3000:
1. Hover over all buttons and links, save screenshot to /tmp/frontend-test-screenshots/interactive-hover-states.png
2. Click all navigation items, save screenshot to /tmp/frontend-test-screenshots/interactive-nav-items.png
3. Test dropdowns and modals, save screenshot to /tmp/frontend-test-screenshots/interactive-dropdowns.png
4. Verify tooltips appear, save screenshot to /tmp/frontend-test-screenshots/interactive-tooltips.png
5. Check form validation, save screenshot to /tmp/frontend-test-screenshots/interactive-form-validation.png
6. Return list of all screenshot paths and any issues found" 2>&1
```

Then analyze all screenshots for issues:
```bash
Read /tmp/frontend-test-screenshots/interactive-hover-states.png
Read /tmp/frontend-test-screenshots/interactive-nav-items.png
Read /tmp/frontend-test-screenshots/interactive-dropdowns.png
Read /tmp/frontend-test-screenshots/interactive-tooltips.png
Read /tmp/frontend-test-screenshots/interactive-form-validation.png
```

### Test Edge Cases
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "guide to test edge cases on localhost:3000:
1. Submit empty forms and save screenshot to /tmp/frontend-test-screenshots/edge-empty-form.png
2. Enter very long text (500+ chars) in inputs and save to /tmp/frontend-test-screenshots/edge-long-text.png
3. Test with missing data/images and save to /tmp/frontend-test-screenshots/edge-missing-data.png
4. Try invalid inputs (bad email, wrong format) and save to /tmp/frontend-test-screenshots/edge-invalid-input.png
5. Trigger error states and save to /tmp/frontend-test-screenshots/edge-error-states.png
6. Return list of all screenshot paths and issues found" 2>&1
```

Analyze edge case screenshots:
```bash
Read /tmp/frontend-test-screenshots/edge-empty-form.png
Read /tmp/frontend-test-screenshots/edge-long-text.png
Read /tmp/frontend-test-screenshots/edge-missing-data.png
Read /tmp/frontend-test-screenshots/edge-invalid-input.png
Read /tmp/frontend-test-screenshots/edge-error-states.png
```

### Test Responsive Behavior
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "guide to test responsive design on localhost:3000:
1. Resize from mobile (375px) to desktop (1440px)
2. Check navigation menu behavior
3. Verify images scale properly
4. Test touch targets on mobile
5. Check horizontal scroll
6. Screenshot breakpoint transitions" 2>&1
```

### Test Loading States
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "guide to test loading states on localhost:3000:
1. Slow down network (throttle)
2. Observe loading indicators
3. Check skeleton screens
4. Verify no layout shift
5. Screenshot loading states" 2>&1
```

## Step 4: UI Issue Detection Checklist

Analyze screenshots for common UI issues:

### Layout Issues ⚠️
- [ ] Elements overlapping or cutting off
- [ ] Horizontal scroll on mobile
- [ ] Content outside viewport
- [ ] Broken grid alignment
- [ ] Inconsistent spacing between sections
- [ ] Elements not aligned properly

### Typography Issues ⚠️
- [ ] Text too small to read (< 14px on mobile)
- [ ] Line length too long (> 75 characters)
- [ ] Insufficient line height (< 1.5)
- [ ] Text overflow/truncation
- [ ] Inconsistent font sizes
- [ ] Poor contrast (not meeting WCAG AA)

### Interactive Element Issues ⚠️
- [ ] Buttons without hover states
- [ ] Missing focus indicators
- [ ] Touch targets too small (< 44x44px)
- [ ] Disabled buttons not visually distinct
- [ ] Links not underlined or colored
- [ ] Form inputs without labels

### Visual Bugs ⚠️
- [ ] Broken images (404, wrong size)
- [ ] Icon misalignment
- [ ] Color inconsistencies
- [ ] Border/shadow issues
- [ ] Z-index problems (wrong stacking)
- [ ] Animation glitches

### State Issues ⚠️
- [ ] No loading indicator
- [ ] No error message display
- [ ] No empty state content
- [ ] No success confirmation
- [ ] Forms not resetting after submit
- [ ] Stale data displayed

### Responsive Issues ⚠️
- [ ] Mobile navigation broken
- [ ] Images not responsive
- [ ] Fixed widths breaking layout
- [ ] Font sizes not scaling
- [ ] Touch targets too small on mobile
- [ ] Content hidden on small screens

## Step 5: Automated Test Commands

Use browser agent for specific test scenarios:

### Form Testing
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "test all forms on localhost:3000:
1. Find all input fields
2. Test required field validation
3. Test email/phone format validation
4. Submit with valid data
5. Submit with invalid data
6. Check error messages
7. Screenshot validation states" 2>&1
```

### Navigation Testing
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "test navigation on localhost:3000:
1. Click all menu items
2. Test mobile hamburger menu
3. Verify active link highlighting
4. Test breadcrumb navigation
5. Check back button behavior
6. Screenshot navigation states" 2>&1
```

### Accessibility Testing
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "test accessibility on localhost:3000:
1. Tab through all interactive elements
2. Verify focus indicators visible
3. Check ARIA labels on icons
4. Test keyboard shortcuts
5. Verify screen reader compatibility
6. Screenshot focus states" 2>&1
```

### Performance Testing
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "test performance on localhost:3000:
1. Measure page load time
2. Check for layout shifts
3. Verify lazy loading works
4. Test image optimization
5. Check bundle size
6. Screenshot loading timeline" 2>&1
```

## Step 6: Create Issue Tracker

Use TodoWrite to track all issues found, categorized by severity:

**Critical**: Broken functionality, crashes, data loss
- Example: Form submit fails, buttons don't work, page crashes

**High**: Major UX issues, accessibility failures
- Example: Can't navigate on mobile, poor contrast, missing labels

**Medium**: Visual bugs, inconsistent behavior
- Example: Wrong colors, misaligned elements, missing hover states

**Low**: Polish items, minor inconsistencies
- Example: Spacing variations, font size tweaks

## Step 7: Test Execution Pattern

For each area to test:

1. **Plan**: Define what to test using browser agent guide
2. **Execute**: Run `co -b "guide to test..."` command
3. **Capture**: Take screenshots of each state
4. **Analyze**: Review screenshots for issues
5. **Document**: Add issues to todo list with screenshots
6. **Verify**: After fixes, re-run tests to confirm

## Step 8: Browser Agent Testing Examples

### Example 1: Test Login Flow
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "guide to test login on localhost:3000/login:
1. Screenshot initial state and save to /tmp/frontend-test-screenshots/login-initial.png
2. Enter invalid credentials
3. Click submit and screenshot error to /tmp/frontend-test-screenshots/login-error.png
4. Enter valid credentials
5. Click submit and screenshot success to /tmp/frontend-test-screenshots/login-success.png
6. Verify redirect to dashboard" 2>&1
```

### Example 2: Test Search Feature
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "guide to test search on localhost:3000:
1. Screenshot empty search state to /tmp/frontend-test-screenshots/search-empty.png
2. Type query in search box
3. Screenshot autocomplete suggestions to /tmp/frontend-test-screenshots/search-autocomplete.png
4. Submit search
5. Screenshot results page to /tmp/frontend-test-screenshots/search-results.png
6. Test no results scenario and save to /tmp/frontend-test-screenshots/search-no-results.png" 2>&1
```

### Example 3: Test Shopping Cart
```bash
http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" all_proxy="" ALL_PROXY="" no_proxy="*" NO_PROXY="*" co -b "guide to test cart on localhost:3000:
1. Screenshot empty cart to /tmp/frontend-test-screenshots/cart-empty.png
2. Add item to cart
3. Screenshot cart with 1 item to /tmp/frontend-test-screenshots/cart-1-item.png
4. Add multiple items
5. Test quantity update and save to /tmp/frontend-test-screenshots/cart-quantity.png
6. Test remove item and save to /tmp/frontend-test-screenshots/cart-remove.png
7. Return all screenshot paths" 2>&1
```

## Step 9: Test Coverage Goals

Aim to test:
- ✅ 100% of primary user flows
- ✅ All interactive elements (buttons, forms, links)
- ✅ All states (loading, error, success, empty)
- ✅ All breakpoints (mobile, tablet, desktop)
- ✅ All edge cases (invalid input, missing data)
- ✅ Accessibility (keyboard, screen reader)
- ✅ Performance (load time, layout shift)

## Step 10: Screenshot Analysis Summary

List all screenshots captured during testing:
```bash
ls -lh /tmp/frontend-test-screenshots/
```

Analyze each screenshot and categorize issues found:
```bash
# Read each screenshot systematically
for screenshot in /tmp/frontend-test-screenshots/*.png; do
    echo "Analyzing: $screenshot"
    # Use Read tool to analyze each one
done
```

Cross-reference screenshots with issues in todo list.

## Step 11: Final Test Report

Generate comprehensive test report with:
- Total issues found (by severity)
- Screenshots of issues (reference by filename)
- Test coverage percentage
- Pass/fail status for each test
- Recommendations for fixes

Include screenshot references in report:
```markdown
### Issue: Button Not Clickable on Mobile
- **Screenshot**: `/tmp/frontend-test-screenshots/bug-mobile-button.png`
- **Severity**: HIGH
- **Description**: Submit button touch target too small
```

## Step 12: Cleanup (Optional)

After testing and fixing issues:
```bash
# Archive screenshots for documentation
cp -r /tmp/frontend-test-screenshots /path/to/project/test-reports/$(date +%Y%m%d-%H%M%S)

# Or clean up
rm -rf /tmp/frontend-test-screenshots
```

## Key Principles

1. **Test early, test often**: Run tests after every significant change
2. **Automate with browser agent**: Use co -b for consistent testing
3. **Screenshot everything**: Visual proof of issues
4. **Test like a user**: Follow real user flows
5. **Edge cases matter**: Test with extreme inputs
6. **Mobile first**: Start testing on smallest viewport
7. **Accessibility is essential**: Test keyboard and screen readers

## Common Test Scenarios

### E-commerce
- Product listing → Product detail → Add to cart → Checkout

### SaaS Dashboard
- Login → Dashboard → Create item → Edit → Delete → Logout

### Blog/Content
- Homepage → Article → Comment → Search → Filter

### Landing Page
- Hero section → Features → Pricing → CTA → Form submit

Use browser agent to automate these flows and capture issues!

## Supporting Files

- `examples/test-reports/` - Sample test execution reports
- `examples/issue-screenshots/` - Common UI issues found
