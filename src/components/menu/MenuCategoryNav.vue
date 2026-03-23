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
    class="sticky top-[var(--header-h,64px)] z-30 -mx-[var(--lr-space-gutter)] bg-ivory/95 backdrop-blur-md border-b border-ink/5"
    aria-label="Categorías de la carta"
  >
    <div class="flex gap-1 overflow-x-auto px-[var(--lr-space-gutter)] py-3 no-scrollbar">
      <!-- "All" link to /menu -->
      <RouterLink
        :to="withContext('/menu', { preserveEntry: true })"
        class="flex-shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.78rem] font-medium uppercase tracking-[0.12em] transition-colors whitespace-nowrap"
        :class="
          !activeSlug && route.name === 'menu'
            ? 'bg-ink text-ivory'
            : 'text-stone/70 hover:bg-ink/5 hover:text-ink'
        "
      >
        {{ uiCopy.allLabel }}
      </RouterLink>

      <RouterLink
        v-for="cat in categories"
        :key="cat.slug"
        :to="withContext(`/menu/${cat.slug}`, { preserveEntry: true })"
        class="flex-shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.78rem] font-medium uppercase tracking-[0.12em] transition-colors whitespace-nowrap"
        :class="
          activeSlug === cat.slug
            ? 'bg-ink text-ivory'
            : 'text-stone/70 hover:bg-ink/5 hover:text-ink'
        "
      >
        <MenuIcon :name="cat.icon" :size="15" />
        <span>{{ cat.name }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
