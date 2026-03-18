# Current State

## Status
HomePage editorial experience implemented. Foundation scaffold extended with real content, typography, imagery, and motion.

## What exists
- foundational project instructions and design rules
- Vue 3 + Vite + Tailwind CSS project scaffold
- router with `home`, `menu`, `story`, `visit`, and `not-found`
- global layout shell with header and footer
- layout primitives for page, section, and heading composition
- Tailwind token bridge via `src/styles/tokens/`
- GSAP reveal helpers with reduced-motion support
- **Google Fonts: Cormorant Garamond (display) + Inter (body) + Caveat (accent)**
- **HomePage with 5 editorial sections: hero, philosophy, culinary preview, atmosphere, visit CTA**
- **Hero entrance composable (`useHeroMotion`) with word-stagger, SVG path-draw, image scale drift**
- **Self-animating SVG components (SignatureStroke, CoastalDivider) with scroll-triggered path-draw**
- **Unsplash placeholder photography with lazy/eager loading strategy**
- **Subtle parallax on atmosphere section background image**

## What should happen next
1. choose final typography weight refinement and test at all breakpoints
2. build route-specific editorial compositions for menu, story, and visit
3. decide reservation integration and final contact pattern
4. expand the SVG accent library with more variation
5. replace Unsplash placeholders with production photography
6. refine mobile experience (test at 375px, 414px, and tablet sizes)
7. add scroll-to-top or smooth scroll polish between route transitions
