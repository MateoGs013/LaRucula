# Current State

## Status
The guidance is now intentionally permissive. No single HomePage concept or current primitive set should be treated as binding for Claude.

## What exists
- project scaffold with Vue 3, Vite, Tailwind CSS, GSAP, and Vue Router
- stable baseline structure that Claude may keep or refactor
- rewritten design docs with stronger research and broader autonomy
- `docs/awwwards-analysis.md` as benchmark context, not a recipe
- `docs/claude-design-guide.md` now explicitly allows replacing weak scaffold decisions
- Playwright-based UX review automation for desktop, tablet, and mobile
- Axe baseline checks wired into the review flow
- agent-facing UX review docs and a dedicated `ux-reviewer` agent / `ux-review-loop` skill
- API-ready front-end foundation with `src/api/`, `src/services/`, and `src/adapters/`
- reactive site bootstrap through `siteService` instead of hardcoded global config
- `menu`, `blog`, `contact`, and `reservations` now read through service boundaries with mock/API switching
- `.env.example` documents the toggle between local mock mode and future API mode

## What should happen next
1. connect the real backend incrementally through the existing domain services, starting with `site`, `menu`, and `blog`
2. keep API payload normalization inside adapters so page components stay visually focused
3. turn `contact` and `reservations` from mock submission/layout data into real endpoints without changing the route-level UX
4. continue using `npm run ux` and `npm run a11y` during visual iteration instead of reviewing code only
5. document any additional integration or contract decisions back into `docs/decisions.md`
