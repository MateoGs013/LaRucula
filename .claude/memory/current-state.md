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

## What should happen next
1. let Claude explore a genuinely modern redesign of `home` without loyalty to the current section system
2. allow refactors to primitives, tokens, motion, and supporting libraries if they improve the work
3. use `npm run ux` and `npm run a11y` during visual iteration instead of reviewing code only
4. document any winning new system back into `docs/decisions.md`
5. once a strong direction exists, extend it to `menu`, `story`, and `visit`
