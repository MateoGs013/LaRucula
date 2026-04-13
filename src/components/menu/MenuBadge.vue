<script setup>
import { computed } from 'vue';

import MenuIcon from '@/components/svg/MenuIcon.vue';
import { getMenuUiCopy } from '@/data/menu-ui-copy';
import { useLocale } from '@/composables/useLocale';

const props = defineProps({
  badge: { type: String, required: true },
});

const { locale } = useLocale();

const badgeConfig = {
  recommended: { icon: 'star', color: 'text-toast' },
  spicy: { icon: 'flame', color: 'text-toast' },
  vegetarian: { icon: 'vegetarian', color: 'text-sage' },
  gluten_free: { icon: 'gluten-free', color: 'text-sage' },
  seasonal: { icon: 'seasonal', color: 'text-olive' },
  lunch_only: { icon: 'clock', color: 'text-stone' },
  dinner_only: { icon: 'clock', color: 'text-stone' },
};

const config = computed(() => {
  const uiCopy = getMenuUiCopy(locale.value);
  const baseConfig = badgeConfig[props.badge] || { icon: 'star', color: 'text-stone' };

  return {
    ...baseConfig,
    label: uiCopy.badgeLabels[props.badge] || props.badge,
  };
});
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.1em]"
    :class="[config.color, 'bg-current/14']"
    :style="{ backgroundColor: `color-mix(in srgb, currentColor 14%, transparent)` }"
  >
    <MenuIcon :name="config.icon" :size="13" />
    <span>{{ config.label }}</span>
  </span>
</template>
