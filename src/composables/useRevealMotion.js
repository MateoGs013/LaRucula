import { onMounted, onUnmounted, unref } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { revealPresets } from '@/motion/presets';

import { useReducedMotion } from './useReducedMotion';

export function useRevealMotion(scopeRef, options = {}) {
  const prefersReducedMotion = useReducedMotion();
  let context;

  onMounted(() => {
    const scope = unref(scopeRef);

    if (!scope || prefersReducedMotion.value) {
      return;
    }

    const { gsap } = ensureGsapPlugins();
    const selector = options.selector ?? '[data-reveal]';
    const preset = revealPresets[options.preset ?? 'default'];

    context = gsap.context(() => {
      const targets = gsap.utils.toArray(selector);

      targets.forEach((target) => {
        const y = Number(target.dataset.revealY ?? preset.y);
        const duration = Number(target.dataset.revealDuration ?? preset.duration);
        const delay = Number(target.dataset.revealDelay ?? 0);
        const start = target.dataset.revealStart ?? preset.start;

        const animation = {
          autoAlpha: 1,
          y: 0,
          delay,
          duration,
          ease: preset.ease,
          clearProps: 'opacity,transform,visibility',
        };

        if (start) {
          animation.scrollTrigger = {
            trigger: target,
            start,
            once: true,
          };
        }

        gsap.fromTo(target, { autoAlpha: 0, y }, animation);
      });
    }, scope);
  });

  onUnmounted(() => {
    context?.revert();
  });
}
