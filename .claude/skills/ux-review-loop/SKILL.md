# Skill: UX Review Loop

## Goal
Review LaRucula through an actual browser workflow instead of relying on code inspection alone.

## Use when
- a page has been visually redesigned
- a route feels good in code but not yet validated in the browser
- mobile quality needs checking
- you want screenshots for Claude or Copilot Visual critique
- you want an accessibility baseline before sign-off

## Commands
- `npm run ux`
- `npm run ux:home`
- `npm run ux:routes`
- `npm run a11y`

## Process
1. Run the relevant UX command
2. Open `tests/artifacts/`
3. Compare desktop, tablet, and mobile outputs
4. Note:
   - first viewport impact
   - hierarchy
   - image balance
   - CTA visibility
   - mobile collapse
   - footer/header quality
5. Run `npm run a11y` if the change is user-facing
6. Feed screenshots into the visual critique loop if needed

## Output
- clear UX problems
- strongest moments
- what to fix first
- whether the page feels authored or still too safe
