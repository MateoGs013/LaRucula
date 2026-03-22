<script setup>
import { computed, ref } from 'vue';

import { getErrorMessage } from '@/api/errors';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useAsyncData } from '@/composables/useAsyncData';
import { useImageReveal } from '@/composables/useImageReveal';
import { useRevealMotion } from '@/composables/useRevealMotion';
import { useSiteContentValue } from '@/composables/useSiteContent';
import { useScrollScenes } from '@/composables/useScrollScenes';
import { getMenuData, getMenuSnapshot } from '@/services/menuService';

const pageRef = ref(null);
useRevealMotion(pageRef);
useImageReveal(pageRef);
useScrollScenes(pageRef);

const { data: menuData, loading, error } = useAsyncData(() => getMenuData(), {
  initialValue: getMenuSnapshot(),
  immediate: true,
});

const heroTitleLines = computed(() => {
  const title = String(menuData.value?.heroTitle || '').trim();
  if (!title) {
    return ['What the', 'coast brings'];
  }

  const words = title.split(/\s+/).filter(Boolean);
  if (words.length <= 2) {
    return [title, ''];
  }

  return [words.slice(0, 2).join(' '), words.slice(2).join(' ')];
});

const featuredSeaDish = computed(() => menuData.value?.seaMenu?.[0] ?? null);
const remainingSeaMenu = computed(() => menuData.value?.seaMenu?.slice(1) ?? []);

const featuredLandDish = computed(() => {
  const signatureDish = menuData.value?.landMenu?.find((dish) => dish.signature);
  return signatureDish ?? menuData.value?.landMenu?.[0] ?? null;
});

const remainingLandMenu = computed(() =>
  (menuData.value?.landMenu ?? []).filter((dish) => dish.name !== featuredLandDish.value?.name)
);

const sweetMenu = computed(() => menuData.value?.sweetMenu ?? []);
const featuredDessert = computed(() => sweetMenu.value[0] ?? null);
const otherDesserts = computed(() => sweetMenu.value.slice(1, 3));
const wineSections = computed(() => menuData.value?.wines ?? []);

const loadErrorMessage = computed(() =>
  error.value
    ? getErrorMessage(error.value, 'Unable to load today’s menu. Showing the editorial fallback.')
    : ''
);

const kitchenCredit = useSiteContentValue('menu.kitchen.credit', '— the kitchen');
const menuLoadingLabel = useSiteContentValue('menu.loading', 'Refreshing today’s selections…');

const seaLabel = useSiteContentValue('menu.sea.label', 'Mar');
const seaTitle = useSiteContentValue('menu.sea.title', 'From the sea');
const seaFeaturedNote = useSiteContentValue('menu.sea.featured_note', 'catch of the day');
const seaEmpty = useSiteContentValue('menu.sea.empty', 'The fish board is being rewritten for today’s catch.');

const landLabel = useSiteContentValue('menu.land.label', 'Tierra');
const landTitle = useSiteContentValue('menu.land.title', 'From the land');
const landFeaturedNote = useSiteContentValue('menu.land.featured_note', "chef's choice");
const landEmpty = useSiteContentValue('menu.land.empty', 'The kitchen is still writing the land chapter for today.');
const landQuote = useSiteContentValue(
  'menu.land.quote',
  'The lamb rests for three hours before we serve it. Patience is a flavour.'
);

const sweetLabel = useSiteContentValue('menu.sweet.label', 'Dulce');
const sweetTitle = useSiteContentValue('menu.sweet.title', 'To finish');
const sweetEmpty = useSiteContentValue('menu.sweet.empty', 'Something sweet is still being plated for tonight.');
const sweetCaption = useSiteContentValue('menu.sweet.caption', 'something sweet, if the evening asks for it');

const wineLabel = useSiteContentValue('menu.wine.label', 'IV · Bodega');
const wineTitle = useSiteContentValue('menu.wine.title', 'Wine & aperitivo');
const wineDescription = useSiteContentValue(
  'menu.wine.description',
  "A short list of what we're drinking this season. Ask your server for the full cellar."
);
const wineEmpty = useSiteContentValue('menu.wine.empty', 'The cellar notes are being refreshed.');

const closingCta = useSiteContentValue('menu.closing.cta', 'Reserve your table');
</script>

<template>
  <div ref="pageRef">
    <section class="relative -mt-[var(--header-h)] overflow-hidden bg-ink">
      <div class="relative h-[75vh] min-h-[520px]">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80&auto=format"
          alt="Beautifully plated Mediterranean dish with warm restaurant lighting"
          class="h-full w-full object-cover opacity-40"
          loading="eager"
          fetchpriority="high"
        />
        <div class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/60 to-transparent" />

        <div class="pointer-events-none absolute bottom-[20%] right-[-2vw] z-[1] overflow-hidden select-none">
          <span
            class="font-display text-[clamp(10rem,25vw,22rem)] font-light italic leading-none tracking-[-0.06em] text-ivory/[0.08]"
            aria-hidden="true"
          >
            mesa
          </span>
        </div>

        <div class="absolute inset-x-0 bottom-0 z-10 pb-10 md:pb-14 lg:pb-16">
          <div class="pl-[var(--lr-space-gutter)] lg:pl-[5vw]">
            <p class="eyebrow text-ivory/40!" data-reveal>{{ menuData.seasonLabel }}</p>
            <h1
              class="mt-3 font-display text-[clamp(3.5rem,10vw,9rem)] font-light italic leading-[0.88] tracking-[-0.05em] text-ivory [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]"
              data-reveal
            >
              <span class="block">{{ heroTitleLines[0] }}</span>
              <span v-if="heroTitleLines[1]" class="block">{{ heroTitleLines[1] }}</span>
            </h1>
            <div class="mt-5 max-w-16 text-ivory/20" data-reveal>
              <SignatureStroke />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 lg:py-24">
      <div class="shell">
        <div class="lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          <blockquote data-reveal>
            <p class="max-w-lg font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-light italic leading-[1.15] tracking-[-0.02em] text-ink/70">
              {{ menuData.seasonalNote }}
            </p>
          </blockquote>
          <p class="mt-4 font-accent text-[1rem] text-sage/50 lg:mt-0" data-reveal>
            {{ kitchenCredit }}
          </p>
        </div>
        <p
          v-if="loading || loadErrorMessage"
          class="mt-6 max-w-md text-[0.95rem] leading-7 text-stone/50"
          data-reveal
        >
          {{ loading ? menuLoadingLabel : loadErrorMessage }}
        </p>
      </div>
    </section>

    <section class="relative pb-16 md:pb-20">
      <div class="pointer-events-none absolute left-[3vw] top-0 select-none" aria-hidden="true">
        <span class="font-display text-[clamp(8rem,16vw,14rem)] font-light leading-none tracking-[-0.05em] text-ink/[0.05]">
          I
        </span>
      </div>
      <div class="shell">
        <div class="lg:grid lg:grid-cols-[5fr_4fr] lg:gap-16">
          <div>
            <div data-reveal>
              <p class="eyebrow">{{ seaLabel }}</p>
              <h2 class="mt-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light italic leading-none tracking-[-0.03em] text-ink">
                {{ seaTitle }}
              </h2>
            </div>

            <div v-if="featuredSeaDish" class="mt-8 border-b border-ink/8 pb-5" data-reveal>
              <p class="font-display text-[clamp(1.4rem,2.5vw,2rem)] italic leading-snug tracking-[-0.02em] text-ink">
                {{ featuredSeaDish.name }}
              </p>
              <p class="mt-1.5 text-[1rem] leading-6 text-stone/60">
                {{ featuredSeaDish.detail }}
              </p>
              <p class="mt-2 font-accent text-[1rem] text-toast/55">{{ seaFeaturedNote }}</p>
            </div>

            <ul class="divide-y divide-ink/8">
              <li
                v-for="dish in remainingSeaMenu"
                :key="dish.name"
                class="py-4"
                data-reveal
              >
                <div class="flex items-baseline gap-2">
                  <p class="font-display text-[1.1rem] italic leading-snug tracking-[-0.01em] text-ink">
                    {{ dish.name }}
                  </p>
                  <span v-if="dish.note" class="text-[0.875rem] italic text-stone/40">{{ dish.note }}</span>
                </div>
                <p class="mt-1 text-[1rem] leading-6 text-stone/70">
                  {{ dish.detail }}
                </p>
              </li>
              <li
                v-if="!featuredSeaDish && !remainingSeaMenu.length"
                class="py-4 text-[1rem] leading-7 text-stone/55"
                data-reveal
              >
                {{ seaEmpty }}
              </li>
            </ul>
          </div>

          <div class="mt-10 lg:mt-0" data-image-reveal data-image-reveal-direction="right">
            <div class="aspect-[3/4] overflow-hidden">
              <img
                data-parallax="50"
                src="https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=800&q=80&auto=format"
                alt="Fresh seafood displayed on ice"
                class="h-[110%] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="shell">
      <div data-scene-divider class="h-px w-0 bg-ink/10" />
    </div>

    <section class="relative py-16 md:py-20">
      <div class="pointer-events-none absolute right-[5vw] top-8 select-none" aria-hidden="true">
        <span class="font-display text-[clamp(6rem,14vw,12rem)] font-light leading-none tracking-[-0.05em] text-ink/[0.05]">
          II
        </span>
      </div>
      <div class="shell">
        <div class="lg:grid lg:grid-cols-[4fr_5fr] lg:gap-16">
          <div class="order-2 mt-10 lg:order-1 lg:mt-0" data-image-reveal data-image-reveal-direction="left">
            <div class="aspect-[4/5] overflow-hidden">
              <img
                data-parallax="-60"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&auto=format"
                alt="Grilled Mediterranean vegetables and herbs"
                class="h-[110%] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="relative z-10 -mt-12 ml-6 max-w-[14rem]" data-reveal>
              <p class="font-accent text-[1rem] leading-relaxed text-toast/60">
                "{{ landQuote }}"
              </p>
            </div>
          </div>

          <div class="order-1 lg:order-2">
            <div data-reveal>
              <p class="eyebrow">{{ landLabel }}</p>
              <h2 class="mt-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light italic leading-none tracking-[-0.03em] text-ink">
                {{ landTitle }}
              </h2>
            </div>

            <div v-if="featuredLandDish" class="mt-8 border-b border-ink/8 pb-5" data-reveal>
              <p class="font-display text-[clamp(1.4rem,2.5vw,2rem)] italic leading-snug tracking-[-0.02em] text-ink">
                {{ featuredLandDish.name }}
              </p>
              <p class="mt-1.5 text-[1rem] leading-6 text-stone/60">
                {{ featuredLandDish.detail }}
              </p>
              <p class="mt-2 font-accent text-[1rem] text-toast/55">{{ landFeaturedNote }}</p>
            </div>

            <ul class="divide-y divide-ink/8">
              <li
                v-for="dish in remainingLandMenu"
                :key="dish.name"
                class="py-4"
                data-reveal
              >
                <p class="font-display text-[1.1rem] italic leading-snug tracking-[-0.01em] text-ink">
                  {{ dish.name }}
                </p>
                <p class="mt-1 text-[1rem] leading-6 text-stone/70">
                  {{ dish.detail }}
                </p>
              </li>
              <li
                v-if="!featuredLandDish && !remainingLandMenu.length"
                class="py-4 text-[1rem] leading-7 text-stone/55"
                data-reveal
              >
                {{ landEmpty }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-cream">
      <div class="pointer-events-none absolute right-[4vw] top-4 select-none" aria-hidden="true">
        <span class="font-display text-[clamp(8rem,18vw,15rem)] font-light leading-none tracking-[-0.06em] text-ink/[0.06]">
          III
        </span>
      </div>
      <div class="shell relative z-10 py-16 md:py-20">
        <div class="lg:grid lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-16">
          <div>
            <div data-reveal>
              <p class="eyebrow">{{ sweetLabel }}</p>
              <h2 class="mt-2 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-light italic leading-none tracking-[-0.03em] text-ink">
                {{ sweetTitle }}
              </h2>
            </div>

            <div class="mt-8 space-y-6">
              <div v-if="featuredDessert" data-reveal>
                <p class="font-display text-[clamp(1.3rem,2.2vw,1.8rem)] italic leading-snug tracking-[-0.02em] text-ink">
                  {{ featuredDessert.name }}
                </p>
                <p class="mt-1 text-[1rem] leading-6 text-stone/55">
                  {{ featuredDessert.detail }}
                </p>
              </div>

              <div
                v-for="dessert in otherDesserts"
                :key="dessert.name"
                class="border-t border-ink/6 pt-5"
                data-reveal
              >
                <p class="font-display text-[1.05rem] italic leading-snug tracking-[-0.01em] text-ink/80">
                  {{ dessert.name }}
                </p>
                <p class="mt-1 text-[0.95rem] leading-6 text-stone/45">
                  {{ dessert.detail }}
                </p>
              </div>

              <p
                v-if="!featuredDessert"
                class="text-[1rem] leading-7 text-stone/55"
                data-reveal
              >
                {{ sweetEmpty }}
              </p>
            </div>
          </div>

          <div class="mt-10 lg:mt-8">
            <div data-image-reveal data-image-reveal-direction="up">
              <div class="aspect-[3/4] overflow-hidden lg:ml-auto lg:max-w-[16rem]">
                <img
                  src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80&auto=format"
                  alt="Elegant dessert with Mediterranean citrus"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <p class="mt-4 font-accent text-[1rem] leading-relaxed text-toast/50 lg:ml-auto lg:max-w-[16rem]" data-reveal>
              {{ sweetCaption }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-dusk text-ivory">
      <div class="shell py-16 md:py-20 lg:py-24">
        <div class="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-20">
          <div>
            <div data-reveal>
              <p class="eyebrow text-ivory/35!">{{ wineLabel }}</p>
              <h2 class="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light italic leading-none tracking-[-0.03em]">
                {{ wineTitle }}
              </h2>
              <p class="mt-4 max-w-sm text-[1rem] leading-7 text-ivory/45">
                {{ wineDescription }}
              </p>
            </div>

            <div class="mt-8" data-image-reveal data-image-reveal-direction="up">
              <div class="aspect-[16/9] max-w-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80&auto=format"
                  alt="Wine glasses with warm Mediterranean evening light"
                  class="h-full w-full object-cover brightness-[0.85]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div class="mt-10 lg:mt-0">
            <div class="space-y-10">
              <div
                v-for="section in wineSections"
                :key="section.category"
                data-reveal
              >
                <p class="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ivory/30">
                  {{ section.category }}
                </p>
                <ul class="mt-4 space-y-3">
                  <li
                    v-for="wine in section.items"
                    :key="wine"
                    class="font-display text-[1.05rem] italic leading-snug text-ivory/65"
                  >
                    {{ wine }}
                  </li>
                </ul>
              </div>
              <p
                v-if="!wineSections.length"
                class="text-[1rem] leading-7 text-ivory/45"
                data-reveal
              >
                {{ wineEmpty }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="shell py-16 md:py-20">
        <div class="lg:grid lg:grid-cols-[2fr_3fr] lg:items-end lg:gap-16">
          <div data-reveal>
            <p class="max-w-xs font-display text-[clamp(1.4rem,3vw,2.2rem)] font-light italic leading-[1.2] tracking-[-0.02em] text-ink/50">
              {{ menuData.closingNote }}
            </p>
          </div>
          <div class="mt-6 flex items-end justify-between lg:mt-0">
            <BaseButton to="/reservations" data-reveal>{{ closingCta }}</BaseButton>
            <div class="max-w-14 text-sage/25" data-reveal>
              <SignatureStroke />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
