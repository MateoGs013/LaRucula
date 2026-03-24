<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from '@/composables/useReducedMotion';

const props = defineProps({
  label: {
    type: String,
    default: 'LaRucula',
  },
  tagline: {
    type: String,
    default: 'Costa del Sol · cocina mediterránea',
  },
});

const emit = defineEmits(['complete']);

const prefersReducedMotion = useReducedMotion();
const overlayRef = ref(null);
let ctx;
let timeline;
let dismissed = false;
let cleanupListeners = null;

function finish() {
  if (dismissed) return;
  dismissed = true;
  document.documentElement.style.overflow = '';
  emit('complete');
}

function dismiss() {
  if (dismissed) return;

  cleanupListeners?.();

  if (prefersReducedMotion.value) {
    finish();
    return;
  }

  const { gsap } = ensureGsapPlugins();
  gsap.killTweensOf(overlayRef.value);
  timeline?.kill();

  gsap.to(overlayRef.value, {
    autoAlpha: 0,
    yPercent: -8,
    duration: 0.8,
    ease: 'power3.inOut',
    onComplete: finish,
  });
}

onMounted(() => {
  document.documentElement.style.overflow = 'hidden';

  if (prefersReducedMotion.value) {
    requestAnimationFrame(() => finish());
    return;
  }

  const { gsap } = ensureGsapPlugins();

  ctx = gsap.context(() => {
    timeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
    });

    timeline
      .fromTo(
        '[data-intro-surface]',
        { autoAlpha: 0, scale: 1.02 },
        { autoAlpha: 1, scale: 1, duration: 0.9 },
        0
      )
      .fromTo(
        '[data-intro-ghost]',
        { autoAlpha: 0, xPercent: 4 },
        { autoAlpha: 1, xPercent: 0, duration: 1 },
        0.12
      )
      .fromTo(
        '[data-intro-kicker]',
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        0.3
      )
      .fromTo(
        '[data-intro-label]',
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.95 },
        0.38
      )
      .fromTo(
        '[data-intro-line]',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.65, ease: 'power2.inOut' },
        0.8
      )
      .fromTo(
        '[data-intro-tagline]',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.62 },
        0.96
      )
      .to('[data-intro-line]', {
        opacity: 0.52,
        duration: 0.2,
      }, 2.15)
      .call(() => dismiss(), null, 4.2);
  }, overlayRef.value);

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      dismiss();
    }
  };
  window.addEventListener('keydown', handleEscape);

  cleanupListeners = () => {
    window.removeEventListener('keydown', handleEscape);
    cleanupListeners = null;
  };
});

onUnmounted(() => {
  ctx?.revert();
  cleanupListeners?.();
  document.documentElement.style.overflow = '';
});
</script>

<template>
  <div
    ref="overlayRef"
    data-intro-overlay
    class="fixed inset-0 z-[70] overflow-hidden bg-ivory text-ink"
    role="dialog"
    aria-label="Bienvenida a LaRucula"
  >
    <div data-intro-surface class="absolute inset-0 opacity-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(92,107,79,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(196,122,82,0.09),transparent_28%),linear-gradient(135deg,#f6f0e4,#f1e9dc_56%,#e9e0cf)]" />
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(61,50,41,0.02),rgba(61,50,41,0.08))]" />
      <svg class="absolute inset-x-0 bottom-[18%] w-full text-stone/22" viewBox="0 0 1440 240" fill="none" aria-hidden="true">
        <path d="M0 118 C 136 92, 228 152, 366 128 C 558 94, 690 32, 862 66 C 1058 104, 1212 170, 1440 142" stroke="currentColor" stroke-width="1.2" />
        <path d="M0 168 C 160 140, 298 198, 458 184 C 652 166, 790 116, 970 142 C 1146 166, 1274 220, 1440 202" stroke="currentColor" stroke-width="1" opacity="0.5" />
      </svg>
      <p
        data-intro-ghost
        class="pointer-events-none absolute right-[-2vw] top-[8svh] hidden font-display text-[clamp(6rem,20vw,17rem)] font-light italic leading-none tracking-[-0.08em] text-ink/[0.045] opacity-0 lg:block"
      >
        Costa
      </p>
    </div>

    <div class="relative flex h-full items-end px-[var(--lr-space-gutter)] pb-12 pt-10 md:items-center md:pb-16 lg:px-[5vw]">
      <div class="max-w-[36rem]">
        <p
          data-intro-kicker
          class="invisible text-[0.72rem] font-medium uppercase tracking-[0.3em] text-stone/52"
        >
          Mediterranean dining house
        </p>
        <p
          data-intro-label
          class="invisible mt-4 font-display text-[clamp(3.35rem,8.6vw,6.8rem)] font-light italic leading-[0.86] tracking-[-0.055em] text-ink"
        >
          {{ label }}
        </p>
        <div
          data-intro-line
          class="mt-6 h-px w-28 origin-left scale-x-0 bg-ink/18"
        />
        <p
          data-intro-tagline
          class="invisible mt-5 max-w-[22rem] text-[0.8rem] font-medium uppercase tracking-[0.28em] text-stone/58"
        >
          {{ tagline }}
        </p>
      </div>
    </div>

    <button
      data-intro-skip
      @click="dismiss"
      class="absolute bottom-6 right-6 rounded-full border border-ink/10 bg-ivory/55 px-3.5 py-2 text-[0.76rem] uppercase tracking-[0.22em] text-stone/60 backdrop-blur-sm transition-colors duration-300 hover:border-ink/18 hover:text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-ink/20"
      aria-label="Saltar introducción"
    >
      Saltar
    </button>
  </div>
</template>
