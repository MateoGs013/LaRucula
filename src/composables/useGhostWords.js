import { onMounted, onUnmounted, unref } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Scroll-responsive ghost typography system.
 * Makes architectural ghost words respond to section scroll as kinetic depth actors.
 */
export function useGhostWords(scopeRef) {
  const prefersReducedMotion = useReducedMotion();
  let context;

  onMounted(() => {
    const scope = unref(scopeRef);
    if (!scope || prefersReducedMotion.value) return;

    const { gsap, ScrollTrigger } = ensureGsapPlugins();

    context = gsap.context(() => {
      // Craft "hands" — reaches forward as you scroll past
      const craftSection = scope.querySelector('[data-craft-section]');
      const craftGhost = craftSection?.querySelector('[data-ghost-hands]');
      if (craftGhost) {
        gsap.fromTo(craftGhost,
          { opacity: 0, scale: 0.92, rotate: -2 },
          {
            opacity: 1, scale: 1.06, rotate: 2,
            scrollTrigger: {
              trigger: craftSection,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 0.8,
            },
          }
        );
      }

      // Atmosphere "gold" — rotation drift + opacity intensification
      const atmoSection = scope.querySelector('[data-atmo-section]');
      const goldGhost = atmoSection?.querySelector('[data-gold-float]');
      if (goldGhost) {
        gsap.to(goldGhost, {
          rotate: -6,
          opacity: 1.4, // multiplier on current opacity
          scrollTrigger: {
            trigger: atmoSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      // Invitation "table" — consolidates as you approach CTA
      const invSection = scope.querySelector('[data-invitation-section]');
      const tableGhost = invSection?.querySelector('[data-ghost-table]');
      if (tableGhost) {
        gsap.fromTo(tableGhost,
          { scale: 1, xPercent: 0, opacity: 0 },
          {
            scale: 1.1, xPercent: -5, opacity: 1,
            scrollTrigger: {
              trigger: invSection,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 0.8,
            },
          }
        );
      }

      // Ritual "evening" — slow drift upward
      const ritualSection = scope.querySelector('[data-ritual-section]');
      const eveningGhost = ritualSection?.querySelector('[data-ghost-evening]');
      if (eveningGhost) {
        gsap.fromTo(eveningGhost,
          { opacity: 0, yPercent: 10 },
          {
            opacity: 1, yPercent: -5,
            scrollTrigger: {
              trigger: ritualSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      }
    }, scope);
  });

  onUnmounted(() => {
    context?.revert();
  });
}
