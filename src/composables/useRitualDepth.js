import { onMounted, onUnmounted, unref } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Adds scroll-linked depth to the Ritual section:
 * - Content block drifts slightly with scroll
 * - Vignette darkens as user scrolls through
 */
export function useRitualDepth(scopeRef) {
  const prefersReducedMotion = useReducedMotion();
  let context;

  onMounted(() => {
    const scope = unref(scopeRef);
    if (!scope || prefersReducedMotion.value) return;

    const { gsap, ScrollTrigger } = ensureGsapPlugins();
    const section = scope.querySelector('[data-ritual-section]');
    if (!section) return;

    context = gsap.context(() => {
      const content = section.querySelector('[data-ritual-content]');
      if (content) {
        gsap.to(content, {
          y: 20,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      const vignette = section.querySelector('[data-ritual-vignette]');
      if (vignette) {
        gsap.fromTo(vignette,
          { opacity: 0.3 },
          {
            opacity: 0.65,
            scrollTrigger: {
              trigger: section,
              start: 'top center',
              end: 'bottom center',
              scrub: 0.8,
            },
          }
        );
      }

      const grain = section.querySelector('[data-ritual-grain]');
      if (grain) {
        gsap.fromTo(grain,
          { opacity: 0.06 },
          {
            opacity: 0.16,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }

      // Directional light shift — "the sun drops" at 60% scroll
      const lightLayer = section.querySelector('[data-ritual-light]');
      if (lightLayer) {
        gsap.to(lightLayer, {
          background: 'linear-gradient(225deg, rgba(26,20,16,0.35) 0%, transparent 55%)',
          scrollTrigger: {
            trigger: section,
            start: '55% top',
            end: '75% top',
            scrub: 0.6,
          },
        });
      }

      // Color temperature warmth — amber glow intensifies and shifts position with the light
      const warmth = section.querySelector('[data-ritual-warmth]');
      if (warmth) {
        gsap.to(warmth, {
          opacity: 1,
          background: 'radial-gradient(ellipse at 18% 35%, rgba(200,130,60,0.32) 0%, rgba(160,90,40,0.14) 40%, transparent 70%)',
          scrollTrigger: {
            trigger: section,
            start: '45% top',
            end: '80% top',
            scrub: 0.8,
          },
        });
      }
    }, scope);
  });

  onUnmounted(() => {
    context?.revert();
  });
}
