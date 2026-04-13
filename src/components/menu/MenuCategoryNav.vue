<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import MenuIcon from '@/components/svg/MenuIcon.vue';
import { getMenuUiCopy } from '@/data/menu-ui-copy';
import { useLocale } from '@/composables/useLocale';
import { useRouteContext } from '@/composables/useRouteContext';

defineProps({
  sections: { type: Array, required: true },
  activeSlug: { type: String, default: '' },
});

const route = useRoute();
const { locale } = useLocale();
const { withContext } = useRouteContext();
const uiCopy = computed(() => getMenuUiCopy(locale.value));
</script>

<template>
  <nav
    class="sticky top-[var(--header-h,64px)] z-30 w-full border-b border-stone/8 bg-cream/94 backdrop-blur-md"
    aria-label="Secciones de la carta"
  >
    <div class="shell">
      <div class="flex gap-1 overflow-x-auto py-2.5 no-scrollbar lg:justify-center">
        <RouterLink
          :to="withContext('/menu', { preserveEntry: true })"
          class="flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-1.75 text-[0.75rem] font-medium uppercase tracking-[0.12em] whitespace-nowrap transition-colors"
          :class="
            !activeSlug && route.name === 'menu'
              ? 'bg-ink text-ivory'
              : 'text-stone/82 hover:bg-ink/4 hover:text-ink'
          "
        >
          {{ uiCopy.allLabel }}
        </RouterLink>

        <RouterLink
          v-for="section in sections"
          :key="section.slug"
          :to="withContext(`/menu/${section.slug}`, { preserveEntry: true })"
          class="flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-1.75 text-[0.75rem] font-medium uppercase tracking-[0.12em] whitespace-nowrap transition-colors"
          :class="
            activeSlug === section.slug
              ? 'bg-ink text-ivory'
              : 'text-stone/82 hover:bg-ink/4 hover:text-ink'
          "
        >
          <MenuIcon :name="section.icon" :size="14" />
          <span>{{ section.name }}</span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
