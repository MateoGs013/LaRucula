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
