# LaRucula — Project Agent Instructions

## Project
LaRucula is a premium beachfront restaurant website for Spain.

## Main objective
Build a front-end experience that feels:
- editorial
- Mediterranean
- artistic
- refined
- warm
- premium
- immersive but usable

## Current base stack
- Vue 3
- Vite
- Tailwind CSS
- GSAP
- Vue Router
- SVG-based motion accents

Claude is allowed to expand, replace, or remove supporting technologies if that materially improves the final result.
The project does not need to stay trapped inside Tailwind-only, GSAP-only, or current primitive boundaries if a better design system requires broader choices.

## Read first
Before making decisions, always read:
- docs/brand.md
- docs/ui-rules.md
- docs/motion-rules.md
- docs/graphics-system.md
- docs/decisions.md

When redesigning visuals, page composition, or art direction, also read:
- docs/awwwards-analysis.md
- docs/claude-design-guide.md
- docs/ux-review-workflow.md

## Visual direction
Avoid generic restaurant website patterns.

These preferences are directional, not a prison.
Claude may depart from them if the result is stronger, more contemporary, and still aligned with the core brand feeling.

Prefer:
- editorial asymmetry
- generous whitespace
- strong typographic hierarchy
- image-driven compositions
- subtle handwritten accents
- premium pacing and rhythm
- refined Mediterranean warmth

Avoid:
- repetitive card-heavy layouts
- loud animations
- corporate SaaS aesthetics
- tourist clichés
- overly decorative Mediterranean tropes
- unnecessary complexity

## Coding rules
- Use Vue 3 with `<script setup>`
- Prefer reusable systems when they help, but replace existing primitives if they are the thing limiting the design
- Use semantic HTML
- Tailwind is available, but it is not mandatory for every styling decision
- Centralize repeated values into tokens when the system benefits from it, but redesigning the token system is allowed
- GSAP is available, but richer motion/rendering approaches are allowed when they are justified
- Respect reduced-motion preferences
- Prioritize responsive clarity and performance
- Additional libraries, custom CSS strategies, scrolling systems, video systems, canvas, WebGL, shaders, or other visual technologies are allowed if they materially improve the work and remain maintainable

## Workflow rules
When implementing a feature:
1. Read relevant docs first
2. Reuse existing patterns when they help, but do not preserve weak patterns out of loyalty to the current scaffold
3. If a meaningful design or architecture decision is made, update `docs/decisions.md`
4. If a reusable workflow emerges, suggest turning it into a skill
5. Keep implementation scalable and maintainable

## UX review workflow
Before finalizing major visual work:
1. Run `npm run ux`
2. Review the screenshots in `tests/artifacts/`
3. Run `npm run a11y` for the accessibility baseline
4. Use the visual review workflow in `docs/ux-review-workflow.md`

## Output style
When working on a task:
1. Brief implementation plan
2. Code changes
3. Files changed
4. Follow-up notes if needed
