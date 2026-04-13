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
  if (price === null || price === undefined) return '';
  return new Intl.NumberFormat(getMenuNumberLocale(locale.value), {
    style: 'currency',
    currency: currency || 'EUR',
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
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
    <div class="flex items-start justify-between gap-x-3 md:gap-x-6">
      <!-- Name + description -->
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <h3
            class="font-display text-[1.12rem] font-medium leading-snug tracking-[-0.005em] text-ink"
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
          class="mt-0.5 max-w-[52ch] text-[0.82rem] leading-relaxed text-stone/72"
        >
          {{ item.description }}
        </p>

        <!-- Badges -->
        <div v-if="item.badges?.length" class="mt-1.5 flex flex-wrap gap-1.5">
          <MenuBadge
            v-for="badge in item.badges"
            :key="badge"
            :badge="badge"
          />
        </div>
      </div>

      <!-- Price area -->
      <div class="flex-shrink-0 pt-0.5">
        <!-- Single price -->
        <div v-if="item.price_alt == null">
          <span
            v-if="item.availability !== 'unavailable' && item.price != null"
            class="font-display text-[1.05rem] font-medium tabular-nums tracking-[-0.01em] text-ink"
          >
            {{ formatPrice(item.price, item.currency) }}
          </span>
          <span
            v-else-if="item.availability === 'unavailable'"
            class="text-[0.78rem] italic text-stone/60"
          >
            {{ uiCopy.unavailableLabel }}
          </span>
        </div>

        <!-- Dual prices -->
        <div v-else class="space-y-0.5 text-right">
          <div v-if="item.price != null" class="flex items-baseline justify-end gap-1.5">
            <span class="text-[0.68rem] font-medium uppercase tracking-[0.06em] text-stone/62">
              {{ item.price_label || '1/2' }}
            </span>
            <span class="font-display text-[0.92rem] tabular-nums tracking-[-0.01em] text-ink/75">
              {{ formatPrice(item.price, item.currency) }}
            </span>
          </div>
          <div v-if="item.price_alt != null" class="flex items-baseline justify-end gap-1.5">
            <span class="text-[0.68rem] font-medium uppercase tracking-[0.06em] text-stone/62">
              {{ item.price_alt_label || '1' }}
            </span>
            <span class="font-display text-[1.05rem] font-medium tabular-nums tracking-[-0.01em] text-ink">
              {{ formatPrice(item.price_alt, item.currency) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
