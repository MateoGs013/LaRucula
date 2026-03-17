<script setup>
import { ref } from 'vue';

import { useRevealMotion } from '@/composables/useRevealMotion';

const root = ref(null);

useRevealMotion(root);
</script>

<template>
  <div ref="root" class="pb-24 pt-10 md:pb-32 md:pt-14">
    <div class="space-y-24 md:space-y-32">
      <slot />
    </div>
  </div>
</template>
