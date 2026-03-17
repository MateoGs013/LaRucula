<script setup>
import { RouterLink } from 'vue-router';

import { contactDetails, primaryNavigation, siteMeta } from '@/app/app-config';
import CoastalDivider from '@/components/svg/CoastalDivider.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
</script>

<template>
  <footer class="mt-16 border-t border-ink/10 pt-16 md:mt-24 md:pt-20">
    <div class="shell space-y-10 pb-10">
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.55fr)_minmax(0,0.55fr)]">
        <div class="space-y-5">
          <p class="eyebrow">
            Closing note
          </p>
          <h2 class="max-w-[11ch] font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.04em]">
            Calm hospitality, framed for the coast.
          </h2>
          <p class="max-w-copy text-base leading-7 text-stone md:text-lg md:leading-8">
            The footer is intentionally ready for richer brand content, final reservation tooling,
            and a more authored location story.
          </p>
          <BaseButton :to="siteMeta.reservationHref">
            {{ siteMeta.reservationLabel }}
          </BaseButton>
        </div>

        <div class="space-y-4">
          <p class="eyebrow">
            Navigate
          </p>
          <nav class="grid gap-3">
            <RouterLink
              v-for="item in primaryNavigation"
              :key="item.to"
              :to="item.to"
              class="text-sm uppercase tracking-[0.24em] text-stone transition-colors duration-300 hover:text-ink"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
        </div>

        <div class="space-y-4">
          <p class="eyebrow">
            Visit
          </p>
          <div class="space-y-3 text-base leading-7 text-stone">
            <p>{{ contactDetails.address }}</p>
            <p>{{ contactDetails.city }}</p>
            <p>{{ contactDetails.hours }}</p>
            <a class="block transition-colors duration-300 hover:text-ink" :href="`tel:${contactDetails.phone}`">
              {{ contactDetails.phone }}
            </a>
            <a
              class="block transition-colors duration-300 hover:text-ink"
              :href="`mailto:${contactDetails.email}`"
            >
              {{ contactDetails.email }}
            </a>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 border-t border-ink/10 pt-6 text-sm text-stone md:flex-row md:items-center md:justify-between">
        <CoastalDivider class="w-full max-w-[10rem] text-toast/65" />
        <p>
          {{ siteMeta.name }} foundation scaffold for Claude implementation.
        </p>
      </div>
    </div>
  </footer>
</template>
