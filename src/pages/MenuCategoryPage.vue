<script setup>
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import MenuCategoryNav from '@/components/menu/MenuCategoryNav.vue';
import MenuItem from '@/components/menu/MenuItem.vue';
import MenuIcon from '@/components/svg/MenuIcon.vue';
import LocaleSelector from '@/components/ui/LocaleSelector.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import { useMenuContent } from '@/composables/useMenuContent';
import { useRevealMotion } from '@/composables/useRevealMotion';
import { useRouteContext } from '@/composables/useRouteContext';

const route = useRoute();
const router = useRouter();
const pageRef = ref(null);
const { menuData } = useMenuContent();
const { isQrMode, withContext } = useRouteContext();

useRevealMotion(pageRef);

const categories = computed(() => menuData.value.categories);
const category = computed(() => categories.value.find((item) => item.slug === route.params.slug) || null);

watch(
  category,
  (value) => {
    if (!value) {
      void router.replace(withContext('/menu', { preserveEntry: true }));
    }
  },
  { immediate: true }
);
</script>

<template>
  <div ref="pageRef" v-if="category">
    <section class="bg-cream" :class="isQrMode ? 'pt-6 pb-5' : 'pt-[calc(var(--header-h,64px)+1.5rem)] pb-6'">
      <div class="shell">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div class="flex items-start gap-3">
            <div class="mt-2 text-stone/30">
              <MenuIcon :name="category.icon" :size="28" />
            </div>
            <div>
              <div v-if="isQrMode" class="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ivory px-3 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-stone/55" data-reveal>
                <MenuIcon name="globe" :size="14" />
                {{ menuData.uiCopy.qrBadge }}
              </div>
              <h1 class="font-display text-[clamp(2rem,5vw,3.4rem)] font-light italic leading-[0.9] tracking-[-0.04em] text-ink" data-reveal>
                {{ category.name }}
              </h1>
              <p
                v-if="category.intro"
                class="mt-1.5 max-w-md text-[0.9rem] leading-relaxed text-stone/55"
                data-reveal
              >
                {{ category.intro }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4" data-reveal>
            <LocaleSelector />
          </div>
        </div>

        <div v-if="isQrMode" class="mt-5" data-reveal>
          <RouterLink
            :to="withContext('/menu', { preserveEntry: true })"
            class="inline-flex items-center gap-2 text-[0.76rem] font-medium uppercase tracking-[0.16em] text-stone/55 transition-colors hover:text-ink"
          >
            <MenuIcon name="arrow-right" :size="14" class="rotate-180" />
            {{ menuData.uiCopy.backToMenu }}
          </RouterLink>
        </div>
      </div>
    </section>

    <div class="shell">
      <MenuCategoryNav :categories="categories" :active-slug="route.params.slug" />
    </div>

    <div v-if="category.notes?.length" class="shell mt-5">
      <p
        v-for="note in category.notes"
        :key="`${note.type}-${note.text}`"
        class="text-[0.82rem] italic text-stone/45"
        data-reveal
      >
        {{ note.text }}
      </p>
    </div>

    <section class="pb-8 md:pb-10">
      <div class="shell">
        <div class="mt-4 divide-y divide-ink/6">
          <MenuItem
            v-for="item in category.items"
            :key="item.id"
            :item="item"
            data-reveal
          />
        </div>
      </div>
    </section>

    <section v-if="!isQrMode" class="py-8 md:py-10">
      <div class="shell flex flex-col items-center text-center">
        <div class="mb-4 max-w-10 text-sage/25" data-reveal>
          <SignatureStroke />
        </div>
        <p class="text-[0.82rem] text-stone/40" data-reveal>
          {{ menuData.uiCopy.closingNote }}
        </p>
      </div>
    </section>
  </div>
</template>
