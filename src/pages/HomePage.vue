<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import PageShell from '@/components/layout/PageShell.vue';
import SectionShell from '@/components/layout/SectionShell.vue';
import SectionHeading from '@/components/layout/SectionHeading.vue';
import CoastalDivider from '@/components/svg/CoastalDivider.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { contactDetails } from '@/app/app-config';
import { useHeroMotion } from '@/composables/useHeroMotion';
import { useReducedMotion } from '@/composables/useReducedMotion';
import { ensureGsapPlugins } from '@/motion/gsap';

const heroRef = ref(null);
const atmosphereRef = ref(null);

useHeroMotion(heroRef);

const prefersReducedMotion = useReducedMotion();
let parallaxTrigger;

onMounted(() => {
  if (prefersReducedMotion.value || !atmosphereRef.value) return;
  const { gsap, ScrollTrigger } = ensureGsapPlugins();

  parallaxTrigger = ScrollTrigger.create({
    trigger: atmosphereRef.value,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate(self) {
      const img = atmosphereRef.value?.querySelector('[data-parallax]');
      if (img) gsap.set(img, { yPercent: self.progress * 12 });
    },
  });
});

onUnmounted(() => {
  parallaxTrigger?.kill();
});

// Split hero title into individually animatable words
const heroTitle = 'Where the coast sets the table.';
const heroWords = heroTitle.split(' ');

const culinaryItems = [
  {
    name: 'Tartar de atún rojo',
    note: 'With avocado cream, soy pearls, and a touch of yuzu.',
    image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=720&q=80&auto=format',
    alt: 'Tuna tartar plated with avocado cream and microgreens',
    large: true,
  },
  {
    name: 'Gambas al ajillo',
    note: 'Sizzling garlic prawns with chili threads and crusty bread.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=560&q=80&auto=format',
    alt: 'Garlic prawns in a cast iron dish with olive oil',
  },
  {
    name: 'Pulpo a la brasa',
    note: 'Charcoal-grilled octopus, smoked paprika, fingerling potatoes.',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=560&q=80&auto=format',
    alt: 'Grilled octopus on a ceramic plate with paprika oil',
  },
];
</script>

<template>
  <PageShell>
    <!-- ─── HERO ─── -->
    <section ref="heroRef" class="relative -mt-10 md:-mt-14">
      <div class="shell-wide">
        <div class="grid min-h-[92vh] items-end gap-8 pb-16 pt-32 lg:grid-cols-12 lg:items-center lg:gap-6 lg:pb-24 lg:pt-40">
          <!-- Text column -->
          <div class="relative z-10 space-y-8 lg:col-span-5">
            <p data-hero-eyebrow class="eyebrow invisible">
              Beachfront dining · Costa del Sol
            </p>

            <div data-hero-title class="w-full">
              <h1 class="balance font-display text-[clamp(3.5rem,9vw,7.2rem)] leading-[0.94] tracking-[-0.04em] text-ink">
                <span
                  v-for="(word, i) in heroWords"
                  :key="i"
                  class="hero-word invisible inline-block"
                  :style="{ marginRight: i < heroWords.length - 1 ? '0.28em' : 0 }"
                >{{ word }}</span>
              </h1>
              <div data-hero-stroke class="mt-5 max-w-52 text-toast/70">
                <SignatureStroke />
              </div>
            </div>

            <p data-hero-lede class="invisible pretty max-w-md text-base leading-7 text-stone md:text-lg md:leading-8">
              A refined Mediterranean table overlooking the sea — where every dish, every hour of light, and every breeze is part of the experience.
            </p>

            <div data-hero-cta class="invisible flex flex-wrap gap-4">
              <BaseButton to="/visit#reservation">
                Reserve a table
              </BaseButton>
              <BaseButton to="/menu" variant="ghost">
                Explore the menu
              </BaseButton>
            </div>
          </div>

          <!-- Hero image -->
          <div class="relative lg:col-span-7 lg:col-start-6">
            <div
              data-hero-image
              class="invisible aspect-4/5 overflow-hidden rounded-4xl shadow-[0_32px_80px_rgba(36,28,22,0.12)] md:aspect-3/4 lg:aspect-4/5"
            >
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=960&q=80&auto=format"
                alt="Mediterranean beachfront restaurant terrace at golden hour with the sea in the background"
                class="h-full w-full object-cover"
                loading="eager"
                fetchpriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── PHILOSOPHY ─── -->
    <SectionShell>
      <div class="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div class="space-y-6" data-reveal>
          <p class="eyebrow">Our philosophy</p>
          <h2 class="balance max-w-[14ch] font-display text-[clamp(2.3rem,5vw,4.6rem)] leading-[0.96] tracking-[-0.04em]">
            Cooking as a coastal ceremony.
          </h2>
          <div class="max-w-52 text-toast/60">
            <SignatureStroke />
          </div>
          <p class="pretty max-w-152 text-base leading-7 text-stone md:text-lg md:leading-8">
            LaRucula is more than a restaurant. It is a curated meeting point between the Mediterranean
            sea and the table — where ingredients speak of the place, the season, and the hands that prepared them.
            Every meal is a conversation between what the coast offers and what our kitchen imagines.
          </p>
        </div>

        <div data-reveal data-reveal-delay="0.15">
          <div class="aspect-4/5 overflow-hidden rounded-[1.75rem]">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=720&q=80&auto=format"
              alt="Artisan Mediterranean ingredients arranged on a rustic stone surface"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </SectionShell>

    <!-- ─── CULINARY PREVIEW ─── -->
    <SectionShell tone="mist">
      <div class="space-y-16 lg:space-y-20">
        <div class="max-w-136" data-reveal>
          <p class="eyebrow">From the kitchen</p>
          <h2 class="mt-4 balance max-w-[14ch] font-display text-[clamp(2.3rem,5vw,4.6rem)] leading-[0.96] tracking-[-0.04em]">
            Dishes that stay with you.
          </h2>
        </div>

        <!-- Staggered culinary items -->
        <div class="space-y-16 lg:space-y-24">
          <article
            v-for="(item, i) in culinaryItems"
            :key="item.name"
            class="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            :class="i % 2 === 1 ? 'lg:direction-rtl' : ''"
            data-reveal
            :data-reveal-delay="i * 0.1"
          >
            <div :class="[item.large ? 'aspect-4/5' : 'aspect-5/4', 'overflow-hidden rounded-[1.75rem]']">
              <img
                :src="item.image"
                :alt="item.alt"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="space-y-4" :class="i % 2 === 1 ? 'lg:text-right lg:direction-ltr' : ''">
              <h3 class="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none tracking-[-0.03em]">
                {{ item.name }}
              </h3>
              <p class="max-w-md text-base leading-7 text-stone" :class="i % 2 === 1 ? 'lg:ml-auto' : ''">
                {{ item.note }}
              </p>
            </div>
          </article>
        </div>

        <div class="flex items-center gap-6" data-reveal>
          <CoastalDivider class="max-w-40 text-toast/50" />
          <BaseButton to="/menu" variant="text">
            Full menu
          </BaseButton>
        </div>
      </div>
    </SectionShell>

    <!-- ─── ATMOSPHERE ─── -->
    <section ref="atmosphereRef" class="relative overflow-hidden">
      <SectionShell :padded="false">
        <div class="relative min-h-[70vh] overflow-hidden rounded-4xl lg:min-h-[80vh]">
          <!-- Background image with parallax -->
          <div class="absolute inset-0">
            <img
              data-parallax
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1280&q=80&auto=format"
              alt="Warm restaurant interior with golden light streaming through windows and Mediterranean décor"
              class="h-[115%] w-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/30 to-ink/10" />
          </div>

          <!-- Overlaid text -->
          <div class="relative z-10 flex min-h-[70vh] flex-col justify-end p-8 lg:min-h-[80vh] lg:p-14">
            <div class="max-w-152 space-y-5" data-reveal>
              <p class="eyebrow text-ivory/70!">The space</p>
              <h2 class="balance max-w-[13ch] font-display text-[clamp(2.3rem,5vw,4.6rem)] leading-[0.96] tracking-[-0.04em] text-ivory">
                Light, stone, and the sound of the sea.
              </h2>
              <p class="pretty max-w-lg text-base leading-7 text-ivory/80 md:text-lg md:leading-8">
                Inside, warm textures and curated simplicity. Outside, the horizon.
                LaRucula is designed so the atmosphere is never separate from the meal —
                it is part of it.
              </p>
              <BaseButton to="/story" variant="ghost" class="border-ivory/25! text-ivory! hover:bg-ivory/10!">
                Our story
              </BaseButton>
            </div>
          </div>
        </div>
      </SectionShell>
    </section>

    <!-- ─── VISIT CTA ─── -->
    <SectionShell>
      <div class="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div class="space-y-6" data-reveal>
          <p class="eyebrow">Come find us</p>
          <h2 class="balance max-w-[13ch] font-display text-[clamp(2.3rem,5vw,4.6rem)] leading-[0.96] tracking-[-0.04em]">
            Your table is waiting.
          </h2>
          <div class="max-w-40 text-toast/50">
            <CoastalDivider />
          </div>
          <p class="pretty max-w-lg text-base leading-7 text-stone md:text-lg md:leading-8">
            Walk along the coast or let us welcome you at the door — either way, lunch begins
            with light and the evening ends with the warmth of a well-set table.
          </p>
          <div class="flex flex-wrap gap-4">
            <BaseButton to="/visit#reservation">
              Reserve a table
            </BaseButton>
            <BaseButton to="/visit" variant="ghost">
              Plan your visit
            </BaseButton>
          </div>
        </div>

        <div class="space-y-6 border-t border-ink/10 pt-8 lg:border-t-0 lg:border-l lg:border-ink/10 lg:pl-12 lg:pt-0" data-reveal data-reveal-delay="0.12">
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8">
            <div class="space-y-2">
              <p class="eyebrow">Address</p>
              <p class="text-base leading-7 text-stone">
                {{ contactDetails.address }}<br />
                {{ contactDetails.city }}
              </p>
            </div>
            <div class="space-y-2">
              <p class="eyebrow">Hours</p>
              <p class="text-base leading-7 text-stone">
                {{ contactDetails.hours }}
              </p>
            </div>
            <div class="space-y-2">
              <p class="eyebrow">Contact</p>
              <p class="space-y-1 text-base leading-7 text-stone">
                <a class="block transition-colors duration-300 hover:text-ink" :href="`tel:${contactDetails.phone}`">{{ contactDetails.phone }}</a>
                <a class="block transition-colors duration-300 hover:text-ink" :href="`mailto:${contactDetails.email}`">{{ contactDetails.email }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  </PageShell>
</template>

<style scoped>
.lg\:direction-rtl {
  @media (min-width: 1024px) {
    direction: rtl;
  }
}
.lg\:direction-ltr {
  @media (min-width: 1024px) {
    direction: ltr;
  }
}
</style>
