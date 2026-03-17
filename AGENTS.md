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

## Stack
- Vue 3
- Vite
- Tailwind CSS
- GSAP
- Vue Router
- SVG-based motion accents

## Read first
Before making decisions, always read:
- docs/brand.md
- docs/ui-rules.md
- docs/motion-rules.md
- docs/graphics-system.md
- docs/decisions.md

## Visual direction
Avoid generic restaurant website patterns.

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
- Prefer reusable components
- Use semantic HTML
- Keep Tailwind classes readable
- Centralize repeated values into tokens
- Keep GSAP logic isolated in composables or motion helpers
- Respect reduced-motion preferences
- Prioritize responsive clarity and performance

## Workflow rules
When implementing a feature:
1. Read relevant docs first
2. Reuse existing patterns before creating new ones
3. If a meaningful design or architecture decision is made, update `docs/decisions.md`
4. If a reusable workflow emerges, suggest turning it into a skill
5. Keep implementation scalable and maintainable

## Output style
When working on a task:
1. Brief implementation plan
2. Code changes
3. Files changed
4. Follow-up notes if needed
