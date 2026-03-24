# LaRucula — Design & Architecture Decisions

## Initial decisions
- Project stack: Vue 3 + Vite + Tailwind CSS + GSAP + Vue Router
- Brand direction: editorial Mediterranean hospitality
- Front-end principle: premium, calm, image-led, asymmetrical
- Motion principle: subtle, narrative, refined
- SVG principle: handwritten accents used sparingly
- UX principle: visual sophistication without sacrificing usability

## Update rule
Whenever a meaningful architecture, UI, or motion decision is made:
1. Add a dated entry
2. State what changed
3. Explain why
4. Mention affected files or systems

## Entry template
### YYYY-MM-DD — Title
**Decision:**
...

**Why:**
...

**Affected files:**
...

### 2026-03-17 — Stable Vite and Tailwind foundation
**Decision:**
The project scaffold uses Vite `7.3.1` with Tailwind CSS `4.2.1` and the official `@tailwindcss/vite` plugin instead of moving to Vite 8.

**Why:**
The official Tailwind Vite plugin currently supports Vite 5 through 7. Keeping the foundation on a compatible version avoids a forced peer-dependency mismatch in the base setup.

**Affected files:**
`package.json`, `package-lock.json`, `vite.config.js`

### 2026-03-17 — Token bridge through CSS variables
**Decision:**  
Design tokens live in `src/styles/tokens/` as CSS variables and are bridged into Tailwind utilities through `@theme inline` in `src/styles/main.css`.

**Why:**  
This keeps the brand system easy to evolve while avoiding repeated hard-coded values across Vue templates. It also keeps layout and utility classes readable.

**Affected files:**  
`src/styles/main.css`, `src/styles/tokens/colors.css`, `src/styles/tokens/typography.css`, `src/styles/tokens/spacing.css`, `src/styles/tokens/motion.css`

### 2026-03-17 — Global layout with isolated motion helpers
**Decision:**  
The app uses a single global layout plus dedicated route pages for `home`, `menu`, `story`, and `visit`. GSAP setup is isolated to reusable composables and motion presets.

**Why:**  
Claude can build visual sections on top of a stable shell without mixing route structure, layout chrome, and motion logic into the same files.

**Affected files:**  
`src/App.vue`, `src/layouts/DefaultLayout.vue`, `src/router/routes.js`, `src/router/index.js`, `src/components/layout/PageShell.vue`, `src/composables/useRevealMotion.js`, `src/motion/gsap.js`, `src/motion/presets.js`

### 2026-03-17 — Typography: Cormorant Garamond + Inter + Caveat
**Decision:**
Replaced system font stacks with Google Fonts web fonts: **Cormorant Garamond** (display serif), **Inter** (body sans-serif), and **Caveat** (handwritten accent). Loaded via `<link>` with `display=swap` and `preconnect`.

**Why:**
System fonts (Iowan Old Style, Avenir Next, Snell Roundhand) are unavailable on most machines. The chosen pairing delivers editorial warmth (Cormorant's tall serifs), clean readability (Inter), and a genuine handwritten feel (Caveat) — all well-supported and performant via Google Fonts.

**Affected files:**
`index.html`, `src/styles/tokens/typography.css`

### 2026-03-17 — HomePage: 5-section editorial landing
**Decision:**
Replaced the scaffold placeholder with a fully composed HomePage containing five editorial sections: **Hero**, **Philosophy**, **Culinary Preview**, **Atmosphere**, and **Visit CTA**. Each section uses existing layout primitives (`PageShell`, `SectionShell`, `SectionHeading`, `BaseButton`) and avoids creating new wrapper components.

**Why:**
The home route is the primary brand surface. Five varied sections (full-viewport hero, asymmetric split, staggered items, full-bleed image overlay, split CTA) create editorial variety without overwhelming the visitor. Using existing primitives keeps the system cohesive and avoids premature abstraction.

**Affected files:**
`src/pages/HomePage.vue`

### 2026-03-17 — Hero entrance via dedicated composable
**Decision:**
Created `useHeroMotion` composable that orchestrates a GSAP timeline for the hero entrance: word-staggered headline, SVG path-draw, lede/CTA fade, and image scale drift. Separate from `useRevealMotion` which handles scroll-triggered reveals.

**Why:**
The hero entrance is a one-time on-load animation with a choreographed sequence, fundamentally different from the repeatable scroll-reveal pattern. Keeping it in its own composable preserves separation of concerns and lets the hero timeline evolve independently.

**Affected files:**
`src/composables/useHeroMotion.js` (new), `src/pages/HomePage.vue`

### 2026-03-17 — SVG path-draw animation on CoastalDivider and SignatureStroke
**Decision:**
Added scroll-triggered SVG `strokeDasharray`/`strokeDashoffset` path-draw animation to both `CoastalDivider` and `SignatureStroke`. Each component now self-animates when entering the viewport, with reduced-motion fallback (static display).

**Why:**
Path-draw is one of the core motion patterns in the graphics system. Making the SVG components self-animating means any page that uses them gets the effect automatically without page-level GSAP code.

**Affected files:**
`src/components/svg/SignatureStroke.vue`, `src/components/svg/CoastalDivider.vue`

### 2026-03-17 — Unsplash placeholder imagery
**Decision:**
Hero, philosophy, culinary, and atmosphere sections use Unsplash URLs with width/quality parameters as placeholder photography. Hero image loads eagerly with `fetchpriority="high"`, below-fold images use `loading="lazy"`.

**Why:**
Real photography isn't available yet. Unsplash provides high-quality, art-directed stand-ins that allow the layout, motion, and responsive behavior to be validated with realistic proportions and tone. Performance strategy (eager hero, lazy below-fold) prevents layout shift.

**Affected files:**
`src/pages/HomePage.vue`

Historical note:
The next two entries are archived exploration only.
They are useful as process history, but they should not be treated as the current direction for Claude.

### 2026-03-17 — HomePage redesign: editorial composition overhaul [Superseded by 2026-03-18 docs-first reset]
**Decision:**
Redesigned all five HomePage sections based on design critique findings:
1. **Hero**: Diagonal composition — headline top-left, image bottom-right with lede vertically separated (self-start). Larger type scale (clamp 3.8rem–8rem), max-w-[11ch] constraint.
2. **Philosophy**: Pure typography section, no image. Left-aligned oversized italic blockquote (clamp 2.4rem–4.8rem) on mist background.
3. **Culinary**: 8/4 masonry grid with dramatic type scale contrast and mt-28 vertical offset.
4. **Atmosphere**: Right-aligned text on desktop (breaks left-heavy pattern). Handwritten accent label. Tighter max-w-[11ch].
5. **Visit CTA**: Left-aligned split with blockquote in right column instead of centered symmetry.

Updated `useHeroMotion.js` timeline: SVG stroke draws first → image fades → headline staggers → lede → CTA.

**Why:**
Design critique scored the first pass 7.5/10. Key issues: hero diagonal was triangular not linear, Philosophy and Visit duplicated centered symmetry, culinary hierarchy was moderate, tonal arc front-loaded with warmth. Redesign addresses each.

**Tonal arc:** sand → mist → sand → dark → sand.

**Affected files:**
`src/pages/HomePage.vue`, `src/composables/useHeroMotion.js`

### 2026-03-17 — Visual richness overhaul: textures, layers, and masked reveals [Superseded by 2026-03-18 docs-first reset]
**Decision:**
Major visual depth overhaul to address "looks too simple" feedback. Changes span docs, tokens, utilities, components, and composables:

1. **Film grain overlay**: SVG feTurbulence noise at 2.8% opacity, fixed over entire page (body::after).
2. **New color tokens**: terracotta (#c47a52) and dusk (#3d3229) for accent depth.
3. **New CSS utilities**: `image-frame` (layered box-shadow + hover lift), `warm-border` (toast-tinted border).
4. **New components**: `OrnamentalWave.vue` (decorative dual-path SVG wave), `FloatingNumber.vue` (oversized ghost numerals at 6% opacity).
5. **New composable**: `useImageReveal.js` (clip-path masked image reveals with inner scale, configurable direction).
6. **Gallery Strip**: New horizontal scrolling section with CSS drift animation and editorial heading/caption.
7. **Full HomePage rewrite**: Layered hero with OrnamentalWave background + overlapping handwritten caption, philosophy split grid with masked image reveal + warm gradient wash, culinary masonry with mask reveals + floating number, atmosphere with terracotta tint overlay, visit CTA with designed contact card.
8. **Updated hero motion**: Added caption x-slide animation to timeline.

Updated docs: `graphics-system.md` (texture philosophy, layered compositions), `motion-rules.md` (masked reveals, scroll choreography), `ui-rules.md` (overlapping elements, hover states).

**Why:**
Previous design scored 7.5/10 — flat backgrounds, plain image rectangles, basic fade-up motion, monochromatic palette. After overhaul, design critic scored 8.6/10. "The simplicity problem is solved."

**Critic-driven refinements applied:**
- Gallery Strip: Added editorial heading ("The daily rhythm") + descriptive caption — was flagged as "filler content" at 7.4/10.
- Visit section: Removed OrnamentalWave above contact strip — "felt forced/arbitrary."
- Philosophy: Blockquote leading from 1.06 to 1.12 for readability.
- Culinary: Masonry offset increased from lg:mt-28 to lg:mt-32 for stronger asymmetry.
- Gallery hover scale reduced from 1.05 to 1.03 for subtlety.

**Affected files:**
`src/pages/HomePage.vue`, `src/composables/useHeroMotion.js`, `src/composables/useImageReveal.js` (new), `src/components/svg/OrnamentalWave.vue` (new), `src/components/ui/FloatingNumber.vue` (new), `src/styles/main.css`, `src/styles/tokens/colors.css`, `docs/graphics-system.md`, `docs/motion-rules.md`, `docs/ui-rules.md`

### 2026-03-18 — Docs-first redesign guidance from inspiration and Awwwards research
**Decision:**
Shifted the current effort away from implementing a new HomePage direction and into strengthening the design documentation first. The project guidance now combines the local `docs/Inspiration/` material with current Awwwards hospitality patterns and mobile-excellence constraints, then translates that research into actionable docs for Claude via `brand`, `ui-rules`, `motion-rules`, `graphics-system`, `awwwards-analysis`, and `claude-design-guide`.

**Why:**
The existing implementation direction was still too subjective and too easy to misread. A clearer docs-first system makes it easier for Claude to design with current reference quality in mind while avoiding shallow imitation, generic premium patterns, and overdesigned interaction.

**Affected files:**
`AGENTS.md`, `docs/Inspiration/README.md`, `docs/brand.md`, `docs/ui-rules.md`, `docs/motion-rules.md`, `docs/graphics-system.md`, `docs/awwwards-analysis.md` (new), `docs/claude-design-guide.md` (new), `docs/decisions.md`

### 2026-03-18 — HomePage redesign: Six Scenes editorial concept [Archived exploration, non-binding]
**Decision:**
Complete HomePage rewrite following the docs-first guide. Six editorial sections ("scenes") with distinct compositional DNA:

1. **Arrival** — 4/6/2 grid split: text on sand (4 cols), dominant 3:4 portrait image (6 cols), small detail crop (2 cols, bottom-aligned, desktop only). No overlay, no gradient.
2. **Appetite** — Typography-only thesis. No eyebrow. Max-w-3xl blockquote with sharp editorial copy ("We buy fish the morning it's caught…"). SignatureStroke accent.
3. **Place** — 8/4 asymmetric gallery pair. Dominant interior image (8 cols), bottom-aligned caption + detail crop (4 cols). Caption: "Built for golden hour."
4. **Ritual** — mist tone. Full-width cinematic dish image (5:2), text-only 3-col dish grid below a border-t. No repeated card grids.
5. **Atmosphere** — ink tone, text-first. Copy above, cinematic terrace image below (no overlay, no gradient). Subtle parallax (8%). Compositionally opposite to the hero.
6. **Invitation** — 1.3fr/0.7fr asymmetric split. Single CTA. Contact sidebar with fine vertical border.

Hero motion timeline: image scale-drift (0s), eyebrow (0.15s), headline word-stagger (0.25s), detail crop (0.3s), lede (0.55s), CTA (0.7s).

**Why:**
Three design-critic iterations drove the composition from 6.5/10 → 7.5/10:
- **6.5 → 7.5**: Replaced overlay hero with side-by-side split (eliminated pattern duplication with atmosphere section). Changed gallery from 7/5 to 8/4. Made atmosphere text-first on dark bg instead of gradient overlay.
- **7.5 → final**: Added hero image pair (dominant + detail crop) as a signature compositional moment. Sharpened gallery caption. Swapped atmosphere image from candlelit table to architectural terrace at blue hour.

Tonal arc: sand → default → default → mist → ink → sand.

**Affected files:**
`src/pages/HomePage.vue`, `src/composables/useHeroMotion.js`

### 2026-03-18 — Broad design autonomy granted to Claude
**Decision:**
The design docs now describe intent, quality bar, and research context, but they no longer lock Claude into the current primitives, token system, motion stack, visual motifs, or conservative section recipes. Claude may refactor or replace these systems and may introduce additional technologies if that produces a stronger modern result.

**Why:**
The previous documentation pass had become too protective of the existing scaffold. That made it safer, but also more likely to produce polite work instead of excellent work. The new posture keeps brand intent while removing avoidable implementation constraints.

**Affected files:**
`AGENTS.md`, `docs/brand.md`, `docs/ui-rules.md`, `docs/motion-rules.md`, `docs/graphics-system.md`, `docs/awwwards-analysis.md`, `docs/claude-design-guide.md`, `docs/decisions.md`

### 2026-03-18 — Browser-based UX review automation with Playwright
**Decision:**
Added a Playwright-based UX review workflow that captures route screenshots across desktop, tablet, and mobile, plus an Axe accessibility baseline. The workflow is documented for both humans and agents, and is now part of the expected loop before visual work is considered finished.

**Why:**
Visual design quality cannot be trusted from code inspection alone. The project needed a repeatable way to review the rendered experience, feed screenshots into Claude/Copilot Visual, and spot hierarchy, overflow, mobile, and accessibility issues earlier.

**Affected files:**
`package.json`, `package-lock.json`, `.gitignore`, `playwright.config.js`, `tests/ux/helpers.js`, `tests/ux/home.spec.js`, `tests/ux/routes.spec.js`, `tests/ux/a11y.spec.js`, `docs/ux-review-workflow.md`, `AGENTS.md`, `CLAUDE.md`, `.claude/agents/ux-reviewer.md` (new), `.claude/skills/ux-review-loop/SKILL.md` (new), `docs/decisions.md`

### 2026-03-18 — Higher-fidelity visual capture for UX review
**Decision:**
Improved the screenshot workflow so Playwright waits for fonts and visible/eager images, allows the page to visually settle after load and scroll changes, primes lazy-loaded assets before full-page capture, validates offscreen media with bounded waits, creates targeted screenshots for header, hero, and footer in addition to viewport-level captures, and standardizes all review projects on Chromium so mobile emulation works without extra browser installs.

**Why:**
Basic route screenshots were too coarse and could miss the actual perceived experience. The updated capture flow better reflects what a user sees and produces more useful material for Claude, Copilot Visual, and critique agents.

**Affected files:**
`playwright.config.js`, `tests/ux/helpers.js`, `tests/ux/home.spec.js`, `tests/ux/routes.spec.js`, `docs/ux-review-workflow.md`, `docs/decisions.md`

### 2026-03-18 — Coastal Threshold: full design system overhaul
**Decision:**
Complete redesign of the design system and HomePage under the "Coastal Threshold" concept — cinematic 3-act pacing (Arrival → Proposition → Atmosphere & Close). Key changes:

1. **Expanded color palette** (6 → 9 tokens): Added `cream #f0e8d8`, `sage #8a9a7b`, `olive #5c6b4f`, `dusk #3d3229`. Ink darkened to `#1a1410`. Sage/olive provide the green counterweight called for in brand docs.
2. **Paper grain texture**: SVG feTurbulence on `body::after` at 2.8% opacity — subtle material presence.
3. **Immersive full-bleed hero**: 100svh with full-bleed background image, bottom gradient scrim, overlaid Cormorant Garamond italic, detail crop (desktop), and parallax. Replaces all prior split/side-by-side hero layouts.
4. **Clip-path image reveals**: New `useImageReveal` composable drives scroll-triggered directional reveals (up/down/left/right) with inner scale settle. Used in atmosphere and culinary sections.
5. **6-section editorial structure**: Hero → Thesis (ghost numeral + blockquote) → Atmosphere (7/5 grid + clip reveals) → Culinary (dish list + hero image on cream) → Ritual (dark immersive 70vh) → Invitation (split CTA + contact grid).
6. **Dark footer**: `bg-dusk text-ivory` with italic closing line and SignatureStroke.
7. **Stripped PageShell**: Removed all baked-in padding — sections now own their spacing.
8. **Cleaner header**: No border, no subtitle, smaller text, reservation has hover-to-fill-ink.
9. **Updated BaseButton**: Solid uses ink bg (was toast), ghost hover fills ink, removed arrow span.
10. **SectionShell tones expanded**: Added cream, sage, dusk. Removed mist. Added `shell="none"` option.

**Why:**
The previous "Six Scenes" concept scored 8.0/10 from the design critic but was reverted for a fresh attempt with broader creative freedom. This overhaul addresses the five key limitations identified in the codebase audit: flat color system, conservative typography, uniform layout rhythm, basic motion (fade-only), and no material texture. The result is a richer, more cinematic, and more authored visual direction.

**Affected files:**
`src/pages/HomePage.vue`, `src/composables/useHeroMotion.js`, `src/composables/useImageReveal.js` (new), `src/styles/main.css`, `src/styles/tokens/colors.css`, `src/styles/tokens/spacing.css`, `src/components/layout/SiteHeader.vue`, `src/components/layout/SiteFooter.vue`, `src/components/layout/PageShell.vue`, `src/components/layout/SectionShell.vue`, `src/components/ui/BaseButton.vue`, `src/layouts/DefaultLayout.vue`

### 2026-03-19 — Full redesign: simplification as luxury

**Decision:**
Complete redesign of HomePage, SiteHeader, and SiteFooter. Reduced from 8 sections + 9 composables to 5 sections + 3 composables. Removed ghost typography system, scroll-locking, 3D threshold interaction, ritual depth planes, surface grain injection, magnetic hover, and parallax.

New architecture:
1. **Hero**: Cinematic full-viewport, bottom-aligned editorial type, word-stagger entrance. No rotated band, no ghost words.
2. **Philosophy**: Pure centered typography. No scroll-locking. Natural scroll, generous vertical padding.
3. **The Table**: Asymmetric two-image editorial (1.4fr/1fr grid) with primary atmosphere image and secondary craft detail. Replaces 3 prior sections (Atmosphere + Craft + Breath).
4. **Evening**: Dark atmospheric immersion, right-aligned text over background image. Simplified from 6 depth planes + simulated sunset to clean overlay.
5. **Invitation**: Atmospheric image close with floating CTA, then quiet contact line. Removed 3D threshold section entirely.

**SiteHeader**: Scroll-responsive transparency — transparent with white text when over the hero (home page only), transitions to opaque ivory with dark text on scroll. Added mobile hamburger menu with animated lines and slide-down drawer. Route-aware: only transparent on `/`.

**SiteFooter**: Editorial closing scene with generous padding (py-20→py-36), dominant serif closing statement at clamp(2.4rem→4.8rem), two-column layout instead of three, more whitespace.

**useHeroMotion**: Simplified timeline — removed ghost word targeting, tightened durations and offsets.

### 2026-03-23 — Public deploy scope is shell-first, menu-fallback
**Decision:**
The public site is now treated as deploy-ready against Pegasuz with this split:
- global shell content comes from Pegasuz `site-contents`
- menu content still falls back to local data until Pegasuz exposes its menu endpoints
- the deploy docs and API contract now reflect the simplified live app (`/`, `/menu`, `/menu/:slug`, `404`) instead of legacy routes

**Why:**
The project already has the correct tenant wiring and admin entry point, but the live Pegasuz API still does not expose the menu or locales domain. Documenting that split explicitly prevents false assumptions during deploy and makes the remaining SaaS work precise.

**Affected files:**
`docs/api-contract.md`, `docs/ux-review-workflow.md`, `docs/deploy-pegasuz.md`, `docs/decisions.md`

### 2026-03-23 — Menu and shell harmonized around a shared editorial rhythm
**Decision:**
Refined the active public routes so `Home`, `Menu`, and QR/category pages feel like one system instead of two parallel aesthetics. The hero eyebrow was tightened into a more intentional hospitality label, `Menu` now uses a context-column plus items-column rhythm on desktop, and category/QR pages were compacted so they feel more aligned with the editorial shell while staying practical for table use.

**Why:**
The previous state was visually correct but inconsistent: `Home` felt cinematic and authored, while `Menu` and QR felt flatter, wider, and too sparse. The goal of this pass was not to redesign again, but to harmonize density, hierarchy, and spacing so the product-centered routes still feel premium and composed.

**Affected files:**
`src/pages/HomePage.vue`, `src/pages/MenuPage.vue`, `src/pages/MenuCategoryPage.vue`, `src/components/menu/MenuItem.vue`, `src/components/menu/MenuCategoryNav.vue`, `docs/decisions.md`

**Composables no longer imported by HomePage**: useThesisLock, useThresholdInteraction, useRitualDepth, useGhostWords, useSurfaceGrain, useMagneticHover. Files retained but unused.

**Why:**
The prior design was the product of 9 incremental critic iterations optimizing a score (6.5→9.28/10). While technically rich, it accumulated complexity without a unified concept — ghost words, scroll-locking, 3D interactions, grain injection, and 6 depth planes were individually impressive but collectively created fatigue and fragility. The motion rules explicitly warn against pinning multiple sections and giving every section a special effect.

The redesign treats simplification as the luxury signal: 5 sections each with one clear purpose, natural scroll flow, restrained motion (entrance + scroll reveals + image clip-paths), and generous negative space. Composition, typography, and image hierarchy do the work — not decoration or technique.

**Affected files:**
`src/pages/HomePage.vue`, `src/components/layout/SiteHeader.vue`, `src/components/layout/SiteFooter.vue`, `src/composables/useHeroMotion.js`

### 2026-03-19 — Critic-driven refinements: compositional boldness

**Decision:**
Applied 3 rounds of design critic feedback. Key improvements:

**Hero typographic stack**: Replaced flat word stagger with 3-line scale contrast — "Where the" / "coast" (10vw) / "sets the table" (3.2vw). The 3x scale ratio creates a dominant focal point.

**Philosophy left-aligned**: Moved from centered to left-aligned blockquote. More editorial confidence, breaks symmetry with the rest of the page.

**Image composition**: Primary image in The Table section rotated -2.5deg with left bleed (`lg:-ml-6`) and heavier shadow (48px/120px). Secondary image bleeds right (`lg:-mr-4`). Deeper vertical offset between primary and secondary (32 units).

**Section rhythm**: Philosophy→Table gap collapsed with `-mt-12 lg:-mt-16` (cream section encroaches on blockquote). Deliberate spatial pause before Evening section (`mt-12 lg:mt-20`). Invitation section expanded to full viewport height (`h-[70vh] lg:h-svh`).

**Evening atmosphere**: Image opacity raised (45→55%), radial vignette added, heading scaled up to 6.5vw.

**Invitation CTA**: Positioned bottom-left (in shell-wide, not centered) for asymmetry.

**Footer overscaled**: Closing statement pushed to clamp(3rem,7.5vw,7.5rem). SignatureStroke removed (kept only in Philosophy section).

**Motion refinements**: Hero image scale 1.06→1.12, line stagger (0.14s), CTA uses back.out(1.4) easing. Header scroll threshold now viewport-relative (15vh).

**Reverted from iteration 3**: Square secondary crop (reverted to 3:4), Caveat "Evening" label (reverted to eyebrow), violent -mt-28 crash (eased to -mt-16).

**Why:**
Design critic scored initial redesign 5.5/10 ("well-executed premium template, not a site with authorship"). Each round addressed specific weaknesses while learning: composition > decoration, crop ratios signal editorial intent, and negative margin crashes need authorship not force.

**Affected files:**
`src/pages/HomePage.vue`, `src/components/layout/SiteFooter.vue`, `src/composables/useHeroMotion.js`, `src/components/layout/SiteHeader.vue`

### 2026-03-19 — Deep critic iteration: compositional authorship (rounds 4-10)

**Decision:**
7 additional critic rounds (score 6.9 → 8.0/10) focused on compositional diversity and editorial authorship. This phase moved beyond incremental margin/size adjustments to structural redesigns of every section.

**Key architectural changes:**

**Table section → full-bleed editorial spread**: Primary image ditched the contained grid and rotation. Now goes full viewport width with a panoramic crop (`aspect-[3/2] lg:aspect-[21/9]`). Heading integrated into the panoramic as a bottom overlay with text-shadow and scrim gradient. Detail crop (3:4, w-48/w-56) overlaps the panoramic edge using `lg:-mt-24 relative z-10`. Menu tease uses display serif italic (`font-display text-[1.05rem] italic text-ink/50`).

**Philosophy section → flow-based asymmetry**: Dropped the 12-column grid. Quote overscaled to `clamp(3.5rem,8vw,7.5rem)` with `max-w-[14ch]`. Supporting content uses `lg:ml-[40%]` for dramatic lateral offset instead of grid columns.

**Evening section → asymmetric split**: Changed from full-bleed overlay to `grid lg:grid-cols-[5fr_7fr]` horizontal split. Hard-edged image (no gradients, no opacity reduction) in the larger 7fr column. Text panel uses `flex-col justify-between` with asymmetric padding (`pb-10 pt-20 lg:pb-12 lg:pt-32`) — eyebrow floats at top, content pinned to bottom. Min-height `50vh/70vh`.

**Invitation section → typographic close**: Removed full-viewport image pattern entirely. Now a pure typography section: serif text + CTA on ivory. Maximum compositional contrast after the cinematic Evening.

**Hero refinements**: "Coast" as 10vw anchor word. Surrounding lines at `clamp(1.4rem,3.5vw,2.8rem)` — 3.6x ratio on mobile. Scroll-linked parallax (`y: 15%`, scrub) added to useHeroMotion.

**Footer**: Reduced type scale from 7.5rem to 5rem — quiet close, not competing with page headline moments.

**Transition removed**: The gradient divider between Table and Evening was eliminated. The abrupt ivory→dusk shift treated as intentional "evening arrives" moment.

**Spatial vocabulary achieved (5 distinct logics):**
1. Hero: full-viewport cinematic + parallax (image-dominant)
2. Philosophy: flow-based asymmetry with overscaled typography (text-dominant)
3. Table: full-bleed panoramic + overlapping detail crop (editorial spread)
4. Evening: asymmetric split, bottom-pinned text + hard-edged image (architectural)
5. Invitation: pure typographic close on ivory (editorial whisper)

**Why:**
The design critic's core message at 6.9/10 was "limited to two spatial ideas repeated across five sections." Each iteration addressed this by introducing genuinely different section-level composition rather than adjusting margins and type sizes. The critic scores confirmed: each structural change (full-bleed panoramic, horizontal split, typographic-only close) moved the score more than any amount of size/spacing tuning.

**Affected files:**
`src/pages/HomePage.vue`, `src/components/layout/SiteFooter.vue`, `src/composables/useHeroMotion.js`

### 2026-03-18 — "The Threshold" — full immersive one-page redesign

**Decision:**
Complete architectural rethinking of the homepage as a single immersive narrative experience with five scroll-driven scenes and a theatrical intro overlay.

**Key changes:**

**1. Intro overlay (`IntroOverlay.vue`)**
Dark curtain opens the homepage. "LaRucula" materializes → horizontal line extends → tagline appears → curtain lifts. Skippable via click/scroll/keypress. `sessionStorage` for once-per-session. `navigator.webdriver` auto-skips in tests. Reduced-motion: instant skip.

**2. Scroll choreography (`useScrollScenes.js`)**
New composable: `[data-reveal-line]` line-by-line scroll reveal, `[data-parallax="slow|fast"]` depth effects, `[data-scroll-indicator]` fade-on-scroll.

**3. Five-scene homepage narrative:**
- Scene 1 (Hero): Full-viewport cinematic, deferred until intro completes via `inject('introComplete')`.
- Scene 2 (Philosophy): Line-by-line editorial reveal spans.
- Scene 3 (The Space): 8/4 grid, parallax images, overlapping detail crop.
- Scene 4 (Evening): bg-dusk, asymmetric 5fr/7fr split.
- Scene 5 (Closing Scene): Integrated `<footer>` with invitation, contact, nav, copyright — replaces SiteFooter on homepage.

**4. Header + intro integration**
SiteHeader uses `inject('introComplete')`, delays visibility 150ms after intro. Z-index z-40 (below intro at z-50).

**5. Conditional global footer**
`SiteFooter` renders only on non-homepage routes.

**6. Hero motion delayed start**
`useHeroMotion` accepts `readyRef`, watches for intro completion before playing.

**Why:**
User requested Awwwards-level immersive editorial experience. The intro creates a threshold moment. Scroll choreography makes the page feel authored. Integrated footer eliminates jarring content-to-footer transition.

**Affected files:**
`src/components/intro/IntroOverlay.vue` (new), `src/composables/useScrollScenes.js` (new), `src/pages/HomePage.vue` (rewritten), `src/App.vue`, `src/layouts/DefaultLayout.vue`, `src/composables/useHeroMotion.js`, `src/components/layout/SiteHeader.vue`, `src/styles/main.css`, `tests/ux/home.spec.js`

### 2026-03-18 — Design critique iterations (7.2 → 8.1 → 9.2)

**Decision:**
Three rounds of design critique drove the homepage from "well-executed but safe" (7.2) to "genuinely authored" (9.2).

**Round 1 (7.2 → 8.1):**
- Hero: removed double gradient, single hard scrim + text-shadow
- Philosophy: overscaled "fish" to 15vw (3x scale jump)
- The Space: replaced grid split with full-bleed 21:9 panoramic + overlapping z-index detail crop with ring frame and opposite-direction parallax
- Evening: ScrollTrigger pin on text panel (120vh image scrolls past)
- Connecting motifs: animated horizontal line dividers between scenes echoing intro
- Parallax: per-element numeric speeds (120px, -80px, 70px) replacing binary slow/fast

**Round 2 (8.1 → 9.2):**
- Hero: complete rethink — flush-left asymmetry, tiny "MEDITERRANEAN" label → giant "coast" at `clamp(5rem,14vw,13rem)` → tight lede column. No centering. Right edge breathes.
- Evening: ghost "8pm" watermark numeral at `clamp(5rem,12vw,9rem)` with 15% opacity, second SignatureStroke accent
- Philosophy: broken symmetry — "We buy" flush-left, "fish" indented, "the morning / it's caught" flush-right. Edge-to-edge asymmetric rhythm.

**Why:**
Each critique identified the most generic pattern remaining. The progression: generic gradients → standard spatial layouts → centered hero text → symmetrical philosophy. Each fix targeted the specific weakness that limited perceived authorship.

**Affected files:**
`src/pages/HomePage.vue`, `src/composables/useScrollScenes.js`, `tests/ux/home.spec.js`

### 2026-03-20 — StoryPage: full editorial redesign (8.7/10)

**Decision:**
Complete rewrite of StoryPage from placeholder (3 generic "story beat" cards) to a 6-section editorial narrative page. 7 design critic iterations drove the score from 7.5 to 8.7.

**Final structure:**
1. **Hero** — bg-ink, architecture image opacity-45, 75vh. Ghost "origen" at 28vw bleeding off-screen. Flush-left "Built where / the land ends" at 9vw.
2. **Place** — Overscaled reversed-alignment typography ("A kitchen" small left, "facing" 13vw indented, "the sea" 13vw right-aligned). Below: flush 5fr/4fr split (coastal image left, text right). Clean architectural division.
3. **Kitchen** — bg-dusk dark. Reversed 4fr/5fr grid: text LEFT (order-1), chef portrait RIGHT (order-2). Breaks the Place grid pattern.
4. **Ritual** — Ghost "ritual" 15vw. 3-column 7am/1pm/9pm editorial temporal sequence with overscaled faded numerals. Unequal image pair (3/5 landscape + 2/5 portrait).
5. **Materials** — Full-bleed edge-to-edge architecture image (16:9 / 2.2:1). Floating cream text panel absolutely positioned bottom-right over image edge (lg:w-[33%]) with shadow + backdrop-blur. The panel breaks the grid by hovering over the image. Signature spatial move.
6. **Closing** — bg-cream. Image-anchored farewell: scaled coastal detail (3:4, ring-2, w-36→w-56) left, poetic text + CTA right.

**Key critic-driven decisions:**
- Materials went through 7 iterations: 2fr/3fr grid → full-bleed panoramic + overlapping crop → vertical diptych → dominant/subordinate overlapping crop → single centered image + caption → 7:3 asymmetric bleed → full-bleed with floating panel. The critic rejected any pattern that echoed HomePage's overlapping ring/shadow crop.
- Kitchen grid was reversed (text-left/image-right) to break sequential grid monotony with Place section.
- Closing image anchor was scaled from w-28 to w-56 to feel deliberate rather than decorative.

**Why:**
The Story page needed its own compositional identity distinct from HomePage (overlapping crops, scroll-pinning) and MenuPage (Roman numeral chapters, asymmetric Dulce). The page's signatures are: overscaled reversed-alignment typography, grid reversal rhythm, and the floating panel over full-bleed image.

**Affected files:**
`src/pages/StoryPage.vue`

### 2026-03-20 — VisitPage redesign: editorial visit & reservation experience

**Decision:**
Complete redesign of VisitPage from a generic placeholder (SectionHeading + contact card + 3-note grid) into a 6-section editorial experience. Five design critic iterations drove the score from 6.5 to 8.9/10.

**Sections:**
1. **Hero** — bg-ink, 85vh. "venir" at 20vw/12% opacity as the hero's visual identity (NOT a hidden ghost — visible, dominant). Invitation text overlaps below via negative margins. Bottom-right address detail. Unique among all page heroes: bottom-weighted typographic arrival vs flush-left pattern used elsewhere.
2. **Reservation** — bg-cream. Overscaled "Reserve" ghost bleeding from left edge at 18vw. Asymmetric 5fr/3fr grid: flush-left invitation + CTAs left, editorial hours strip with border-left accent right.
3. **Journey** — 3fr/5fr asymmetric grid (reversed from Reservation). Overscaled address number "18" at 8vw paired with address text. NO ghost word — intentionally breaks the ghost-word-per-section pattern. Coastal image right.
4. **The Space (Diptych)** — Page's signature move. 7fr/3fr scale contrast: tall portrait (3:4) left, square image right with 25vh vertical offset and -12% horizontal overlap. Shape contrast + massive offset creates genuine compositional tension. Flush-left caption. Unique across entire site.
5. **Contact** — Centered dark field (55-60vh). Candlelit image as atmospheric background at 8% opacity. Overscaled tappable phone number at 5.5vw as focal moment. Email/address as supporting text. Unique centered-intimate pattern not used anywhere else.
6. **Closing** — Asymmetric farewell. Overscaled italic "See you at the coast." flush-left with CTA + SignatureStroke at right edge.

**Key critic-driven decisions:**
- Ghost word "mesa" was changed to "venir" to avoid duplicating MenuPage's ghost.
- Original "The Space" section used a floating panel over full-bleed image — identical to StoryPage's Materials signature. Replaced with bold diptych.
- Centered hero (iteration 2) was too safe → replaced with bottom-weighted "venir"-as-identity approach (iteration 4).
- Ghost "llegar" was removed from Journey (iteration 4) to break the predictable ghost-word-per-section pattern.
- Contact was originally a 4fr/5fr image-text grid (scored 7.5) → replaced with centered dark field with overscaled phone (iteration 5, scored 9).
- Diptych evolved from 5fr/4fr with 3rem offset (scored 7.5) → 7fr/3fr with 25vh offset and -12% overlap (scored 9.5).

**Cross-page ghost word inventory (no duplicates):**
- HomePage: "coast"
- MenuPage: "mesa"
- StoryPage: "origen" + "ritual"
- VisitPage: "venir" (hero identity) + "Reserve" (traditional ghost)

**Grid ratio inventory across VisitPage (all different):**
5fr/3fr → 3fr/5fr → 7fr/3fr → centered → asymmetric flex

**Why:**
The Visit page needed its own compositional identity distinct from HomePage (panoramic overlapping crops), MenuPage (Roman numeral chapters), and StoryPage (floating panels, reversed typography). The page's signatures are: "venir" as visible hero identity, the bold diptych with extreme offset/overlap, and the centered-intimate Contact field.

**Affected files:**
`src/pages/VisitPage.vue`

### 2026-03-20 — Architecture reorganization: reservation system, blog, contact, SEO

**Decision:**
Major architecture expansion to align the site with client budget requirements. Added three new routes, five new component families, two new composables, two mock data modules, and updated all existing pages for integration.

**New route structure (8 routes):**
- `/` — Home
- `/menu` — Menu
- `/story` — Story
- `/visit` — Practical info + contact form + social links
- `/reservations` — Dedicated table selection with interactive floor map
- `/blog` — Blog index (featured + grid)
- `/blog/:slug` — Blog detail
- `/:pathMatch(.*)*` — 404

**Reservation system:**
Cinema-seat-selection metaphor. SVG-based floor plan with percentage-positioned tables. 4-step flow: Date & Time → Table Selection → Guest Details → Confirmation. Data-driven architecture: `mock-tables.js` defines zones (terrace/interior/private), table shapes (round/square/rect), states (available/reserved/selected), and time slots. `useReservation` composable manages the full flow state. API boundary: `submitReservation()` returns a Promise — swap `setTimeout` for real `fetch` when backend arrives.

**Blog architecture:**
`mock-blog-posts.js` provides 4 posts with structured body content (paragraph/blockquote blocks). Blog index: featured post (large editorial) + responsive grid. Blog detail: dynamic route with hero, article body, related posts. SEO: dynamic meta tags via router afterEach.

**Contact & social integration:**
- `ContactForm.vue`: editorial-styled form with mock submission (API-ready boundary)
- `WhatsAppButton.vue`: fixed bottom-right floating CTA with delayed entrance
- `SocialLinks.vue`: configurable light/dark tone social links
- `app-config.js`: centralized WhatsApp number, social link URLs

**SEO improvements:**
- `index.html`: Open Graph + Twitter Card meta tags
- `router/index.js`: dynamic OG meta per route (title, description, type, image, URL)
- Blog posts get dynamic titles and descriptions from content

**Navigation updates:**
- Primary nav: Menu, Story, Blog, Visit (removed Home)
- Header CTA: "Reserve" → `/reservations`
- All existing page CTAs updated from `/visit#reservation` to `/reservations`
- Footer: added SocialLinks + explicit Reservations link

**VisitPage evolution:**
Contact section redesigned from centered phone-only to two-column editorial layout: direct contact info + social links on left, full ContactForm on right. Reservation section updated with CTAs pointing to the dedicated `/reservations` page + WhatsApp link.

**NotFoundPage redesign:**
Replaced generic PageShell/SectionShell wrapper with full-viewport editorial 404: overscaled "404" numeral, "Lost at sea" messaging, coastal background image, SignatureStroke accent. Consistent with the site's dark-hero visual language.

**API-ready boundaries (ready for backend):**
- `useReservation.submitReservation()` → replace mock with POST `/api/reservations`
- `ContactForm.handleSubmit()` → replace mock with POST `/api/contact`
- `mock-tables.js` → replace with GET `/api/tables?date=...&time=...`
- `mock-blog-posts.js` → replace with CMS API

**Why:**
The original site had 4 routes and no conversion infrastructure. Client budget requires facilitating reservations, contact, and content marketing. The architecture adds these capabilities while preserving the editorial visual language and keeping clear boundaries between mock data and future API integration.

**Affected files:**
`index.html`, `src/app/app-config.js`, `src/router/routes.js`, `src/router/index.js`, `src/App.vue`, `src/data/mock-tables.js` (new), `src/data/mock-blog-posts.js` (new), `src/composables/useReservation.js` (new), `src/composables/useSeoMeta.js` (new), `src/components/reservation/TableNode.vue` (new), `src/components/reservation/FloorMap.vue` (new), `src/components/reservation/BookingForm.vue` (new), `src/components/reservation/GuestForm.vue` (new), `src/components/reservation/BookingSummary.vue` (new), `src/pages/ReservationsPage.vue` (new), `src/pages/BlogPage.vue` (new), `src/pages/BlogPostPage.vue` (new), `src/components/ui/WhatsAppButton.vue` (new), `src/components/ui/SocialLinks.vue` (new), `src/components/contact/ContactForm.vue` (new), `src/pages/VisitPage.vue`, `src/pages/HomePage.vue`, `src/pages/MenuPage.vue`, `src/pages/StoryPage.vue`, `src/pages/NotFoundPage.vue`, `src/components/layout/SiteFooter.vue`

### 2026-03-22 — API-ready front-end boundaries with mock/API switching

**Decision:**
Introduced a small API integration layer built around a central `fetch` client, per-domain services, and adapters that normalize payloads before they reach the UI. The application now bootstraps global site configuration through `siteService`, and the `menu`, `blog`, `contact`, and `reservations` flows consume service-layer data instead of importing mocks directly from the pages. Added `.env.example` so the front can run in `mock` mode today and switch to `api` mode later without rewriting route components.

**Why:**
The site already has a strong visual layer, and the next backend phase should not force design-heavy pages to absorb transport logic or raw payload shapes. This boundary keeps API concerns out of the view layer, preserves the current editorial UI, and makes it possible to migrate domain by domain: `site`, `menu`, `blog`, `contact`, then `reservations`. Reservations remain contract-first: the UI already distinguishes room layout, availability, and booking submission so the real API can replace the placeholders incrementally.

**Affected files:**
`.env.example`, `src/api/config.js`, `src/api/client.js`, `src/api/errors.js`, `src/adapters/siteAdapter.js`, `src/adapters/menuAdapter.js`, `src/adapters/blogAdapter.js`, `src/adapters/reservationAdapter.js`, `src/services/siteService.js`, `src/services/menuService.js`, `src/services/blogService.js`, `src/services/contactService.js`, `src/services/reservationService.js`, `src/data/mock-site.js`, `src/data/mock-menu.js`, `src/app/app-config.js`, `src/main.js`, `src/router/index.js`, `src/components/contact/ContactForm.vue`, `src/composables/useAsyncData.js`, `src/composables/useReservation.js`, `src/components/reservation/FloorMap.vue`, `src/pages/MenuPage.vue`, `src/pages/BlogPage.vue`, `src/pages/BlogPostPage.vue`, `src/pages/ReservationsPage.vue`

### 2026-03-22 — Canonical public API contract documented before backend build

**Decision:**
Added `docs/api-contract.md` as the canonical public API reference for the website. The document fixes the preferred endpoint list, request/response shapes, reservation geometry rules, error format, and rollout order so backend work can implement against the front-end boundaries already in place.

**Why:**
The integration layer is now ready, but without a written contract the backend would still be free to improvise payload shapes and push complexity back into the UI. Writing the contract now keeps the next phase focused: `site`, `menu`, and `blog` can be wired first, while `contact` and `reservations` remain contract-first without changing the current editorial interface.

**Affected files:**
`docs/api-contract.md`, `docs/decisions.md`

### 2026-03-22 — Minimal public API implemented for the public website contract

**Decision:**
Added a lightweight Node `http` server under `server/` plus `npm run api:dev` and `npm run api:start`. The local API now serves the full public website contract: `GET /api/site`, `GET /api/menu`, `GET /api/blog/posts`, `GET /api/blog/posts/:slug`, `POST /api/contact`, `GET /api/reservations/layout`, `GET /api/reservations/availability`, and `POST /api/reservations`. Contact and reservation submissions are validated and persisted to local JSON runtime files so the front can already run in true `api` mode end to end.

**Why:**
The front-end service layer was ready, but there was still no real backend target to validate against. Implementing the public endpoints now gives the project a concrete integration surface without introducing database, auth, or admin complexity before it is needed. Local JSON persistence is enough to verify restart behavior and booking collisions now, while keeping the next backend phase focused on real database persistence and reservation rules instead of inventing shapes or reworking route-level UI.

**Affected files:**
`package.json`, `server/content.js`, `server/createServer.js`, `server/index.js`, `server/storage.js`, `docs/api-contract.md`, `docs/decisions.md`, `.gitignore`

### 2026-03-22 — Site bootstrap now supports Pegasuz CMS content

**Decision:**
The global site bootstrap can now consume Pegasuz's tenant-aware `GET /api/site-contents` endpoint in addition to the local generic `GET /api/site`. The central API client now supports `x-client` and a provider switch, while `siteService` adapts Pegasuz CMS keys into the current LaRucula site-config shape for brand name, reservation CTA label, navigation labels, contact details, and social links.

**Why:**
The immediate integration priority is editable site content from the admin panel, not finishing every public write flow. Pegasuz already exposes site CMS data through `site-contents`, so LaRucula should connect to that real content source first instead of inventing another global config contract. This keeps the current visual system intact while making header, footer, contact, and global brand metadata manageable from the existing admin.

**Affected files:**
`package.json`, `package-lock.json`, `src/api/config.js`, `src/api/client.js`, `src/services/siteContentService.js`, `src/services/siteService.js`, `src/adapters/siteAdapter.js`, `src/app/app-config.js`, `server/content.js`, `server/createServer.js`, `.env.example`, `docs/api-contract.md`, `docs/decisions.md`

### 2026-03-22 — Visit page and contact form now consume admin-managed site content

**Decision:**
The first page-level CMS integration is intentionally narrow: `VisitPage` and `ContactForm` now read operational copy from `siteContentMap`, using Pegasuz `site-contents` keys for hero text, contact messaging, follow-up copy, form labels, placeholders, submit states, and success message. The underlying layout and motion stay unchanged.

**Why:**
This is the highest-value extension of the admin-managed content layer without forcing the whole editorial site into a generic CMS schema too early. It lets the panel own contact-facing copy immediately while preserving the authored composition of the page.

**Affected files:**
`src/composables/useSiteContent.js`, `src/pages/VisitPage.vue`, `src/components/contact/ContactForm.vue`, `server/content.js`, `docs/decisions.md`

### 2026-03-22 — Reservations flow now consumes CMS-managed operational copy

**Decision:**
Extended the same `site-contents` layer to the reservations experience, but only for operational microcopy: hero text, step labels, form labels/placeholders, helper text, loading states, summary labels, confirmation copy, and direct-contact fallback copy. The floor-map UI, booking logic, and page composition remain outside the CMS.

**Why:**
Reservations need editable operational text, but turning the table map or the full page composition into CMS-managed structure this early would weaken the authored UX. This split keeps the admin useful while preserving the current front-end architecture and interaction design.

**Affected files:**
`src/components/reservation/BookingForm.vue`, `src/components/reservation/GuestForm.vue`, `src/components/reservation/BookingSummary.vue`, `src/pages/ReservationsPage.vue`, `server/content.js`, `docs/decisions.md`

### 2026-03-22 — Menu and Story now expose selective CMS-managed copy only

**Decision:**
Extended Pegasuz `site-contents` into `MenuPage` and `StoryPage`, but only for selective page copy: section labels, helper lines, fallback copy, CTA labels, and editorial text blocks that can be safely edited without changing the authored composition. Menu data, imagery, motion, and layout structure remain outside the CMS.

**Why:**
The admin panel should be able to adjust meaningful copy on high-traffic pages, but turning the full menu structure or the entire story composition into CMS-managed schema right now would flatten the visual direction and overfit the panel to design-heavy decisions. This keeps the current aesthetic intact while widening the surface of useful editable content.

**Affected files:**
`src/pages/MenuPage.vue`, `src/pages/StoryPage.vue`, `server/content.js`, `docs/decisions.md`

### 2026-03-22 — Contact and reservations now persist through local SQLite storage

**Decision:**
Replaced the ad-hoc JSON runtime storage with a local SQLite database under `server/runtime/larucula.sqlite`, keeping the same public HTTP contract for `POST /api/contact`, `GET /api/reservations/availability`, and `POST /api/reservations`. The storage layer now creates tables on startup, migrates existing JSON records if present, and enforces a uniqueness rule on `date + time + table`.

**Why:**
The JSON files were enough to prove the route shapes, but they were not a durable persistence boundary for the next backend phase. Moving to SQLite gives the project a real data layer now without pulling in the complexity of Prisma, auth, or admin write flows yet. The HTTP contract stays unchanged, so the front-end integration and Pegasuz content work can keep moving independently.

**Affected files:**
`server/storage.js`, `server/content.js`, `docs/decisions.md`

### 2026-03-22 — Public site now exposes a configured admin access point

**Decision:**
Added a small admin access link in the public footer, driven by environment config (`VITE_ADMIN_URL`, `VITE_ADMIN_TENANT`, `VITE_ADMIN_LABEL`). The public site now prepares the tenant slug in browser storage before redirecting to the admin login URL.

**Why:**
The editable content layer is already connected to Pegasuz, so the public site should give operators a direct path into the admin without exposing a heavy dashboard inside LaRucula itself. Keeping the link environment-driven avoids hardcoding hosting assumptions while making the tenant handoff trivial when both apps share origin or domain conventions.

**Affected files:**
`.env.example`, `src/app/admin-config.js`, `src/components/layout/SiteFooter.vue`, `docs/decisions.md`

### 2026-03-22 — Production env now targets Pegasuz tenant `larucula-mateo`

**Decision:**
Aligned the production-facing environment defaults with the real Pegasuz tenant and admin entrypoint: `VITE_CLIENT_SLUG=larucula-mateo` and `VITE_ADMIN_URL=https://admin.pegasuz.com.ar/admin/login`.

**Why:**
LaRucula no longer needs placeholder deployment values. The public site should build directly against the actual Pegasuz tenant and expose the real admin login entrypoint that operators will use after deployment.

**Affected files:**
`.env.example`, `.env.production`, `docs/decisions.md`

### 2026-03-23 — Public pages tightened for denser editorial rhythm

**Decision:**
Reduced the vertical height budget across the public-facing routes and restored the Home menu thesis section to a three-part composition: title on one side, dominant image in the middle, and supporting menu copy on the opposite side.

**Why:**
Several sections were visually correct but too tall for the actual viewport, which made the site feel more empty than intentional. Tightening hero heights and section paddings keeps the editorial tone while improving pacing and reducing blank vertical drift. Returning the Home menu scene to a triadic layout also restores stronger compositional balance between typography, imagery, and supporting copy.

**Affected files:**
`src/pages/HomePage.vue`, `src/pages/MenuPage.vue`, `src/pages/StoryPage.vue`, `src/pages/VisitPage.vue`, `src/pages/BlogPage.vue`, `src/pages/BlogPostPage.vue`, `src/pages/ReservationsPage.vue`, `docs/decisions.md`

### 2026-03-23 — Major restructuring: menu-centric simplification

**Decision:**
Complete site restructuring from 8 routes to 4. The restaurant's core product — the menu — becomes the center of the experience. Reservation system, blog, story, and visit pages removed entirely.

**New route structure:**
- `/` — HomePage (simple brand entry, directs to menu)
- `/menu` — MenuPage (core product: categories, prices, badges, availability)
- `/menu/:slug` — MenuCategoryPage (QR-ready single category view)
- `/:pathMatch(.*)*` — NotFoundPage

**Key architectural changes:**

1. **Menu as product**: New `mock-menu-v2.js` with full API-aligned data (5 categories: mar, tierra, postres, vinos, cocteles). Each item has id, slug, name, description, price, currency, badges, availability, recommended flag. Matches proposed `GET /menu`, `GET /menu/categories`, `GET /menu/categories/:slug` contracts.

2. **SVG icon system**: New `MenuIcon.vue` with 16 inline SVG icons (fish, leaf, dessert, wine, cocktail, star, flame, vegetarian, gluten-free, clock, seasonal, unavailable, globe, arrow-right, whatsapp, location). Replaces photography dependency for visual identity.

3. **i18n foundation**: `useLocale` composable with `?lang=` query parameter sync. `LocaleSelector` UI component. `mock-locales.js` config (es default, en, ca). Locale visible on `/menu` routes.

4. **Menu component system**: `MenuCategoryNav` (sticky horizontal scrollable nav), `MenuItem` (price formatting, badges, availability states), `MenuBadge` (pill with icon + label).

5. **Simplified HomePage**: Dark hero with SVG wave pattern (no photography), brand headline + menu CTA, brief about section, menu category cards grid, contact/hours/location info.

6. **Header/Footer**: Menu CTA replaces reservation CTA. Footer adds WhatsApp link, removes reservation references. Navigation reduced to single "Menu" link.

7. **Deprecated files moved to `src/_deprecated/`**: All reservation components, blog pages, story page, visit page, contact form, related services/adapters/composables/mock data preserved but out of active tree.

**Why:**
Client direction change: "una estructura mucho más simple." The restaurant needs a practical, QR-scannable menu experience — not an editorial magazine. The previous 8-route architecture with reservation system, blog, and narrative pages created complexity without business value. The new structure is focused, mobile-first, CMS-editable, and API-ready.

**Affected files:**
`src/router/routes.js`, `src/router/index.js`, `src/app/app-config.js`, `src/App.vue`, `src/layouts/DefaultLayout.vue`, `src/pages/HomePage.vue` (rewritten), `src/pages/MenuPage.vue` (rewritten), `src/pages/MenuCategoryPage.vue` (new), `src/pages/NotFoundPage.vue` (simplified), `src/data/mock-menu-v2.js` (new), `src/data/mock-locales.js` (new), `src/data/mock-site.js` (restructured), `src/composables/useLocale.js` (new), `src/components/svg/MenuIcon.vue` (new), `src/components/menu/MenuCategoryNav.vue` (new), `src/components/menu/MenuItem.vue` (new), `src/components/menu/MenuBadge.vue` (new), `src/components/ui/LocaleSelector.vue` (new), `src/components/layout/SiteHeader.vue`, `src/components/layout/SiteFooter.vue`, `docs/decisions.md`

### 2026-03-23 — Menu-first architecture now runs through a single content and routing context

**Decision:**
Aligned the simplified site with a real menu-first content pipeline: `siteContent` now updates from the remote config instead of staying frozen on the mock bootstrap, menu pages now consume a single `menuService`/`menuAdapter` layer instead of importing `mock-menu-v2` directly, and route navigation preserves `?lang=` across the public shell. Added a minimal QR layout mode on `/menu` and `/menu/:slug` via `?entry=qr`, which hides global chrome and keeps only the reading-critical UI.

**Why:**
The previous simplification reduced routes, but the implementation was still split between old mocks, stale CMS mappings, and navigation that dropped locale state. That would have made menu translation, QR usage, and admin-edited content look correct in the UI while remaining brittle underneath. This pass closes that gap without reintroducing architectural complexity: one content context for editable site copy, one menu source of truth, and one lightweight QR variant for table use.

**Affected files:**
`src/app/app-config.js`, `src/adapters/siteAdapter.js`, `src/adapters/menuAdapter.js`, `src/services/siteService.js`, `src/services/menuService.js`, `src/composables/useMenuContent.js`, `src/composables/useRouteContext.js`, `src/data/menu-ui-copy.js`, `src/layouts/DefaultLayout.vue`, `src/router/index.js`, `src/pages/HomePage.vue`, `src/pages/MenuPage.vue`, `src/pages/MenuCategoryPage.vue`, `src/pages/NotFoundPage.vue`, `src/components/layout/SiteHeader.vue`, `src/components/layout/SiteFooter.vue`, `src/components/menu/MenuCategoryNav.vue`, `src/components/menu/MenuItem.vue`, `src/components/menu/MenuBadge.vue`, `src/components/ui/BaseButton.vue`, `server/content.js`, `server/createServer.js`, `tests/ux/routes.spec.js`, `tests/ux/a11y.spec.js`

### 2026-03-23 — Home now uses one immersive hero image and a session-based intro overlay

**Decision:**
Reintroduced a branded loading/intro overlay for the homepage only, with immediate skip and automatic suppression for QR/menu entries. At the same time, the Home hero now uses a single photographic image again, but keeps the simplified menu-first structure and uses strong overlays so the page still feels restrained. Both the intro copy and the hero image are wired into `siteContent`, so Pegasuz can own them later instead of leaving them hardcoded in the component.

**Why:**
The menu-first simplification improved utility, but the first impression became too abstract and dry. One image in the hero restores atmosphere without returning to a photo-heavy site, and the intro gives the brand a more deliberate opening without blocking QR or day-to-day menu usage. Keeping those fields under the same content model matters because Pegasuz remains the editing surface; visual immersion cannot become an exception that the SaaS layer cannot reach.

**Affected files:**
`src/App.vue`, `src/components/intro/IntroOverlay.vue`, `src/pages/HomePage.vue`, `src/data/mock-site.js`, `src/adapters/siteAdapter.js`, `src/app/app-config.js`, `server/content.js`, `tests/ux/helpers.js`, `docs/decisions.md`

### 2026-03-23 — Home menu section became a dark product stage instead of a neutral preview grid

**Decision:**
Rebuilt the Home menu section as the main product scene of the page: a dark “menu stage” with a large title, prominent category blocks, and a short list of featured dishes, instead of a polite cream card grid.

**Why:**
Once the site was simplified, the old menu preview became too quiet relative to its business importance. The client wants the menu to be the real centre of the experience, so this section now behaves like a second hero focused on product rather than atmosphere. It remains simple in structure, but it is intentionally more forceful and visually memorable.

**Affected files:**
`src/pages/HomePage.vue`, `src/data/menu-ui-copy.js`, `docs/decisions.md`

### 2026-03-23 — Spanish is now the source locale until Pegasuz serves translations

**Decision:**
Set Spanish as the only active locale in the public shell for now, translated the active site and menu content to Spanish, and hid the language switcher unless more than one locale is available. Route metadata, accessibility labels, 404 copy, menu content, and the Pegasuz-ready site bootstrap now use Spanish as the default source language.

**Why:**
The project is about to move translation ownership to Pegasuz. Leaving English and Catalan toggles visible while the real content source remained incomplete would create a mixed-language experience and make the current site feel broken. Spanish now works as the single canonical content layer, and the locale switcher can reappear as soon as the SaaS API delivers real translated payloads.

**Affected files:**
`src/data/mock-site.js`, `src/data/mock-menu-v2.js`, `src/data/mock-locales.js`, `src/layouts/DefaultLayout.vue`, `src/components/intro/IntroOverlay.vue`, `src/components/layout/SiteHeader.vue`, `src/components/layout/SiteFooter.vue`, `src/components/ui/LocaleSelector.vue`, `src/components/ui/WhatsAppButton.vue`, `src/components/menu/MenuCategoryNav.vue`, `src/pages/HomePage.vue`, `src/pages/NotFoundPage.vue`, `src/router/routes.js`, `src/router/index.js`, `src/app/app-config.js`, `src/adapters/siteAdapter.js`, `docs/decisions.md`

### 2026-03-23 — Pegasuz CMS contract narrowed to the active public shell

**Decision:**
Aligned the LaRucula Pegasuz contract with the current menu-first architecture. The CMS contract now exposes only the editable shell keys the front actually reads from `site_contents`: `site`, `header`, `home`, and `footer`. Legacy blocks for reservations, contact forms, story pages, and old editorial menu sections were removed from the contract seed.

**Why:**
The previous Pegasuz contract still represented an older, much larger site map. That made the admin confusing and suggested editable areas that no longer exist in the public app. Narrowing the contract keeps the SaaS layer honest: `site_contents` owns the global shell copy, while menu items and translation-ready product data continue to belong to the dedicated menu API domain.

**Affected files:**
`server/content.js`, `src/adapters/siteAdapter.js`, `C:/Users/mateo/Desktop/pegasuz/pegasuz/Pegasuz-Core/docs/contracts/larucula-mateo.cms-contract.json`, `C:/Users/mateo/Desktop/pegasuz/pegasuz/Pegasuz-Core/docs/contracts/README.md`, `docs/decisions.md`

### 2026-03-23 — Intro overlay now behaves like a brand threshold, not a second hero

**Decision:**
Redesigned the homepage intro overlay as a typographic arrival scene on a light editorial surface, with only a small atmospheric detail crop instead of another full-bleed photographic composition. The intro now feels distinct from the hero beneath it and no longer relies on browser storage to decide visibility; it appears once per app load and is still skipped automatically in QR entries.

**Why:**
The previous intro repeated too much of the hero logic: same image language, same dark atmosphere, similar framing. That made the opening feel redundant rather than intentional. Turning the intro into a lighter, more graphic threshold creates better contrast with the actual homepage hero and keeps the first impression more authored and less repetitive.

**Affected files:**
`src/App.vue`, `src/components/intro/IntroOverlay.vue`, `docs/decisions.md`

### 2026-03-24 — Intro timing now favors legibility over reflex dismissal

**Decision:**
Extended the intro hold time and removed dismissal on generic scroll, touch movement, or arbitrary key presses. The overlay now exits on its own after a slightly longer beat, via the explicit `Saltar` button, or with the `Escape` key.

**Why:**
The previous skip behavior made the intro feel broken because common trackpad or keyboard input dismissed it before the composition had time to land. The new behavior keeps the entry readable while preserving an explicit exit path.

**Affected files:**
`src/components/intro/IntroOverlay.vue`, `docs/decisions.md`

### 2026-03-24 — Intro can now be forced manually for design review

**Decision:**
Added a query-based override for the homepage intro: `?intro=1` or `?intro=true` forces the overlay to appear on `/`, even if it has already been seen during the current app runtime.

**Why:**
The intro is now runtime-only and no longer stored in browser persistence, which is cleaner for production but awkward while reviewing design iterations. A manual query override gives a predictable way to inspect the intro without weakening the default everyday behavior.

**Affected files:**
`src/App.vue`, `docs/decisions.md`

### 2026-03-24 — Menu page palette now bridges the homepage instead of breaking from it

**Decision:**
Retuned `/menu` from a flatter cream utility page into a warmer sand-and-toast surface with softer tonal separation, lighter dividers, and ivory content panels. The route keeps its practical menu-first behavior, but now carries more of the same Mediterranean warmth as the homepage instead of feeling like a different product.

**Why:**
The previous Carta page was readable, but its color logic felt too detached from the homepage: a clean cream utility surface after a much moodier arrival. Softening the transition and reusing warmer dusk, toast, and parchment tones makes the menu feel more authored and continuous without sacrificing legibility.

**Affected files:**
`src/pages/MenuPage.vue`, `docs/decisions.md`

### 2026-03-24 — The public site now uses a tighter neutral palette with fewer tonal jumps

**Decision:**
Compressed the shared palette into a shorter ladder and applied it across shell, home, and carta routes. The overall canvas now rests on `cream`, reading surfaces sit on softer `ivory`, and dark scenes use a slightly lifted `dusk` instead of the harsher previous brown-black. Menu-specific custom beige blocks were replaced with the same shared neutrals.

**Why:**
The site had drifted into multiple browns and very bright light surfaces, which made transitions feel abrupt and occasionally too contrast-heavy. Tightening the palette makes Home, Carta, and QR states feel like one system instead of adjacent moods.

**Affected files:**
`src/styles/tokens/colors.css`, `src/styles/main.css`, `src/components/layout/SiteHeader.vue`, `src/components/menu/MenuCategoryNav.vue`, `src/pages/HomePage.vue`, `src/pages/MenuPage.vue`, `src/pages/MenuCategoryPage.vue`, `docs/decisions.md`

### 2026-03-24 — Intro is now fully typographic and no longer uses an image accent

**Decision:**
Removed the small image detail from the intro overlay and rebuilt it as a purely typographic and graphic threshold.

**Why:**
The cropped image inside the intro was competing with the real homepage hero instead of preparing it. The intro now works better as a short brand prelude: lighter, cleaner, and less redundant with the atmosphere that follows.

**Affected files:**
`src/App.vue`, `src/components/intro/IntroOverlay.vue`, `docs/decisions.md`

### 2026-03-24 — Menu routes now start darker but resolve into calmer reading surfaces

**Decision:**
Extended the same palette logic across both `/menu` and `/menu/:slug`: the top of the experience now opens with a dusk-to-parchment gradient that feels closer to the homepage, while the reading areas below were softened into lighter ivory panels with lower-contrast dividers and calmer shadows.

**Why:**
The menu needed two seemingly opposite things at once: stronger continuity with the moody homepage and a more elegant, quieter reading experience once the user is inside the carta. Using a darker tonal threshold only at the start, then resolving into lighter content surfaces, gives both without making the route feel either harsh or generic.

**Affected files:**
`src/pages/MenuPage.vue`, `src/pages/MenuCategoryPage.vue`, `docs/decisions.md`

### 2026-03-24 — Menu headers now use solid tonal blocks instead of gradients

**Decision:**
Replaced the gradient-led menu headers with taller solid `dusk` blocks on both `/menu` and `/menu/:slug`, keeping only very restrained linework and ghost typography as atmosphere.

**Why:**
The gradient made the menu entry feel over-designed and less controlled than the rest of the site. A solid tonal block gives the carta a cleaner architectural threshold, keeps continuity with the homepage, and lets the body of the menu feel calmer once the user enters the reading surface.

**Affected files:**
`src/pages/MenuPage.vue`, `src/pages/MenuCategoryPage.vue`, `docs/decisions.md`

### 2026-03-24 — Menu header was recomposed to match Home more closely

**Decision:**
Rebuilt the `/menu` header around the same visual language as the homepage: hospitality pill, large serif title, integrated notes, and one restrained image crop instead of floating utility pills. Also removed the empty locale shell when only one language is active, so the page no longer renders a blank rounded block above the menu notes.

**Why:**
The previous menu header still felt disconnected from Home and contained UI noise. The note pills looked detached from the main composition, and the locale wrapper left a meaningless empty block when Spanish was the only active locale. The new header is simpler, more authored, and more consistent with the rest of the site.

**Affected files:**
`src/pages/MenuPage.vue`, `src/pages/MenuCategoryPage.vue`, `docs/decisions.md`

### 2026-03-24 — Menu hero now behaves like a compact sister to the homepage hero

**Decision:**
Rebuilt the `/menu` hero from scratch as a shorter, image-backed arrival scene that borrows the Home page language without copying its full layout. The route now uses the same atmospheric background image system and hospitality metadata, but in a more compact editorial block focused on title, subtitle, and notes rather than a large split composition.

**Why:**
The previous menu header still felt detached from the Home page and over-relied on utility composition. Treating the menu entry as a “sister hero” makes the transition from Home feel intentional, while keeping the menu route practical and faster to read once the user gets past the opening block.

**Affected files:**
`src/pages/MenuPage.vue`, `docs/decisions.md`
