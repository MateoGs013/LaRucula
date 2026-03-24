<script setup>
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import MenuCategoryNav from '@/components/menu/MenuCategoryNav.vue';
import MenuItem from '@/components/menu/MenuItem.vue';
import MenuIcon from '@/components/svg/MenuIcon.vue';
import LocaleSelector from '@/components/ui/LocaleSelector.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import { siteContent } from '@/app/app-config';
import { useMenuContent } from '@/composables/useMenuContent';
import { useLocale } from '@/composables/useLocale';
import { useRevealMotion } from '@/composables/useRevealMotion';
import { useRouteContext } from '@/composables/useRouteContext';

const route = useRoute();
const router = useRouter();
const pageRef = ref(null);
const { menuData } = useMenuContent();
const { locales } = useLocale();
const { isQrMode, withContext } = useRouteContext();

useRevealMotion(pageRef);

const categories = computed(() => menuData.value.categories);
const category = computed(() => categories.value.find((item) => item.slug === route.params.slug) || null);
const hasMultipleLocales = computed(() => locales.value.length > 1);

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
    <section
      class="relative overflow-hidden"
      :class="
        isQrMode
          ? 'bg-cream pt-4 pb-3'
          : 'bg-dusk pt-[calc(var(--header-h,64px)+1.35rem)] pb-8 md:pb-9 lg:pb-10'
      "
    >
      <div v-if="!isQrMode" class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(138,154,123,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(122,86,59,0.1),transparent_28%)]" />
        <div class="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(36,27,22,0),rgba(36,27,22,0.22))]" />
        <svg class="absolute inset-x-0 bottom-0 w-full opacity-[0.12]" viewBox="0 0 1440 220" fill="none">
          <path d="M0 118 C 136 92, 228 152, 366 128 C 558 94, 690 32, 862 66 C 1058 104, 1212 170, 1440 142" stroke="currentColor" stroke-width="1.2" class="text-ivory" />
          <path d="M0 168 C 160 140, 298 198, 458 184 C 652 166, 790 116, 970 142 C 1146 166, 1274 220, 1440 202" stroke="currentColor" stroke-width="1" class="text-ivory" opacity="0.5" />
        </svg>
      </div>
      <div class="shell">
        <div class="relative z-10 flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,0.68fr)_minmax(14rem,0.32fr)] lg:items-end lg:gap-10">
          <div class="flex items-start gap-3">
            <div class="mt-2" :class="isQrMode ? 'text-stone/30' : 'text-ivory/46'">
              <MenuIcon :name="category.icon" :size="28" />
            </div>
            <div>
              <div v-if="isQrMode" class="mb-2 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ivory px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-stone/55" data-reveal>
                <MenuIcon name="globe" :size="14" />
                {{ menuData.uiCopy.qrBadge }}
              </div>
              <p
                v-if="!isQrMode"
                class="inline-flex items-center gap-2 rounded-full border border-ivory/12 bg-ivory/[0.04] px-3 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ivory/60 backdrop-blur-sm"
                data-reveal
              >
                <span class="inline-block h-1.5 w-1.5 rounded-full bg-sage/55" />
                {{ siteContent.intro.tagline }}
              </p>
              <h1 class="font-display text-[clamp(1.9rem,4.8vw,3.2rem)] font-light italic leading-[0.9] tracking-[-0.04em]" :class="isQrMode ? 'text-ink' : 'text-ivory'" data-reveal>
                {{ category.name }}
              </h1>
              <p
                v-if="category.intro"
                class="mt-1.5 max-w-[30rem] text-[0.9rem] leading-relaxed"
                :class="isQrMode ? 'text-stone/55' : 'text-ivory/72'"
                data-reveal
              >
                {{ category.intro }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4 lg:justify-end" data-reveal>
            <div v-if="hasMultipleLocales && !isQrMode" class="rounded-full border border-ivory/14 bg-ivory/10 px-1.5 py-1 backdrop-blur-sm">
              <LocaleSelector />
            </div>
            <LocaleSelector v-else-if="hasMultipleLocales" />
          </div>
        </div>

        <div v-if="isQrMode" class="mt-4" data-reveal>
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

    <MenuCategoryNav :categories="categories" :active-slug="route.params.slug" />

    <div v-if="category.notes?.length" class="shell mt-4">
      <p
        v-for="note in category.notes"
        :key="`${note.type}-${note.text}`"
        class="text-[0.82rem] italic text-stone/50"
        data-reveal
      >
        {{ note.text }}
      </p>
    </div>

    <section class="pb-8 md:pb-9">
      <div class="shell">
        <div :class="isQrMode ? '' : 'lg:grid lg:grid-cols-[minmax(0,0.18fr)_minmax(0,0.82fr)] lg:gap-10'">
          <div v-if="!isQrMode" class="hidden lg:block" data-reveal>
            <p class="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-stone/35">
              {{ menuData.uiCopy.featuredListTitle }}
            </p>
          </div>
          <div class="mt-4 rounded-[1.35rem] border border-stone/8 bg-ivory/68 px-4 shadow-[0_12px_28px_rgba(61,50,41,0.03)] divide-y divide-stone/8 lg:mt-0 md:px-5 lg:px-6">
            <MenuItem
              v-for="item in category.items"
              :key="item.id"
              :item="item"
              data-reveal
            />
          </div>
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
