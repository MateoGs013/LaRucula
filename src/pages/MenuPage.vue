<script setup>
import { computed, ref } from 'vue';

import MenuCategoryNav from '@/components/menu/MenuCategoryNav.vue';
import MenuItem from '@/components/menu/MenuItem.vue';
import MenuIcon from '@/components/svg/MenuIcon.vue';
import LocaleSelector from '@/components/ui/LocaleSelector.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import { getMenuNumberLocale } from '@/data/menu-ui-copy';
import { useMenuContent } from '@/composables/useMenuContent';
import { useRevealMotion } from '@/composables/useRevealMotion';
import { useRouteContext } from '@/composables/useRouteContext';

const pageRef = ref(null);
const { locale, menuData } = useMenuContent();
const { isQrMode } = useRouteContext();

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
  <div ref="pageRef">
    <section class="bg-cream" :class="isQrMode ? 'pt-6 pb-5' : 'pt-[calc(var(--header-h,64px)+1.5rem)] pb-8 md:pb-10'">
      <div class="shell">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div v-if="isQrMode" class="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ivory px-3 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-stone/55" data-reveal>
              <MenuIcon name="globe" :size="14" />
              {{ menuData.uiCopy.qrBadge }}
            </div>
            <p class="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-stone/50" data-reveal>
              {{ menuData.updatedAt }}
            </p>
            <h1 class="mt-2 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light italic leading-[0.9] tracking-[-0.04em] text-ink" data-reveal>
              {{ menuData.title }}
            </h1>
            <p class="mt-2 max-w-md text-[0.95rem] leading-relaxed text-stone/60" data-reveal>
              {{ isQrMode ? menuData.uiCopy.qrHint : menuData.subtitle }}
            </p>
          </div>
          <div class="flex items-center gap-4" data-reveal>
            <LocaleSelector />
          </div>
        </div>

        <div v-if="menuData.notes.length && !isQrMode" class="mt-6 flex flex-wrap gap-3" data-reveal>
          <p
            v-for="note in menuData.notes"
            :key="`${note.type}-${note.text}`"
            class="inline-flex items-center gap-2 rounded-lg bg-ivory px-3 py-2 text-[0.82rem] text-stone/60"
          >
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-sage/40" />
            {{ note.text }}
          </p>
        </div>
      </div>
    </section>

    <div class="shell">
      <MenuCategoryNav :categories="categories" />
    </div>

    <section v-if="featuredItems.length && !isQrMode" class="py-8 md:py-10">
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
            class="rounded-xl border border-ink/6 bg-cream/55 p-5 transition-colors hover:bg-cream"
            data-reveal
          >
            <h3 class="font-display text-[1.2rem] italic leading-snug tracking-[-0.01em] text-ink">
              {{ item.name }}
            </h3>
            <p class="mt-1 text-[0.85rem] leading-relaxed text-stone/60">{{ item.description }}</p>
            <div class="mt-3 flex items-center justify-between">
              <span class="font-display text-[1rem] tabular-nums text-ink/70">
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

    <div class="shell"><div class="h-px bg-ink/6" /></div>

    <section
      v-for="category in categories"
      :key="category.id"
      :id="category.slug"
      class="scroll-mt-[calc(var(--header-h,64px)+56px)]"
    >
      <div class="shell py-8 md:py-10">
        <div class="mb-2 flex items-start gap-4" data-reveal>
          <div class="mt-1 flex-shrink-0 text-stone/30">
            <MenuIcon :name="category.icon" :size="24" />
          </div>
          <div>
            <h2 class="font-display text-[clamp(1.7rem,3.8vw,2.6rem)] font-light italic leading-none tracking-[-0.03em] text-ink">
              {{ category.name }}
            </h2>
            <p v-if="category.intro" class="mt-2 max-w-lg text-[0.9rem] leading-relaxed text-stone/55">
              {{ category.intro }}
            </p>
          </div>
        </div>

        <div v-if="category.notes?.length" class="mt-3 ml-10">
          <p
            v-for="note in category.notes"
            :key="`${note.type}-${note.text}`"
            class="text-[0.8rem] italic text-stone/45"
          >
            {{ note.text }}
          </p>
        </div>

        <div class="mt-5 ml-0 divide-y divide-ink/6 sm:ml-10">
          <MenuItem
            v-for="item in category.items"
            :key="item.id"
            :item="item"
            data-reveal
          />
        </div>
      </div>

      <div class="shell"><div class="h-px bg-ink/6" /></div>
    </section>

    <section v-if="!isQrMode" class="py-10 md:py-12">
      <div class="shell flex flex-col items-center text-center">
        <div class="mb-5 max-w-12 text-sage/25" data-reveal>
          <SignatureStroke />
        </div>
        <p class="max-w-md font-display text-[clamp(1.05rem,2.4vw,1.5rem)] font-light italic leading-snug tracking-[-0.02em] text-ink/45" data-reveal>
          {{ menuData.uiCopy.closingNote }}
        </p>
      </div>
    </section>
  </div>
</template>
