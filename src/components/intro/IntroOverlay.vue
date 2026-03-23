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
  image: {
    type: String,
    default: '',
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
        '[data-intro-image]',
        { scale: 1.08, autoAlpha: 0 },
        { scale: 1, autoAlpha: 0.38, duration: 1.45 },
        0
      )
      .fromTo(
        '[data-intro-label]',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        0.25
      )
      .fromTo(
        '[data-intro-line]',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.55, ease: 'power2.inOut' },
        0.65
      )
      .fromTo(
        '[data-intro-tagline]',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        0.88
      )
      .to('[data-intro-line]', {
        opacity: 0.45,
        duration: 0.2,
      }, 1.6)
      .call(() => dismiss(), null, 2.5);
  }, overlayRef.value);

  const handleSkip = () => dismiss();
  window.addEventListener('wheel', handleSkip, { passive: true });
  window.addEventListener('touchmove', handleSkip, { passive: true });
  window.addEventListener('keydown', handleSkip);

  cleanupListeners = () => {
    window.removeEventListener('wheel', handleSkip);
    window.removeEventListener('touchmove', handleSkip);
    window.removeEventListener('keydown', handleSkip);
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
    class="fixed inset-0 z-[70] overflow-hidden bg-ink text-ivory"
    role="dialog"
    aria-label="Bienvenida a LaRucula"
  >
    <div class="absolute inset-0">
      <img
        v-if="image"
        :src="image"
        alt=""
        aria-hidden="true"
        data-intro-image
        class="absolute inset-0 h-full w-full object-cover opacity-0"
        fetchpriority="high"
      />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,245,230,0.12),transparent_35%),linear-gradient(135deg,rgba(21,19,17,0.4),rgba(21,19,17,0.88))]" />
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,19,17,0.2),rgba(21,19,17,0.88))]" />
    </div>

    <div class="relative flex h-full items-end px-[var(--lr-space-gutter)] pb-12 pt-10 md:items-center md:pb-16 lg:px-[5vw]">
      <div class="max-w-[32rem]">
        <p
          data-intro-label
          class="invisible font-display text-[clamp(3rem,8vw,6rem)] font-light italic leading-[0.88] tracking-[-0.05em] text-ivory"
        >
          {{ label }}
        </p>
        <div
          data-intro-line
          class="mt-5 h-px w-24 origin-left scale-x-0 bg-ivory/35"
        />
        <p
          data-intro-tagline
          class="invisible mt-5 max-w-[22rem] text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ivory/45"
        >
          {{ tagline }}
        </p>
      </div>
    </div>

    <button
      data-intro-skip
      @click="dismiss"
      class="absolute bottom-6 right-6 rounded-full border border-ivory/14 px-3.5 py-2 text-[0.76rem] uppercase tracking-[0.22em] text-ivory/40 transition-colors duration-300 hover:border-ivory/28 hover:text-ivory/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-ivory/30"
      aria-label="Saltar introducción"
    >
      Saltar
    </button>
  </div>
</template>
