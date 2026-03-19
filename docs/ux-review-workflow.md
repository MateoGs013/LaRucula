# LaRucula — UX Review Workflow

## Purpose
This workflow lets agents and humans review the site through an actual browser instead of judging code alone.

It is built for:
- desktop, tablet, and mobile screenshots
- route-level visual review
- homepage scroll-moment review
- accessibility baseline checks
- image-based critique in Claude, Copilot Visual, or other agents

## Commands
- `npm run ux` → runs the full Playwright UX suite
- `npm run ux:home` → runs the homepage-only capture flow
- `npm run ux:routes` → captures all key routes
- `npm run ux:headed` → runs the suite with a visible browser
- `npm run a11y` → produces an accessibility baseline report via Axe
- `npm run ux:report` → opens the Playwright HTML report

## What gets generated
- screenshots are written to `tests/artifacts/<project>/`
- Playwright reports go to `playwright-report/`
- test traces and failure output go to `test-results/`
- accessibility JSON is attached to the Playwright run

The capture flow now waits for:
- fonts to finish loading
- visible and eager images to finish loading and decode
- a short visual settle time after route load and scroll changes

It also primes lazy-loaded media before full-page screenshots, then validates offscreen assets with a bounded wait so the captures reflect the page more like a real user session without blocking on below-the-fold media during initial review.

## Current breakpoints
- `desktop` → `1440x1400`
- `tablet` → `834x1194`
- `mobile` → `iPhone 13` emulation in Chromium

## Current route coverage
- `/`
- `/menu`
- `/story`
- `/visit`

## Current checks
### `tests/ux/home.spec.js`
- header screenshot
- hero screenshot
- first viewport screenshot
- mid-page screenshot
- close / end-state screenshot
- footer screenshot
- full-page screenshot
- horizontal overflow guard

### `tests/ux/routes.spec.js`
- header screenshot for each route
- first viewport screenshot for each route
- footer screenshot for each route
- full-page screenshot for each route
- horizontal overflow guard

### `tests/ux/a11y.spec.js`
- Axe scan on each main route
- JSON attachment with total violations and serious/critical count

## How agents should use it
### Before visual implementation
- inspect the current screenshots to understand the actual experience, not just the intended one

### After a meaningful design change
- run `npm run ux`
- compare the new screenshots against the previous visual direction
- note any hierarchy, rhythm, mobile, or CTA regressions

### Before sign-off
- run `npm run ux`
- run `npm run a11y`
- review the output with either the `ux-reviewer` agent or a visual critique prompt

## Suggested review criteria
Check:
- first viewport impact
- headline hierarchy
- spacing rhythm
- image hierarchy
- CTA visibility
- mobile collapse quality
- footer and header quality
- whether the page feels generic or authored
- whether motion appears to support or distract

## Suggested prompt for Claude or Copilot Visual
Use this prompt with the generated screenshots:

```text
Review these screenshots as a UX and visual design critic.

Evaluate:
- first viewport impact
- hierarchy
- readability
- CTA visibility
- spacing rhythm
- mobile behavior
- image hierarchy
- header/footer quality
- whether the page feels generic, templated, or premium

Return:
1. top 5 problems
2. strongest qualities
3. what should change first
4. whether the experience feels authored or still too safe
```

## Notes
- This workflow is a review baseline, not a guarantee of quality.
- The a11y pass currently produces a baseline report; it is meant to inform iteration and can be tightened later into a stricter gate if needed.
