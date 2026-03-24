<script setup>
import { computed } from 'vue';

import MenuBadge from './MenuBadge.vue';
import { getMenuNumberLocale, getMenuUiCopy } from '@/data/menu-ui-copy';
import { useLocale } from '@/composables/useLocale';

defineProps({
  item: { type: Object, required: true },
});

const { locale } = useLocale();
const uiCopy = computed(() => getMenuUiCopy(locale.value));

function formatPrice(price, currency) {
  if (!price && price !== 0) return '';
  return new Intl.NumberFormat(getMenuNumberLocale(locale.value), {
    style: 'currency',
    currency: currency || 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
</script>

<template>
  <article
    class="group relative py-4.5 md:py-5 transition-colors"
    :class="{
      'opacity-40': item.availability === 'unavailable',
    }"
  >
    <div class="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 gap-y-3 md:gap-x-8">
      <!-- Name + description -->
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <h3
            class="font-display text-[1.15rem] italic leading-snug tracking-[-0.01em] text-ink"
            :class="{ 'line-through opacity-50': item.availability === 'unavailable' }"
          >
            {{ item.name }}
          </h3>
          <span
          v-if="item.recommended"
          class="inline-block h-1.5 w-1.5 rounded-full bg-toast"
          :title="uiCopy.featuredBadge"
        />
        </div>
        <p
          v-if="item.description"
          class="mt-1 max-w-[56ch] text-[0.9rem] leading-relaxed text-stone/68"
        >
          {{ item.description }}
        </p>

        <!-- Badges -->
        <div v-if="item.badges?.length" class="mt-2 flex flex-wrap gap-1.5">
          <MenuBadge
            v-for="badge in item.badges"
            :key="badge"
            :badge="badge"
          />
        </div>
      </div>

      <!-- Price -->
      <div class="flex-shrink-0 pt-0.5 text-right">
        <span
          v-if="item.availability !== 'unavailable' && item.price"
          class="font-display text-[1rem] tabular-nums tracking-[-0.01em] text-ink/62"
        >
          {{ formatPrice(item.price, item.currency) }}
        </span>
        <span
          v-else-if="item.availability === 'unavailable'"
          class="text-[0.8rem] italic text-stone/40"
        >
          {{ uiCopy.unavailableLabel }}
        </span>
      </div>
    </div>
  </article>
</template>
