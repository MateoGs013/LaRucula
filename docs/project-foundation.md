# LaRucula — Project Foundation

## Purpose
This document describes the scaffold that now exists after the setup pass.

The goal is to let Claude implement the front-end experience without revisiting routing, base structure, token plumbing, or motion wiring.

## Structure
- `src/app/`
  - project-level config such as site metadata and navigation labels
- `src/router/`
  - route records and router setup
- `src/layouts/`
  - global application layout
- `src/components/layout/`
  - page shell, section shell, header, footer, and heading primitives
- `src/components/ui/`
  - reusable interface controls such as the base button
- `src/components/svg/`
  - SVG accent primitives for editorial motion and graphic rhythm
- `src/pages/`
  - route-level placeholders for `home`, `menu`, `story`, `visit`, and `not-found`
- `src/composables/`
  - Vue composables for reduced motion and GSAP reveal setup
- `src/motion/`
  - GSAP registration and motion presets
- `src/styles/tokens/`
  - CSS variable tokens for color, typography, spacing, and motion

## Foundation rules
- Reuse `PageShell`, `SectionShell`, and `SectionHeading` before creating new section wrappers.
- Keep GSAP timelines in `src/composables/` or `src/motion/`, not inside large page templates.
- Extend the token files before scattering new raw values through components.
- Treat `src/pages/HomePage.vue` as the main editorial landing surface.
- Keep `menu`, `story`, and `visit` as real routes, even if sections cross-link and borrow visual language.

## Motion hooks
- Route pages already animate elements marked with `data-reveal`.
- Default reveal behavior lives in `src/composables/useRevealMotion.js`.
- Reduced motion is respected via `src/composables/useReducedMotion.js`.
- Page-specific motion can layer on top of this, but should not replace the shared helpers unless the pattern becomes reusable.

## Workflow compatibility
- Update `docs/decisions.md` whenever the architecture, UI system, or motion system changes meaningfully.
- Update `.claude/memory/current-state.md` after major progress.
- Update `.claude/memory/open-issues.md` when new decisions or blockers appear.
