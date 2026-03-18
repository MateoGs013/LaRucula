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
    start: 'top 92%',
    once: true,
    onEnter() {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1,
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
  <svg viewBox="0 0 280 20" fill="none" aria-hidden="true" class="h-auto w-full">
    <path
      ref="pathRef"
      d="M2 10H78C94 10 99 4 114 4C126 4 134 16 149 16C168 16 170 6 188 6C204 6 210 14 222 14H278"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="1.75"
    />
  </svg>
</template>
