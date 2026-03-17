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
