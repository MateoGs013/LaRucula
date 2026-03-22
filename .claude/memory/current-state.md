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
- `docs/api-contract.md` defines the canonical public endpoint shapes for backend implementation
- a minimal local public API now exists in `server/` for the full public website contract, including `contact` and `reservations`, with local JSON persistence in `server/runtime/`
- the global site bootstrap now supports Pegasuz `site-contents` so brand/contact/navigation data can come from the admin-managed CMS without changing the current visual shell
- `VisitPage` and `ContactForm` now consume the first page-level editable copy from Pegasuz `site-contents`
- `ReservationsPage` and its booking flow components now consume CMS-managed operational copy while keeping the map/layout logic in code
- `MenuPage` and `StoryPage` now consume selective CMS-managed copy while keeping menu data, imagery, layout, and authored composition in code

## What should happen next
1. decide whether `Home` should expose any selective editable copy through `site-contents` or stay fully authored in code for now
2. replace the local JSON runtime persistence with real database-backed persistence and domain logic
3. decide how reservation holds, expirations, and admin-side availability rules should work
4. continue using `npm run ux` and `npm run a11y` during visual iteration instead of reviewing code only
5. document any additional integration or contract decisions back into `docs/decisions.md`
