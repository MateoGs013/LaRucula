<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from '@/composables/useReducedMotion';

const emit = defineEmits(['complete']);

const prefersReducedMotion = useReducedMotion();
const overlayRef = ref(null);
let ctx;
let timeline;
let isLifting = false;
let cleanupListeners = null;

function complete() {
  document.documentElement.style.overflow = '';
  emit('complete');
}

function liftCurtain() {
  if (isLifting) return;
  isLifting = true;

  if (timeline) timeline.kill();
  cleanupListeners?.();

  const { gsap } = ensureGsapPlugins();

  gsap.to(overlayRef.value, {
    yPercent: -100,
    duration: 0.9,
    ease: 'power3.inOut',
    onComplete: complete,
  });
}

function skip() {
  liftCurtain();
}

onMounted(() => {
  document.documentElement.style.overflow = 'hidden';

  if (prefersReducedMotion.value) {
    requestAnimationFrame(() => {
      document.documentElement.style.overflow = '';
      emit('complete');
    });
    return;
  }

  const { gsap } = ensureGsapPlugins();

  ctx = gsap.context(() => {
    timeline = gsap.timeline();

    timeline.fromTo(
      '[data-intro-name]',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0.4
    );

    timeline.fromTo(
      '[data-intro-line]',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
      0.9
    );

    timeline.fromTo(
      '[data-intro-tagline]',
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.5 },
      1.3
    );

    timeline.call(() => liftCurtain(), null, 2.8);
  }, overlayRef.value);

  const handleSkip = () => {
    skip();
    cleanupListeners?.();
  };

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
  document.documentElement.style.overflow = '';
  cleanupListeners?.();
});
</script>

<template>
  <div
    ref="overlayRef"
    class="fixed inset-0 z-50 flex items-center justify-center bg-ink"
    role="dialog"
    aria-label="Welcome to LaRucula"
  >
    <div class="text-center">
      <p
        data-intro-name
        class="invisible font-display text-[clamp(2.8rem,7vw,5.5rem)] font-light italic tracking-[-0.04em] text-ivory"
      >
        LaRucula
      </p>
      <div
        data-intro-line
        class="mx-auto mt-4 h-px w-20 origin-center scale-x-0 bg-ivory/25"
      />
      <p
        data-intro-tagline
        class="invisible mt-5 text-[0.68rem] uppercase tracking-[0.3em] text-ivory/35"
      >
        Beachfront dining · Costa del Sol
      </p>
    </div>

    <button
      @click="skip"
      class="absolute bottom-6 right-6 px-3 py-2 text-[0.65rem] uppercase tracking-[0.25em] text-ivory/25 transition-colors duration-300 hover:text-ivory/50 focus:text-ivory/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-ivory/30"
      aria-label="Skip introduction"
    >
      Skip
    </button>
  </div>
</template>
