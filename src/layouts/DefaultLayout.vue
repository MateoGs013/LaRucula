<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import SiteFooter from '@/components/layout/SiteFooter.vue';
import SiteHeader from '@/components/layout/SiteHeader.vue';

const route = useRoute();
const showFooter = computed(() => route.path !== '/');
</script>

<template>
  <div class="min-h-screen text-ink">
    <a
      href="#content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
    >
      Skip to content
    </a>

    <SiteHeader />

    <main id="content" class="relative">
      <slot />
    </main>

    <SiteFooter v-if="showFooter" />
  </div>
</template>
