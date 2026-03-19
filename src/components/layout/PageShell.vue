<script setup>
import { ref } from 'vue';

import { useRevealMotion } from '@/composables/useRevealMotion';

const root = ref(null);

useRevealMotion(root);
</script>

<template>
  <div ref="root">
    <slot />
  </div>
</template>
