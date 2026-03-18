import { onMounted, onUnmounted, unref } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Orchestrates the hero entrance timeline:
 * eyebrow → headline → lede → CTA → image scale → SVG stroke draw
 */
export function useHeroMotion(scopeRef) {
  const prefersReducedMotion = useReducedMotion();
  let context;

  onMounted(() => {
    const scope = unref(scopeRef);
    if (!scope || prefersReducedMotion.value) return;

    const { gsap } = ensureGsapPlugins();

    context = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
      });

      // Eyebrow
      tl.fromTo(
        '[data-hero-eyebrow]',
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        0.1
      );

      // Headline — stagger by word
      tl.fromTo(
        '[data-hero-title] .hero-word',
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 },
        0.2
      );

      // Signature stroke path draw
      const strokePath = scope.querySelector('[data-hero-stroke] path');
      if (strokePath) {
        const length = strokePath.getTotalLength();
        gsap.set(strokePath, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(
          strokePath,
          { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' },
          0.7
        );
      }

      // Lede
      tl.fromTo(
        '[data-hero-lede]',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
        0.55
      );

      // CTA buttons
      tl.fromTo(
        '[data-hero-cta]',
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        0.7
      );

      // Hero image — scale drift settling
      tl.fromTo(
        '[data-hero-image]',
        { scale: 1.06, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.4, ease: 'power1.out' },
        0.15
      );
    }, scope);
  });

  onUnmounted(() => {
    context?.revert();
  });
}
