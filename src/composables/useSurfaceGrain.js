import { onMounted, onUnmounted, unref } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Section-specific surface textures that respond to scroll.
 * Adds tactile material character to each section beyond flat color.
 */
export function useSurfaceGrain(scopeRef) {
  const prefersReducedMotion = useReducedMotion();
  let context;

  onMounted(() => {
    const scope = unref(scopeRef);
    if (!scope || prefersReducedMotion.value) return;

    const { gsap, ScrollTrigger } = ensureGsapPlugins();

    context = gsap.context(() => {
      // Thesis — linen weave texture intensifies during scroll lock
      const thesisInner = scope.querySelector('[data-thesis-inner]');
      if (thesisInner) {
        const linen = document.createElement('div');
        linen.setAttribute('aria-hidden', 'true');
        linen.dataset.surfaceLinen = '';
        Object.assign(linen.style, {
          position: 'absolute', inset: '0', pointerEvents: 'none',
          zIndex: '1', opacity: '0', mixBlendMode: 'multiply',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0zM2 2h1v1H2zM4 0h1v1H4zM6 2h1v1H6zM0 4h1v1H0zM2 6h1v1H2zM4 4h1v1H4zM6 6h1v1H6z' fill='%23b0a896' fill-opacity='0.12'/%3E%3C/svg%3E")`,
          backgroundSize: '8px 8px',
        });
        thesisInner.appendChild(linen);

        gsap.fromTo(linen,
          { opacity: 0 },
          {
            opacity: 0.4,
            scrollTrigger: {
              trigger: scope.querySelector('[data-thesis-lock]'),
              start: '20% top',
              end: '50% top',
              scrub: 0.6,
            },
          }
        );
        gsap.to(linen, {
          opacity: 0,
          scrollTrigger: {
            trigger: scope.querySelector('[data-thesis-lock]'),
            start: '60% top',
            end: '85% top',
            scrub: 0.6,
          },
        });
      }

      // Atmosphere — warm diffusion grain
      const atmoSection = scope.querySelector('[data-atmo-section]');
      if (atmoSection) {
        const warmGrain = document.createElement('div');
        warmGrain.setAttribute('aria-hidden', 'true');
        Object.assign(warmGrain.style, {
          position: 'absolute', inset: '0', pointerEvents: 'none',
          zIndex: '0', opacity: '0', mixBlendMode: 'overlay',
        });
        warmGrain.innerHTML = `<svg width="100%" height="100%" style="position:absolute;inset:0"><filter id="atmo-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0.3"/></filter><rect width="100%" height="100%" filter="url(#atmo-grain)"/></svg>`;
        atmoSection.style.position = 'relative';
        atmoSection.appendChild(warmGrain);

        gsap.to(warmGrain, {
          opacity: 0.08,
          scrollTrigger: {
            trigger: atmoSection,
            start: 'top 70%',
            end: 'center center',
            scrub: 0.8,
          },
        });
      }

      // Craft — paper grain with subtle intensification
      const craftSection = scope.querySelector('[data-craft-section]');
      if (craftSection) {
        const paperGrain = document.createElement('div');
        paperGrain.setAttribute('aria-hidden', 'true');
        Object.assign(paperGrain.style, {
          position: 'absolute', inset: '0', pointerEvents: 'none',
          zIndex: '0', opacity: '0', mixBlendMode: 'multiply',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23a09080' fill-opacity='0.08'/%3E%3Ccircle cx='4' cy='3' r='0.4' fill='%23a09080' fill-opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundSize: '6px 6px',
        });
        craftSection.style.position = 'relative';
        craftSection.appendChild(paperGrain);

        gsap.fromTo(paperGrain,
          { opacity: 0 },
          {
            opacity: 0.5,
            scrollTrigger: {
              trigger: craftSection,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 0.8,
            },
          }
        );
      }

      // Invitation — glass condensation shimmer
      const invSection = scope.querySelector('[data-invitation-section]');
      if (invSection) {
        const glassShimmer = document.createElement('div');
        glassShimmer.setAttribute('aria-hidden', 'true');
        Object.assign(glassShimmer.style, {
          position: 'absolute', inset: '0', pointerEvents: 'none',
          zIndex: '2', opacity: '0', mixBlendMode: 'soft-light',
          background: 'radial-gradient(ellipse at 50% 45%, rgba(248,242,232,0.15) 0%, transparent 60%)',
        });
        const imgContainer = invSection.querySelector('[data-image-reveal]');
        if (imgContainer) {
          imgContainer.style.position = 'relative';
          imgContainer.appendChild(glassShimmer);

          gsap.to(glassShimmer, {
            opacity: 1,
            scrollTrigger: {
              trigger: invSection,
              start: 'top 60%',
              end: 'center center',
              scrub: 0.8,
            },
          });
        }
      }
    }, scope);
  });

  onUnmounted(() => {
    context?.revert();
  });
}
