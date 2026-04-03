<script setup>
import { computed, ref } from 'vue';

import MenuCategoryNav from '@/components/menu/MenuCategoryNav.vue';
import MenuItem from '@/components/menu/MenuItem.vue';
import MenuIcon from '@/components/svg/MenuIcon.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import { siteContent } from '@/app/app-config';
import { getMenuNumberLocale } from '@/data/menu-ui-copy';
import LocaleSelector from '@/components/ui/LocaleSelector.vue';
import { useMenuContent } from '@/composables/useMenuContent';
import { useLocale } from '@/composables/useLocale';
import { useRevealMotion } from '@/composables/useRevealMotion';
import { useRouteContext } from '@/composables/useRouteContext';

const pageRef = ref(null);
const { locale, menuData } = useMenuContent();
const { locales } = useLocale();
const { isQrMode } = useRouteContext();

const hasMultipleLocales = computed(() => locales.value.length > 1);

useRevealMotion(pageRef);

const categories = computed(() => menuData.value.categories);
const featuredItems = computed(() => menuData.value.featuredItems);

function formatPrice(item) {
  return new Intl.NumberFormat(getMenuNumberLocale(locale.value), {
    style: 'currency',
    currency: item.currency || 'EUR',
    minimumFractionDigits: 0,
  }).format(item.price);
}
</script>

<template>
  <div ref="pageRef" class="bg-cream">
    <section
      class="relative overflow-hidden bg-dusk"
      :class="isQrMode ? 'pt-5 pb-5' : 'pt-[calc(var(--header-h,64px)+1.5rem)] pb-9 md:pb-10 lg:pb-12'"
    >
      <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          v-if="siteContent.hero.image && !isQrMode"
          :src="siteContent.hero.image"
          :alt="siteContent.hero.image_alt || ''"
          class="h-full w-full object-cover opacity-28"
          fetchpriority="high"
        />
        <div class="absolute inset-0 bg-linear-to-r from-dusk/84 via-dusk/64 to-dusk/78" />
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(138,154,123,0.14),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(122,86,59,0.12),transparent_28%)]" />
        <div class="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(36,27,22,0),rgba(36,27,22,0.26))]" />
        <svg class="absolute inset-x-0 bottom-0 w-full opacity-[0.14]" viewBox="0 0 1440 220" fill="none">
          <path d="M0 118 C 136 92, 228 152, 366 128 C 558 94, 690 32, 862 66 C 1058 104, 1212 170, 1440 142" stroke="currentColor" stroke-width="1.2" class="text-ivory" />
          <path d="M0 168 C 160 140, 298 198, 458 184 C 652 166, 790 116, 970 142 C 1146 166, 1274 220, 1440 202" stroke="currentColor" stroke-width="1" class="text-ivory" opacity="0.5" />
        </svg>
        <p class="absolute left-[4vw] top-8 font-display text-[clamp(5.2rem,15vw,11rem)] font-light italic leading-none tracking-[-0.08em] text-ivory/[0.06]">
          {{ menuData.title }}
        </p>
      </div>
      <div class="shell">
        <div class="relative z-10 max-w-[44rem]">
          <div v-if="isQrMode" class="mb-3 inline-flex items-center gap-2 rounded-full border border-ivory/16 bg-ivory/12 px-3 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ivory/78 backdrop-blur-sm" data-reveal>
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
          <p class="mt-5 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ivory/52" data-reveal>
            {{ menuData.updatedAt }}
          </p>
          <h1 class="mt-2 font-display text-[clamp(2.7rem,6vw,5.4rem)] font-light italic leading-[0.88] tracking-[-0.05em] text-ivory" data-reveal>
            {{ menuData.title }}
          </h1>
          <p class="mt-4 max-w-[34rem] text-[1rem] leading-relaxed text-ivory/76" data-reveal>
            {{ isQrMode ? menuData.uiCopy.qrHint : menuData.subtitle }}
          </p>

          <div v-if="hasMultipleLocales" class="mt-5" data-reveal>
            <div v-if="!isQrMode" class="rounded-full border border-ivory/14 bg-ivory/10 px-1.5 py-1 backdrop-blur-sm inline-flex">
              <LocaleSelector />
            </div>
            <LocaleSelector v-else />
          </div>

          <div
            v-if="menuData.notes.length && !isQrMode"
            class="mt-7 space-y-2.5"
            data-reveal
          >
            <p
              v-for="note in menuData.notes"
              :key="`${note.type}-${note.text}`"
              class="flex items-start gap-2.5 max-w-[36rem] text-[0.84rem] leading-relaxed text-ivory/64"
            >
              <span class="mt-[0.42rem] inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sage/55" />
              <span>{{ note.text }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <MenuCategoryNav :categories="categories" />

    <section v-if="featuredItems.length && !isQrMode" class="py-7 md:py-8 lg:py-10">
      <div class="shell">
        <div class="mb-5 flex items-center gap-3" data-reveal>
          <MenuIcon name="star" :size="18" class="text-toast" />
          <h2 class="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-stone/50">
            {{ menuData.uiCopy.featuredTitle }}
          </h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="item in featuredItems"
            :key="item.id"
            class="rounded-[1.2rem] border border-stone/8 bg-ivory/76 p-5 shadow-[0_14px_34px_rgba(61,50,41,0.04)] transition-colors hover:bg-ivory/84"
            data-reveal
          >
            <h3 class="font-display text-[1.2rem] italic leading-snug tracking-[-0.01em] text-ink">
              {{ item.name }}
            </h3>
            <p class="mt-1 text-[0.85rem] leading-relaxed text-stone/68">{{ item.description }}</p>
            <div class="mt-3 flex items-center justify-between">
              <span class="font-display text-[1rem] tabular-nums text-stone/80">
                {{ formatPrice(item) }}
              </span>
              <span class="inline-flex items-center gap-1 text-[0.72rem] uppercase tracking-[0.1em] text-toast">
                <MenuIcon name="star" :size="13" />
                {{ menuData.uiCopy.featuredBadge }}
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <div class="shell"><div class="h-px bg-stone/8" /></div>

    <section
      v-for="category in categories"
      :key="category.id"
      :id="category.slug"
      class="scroll-mt-[calc(var(--header-h,64px)+56px)]"
    >
      <div class="shell py-8 md:py-9 lg:py-10">
        <div class="lg:grid lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)] lg:gap-12">
          <div class="mb-5 lg:mb-0" data-reveal>
            <div class="flex items-start gap-4">
              <div class="mt-1 flex-shrink-0 text-toast/45">
                <MenuIcon :name="category.icon" :size="24" />
              </div>
              <div>
                <h2 class="font-display text-[clamp(1.7rem,3.8vw,2.6rem)] font-light italic leading-none tracking-[-0.03em] text-ink">
                  {{ category.name }}
                </h2>
                <p v-if="category.intro" class="mt-2 max-w-[26ch] text-[0.9rem] leading-relaxed text-stone/68">
                  {{ category.intro }}
                </p>
              </div>
            </div>

            <div v-if="category.notes?.length" class="mt-4 pl-10">
              <p
                v-for="note in category.notes"
                :key="`${note.type}-${note.text}`"
                class="text-[0.8rem] italic leading-relaxed text-stone/54"
              >
                {{ note.text }}
              </p>
            </div>
          </div>

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

      <div class="shell"><div class="h-px bg-stone/8" /></div>
    </section>

    <section v-if="!isQrMode" class="py-10 md:py-12">
      <div class="shell flex flex-col items-center text-center">
        <div class="mb-5 max-w-12 text-sage/25" data-reveal>
          <SignatureStroke />
        </div>
        <p class="max-w-md font-display text-[clamp(1.05rem,2.4vw,1.5rem)] font-light italic leading-snug tracking-[-0.02em] text-stone/62" data-reveal>
          {{ menuData.uiCopy.closingNote }}
        </p>
      </div>
    </section>
  </div>
</template>
