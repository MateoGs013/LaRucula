import { onMounted, onUnmounted, unref } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Interactive Threshold — 3D spatial presence:
 * - Perspective-based rotateY on each half (door-opening)
 * - Center portal discovery with depth bloom
 * - Cursor drift + scale
 */
export function useThresholdInteraction(scopeRef) {
  const prefersReducedMotion = useReducedMotion();
  const cleanupFns = [];

  onMounted(() => {
    const scope = unref(scopeRef);
    if (!scope || prefersReducedMotion.value) return;

    const { gsap } = ensureGsapPlugins();
    const section = scope.querySelector('[data-threshold]');
    if (!section) return;

    const grid = section.querySelector('[data-threshold-grid]');
    const divider = section.querySelector('[data-threshold-divider]');
    const imageLeft = section.querySelector('[data-threshold-left]');
    const imageRight = section.querySelector('[data-threshold-right]');

    if (!divider || !imageLeft || !imageRight) return;

    // Set perspective on the grid container
    if (grid) gsap.set(grid, { perspective: 1200, transformStyle: 'preserve-3d' });
    gsap.set([imageLeft, imageRight], { transformStyle: 'preserve-3d' });

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const distFromCenter = Math.abs(x - 0.5) * 2; // 0 (center) to 1 (edge)
      const inCenterZone = distFromCenter < 0.15;

      // 3D rotation — panels tilt like opening doors toward the viewer
      const rotateAmount = (x - 0.5) * 10; // ±5 degrees max
      const centerRotate = inCenterZone ? 5 : 0; // extra inward tilt in center zone

      gsap.to(imageLeft, {
        rotateY: rotateAmount + centerRotate,
        x: (x - 0.5) * -16,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.to(imageRight, {
        rotateY: rotateAmount - centerRotate,
        x: (x - 0.5) * 16,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Portal discovery — center zone reveals spatial depth
      const portal = section.querySelector('[data-threshold-portal]');
      if (portal) {
        gsap.to(portal, {
          opacity: inCenterZone ? 1 : 0,
          scale: inCenterZone ? 1 : 0.92,
          duration: inCenterZone ? 0.6 : 0.4,
          ease: 'power2.out',
        });
      }

      // Images scale & add depth in center zone
      const imgLeft = imageLeft.querySelector('img');
      const imgRight = imageRight.querySelector('img');
      if (imgLeft && imgRight) {
        gsap.to([imgLeft, imgRight], {
          scale: inCenterZone ? 1.03 : 1,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      gsap.to(divider, {
        opacity: inCenterZone ? 1 : 1 - distFromCenter * 0.6,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(divider, { opacity: 0.7, duration: 0.6, ease: 'power2.out' });
      gsap.to([imageLeft, imageRight], {
        x: 0, rotateY: 0,
        duration: 0.8, ease: 'elastic.out(1, 0.7)',
      });

      const portal = section.querySelector('[data-threshold-portal]');
      if (portal) gsap.to(portal, { opacity: 0, scale: 0.92, duration: 0.4 });

      const imgLeft = imageLeft.querySelector('img');
      const imgRight = imageRight.querySelector('img');
      if (imgLeft && imgRight) gsap.to([imgLeft, imgRight], { scale: 1, duration: 0.6 });
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    cleanupFns.push(() => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      gsap.set([divider, imageLeft, imageRight], { clearProps: 'all' });
      if (grid) gsap.set(grid, { clearProps: 'all' });
    });
  });

  onUnmounted(() => {
    cleanupFns.forEach(fn => fn());
  });
}
