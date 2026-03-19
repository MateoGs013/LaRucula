import { onMounted, onUnmounted, unref, watch } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Orchestrates the hero entrance and scroll-linked parallax.
 * Accepts an optional readyRef to delay animation until a signal (e.g. intro complete).
 */
export function useHeroMotion(scopeRef, readyRef) {
  const prefersReducedMotion = useReducedMotion();
  let context;

  function play(scope) {
    const { gsap } = ensureGsapPlugins();

    context = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Image — slow Ken Burns settle
      tl.fromTo(
        '[data-hero-image]',
        { scale: 1.08, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 2.4, ease: 'power1.out' },
        0
      );

      // Heading
      tl.fromTo(
        '[data-hero-heading]',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        0.4
      );

      // Lede
      tl.fromTo(
        '[data-hero-lede]',
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.65 },
        0.7
      );

      // CTA — slight overshoot
      tl.fromTo(
        '[data-hero-cta]',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'back.out(1.4)' },
        0.9
      );

      // Scroll-linked parallax — hero image drifts slower than content
      gsap.to('[data-hero-image]', {
        y: '12%',
        ease: 'none',
        scrollTrigger: {
          trigger: scope,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, scope);
  }

  onMounted(() => {
    const scope = unref(scopeRef);
    if (!scope || prefersReducedMotion.value) return;

    if (!readyRef || unref(readyRef)) {
      play(scope);
    } else {
      const unwatch = watch(readyRef, (ready) => {
        if (ready) {
          play(scope);
          unwatch();
        }
      });
    }
  });

  onUnmounted(() => {
    context?.revert();
  });
}
