<script setup>
import { RouterLink, useRoute } from 'vue-router';

import { primaryNavigation, siteMeta } from '@/app/app-config';
import BaseButton from '@/components/ui/BaseButton.vue';

const route = useRoute();

const isActive = (item) =>
  item.to === '/'
    ? route.path === item.to
    : route.path.startsWith(item.to);
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-ink/10 bg-ivory/78 backdrop-blur-xl">
    <div class="shell py-4 md:flex md:items-center md:justify-between md:gap-8">
      <div class="flex items-center justify-between gap-4">
        <RouterLink to="/" class="space-y-1">
          <p class="font-display text-[1.85rem] leading-none tracking-[-0.05em] text-ink">
            {{ siteMeta.name }}
          </p>
          <p class="eyebrow text-ink/55">
            {{ siteMeta.label }}
          </p>
        </RouterLink>

        <BaseButton class="md:hidden" :to="siteMeta.reservationHref" variant="ghost">
          {{ siteMeta.reservationLabel }}
        </BaseButton>
      </div>

      <div class="mt-4 flex items-center justify-between gap-6 md:mt-0 md:flex-1">
        <nav class="flex gap-5 overflow-x-auto pb-1 md:pb-0">
          <RouterLink
            v-for="item in primaryNavigation"
            :key="item.to"
            :to="item.to"
            class="shrink-0 font-body text-[0.72rem] uppercase tracking-[0.28em] transition-colors duration-300"
            :class="
              isActive(item)
                ? 'text-ink'
                : 'text-ink/55 hover:text-ink'
            "
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <BaseButton class="hidden md:inline-flex" :to="siteMeta.reservationHref" variant="ghost">
          {{ siteMeta.reservationLabel }}
        </BaseButton>
      </div>
    </div>
  </header>
</template>
