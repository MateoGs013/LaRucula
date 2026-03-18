<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ensureGsapPlugins } from '@/motion/gsap';
import { useReducedMotion } from '@/composables/useReducedMotion';

const pathRef = ref(null);
const prefersReducedMotion = useReducedMotion();
let trigger;

onMounted(() => {
  const path = pathRef.value;
  if (!path || prefersReducedMotion.value) return;

  const { gsap, ScrollTrigger } = ensureGsapPlugins();
  const length = path.getTotalLength();

  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

  trigger = ScrollTrigger.create({
    trigger: path.closest('svg'),
    start: 'top 90%',
    once: true,
    onEnter() {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    },
  });
});

onUnmounted(() => {
  trigger?.kill();
});
</script>

<template>
  <svg viewBox="0 0 208 28" fill="none" aria-hidden="true" class="h-auto w-full">
    <path
      ref="pathRef"
      d="M4 16C28 22 52 3 78 9C101 14 122 26 150 18C165 13 181 8 204 10"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="2.2"
    />
  </svg>
</template>
