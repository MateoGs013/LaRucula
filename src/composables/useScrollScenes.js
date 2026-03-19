import { onMounted, onUnmounted, unref } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Scroll-linked choreography for homepage scenes:
 * - Line-by-line text reveal ([data-reveal-line])
 * - Parallax depth ([data-parallax="<px>"])  — numeric px value per element
 * - Scroll indicator fade ([data-scroll-indicator])
 * - Scene divider line animation ([data-scene-divider])
 * - Evening text pin ([data-evening-pin])
 */
export function useScrollScenes(scopeRef) {
  const prefersReducedMotion = useReducedMotion();
  let context;

  onMounted(() => {
    const scope = unref(scopeRef);
    if (!scope || prefersReducedMotion.value) return;

    const { gsap, ScrollTrigger } = ensureGsapPlugins();

    context = gsap.context(() => {
      // Philosophy: line-by-line scroll-triggered reveal
      gsap.utils.toArray('[data-reveal-line]').forEach((line, i) => {
        gsap.fromTo(
          line,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: line,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });

      // Parallax: per-element speed via numeric data attribute
      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const raw = el.dataset.parallax;
        const speed = parseInt(raw, 10) || (raw === 'fast' ? 50 : 25);
        const absSpeed = Math.abs(speed);
        gsap.fromTo(
          el,
          { y: speed > 0 ? -absSpeed : absSpeed },
          {
            y: speed > 0 ? absSpeed : -absSpeed,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section, [data-parallax-scope]') || el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      // Scene dividers: horizontal line extends on scroll
      gsap.utils.toArray('[data-scene-divider]').forEach((line) => {
        gsap.fromTo(
          line,
          { width: '0%' },
          {
            width: '100%',
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // Evening: pin text panel on desktop while image scrolls
      const eveningSection = scope.querySelector('[data-evening-pin]');
      const eveningText = scope.querySelector('[data-evening-text]');
      if (eveningSection && eveningText && window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: eveningSection,
          start: 'top top',
          end: 'bottom bottom',
          pin: eveningText,
          pinSpacing: false,
        });
      }

      // Scroll indicator: fade out on scroll
      const scrollIndicator = scope.querySelector('[data-scroll-indicator]');
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          opacity: 0,
          y: 10,
          scrollTrigger: {
            trigger: scope.querySelector('[data-scene="hero"]') || scope,
            start: '8% top',
            end: '18% top',
            scrub: true,
          },
        });
      }
    }, scope);
  });

  onUnmounted(() => {
    context?.revert();
  });
}
