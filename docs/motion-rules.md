# LaRucula — Motion Rules

## Motion philosophy
Motion must make the site feel alive, composed, and premium.

It must never compensate for weak design.

The reference signal from current Awwwards work is clear:
- immersive movement is welcome
- microinteractions matter
- atmosphere sells
- but the best work still preserves readability and control

For LaRucula, motion should feel cinematic and tactile, not loud.

This document sets a default posture, not a hard cap.
Claude may use richer motion, smoother scrolling, more immersive transitions, canvas, WebGL, video, or other rendering systems if they are central to the concept and remain performant and usable.

## Motion budget
Use a limited motion budget:
- one hero entrance sequence
- one or two scroll-linked depth ideas per page
- microinteractions across navigation, buttons, and media
- occasional SVG accent animation

Do not give every section a “special effect”.
If the concept genuinely needs a more ambitious motion language, that is allowed, but it must be intentional and technically disciplined.

## Preferred motion patterns
- fade plus short translate
- line or word reveal for major headings
- image mask reveal
- scale settle on large photography
- subtle parallax between foreground and background layers
- panel glide for overlays
- calm path-draw for dividers or accents
- hover depth on image frames

## Text motion
Prefer:
- word or line stagger on large editorial statements
- soft opacity transitions for supporting copy
- slight lateral movement for labels or notes

Avoid:
- per-letter gimmicks
- slow intros that delay reading
- long sequencing on paragraphs

## Image motion
Prefer:
- masked reveals
- short scale drift
- light parallax
- layered media settling at slightly different speeds

Avoid:
- dramatic zooms
- carousel chaos
- constant looping motion
- gallery movement with no narrative reason

## Scroll-linked motion
- tie motion to composition, not novelty
- use ScrollTrigger sparingly
- avoid pinning multiple sections in a hospitality site
- dark sections can move a little slower than bright sections
- if a section already has strong photography, the motion should get quieter

## 3D, video, and frame sequences
The current Awwwards landscape uses all three, but LaRucula should be selective.

Use only when the content truly requires it:
- 3D only if it adds tactile value and remains performant
- video only if it tells atmosphere better than still photography
- frame sequences only if they are central to the story and tested hard on mobile

The OPTIKKA case study specifically highlights mobile and browser issues with video-driven scroll animation before switching approach. The inference for LaRucula: avoid heavy motion systems unless they are central and technically justified.

## Microinteractions
- nav hover should feel polished
- buttons should have restrained lift or tonal change
- image hover can deepen shadow or crop slightly
- small interface reactions should reward attention without becoming playful noise

## Performance rules
Treat Awwwards mobile-excellence criteria as baseline:
- smooth scrolling on mobile
- visible CTAs
- legible font sizes
- lazy-load heavy media
- use passive listeners where relevant
- clean up GSAP contexts and triggers on unmount
- build for mid-tier devices, not only high-end desktops

## Reduced motion
When motion is reduced:
- remove parallax
- simplify reveal choreography
- keep SVG accents static or nearly static
- preserve hierarchy and clarity first

## Anti-patterns
- scroll-jacking
- overlong preloaders
- fake cinematic intros before content
- perpetual marquees
- multiple motion ideas competing in one viewport
