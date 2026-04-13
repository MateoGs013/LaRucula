<script setup>
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import MenuCategoryNav from '@/components/menu/MenuCategoryNav.vue';
import MenuItem from '@/components/menu/MenuItem.vue';
import MenuNote from '@/components/menu/MenuNote.vue';
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
const { menuData, sections } = useMenuContent();
const { locales } = useLocale();
const { isQrMode, withContext } = useRouteContext();

useRevealMotion(pageRef);

const section = computed(() =>
  sections.value.find((s) => s.slug === route.params.slug) || null
);
const hasMultipleLocales = computed(() => locales.value.length > 1);

function categoryHasDualPricing(category) {
  return category.items.some((item) => item.price_alt != null);
}

watch(
  section,
  (value) => {
    if (!value) {
      void router.replace(withContext('/menu', { preserveEntry: true }));
    }
  },
  { immediate: true }
);
</script>

<template>
  <div ref="pageRef" v-if="section">
    <!-- Section hero -->
    <section
      class="relative overflow-hidden"
      :class="
        isQrMode
          ? 'bg-cream pt-4 pb-3'
          : 'bg-dusk pt-14 pb-12 md:pt-20 md:pb-16 lg:pt-32 lg:pb-24'
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
            <div class="mt-2" :class="isQrMode ? 'text-stone/55' : 'text-ivory/62'">
              <MenuIcon :name="section.icon" :size="28" />
            </div>
            <div>
              <div v-if="isQrMode" class="mb-2 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ivory px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-stone/68" data-reveal>
                <MenuIcon name="globe" :size="14" />
                {{ menuData.uiCopy.qrBadge }}
              </div>
              <p
                v-if="!isQrMode"
                class="hidden sm:inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-ivory/12 bg-ivory/[0.07] px-3 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ivory/78 backdrop-blur-sm"
                data-reveal
              >
                <span class="inline-block h-1.5 w-1.5 rounded-full bg-sage/55" />
                {{ siteContent.intro.tagline }}
              </p>
              <h1 class="mt-3 md:mt-4 font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-light italic leading-[0.9] tracking-[-0.04em]" :class="isQrMode ? 'text-ink' : 'text-ivory'" data-reveal>
                {{ section.name }}
              </h1>
              <p
                v-if="section.intro"
                class="mt-1.5 max-w-[30rem] text-[0.9rem] leading-relaxed"
                :class="isQrMode ? 'text-stone/68' : 'text-ivory/80'"
                data-reveal
              >
                {{ section.intro }}
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
            class="inline-flex items-center gap-2 text-[0.76rem] font-medium uppercase tracking-[0.16em] text-stone/68 transition-colors hover:text-ink"
          >
            <MenuIcon name="arrow-right" :size="14" class="rotate-180" />
            {{ menuData.uiCopy.backToMenu }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Section nav -->
    <MenuCategoryNav :sections="sections" :active-slug="route.params.slug" />

    <!-- Section-level notes -->
    <div v-if="section.notes?.length" class="shell mt-5 max-w-xl" data-reveal>
      <MenuNote :notes="section.notes" />
    </div>

    <!-- Categories within this section -->
    <section
      v-for="category in section.categories"
      :key="category.id"
      :id="category.slug"
      class="scroll-mt-[calc(var(--header-h,64px)+56px)]"
    >
      <div class="shell py-6 md:py-7">
        <div :class="isQrMode ? '' : 'lg:grid lg:grid-cols-[minmax(0,0.24fr)_minmax(0,0.76fr)] lg:gap-10'">
          <!-- Category sidebar -->
          <div class="mb-4 lg:mb-0" data-reveal>
            <div class="flex items-start gap-3">
              <div class="mt-0.5 flex-shrink-0 text-toast/55">
                <MenuIcon :name="category.icon" :size="20" />
              </div>
              <div>
                <h2 class="font-display text-[clamp(1.4rem,3vw,2rem)] font-light italic leading-none tracking-[-0.02em] text-ink">
                  {{ category.name }}
                </h2>
              </div>
            </div>
            <div v-if="category.notes?.length" class="mt-3 lg:pl-8">
              <MenuNote :notes="category.notes" />
            </div>
          </div>

          <!-- Items list -->
          <div class="rounded-[1.35rem] border border-stone/8 bg-ivory/68 px-4 shadow-[0_12px_28px_rgba(61,50,41,0.03)] md:px-5 lg:px-6">
            <div class="divide-y divide-stone/8">
              <MenuItem
                v-for="item in category.items"
                :key="item.id"
                :item="item"
                data-reveal
              />
            </div>
          </div>
        </div>
      </div>

      <div class="shell"><div class="h-px bg-stone/6" /></div>
    </section>

    <!-- Closing -->
    <section v-if="!isQrMode" class="py-8 md:py-10">
      <div class="shell flex flex-col items-center text-center">
        <div class="mb-4 max-w-10 text-sage/25" data-reveal>
          <SignatureStroke />
        </div>
        <p class="text-[0.82rem] text-stone/62" data-reveal>
          {{ menuData.uiCopy.closingNote }}
        </p>
      </div>
    </section>
  </div>
</template>
