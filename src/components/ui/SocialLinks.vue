<script setup>
/**
 * Social media links component.
 * Renders a row of social links with brand-consistent styling.
 */
defineProps({
  links: { type: Array, required: true },
  tone: { type: String, default: 'light' }, // 'light' | 'dark'
});
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-[0.8rem] uppercase tracking-[0.18em] transition-colors duration-300"
      :class="tone === 'dark'
        ? 'text-ivory/40 hover:text-ivory/70'
        : 'text-stone/50 hover:text-ink'"
      :aria-label="link.label"
    >
      {{ link.label }}
    </a>
  </div>
</template>
