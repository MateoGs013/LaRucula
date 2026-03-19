import { onMounted, onUnmounted, unref } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Magnetic hover effect for CTA buttons.
 * Targets elements with [data-magnetic] attribute.
 * Button gently follows cursor proximity, snaps back on leave.
 */
export function useMagneticHover(scopeRef) {
  const prefersReducedMotion = useReducedMotion();
  const cleanupFns = [];

  onMounted(() => {
    const scope = unref(scopeRef);
    if (!scope || prefersReducedMotion.value) return;

    const { gsap } = ensureGsapPlugins();
    const buttons = scope.querySelectorAll('[data-magnetic]');

    buttons.forEach((btn) => {
      const strength = parseFloat(btn.dataset.magneticStrength) || 0.3;

      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
        gsap.to(btn, { x, y, duration: 0.4, ease: 'power2.out' });
      };

      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      };

      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);

      cleanupFns.push(() => {
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
        gsap.set(btn, { x: 0, y: 0 });
      });
    });
  });

  onUnmounted(() => {
    cleanupFns.forEach(fn => fn());
  });
}
