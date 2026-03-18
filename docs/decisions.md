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
