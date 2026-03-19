import { onMounted, onUnmounted, unref } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Scroll-triggered clip-path image reveal.
 * Targets elements with [data-image-reveal] attribute.
 * Optional data-image-reveal-direction="up|down|left|right" (default: up)
 */
export function useImageReveal(scopeRef) {
  const prefersReducedMotion = useReducedMotion();
  let context;

  const clipStates = {
    up: {
      from: 'inset(100% 0% 0% 0%)',
      to: 'inset(0% 0% 0% 0%)',
    },
    down: {
      from: 'inset(0% 0% 100% 0%)',
      to: 'inset(0% 0% 0% 0%)',
    },
    left: {
      from: 'inset(0% 100% 0% 0%)',
      to: 'inset(0% 0% 0% 0%)',
    },
    right: {
      from: 'inset(0% 0% 0% 100%)',
      to: 'inset(0% 0% 0% 0%)',
    },
  };

  onMounted(() => {
    const scope = unref(scopeRef);
    if (!scope || prefersReducedMotion.value) return;

    const { gsap } = ensureGsapPlugins();

    context = gsap.context(() => {
      const targets = gsap.utils.toArray('[data-image-reveal]');

      targets.forEach((el) => {
        const direction = el.dataset.imageRevealDirection || 'up';
        const clip = clipStates[direction] || clipStates.up;

        gsap.fromTo(
          el,
          { clipPath: clip.from, willChange: 'clip-path' },
          {
            clipPath: clip.to,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );

        // Inner image scale settle
        const img = el.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });
    }, scope);
  });

  onUnmounted(() => {
    context?.revert();
  });
}
