<script setup>
import { ref, shallowRef, onMounted, onUnmounted } from 'vue';

import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from '@/composables/useReducedMotion';

const sketchData = shallowRef({ viewBox: '0 0 688 384', black: [], white: [] });

const props = defineProps({
  label: { type: String, default: 'LaRucula' },
  tagline: { type: String, default: 'Costa del Sol · cocina mediterránea' },
});

const emit = defineEmits(['complete']);

const prefersReducedMotion = useReducedMotion();
const overlayRef = ref(null);
let ctx;
let tl;
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
  tl?.kill();

  gsap.timeline()
    .to('[data-sketch-frame]', {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 0)
    .to('[data-sketch-path], [data-sketch-white]', {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 0)
    .to('[data-load-label], [data-load-line], [data-load-tagline]', {
      autoAlpha: 0,
      y: -10,
      duration: 0.35,
      ease: 'power2.in',
    }, 0.15)
    .to(overlayRef.value, {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: finish,
    }, 0.35);
}

onMounted(async () => {
  document.documentElement.style.overflow = 'hidden';

  if (prefersReducedMotion.value) {
    requestAnimationFrame(() => finish());
    return;
  }

  /* lazy-load SVG path data */
  const mod = await import('@/assets/svg/santi-petri-paths.json');
  sketchData.value = mod.default;

  /* wait one tick for Vue to render the paths */
  await new Promise((r) => requestAnimationFrame(r));

  const { gsap } = ensureGsapPlugins();

  ctx = gsap.context(() => {
    tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    /* ── Act 1: atmosphere (0s) ── */
    tl.fromTo(
      '[data-load-bg]',
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.8 },
      0
    );

    /* ── Act 2: frame draws itself (0.2s) ── */
    const frame = overlayRef.value?.querySelector('[data-sketch-frame]');
    if (frame) {
      const len = frame.getTotalLength();
      gsap.set(frame, {
        strokeDasharray: len,
        strokeDashoffset: len,
        autoAlpha: 1,
      });
      tl.to(frame, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power1.inOut',
      }, 0.2);
    }

    /* ── Act 3: illustration reveals — black paths stagger, white follows ── */
    tl.fromTo(
      '[data-sketch-path]',
      { autoAlpha: 0, y: 3 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        stagger: { amount: 2.2, from: 'start' },
        ease: 'power1.out',
      },
      0.8
    );

    /* white paths visible immediately — no animation, they carve detail from the start */
    gsap.set('[data-sketch-white]', { autoAlpha: 1 });

    /* ── Act 4: name (2.2s) ── */
    tl.fromTo(
      '[data-load-label]',
      { autoAlpha: 0, y: 24, filter: 'blur(3px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
      2.2
    );

    /* ── Act 5: line (2.7s) ── */
    tl.fromTo(
      '[data-load-line]',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
      2.7
    );

    /* ── Act 6: tagline (3.0s) ── */
    tl.fromTo(
      '[data-load-tagline]',
      { autoAlpha: 0, y: 5 },
      { autoAlpha: 1, y: 0, duration: 0.5 },
      3.0
    );

    /* ── Auto-dismiss (5.2s) ── */
    tl.call(() => dismiss(), null, 4.2);
  }, overlayRef.value);

  const handleEscape = (e) => {
    if (e.key === 'Escape') dismiss();
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
    class="fixed inset-0 z-[70] overflow-hidden bg-ivory text-ink"
    role="dialog"
    aria-label="Bienvenida a LaRucula"
  >
    <!-- Background -->
    <div data-load-bg class="absolute inset-0 bg-[#f2eadf] opacity-0" />

    <!-- Framed illustration -->
    <div class="absolute inset-0 flex items-center justify-center pb-[16vh] md:pb-[14vh]">
      <div class="relative w-[min(88vw,720px)]">
        <!-- Single SVG with frame + illustration -->
        <svg
          :viewBox="`-4 -4 ${688 + 8} ${384 + 8}`"
          class="h-auto w-full"
          fill="none"
          aria-hidden="true"
        >
          <!-- Frame rect matching illustration bounds -->
          <rect
            data-sketch-frame
            x="0" y="0"
            :width="688" :height="384"
            rx="4" ry="4"
            stroke="#2a2118"
            stroke-width="4.8"
            stroke-opacity="0.9"
            fill="none"
            class="invisible"
          />

          <!-- Illustration paths -->
          <g data-sketch-group>
            <path
              v-for="(d, i) in sketchData.black"
              :key="'b' + i"
              :d="d"
              data-sketch-path
              fill="#2a2118"
              class="invisible"
            />
            <path
              v-for="(d, i) in sketchData.white"
              :key="'w' + i"
              :d="d"
              data-sketch-white
              class="sketch-white-fill"
            />
          </g>
        </svg>
      </div>
    </div>

    <!-- Label + tagline -->
    <div class="relative z-10 flex h-full flex-col items-center justify-end pb-[8vh] md:pb-[10vh]">
      <p
        data-load-label
        class="invisible font-display text-[clamp(2.8rem,7vw,5.4rem)] font-light italic leading-[0.88] tracking-[-0.05em] text-ink"
      >
        {{ label }}
      </p>

      <div
        data-load-line
        class="mt-4 h-px w-20 origin-center scale-x-0 bg-ink/16"
      />

      <p
        data-load-tagline
        class="invisible mt-3.5 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-stone/50"
      >
        {{ tagline }}
      </p>
    </div>

    <!-- Skip -->
    <button
      @click="dismiss"
      class="absolute bottom-5 right-5 rounded-full border border-ink/8 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-stone/40 transition-colors duration-300 hover:text-ink/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-ink/20"
      aria-label="Saltar introducción"
    >
      Saltar
    </button>
  </div>
</template>

<style scoped>
.sketch-white-fill {
  fill: #f2eadf;
}
</style>
