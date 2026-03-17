<script setup>
import SiteFooter from '@/components/layout/SiteFooter.vue';
import SiteHeader from '@/components/layout/SiteHeader.vue';
</script>

<template>
  <div class="min-h-screen bg-sand text-ink">
    <a
      href="#content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
    >
      Skip to content
    </a>

    <div
      class="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[26rem] bg-[radial-gradient(circle_at_top_left,_rgba(250,242,230,0.95),_rgba(248,242,232,0))]"
    />
    <div
      class="pointer-events-none fixed bottom-0 left-0 right-0 -z-10 h-[24rem] bg-[radial-gradient(circle_at_bottom_right,_rgba(214,192,157,0.24),_rgba(214,192,157,0))]"
    />

    <SiteHeader />

    <main id="content" class="relative">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
