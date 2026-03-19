<script setup>
import { ref } from 'vue';

import BaseButton from '@/components/ui/BaseButton.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import { useRevealMotion } from '@/composables/useRevealMotion';
import { useImageReveal } from '@/composables/useImageReveal';
import { useScrollScenes } from '@/composables/useScrollScenes';

const pageRef = ref(null);
useRevealMotion(pageRef);
useImageReveal(pageRef);
useScrollScenes(pageRef);

const seaMenu = [
  { name: 'Grilled octopus', detail: 'fennel · preserved lemon · smoked paprika oil', signature: true },
  { name: 'Sea bream crudo', detail: 'citrus · olive oil · green almond' },
  { name: 'Langoustine', detail: 'saffron · tomato water · sourdough' },
  { name: 'Salt-baked dorada', detail: 'whole fish · herb butter · capers', note: 'for two' },
  { name: 'Clams a la plancha', detail: 'garlic · fino sherry · parsley' },
];

const landMenu = [
  { name: 'Ibérico pork loin', detail: 'charred pepper · romesco · almonds' },
  { name: 'Lamb shoulder', detail: 'slow-roasted · honey · thyme · root vegetables', signature: true },
  { name: 'Grilled artichokes', detail: 'manchego · walnut · aged sherry vinegar' },
  { name: 'Wild mushroom risotto', detail: 'porcini · truffle · parmesan' },
  { name: 'Roasted chicken', detail: 'free-range · lemon · herbs de Provence' },
];

const sweetMenu = [
  { name: 'Crema catalana', detail: 'caramelised sugar · orange zest · cinnamon' },
  { name: 'Olive oil cake', detail: 'rosemary · sea salt · crème fraîche' },
  { name: 'Seasonal fruit', detail: 'fig · honey · labneh · pistachio' },
];

const wines = [
  { category: 'White', items: ['Albariño, Rías Baixas', 'Verdejo, Rueda', 'Godello, Valdeorras'] },
  { category: 'Red', items: ['Garnacha, Priorat', 'Tempranillo, Ribera del Duero', 'Monastrell, Jumilla'] },
  { category: 'Rosé & Cava', items: ['Rosado, Navarra', 'Cava Brut Nature, Penedès'] },
];
</script>

<template>
  <div ref="pageRef">

    <!-- ═══ HERO — flush-left asymmetric arrival ═══ -->
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

        <!-- Overscaled ghost word — right-anchored -->
        <div class="pointer-events-none absolute bottom-[12%] right-[-2vw] overflow-hidden select-none">
          <span
            class="font-display text-[clamp(10rem,25vw,22rem)] font-light italic leading-none tracking-[-0.06em] text-ivory/[0.04]"
            aria-hidden="true"
          >mesa</span>
        </div>

        <!-- Flush-left content, like HomePage hero -->
        <div class="absolute inset-x-0 bottom-0 z-10 pb-10 md:pb-14 lg:pb-16">
          <div class="pl-[var(--lr-space-gutter)] lg:pl-[5vw]">
            <p class="eyebrow text-ivory/40!" data-reveal>Seasonal menu · Spring 2025</p>
            <h1
              class="mt-3 font-display text-[clamp(3.5rem,10vw,9rem)] font-light italic leading-[0.88] tracking-[-0.05em] text-ivory [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]"
              data-reveal
            >
              What the<br />coast brings
            </h1>
            <div class="mt-5 max-w-16 text-ivory/20" data-reveal>
              <SignatureStroke />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SEASONAL NOTE — editorial typography ═══ -->
    <section class="py-16 md:py-20 lg:py-24">
      <div class="shell">
        <div class="lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          <blockquote data-reveal>
            <p class="max-w-lg font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-light italic leading-[1.15] tracking-[-0.02em] text-ink/70">
              The menu changes with the tides, the markets, and the season. What you see today may not return tomorrow.
            </p>
          </blockquote>
          <p class="mt-4 font-accent text-[1rem] text-sage/50 lg:mt-0" data-reveal>
            — the kitchen
          </p>
        </div>
      </div>
    </section>

    <!-- ═══ I. MAR — Sea chapter ═══ -->
    <section class="relative pb-16 md:pb-20">
      <!-- Ghost numeral — large, flush-left -->
      <div class="pointer-events-none absolute left-[3vw] top-0 select-none" aria-hidden="true">
        <span class="font-display text-[clamp(8rem,16vw,14rem)] font-light leading-none tracking-[-0.05em] text-ink/[0.05]">I</span>
      </div>
      <div class="shell">
        <div class="lg:grid lg:grid-cols-[5fr_4fr] lg:gap-16">
          <!-- Dishes -->
          <div>
            <div data-reveal>
              <p class="eyebrow">Mar</p>
              <h2 class="mt-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light italic leading-none tracking-[-0.03em] text-ink">
                From the sea
              </h2>
            </div>

            <!-- Signature dish — elevated presentation -->
            <div class="mt-8 border-b border-ink/8 pb-5" data-reveal>
              <p class="font-display text-[clamp(1.4rem,2.5vw,2rem)] italic leading-snug tracking-[-0.02em] text-ink">
                {{ seaMenu[0].name }}
              </p>
              <p class="mt-1.5 text-[0.82rem] leading-6 text-stone/60">
                {{ seaMenu[0].detail }}
              </p>
              <p class="mt-2 font-accent text-[0.78rem] text-toast/55">catch of the day</p>
            </div>

            <!-- Remaining dishes -->
            <ul class="divide-y divide-ink/8">
              <li
                v-for="dish in seaMenu.slice(1)"
                :key="dish.name"
                class="py-4"
                data-reveal
              >
                <div class="flex items-baseline gap-2">
                  <p class="font-display text-[1.1rem] italic leading-snug tracking-[-0.01em] text-ink">
                    {{ dish.name }}
                  </p>
                  <span v-if="dish.note" class="text-[0.68rem] italic text-stone/40">{{ dish.note }}</span>
                </div>
                <p class="mt-1 text-[0.78rem] leading-6 text-stone/70">
                  {{ dish.detail }}
                </p>
              </li>
            </ul>
          </div>
          <!-- Image -->
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

    <!-- Divider -->
    <div class="shell">
      <div data-scene-divider class="h-px w-0 bg-ink/10" />
    </div>

    <!-- ═══ II. TIERRA — Land chapter — ghost numeral anchored ═══ -->
    <section class="relative py-16 md:py-20">
      <!-- Ghost numeral -->
      <div class="pointer-events-none absolute right-[5vw] top-8 select-none" aria-hidden="true">
        <span class="font-display text-[clamp(6rem,14vw,12rem)] font-light leading-none tracking-[-0.05em] text-ink/[0.05]">II</span>
      </div>
      <div class="shell">
        <div class="lg:grid lg:grid-cols-[4fr_5fr] lg:gap-16">
          <!-- Image — left on desktop -->
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
            <!-- Chef note overlapping bottom of image -->
            <div class="relative z-10 -mt-12 ml-6 max-w-[14rem]" data-reveal>
              <p class="font-accent text-[0.85rem] leading-relaxed text-toast/60">
                "The lamb rests for three hours before we serve it. Patience is a flavour."
              </p>
            </div>
          </div>
          <!-- Dishes — right on desktop -->
          <div class="order-1 lg:order-2">
            <div data-reveal>
              <p class="eyebrow">Tierra</p>
              <h2 class="mt-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light italic leading-none tracking-[-0.03em] text-ink">
                From the land
              </h2>
            </div>
            <!-- Signature dish — elevated -->
            <div class="mt-8 border-b border-ink/8 pb-5" data-reveal>
              <p class="font-display text-[clamp(1.4rem,2.5vw,2rem)] italic leading-snug tracking-[-0.02em] text-ink">
                {{ landMenu[1].name }}
              </p>
              <p class="mt-1.5 text-[0.82rem] leading-6 text-stone/60">
                {{ landMenu[1].detail }}
              </p>
              <p class="mt-2 font-accent text-[0.78rem] text-toast/55">chef's choice</p>
            </div>

            <!-- Remaining dishes -->
            <ul class="divide-y divide-ink/8">
              <li
                v-for="dish in [landMenu[0], ...landMenu.slice(2)]"
                :key="dish.name"
                class="py-4"
                data-reveal
              >
                <p class="font-display text-[1.1rem] italic leading-snug tracking-[-0.01em] text-ink">
                  {{ dish.name }}
                </p>
                <p class="mt-1 text-[0.78rem] leading-6 text-stone/70">
                  {{ dish.detail }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ III. DULCE — asymmetric intimate pause ═══ -->
    <section class="relative bg-cream overflow-hidden">
      <!-- Ghost numeral — flush-right, large -->
      <div class="pointer-events-none absolute right-[4vw] top-4 select-none" aria-hidden="true">
        <span class="font-display text-[clamp(8rem,18vw,15rem)] font-light leading-none tracking-[-0.06em] text-ink/[0.06]">III</span>
      </div>
      <div class="shell relative z-10 py-16 md:py-20">
        <div class="lg:grid lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-16">
          <!-- Left — desserts as precious objects -->
          <div>
            <div data-reveal>
              <p class="eyebrow">Dulce</p>
              <h2 class="mt-2 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-light italic leading-none tracking-[-0.03em] text-ink">
                To finish
              </h2>
            </div>

            <!-- Each dessert with varied scale — the first is the star -->
            <div class="mt-8 space-y-6">
              <div data-reveal>
                <p class="font-display text-[clamp(1.3rem,2.2vw,1.8rem)] italic leading-snug tracking-[-0.02em] text-ink">
                  {{ sweetMenu[0].name }}
                </p>
                <p class="mt-1 text-[0.82rem] leading-6 text-stone/55">
                  {{ sweetMenu[0].detail }}
                </p>
              </div>
              <div class="border-t border-ink/6 pt-5" data-reveal>
                <p class="font-display text-[1.05rem] italic leading-snug tracking-[-0.01em] text-ink/80">
                  {{ sweetMenu[1].name }}
                </p>
                <p class="mt-1 text-[0.75rem] leading-6 text-stone/45">
                  {{ sweetMenu[1].detail }}
                </p>
              </div>
              <div class="border-t border-ink/6 pt-5" data-reveal>
                <p class="font-display text-[1.05rem] italic leading-snug tracking-[-0.01em] text-ink/80">
                  {{ sweetMenu[2].name }}
                </p>
                <p class="mt-1 text-[0.75rem] leading-6 text-stone/45">
                  {{ sweetMenu[2].detail }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right — image + handwritten detail -->
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
            <p class="mt-4 font-accent text-[0.85rem] leading-relaxed text-toast/50 lg:ml-auto lg:max-w-[16rem]" data-reveal>
              something sweet, if the evening asks for it
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ IV. WINE & APERITIVO — dark editorial section ═══ -->
    <section class="bg-dusk text-ivory">
      <div class="shell py-16 md:py-20 lg:py-24">
        <div class="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-20">
          <!-- Left — featured introduction + image -->
          <div>
            <div data-reveal>
              <p class="eyebrow text-ivory/35!">IV · Bodega</p>
              <h2 class="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light italic leading-none tracking-[-0.03em]">
                Wine &amp; aperitivo
              </h2>
              <p class="mt-4 max-w-sm text-[0.82rem] leading-7 text-ivory/45">
                A short list of what we're drinking this season. Ask your server for the full cellar.
              </p>
            </div>
            <!-- Featured wine image -->
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
          <!-- Right — wine list -->
          <div class="mt-10 lg:mt-0">
            <div class="space-y-10">
              <div
                v-for="section in wines"
                :key="section.category"
                data-reveal
              >
                <p class="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ivory/30">
                  {{ section.category }}
                </p>
                <ul class="mt-4 space-y-3">
                  <li
                    v-for="wine in section.items"
                    :key="wine"
                    class="font-display text-[0.95rem] italic leading-snug text-ivory/65"
                  >
                    {{ wine }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CLOSING — asymmetric seasonal note ═══ -->
    <section>
      <div class="shell py-16 md:py-20">
        <div class="lg:grid lg:grid-cols-[2fr_3fr] lg:items-end lg:gap-16">
          <div data-reveal>
            <p class="max-w-xs font-display text-[clamp(1.4rem,3vw,2.2rem)] font-light italic leading-[1.2] tracking-[-0.02em] text-ink/50">
              Menus are written daily. Prices and availability shift with the season.
            </p>
          </div>
          <div class="mt-6 flex items-end justify-between lg:mt-0">
            <BaseButton to="/visit#reservation" data-reveal>Reserve your table</BaseButton>
            <div class="max-w-14 text-sage/25" data-reveal>
              <SignatureStroke />
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
