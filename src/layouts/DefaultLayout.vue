<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import SiteFooter from '@/components/layout/SiteFooter.vue';
import SiteHeader from '@/components/layout/SiteHeader.vue';

const route = useRoute();
const isQrLayout = computed(
  () =>
    String(route.query.entry || '').trim().toLowerCase() === 'qr' &&
    (route.name === 'menu' || route.name === 'menu-category')
);
</script>

<template>
  <div class="min-h-screen text-ink" :style="isQrLayout ? { '--header-h': '0px' } : null">
    <a
      href="#content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
    >
      Saltar al contenido
    </a>

    <SiteHeader v-if="!isQrLayout" />

    <main id="content" class="relative">
      <slot />
    </main>

    <SiteFooter v-if="!isQrLayout" />
  </div>
</template>
