import { onMounted, onUnmounted, unref } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Scroll-locked thesis: pins a blockquote at center of viewport,
 * fades it in then out as user scrolls through.
 * Background image does a slow Ken Burns zoom.
 */
export function useThesisLock(scopeRef) {
  const prefersReducedMotion = useReducedMotion();
  let context;

  onMounted(() => {
    const scope = unref(scopeRef);
    if (!scope) return;

    const { gsap, ScrollTrigger } = ensureGsapPlugins();
    const wrapper = scope.querySelector('[data-thesis-lock]');
    if (!wrapper) return;

    context = gsap.context(() => {
      const quote = wrapper.querySelector('[data-thesis-quote]');
      const bg = wrapper.querySelector('[data-thesis-bg]');
      const inner = wrapper.querySelector('[data-thesis-inner]');

      if (prefersReducedMotion.value) {
        gsap.set(quote, { opacity: 1 });
        return;
      }

      // Pin the inner container
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        pin: inner,
        pinSpacing: false,
      });

      // Quote opacity: 0 → 1 → 0 over the pin duration
      gsap.fromTo(quote,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: '40% top',
            scrub: 0.6,
          },
        }
      );

      gsap.to(quote, {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: wrapper,
          start: '65% top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // Ken Burns slow zoom on background image
      if (bg) {
        gsap.fromTo(bg,
          { scale: 1 },
          {
            scale: 1.28,
            scrollTrigger: {
              trigger: wrapper,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Typographic ghost — "morning" erupts before the quote, dissolves as quote solidifies
      const ghost = wrapper.querySelector('[data-thesis-ghost]');
      if (ghost) {
        gsap.fromTo(ghost,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: wrapper,
              start: 'top top',
              end: '30% top',
              scrub: 0.4,
            },
          }
        );

        gsap.to(ghost, {
          opacity: 0,
          scale: 1.1,
          scrollTrigger: {
            trigger: wrapper,
            start: '35% top',
            end: '55% top',
            scrub: 0.4,
          },
        });
      }
    }, scope);
  });

  onUnmounted(() => {
    context?.revert();
  });
}
