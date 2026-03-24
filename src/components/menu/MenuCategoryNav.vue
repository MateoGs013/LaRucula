<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import MenuIcon from '@/components/svg/MenuIcon.vue';
import { getMenuUiCopy } from '@/data/menu-ui-copy';
import { useLocale } from '@/composables/useLocale';
import { useRouteContext } from '@/composables/useRouteContext';

defineProps({
  categories: { type: Array, required: true },
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
    aria-label="Categorías de la carta"
  >
    <div class="shell">
      <div class="flex gap-1 overflow-x-auto py-2.5 no-scrollbar">
      <RouterLink
        :to="withContext('/menu', { preserveEntry: true })"
        class="flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-1.75 text-[0.75rem] font-medium uppercase tracking-[0.12em] whitespace-nowrap transition-colors"
        :class="
          !activeSlug && route.name === 'menu'
            ? 'bg-ink text-ivory'
            : 'text-stone/72 hover:bg-ink/4 hover:text-ink'
        "
      >
        {{ uiCopy.allLabel }}
      </RouterLink>

      <RouterLink
        v-for="cat in categories"
        :key="cat.slug"
        :to="withContext(`/menu/${cat.slug}`, { preserveEntry: true })"
        class="flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-1.75 text-[0.75rem] font-medium uppercase tracking-[0.12em] whitespace-nowrap transition-colors"
        :class="
          activeSlug === cat.slug
            ? 'bg-ink text-ivory'
            : 'text-stone/72 hover:bg-ink/4 hover:text-ink'
        "
        >
          <MenuIcon :name="cat.icon" :size="14" />
          <span>{{ cat.name }}</span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
