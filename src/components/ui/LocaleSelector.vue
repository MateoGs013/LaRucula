<script setup>
import { computed } from 'vue';
import { useLocale } from '@/composables/useLocale';

const { locale, locales, setLocale } = useLocale();
const hasMultipleLocales = computed(() => locales.value.length > 1);
</script>

<template>
  <div v-if="hasMultipleLocales" class="flex items-center gap-1" role="group" aria-label="Seleccionar idioma">
    <button
      v-for="loc in locales"
      :key="loc.code"
      class="rounded-full px-2.5 py-1 text-[0.75rem] font-medium uppercase tracking-[0.1em] transition-colors"
      :class="
        locale === loc.code
          ? 'bg-ink text-ivory'
          : 'text-stone/60 hover:bg-ink/5 hover:text-ink'
      "
      :aria-current="locale === loc.code ? 'true' : undefined"
      :aria-label="`Cambiar a ${loc.label}`"
      @click="setLocale(loc.code)"
    >
      {{ loc.code }}
    </button>
  </div>
</template>
