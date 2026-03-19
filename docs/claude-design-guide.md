# LaRucula — Claude Design Guide

## Use this document for implementation
If you are Claude building screens for LaRucula, use this as the operational brief.

Read with:
- `docs/brand.md`
- `docs/ui-rules.md`
- `docs/motion-rules.md`
- `docs/graphics-system.md`
- `docs/awwwards-analysis.md`

## Autonomy mode
You are allowed to challenge the current scaffold.

You may:
- replace `PageShell`, `SectionShell`, `SectionHeading`, `BaseButton`, or other primitives if they are what makes the design feel safe
- refactor the token system
- replace the current layout language
- rebuild the motion architecture
- introduce new libraries or rendering techniques
- move beyond Tailwind-only styling if the result benefits

You should still understand the existing scaffold before changing it.
But you are not expected to preserve it out of habit.

If you make a large or reusable change:
- make it deliberate
- keep it defensible
- update `docs/decisions.md`

## The job
Do not make LaRucula look like:
- a restaurant template
- a hotel brochure
- a SaaS landing page with warmer colors
- a portfolio site that forgot the user

Make it feel like:
- a Mediterranean dining house
- an editorial hospitality brand
- a place with architecture, appetite, ritual, and warmth

## What good output looks like
- the page has a strong first impression in the first viewport
- at least one section is led mostly by typography
- imagery has hierarchy, not equality
- atmosphere and interiors matter as much as food
- the reservation path is visible without being blunt
- the layout changes rhythm across sections
- mobile still feels intentional, not collapsed

## What to prioritize in order
1. composition
2. typography
3. image hierarchy
4. spacing rhythm
5. motion
6. decorative detail

If composition is weak, do not try to rescue it with animation.

## Possible section directions
Good starting directions for this project:
- hero with one dominant image and one supporting detail crop
- large serif thesis plus quiet supporting copy
- atmosphere section led by interior or architecture
- food section with one hero plate and restrained supporting details
- visit or reservation close with strong invitation and concise logistics

## Section rules
- one focal point per section
- one dominant image max per section
- one compositional thesis per section
- avoid repeating the same grid structure back to back
- if a section feels generic, cut elements before adding more

## Motion rules for Claude
- GSAP is available, but it is not the only acceptable motion approach
- prefer reveal, settle, drift, and subtle parallax
- keep motion optional for comprehension
- always respect reduced motion
- avoid scroll-jacking, noisy pinning, and gimmick loaders

## Graphics rules for Claude
- use dividers, rules, or markers only when they improve hierarchy
- use handwritten accents sparingly
- seal or monogram cues should be rare
- avoid decorative waves repeated across the whole page

## Mobile rules for Claude
- preserve the main visual thesis of each section
- keep type large enough to feel premium
- do not let the page become a long stack of equal blocks
- keep CTAs accessible and visible
- simplify motion before simplifying hierarchy

## Red flags
If any of these happen, redesign the section:
- it looks like a premium template
- every section feels centered
- every image has the same shape and weight
- food imagery dominates everything
- the dark section feels pasted in
- the footer looks default
- motion is more interesting than the layout
- the current scaffold is dictating the result more than the concept is

## Final check before shipping any page
- Is there a strong sense of place?
- Is there hierarchy in the first viewport?
- Does the page feel calm and expensive without being empty?
- Would this still feel strong if motion were disabled?
- Does mobile still feel designed?
