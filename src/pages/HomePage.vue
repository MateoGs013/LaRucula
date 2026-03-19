<script setup>
import { ref, inject } from 'vue';
import { RouterLink } from 'vue-router';

import BaseButton from '@/components/ui/BaseButton.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import { contactDetails, primaryNavigation, siteMeta } from '@/app/app-config';
import { useHeroMotion } from '@/composables/useHeroMotion';
import { useImageReveal } from '@/composables/useImageReveal';
import { useRevealMotion } from '@/composables/useRevealMotion';
import { useScrollScenes } from '@/composables/useScrollScenes';

const pageRef = ref(null);
const heroRef = ref(null);
const introComplete = inject('introComplete', ref(true));

useHeroMotion(heroRef, introComplete);
useRevealMotion(pageRef);
useImageReveal(pageRef);
useScrollScenes(pageRef);
</script>

<template>
  <div ref="pageRef">

    <!-- ═══ SCENE 1: HERO — asymmetric editorial arrival ═══ -->
    <section ref="heroRef" data-scene="hero" class="relative -mt-[var(--header-h)]">
      <div class="relative h-svh min-h-[600px] overflow-hidden">
        <div class="absolute inset-0">
          <img
            data-hero-image
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=80&auto=format"
            alt="Mediterranean beachfront terrace at golden hour"
            class="invisible h-full w-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
        </div>

        <!-- Scrims: top for header legibility, bottom for text -->
        <div class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/50 to-transparent" />
        <div class="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-ink/85 via-ink/40 to-transparent" />

        <!-- Anchor word — flush left, giant, bleeds into image -->
        <div class="absolute inset-x-0 bottom-0 z-10 pb-8 md:pb-12 lg:pb-16">
          <div class="pl-[var(--lr-space-gutter)] lg:pl-[5vw]">
            <h1 data-hero-heading class="invisible font-display font-light italic text-ivory [text-shadow:0_2px_32px_rgba(0,0,0,0.35)]">
              <span class="block text-[clamp(1.1rem,2vw,1.4rem)] not-italic tracking-[0.15em] uppercase text-ivory/50 [text-shadow:none]">Mediterranean</span>
              <span class="block text-[clamp(5rem,14vw,13rem)] leading-[0.82] tracking-[-0.06em] -ml-[0.04em]">coast</span>
            </h1>
            <div class="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-10 lg:mt-8">
              <p
                data-hero-lede
                class="invisible max-w-[28ch] text-[1rem] leading-7 text-ivory/60 [text-shadow:0_1px_6px_rgba(0,0,0,0.25)]"
              >
                Where the coast sets the table — a refined kitchen shaped by the season and the sea.
              </p>
              <div data-hero-cta class="invisible">
                <BaseButton
                  to="/visit#reservation"
                  variant="ghost"
                  class="border-ivory/20! text-ivory! hover:border-ivory/40! hover:bg-ivory/8!"
                >
                  Reserve
                </BaseButton>
              </div>
            </div>
          </div>
        </div>

        <div
          data-scroll-indicator
          class="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span class="text-[0.8rem] uppercase tracking-[0.3em] text-ivory/25">Scroll</span>
          <span class="block h-8 w-px bg-ivory/20" />
        </div>
      </div>
    </section>

    <!-- Connecting motif: horizontal line echoing intro -->
    <div class="shell-wide">
      <div data-scene-divider class="mx-auto h-px w-0 bg-ink/10" />
    </div>

    <!-- ═══ SCENE 2: PHILOSOPHY — overscaled editorial typography ═══ -->
    <section data-scene="philosophy" class="py-20 md:py-28 lg:py-36">
      <div class="relative overflow-hidden">
        <blockquote class="font-display font-light italic leading-[0.92] tracking-[-0.035em] text-ink">
          <p>
            <span data-reveal-line class="invisible block pl-[var(--lr-space-gutter)] text-[clamp(2.8rem,5.5vw,5rem)] lg:pl-[5vw]">We buy</span>
            <span data-reveal-line class="invisible block pl-[var(--lr-space-gutter)] text-[clamp(6rem,15vw,14rem)] tracking-[-0.05em] text-ink/90 lg:pl-[12vw]">fish</span>
            <span data-reveal-line class="invisible block pr-[var(--lr-space-gutter)] text-right text-[clamp(2.8rem,5.5vw,5rem)] lg:pr-[8vw]">the morning</span>
            <span data-reveal-line class="invisible block pr-[var(--lr-space-gutter)] text-right text-[clamp(2.8rem,5.5vw,5rem)] lg:pr-[8vw]">it's caught.</span>
          </p>
        </blockquote>

        <!-- Editorial image + supporting copy — asymmetric two-column -->
        <div class="mt-14 grid gap-8 px-[var(--lr-space-gutter)] md:mt-16 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-12 lg:px-[5vw]">
          <div data-reveal class="order-2 lg:order-1">
            <p class="max-w-md text-[1rem] leading-7 text-stone">
              The menu is a conversation between the sea and the kitchen — written fresh, every day.
            </p>
            <ul class="mt-6 space-y-2 font-display text-[1.05rem] italic leading-7 text-ink/35">
              <li>Grilled octopus · fennel · preserved lemon</li>
              <li>Sea bream crudo · citrus · olive oil</li>
              <li>Langoustine · saffron · tomato water</li>
            </ul>
            <div class="mt-6 max-w-24 text-sage/40">
              <SignatureStroke />
            </div>
          </div>
          <div
            class="order-1 w-36 sm:w-44 lg:order-2 lg:w-52"
            data-image-reveal
            data-image-reveal-direction="up"
          >
            <div class="aspect-[3/4] overflow-hidden">
              <img
                data-parallax="-40"
                src="https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80&auto=format"
                alt="Fresh Mediterranean fish on ice at the market"
                class="h-[110%] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div class="order-3 hidden lg:block" />
        </div>
      </div>
    </section>

    <!-- Connecting motif -->
    <div class="shell-wide">
      <div data-scene-divider class="mx-auto h-px w-0 bg-ink/10" />
    </div>

    <!-- ═══ SCENE 3: THE SPACE — overlapping editorial composition ═══ -->
    <section data-scene="space" class="relative overflow-hidden py-12 lg:py-16">
      <!-- Full-bleed panoramic with bottom scrim for overlapping text -->
      <div data-image-reveal data-image-reveal-direction="up" class="relative">
        <div class="aspect-[21/9] overflow-hidden">
          <img
            data-parallax="120"
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80&auto=format"
            alt="Restaurant interior with Mediterranean light through arched windows"
            class="h-[115%] w-full object-cover"
            loading="lazy"
          />
        </div>
        <div class="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-linear-to-t from-ink/30 to-transparent" />
      </div>

      <!-- Overlapping detail crop + heading — breaks out of the panoramic plane -->
      <div class="shell relative z-10 -mt-20 lg:-mt-32">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-16">
          <div
            class="w-40 shrink-0 sm:w-52 lg:w-64"
            data-image-reveal
            data-image-reveal-direction="right"
          >
            <div class="aspect-[3/4] overflow-hidden shadow-[0_24px_64px_rgba(26,20,16,0.2)] ring-4 ring-ivory">
              <img
                data-parallax="-80"
                src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&q=80&auto=format"
                alt="Chef plating with focused precision"
                class="h-[110%] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div class="flex-1" data-reveal>
            <p class="eyebrow mb-3">The space &amp; the craft</p>
            <h2 class="max-w-lg font-display text-[clamp(2rem,4vw,3.2rem)] font-light italic leading-[1.05] tracking-[-0.02em] text-ink">
              Built for the hour when light turns gold
            </h2>
            <div class="mt-6">
              <BaseButton to="/menu" variant="text">Full menu</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SCENE 4: EVENING — scroll-pinned dark immersion ═══ -->
    <section data-scene="evening" data-evening-pin class="relative bg-dusk text-ivory">
      <div class="lg:flex lg:min-h-[80vh]">
        <!-- Text panel — pins on desktop while image scrolls -->
        <div
          data-evening-text
          class="flex min-h-[40vh] flex-col justify-end px-[var(--lr-space-gutter)] pb-10 pt-20 lg:w-[42%] lg:min-h-0 lg:pb-14 lg:pr-12 lg:pt-28"
        >
          <div data-reveal>
            <p class="eyebrow text-ivory/40!">Evening</p>
            <p class="mt-3 font-display text-[clamp(5rem,12vw,9rem)] font-light italic leading-[0.8] tracking-[-0.05em] text-ivory/15">8pm</p>
            <h2 class="mt-2 font-display text-[clamp(2.4rem,5vw,4rem)] font-light italic leading-none tracking-[-0.03em]">
              The light changes.<br />So does the table.
            </h2>
            <p class="mt-6 max-w-sm text-[1rem] leading-7 text-ivory/50">
              As the sun drops and the candles are lit, the dinner menu arrives with the evening breeze.
            </p>
            <div class="mt-4 max-w-16 text-ivory/15">
              <SignatureStroke />
            </div>
          </div>
        </div>
        <!-- Image panel — scrolls past on desktop -->
        <div class="lg:flex-1">
          <div
            data-image-reveal
            data-image-reveal-direction="right"
            class="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-[100vh]"
          >
            <img
              data-parallax="70"
              src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1600&q=80&auto=format"
              alt="Elegantly set dinner table with warm evening light"
              class="h-full w-full object-cover brightness-[0.85]"
              loading="lazy"
            />
            <div class="pointer-events-none absolute inset-0 bg-dusk/20" />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SCENE 5: INVITATION — closing scene (integrated footer) ═══ -->
    <footer data-scene="close" class="bg-cream">
      <div class="shell py-20 md:py-28 lg:py-36">
        <div data-reveal>
          <p class="max-w-[18ch] font-display text-[clamp(2.6rem,5.5vw,4.8rem)] font-light italic leading-[1.05] tracking-[-0.03em] text-ink/65">
            Come for the hour when the light turns gold.
          </p>
          <div class="mt-8">
            <BaseButton to="/visit#reservation">Reserve your table</BaseButton>
          </div>
        </div>

        <div class="mt-16 grid gap-10 border-t border-ink/8 pt-10 md:mt-20 md:grid-cols-[1fr_auto]">
          <div class="space-y-4 text-[1rem] leading-7 text-stone/70">
            <p>{{ contactDetails.address }}</p>
            <p>{{ contactDetails.hours }}</p>
            <div class="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              <a
                :href="`tel:${contactDetails.phone}`"
                class="transition-colors duration-300 hover:text-ink/80"
              >
                {{ contactDetails.phone }}
              </a>
              <a
                :href="`mailto:${contactDetails.email}`"
                class="transition-colors duration-300 hover:text-ink/80"
              >
                {{ contactDetails.email }}
              </a>
            </div>
          </div>
          <nav class="flex flex-col gap-2.5">
            <RouterLink
              v-for="item in primaryNavigation"
              :key="item.to"
              :to="item.to"
              class="text-[0.8rem] uppercase tracking-[0.18em] text-stone/50 transition-colors duration-300 hover:text-ink"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
        </div>
      </div>

      <div class="border-t border-ink/6">
        <div class="shell flex flex-col items-start gap-2 py-5 text-[0.875rem] text-stone/40 sm:flex-row sm:items-center sm:justify-between">
          <p class="font-display text-[1.05rem] tracking-[-0.02em] text-ink/30">{{ siteMeta.name }}</p>
          <p>&copy; {{ new Date().getFullYear() }} · Beachfront dining, Costa del Sol</p>
        </div>
      </div>
    </footer>

  </div>
</template>
