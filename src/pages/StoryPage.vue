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
</script>

<template>
  <div ref="pageRef">

    <!-- ═══ HERO — atmospheric architecture arrival ═══ -->
    <section class="relative -mt-[var(--header-h)] overflow-hidden bg-ink">
      <div class="relative h-[75vh] min-h-[520px]">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format"
          alt="Mediterranean architecture with warm stone walls and arched doorways in golden light"
          class="h-full w-full object-cover opacity-45"
          loading="eager"
          fetchpriority="high"
        />
        <div class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/60 to-transparent" />

        <!-- Ghost word — bold and bleeds -->
        <div class="pointer-events-none absolute -left-[2vw] top-[15vh] z-[1] select-none lg:top-[12vh]">
          <span
            class="font-display text-[clamp(10rem,28vw,24rem)] font-light italic leading-[1.1] tracking-[-0.06em] text-ivory/[0.08]"
            aria-hidden="true"
          >origen</span>
        </div>

        <div class="absolute inset-x-0 bottom-0 z-10 pb-10 md:pb-14 lg:pb-16">
          <div class="pl-[var(--lr-space-gutter)] lg:pl-[5vw]">
            <p class="eyebrow text-ivory/40!" data-reveal>Our story</p>
            <h1
              class="mt-3 font-display text-[clamp(3.2rem,9vw,8rem)] font-light italic leading-[0.88] tracking-[-0.05em] text-ivory [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]"
              data-reveal
            >
              Built where<br />the land ends
            </h1>
            <div class="mt-5 max-w-16 text-ivory/20" data-reveal>
              <SignatureStroke />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ PLACE — editorial typography about the coast ═══ -->
    <section class="py-16 md:py-20 lg:py-28">
      <div class="relative overflow-hidden">
        <blockquote class="font-display font-light italic leading-[0.92] tracking-[-0.035em] text-ink">
          <p>
            <span data-reveal-line class="invisible block pl-[var(--lr-space-gutter)] text-[clamp(2.4rem,4.5vw,4rem)] lg:pl-[5vw]">A kitchen</span>
            <span data-reveal-line class="invisible block pl-[var(--lr-space-gutter)] text-[clamp(5rem,13vw,12rem)] tracking-[-0.05em] text-ink/90 lg:pl-[10vw]">facing</span>
            <span data-reveal-line class="invisible block pr-[var(--lr-space-gutter)] text-right text-[clamp(5rem,13vw,12rem)] tracking-[-0.05em] text-ink/90 lg:pr-[8vw]">the sea</span>
          </p>
        </blockquote>

        <!-- Flush side-by-side split — clean architectural division -->
        <div class="mt-12 md:mt-16 lg:mt-20">
          <div class="lg:grid lg:grid-cols-[5fr_4fr]">
            <!-- Image — coastal landscape, flush -->
            <div data-image-reveal data-image-reveal-direction="up">
              <div class="aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[420px]">
                <img
                  data-parallax="80"
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format"
                  alt="Mediterranean coastline with golden light on turquoise water"
                  class="h-[115%] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <!-- Text — right, vertically centered, generous padding -->
            <div class="flex flex-col justify-center px-[var(--lr-space-gutter)] py-10 md:py-14 lg:px-12 lg:py-16" data-reveal>
              <p class="max-w-sm text-[1rem] leading-7 text-stone">
                The Costa del Sol taught us what a restaurant could be — not a building with a menu, but a place where light, tide, and season shape everything that reaches the table.
              </p>
              <p class="mt-4 max-w-sm text-[1rem] leading-7 text-stone/70">
                LaRucula sits at the edge. The terrace faces south. The mornings smell of salt and rosemary. The afternoons stretch long and golden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="shell">
      <div data-scene-divider class="h-px w-0 bg-ink/10" />
    </div>

    <!-- ═══ THE KITCHEN — chef-driven dark section ═══ -->
    <section class="bg-dusk text-ivory">
      <div class="lg:grid lg:grid-cols-[4fr_5fr]">
        <!-- Text — left -->
        <div class="flex flex-col justify-center px-[var(--lr-space-gutter)] py-14 md:py-20 lg:px-14 lg:py-24 lg:order-1">
          <div data-reveal>
            <p class="eyebrow text-ivory/35!">The kitchen</p>
            <h2 class="mt-3 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light italic leading-[0.95] tracking-[-0.03em]">
              Hands that<br />know the coast
            </h2>
          </div>
          <p class="mt-6 max-w-md text-[1rem] leading-7 text-ivory/50" data-reveal>
            The kitchen runs on instinct refined by decades of Mediterranean work. Every morning begins at the port — choosing fish, reading the catch, weighing what the sea decided to offer. The menu follows.
          </p>
          <!-- Overlapping handwritten detail -->
          <div class="mt-8" data-reveal>
            <p class="font-accent text-[1.05rem] leading-relaxed text-toast/45">
              "We cook what the fisherman brings.<br />Nothing more, nothing less."
            </p>
          </div>
          <div class="mt-6 max-w-16 text-ivory/15" data-reveal>
            <SignatureStroke />
          </div>
        </div>
        <!-- Image — portrait, right -->
        <div data-image-reveal data-image-reveal-direction="right" class="lg:order-2">
          <div class="aspect-[3/4] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[600px]">
            <img
              data-parallax="60"
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1000&q=80&auto=format"
              alt="Chef working with focused precision in a warm kitchen"
              class="h-[110%] w-full object-cover brightness-[0.85]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ RITUAL — the rhythm of the day ═══ -->
    <section class="relative overflow-hidden py-16 md:py-20 lg:py-28">
      <!-- Ghost word -->
      <div class="pointer-events-none absolute left-[3vw] top-8 select-none" aria-hidden="true">
        <span class="font-display text-[clamp(7rem,15vw,13rem)] font-light leading-none tracking-[-0.05em] text-ink/[0.04]">ritual</span>
      </div>

      <div class="shell relative z-10">
        <div data-reveal>
          <p class="eyebrow">The day</p>
          <h2 class="mt-2 max-w-md font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ink">
            A restaurant that lives by the hours
          </h2>
        </div>

        <!-- Three moments — varied typography, editorial sequence -->
        <div class="mt-12 lg:mt-16">
          <div class="lg:grid lg:grid-cols-3 lg:gap-12">
            <!-- Morning -->
            <div data-reveal>
              <p class="font-display text-[clamp(3rem,6vw,4.5rem)] font-light italic leading-none tracking-[-0.04em] text-ink/10">7am</p>
              <h3 class="mt-3 font-display text-[1.2rem] italic leading-snug tracking-[-0.01em] text-ink">
                The port
              </h3>
              <p class="mt-2 text-[1rem] leading-7 text-stone/65">
                The day begins before the kitchen opens. The chef walks the harbour, reads the boats, selects the catch. The menu is still unwritten.
              </p>
            </div>

            <!-- Afternoon -->
            <div class="mt-10 lg:mt-0" data-reveal>
              <p class="font-display text-[clamp(3rem,6vw,4.5rem)] font-light italic leading-none tracking-[-0.04em] text-ink/10">1pm</p>
              <h3 class="mt-3 font-display text-[1.2rem] italic leading-snug tracking-[-0.01em] text-ink">
                The terrace
              </h3>
              <p class="mt-2 text-[1rem] leading-7 text-stone/65">
                Lunch is long and unhurried. The terrace fills slowly. Bread arrives warm. Wine is poured from a local bottle. The sea is always in view.
              </p>
            </div>

            <!-- Evening -->
            <div class="mt-10 lg:mt-0" data-reveal>
              <p class="font-display text-[clamp(3rem,6vw,4.5rem)] font-light italic leading-none tracking-[-0.04em] text-ink/10">9pm</p>
              <h3 class="mt-3 font-display text-[1.2rem] italic leading-snug tracking-[-0.01em] text-ink">
                The table
              </h3>
              <p class="mt-2 text-[1rem] leading-7 text-stone/65">
                Candles are lit. The dinner menu arrives with the evening breeze. Courses come slowly, each one a conversation between land and sea.
              </p>
            </div>
          </div>
        </div>

        <!-- Image pair below ritual -->
        <div class="mt-12 lg:mt-16">
          <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
            <div class="sm:w-3/5" data-image-reveal data-image-reveal-direction="up">
              <div class="aspect-[16/9] overflow-hidden">
                <img
                  data-parallax="60"
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80&auto=format"
                  alt="Restaurant terrace overlooking the Mediterranean at sunset"
                  class="h-[110%] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div class="sm:w-2/5" data-image-reveal data-image-reveal-direction="right">
              <div class="aspect-[3/4] overflow-hidden">
                <img
                  data-parallax="-40"
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format"
                  alt="Warm candlelit dinner setting with Mediterranean plating"
                  class="h-[110%] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ MATERIALS — full-bleed image with floating text panel ═══ -->
    <section class="relative">
      <!-- Full-bleed image — edge to edge, no container -->
      <div data-image-reveal data-image-reveal-direction="up">
        <div class="aspect-[16/9] min-h-[400px] overflow-hidden lg:aspect-[2.2/1]">
          <img
            data-parallax="80"
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80&auto=format"
            alt="Restaurant interior with arched Mediterranean architecture and warm natural light"
            class="h-[115%] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <!-- Floating text panel — anchored bottom-right, overlaps image edge -->
      <div class="relative z-10 -mt-20 md:-mt-28 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:flex lg:w-[33%] lg:items-end lg:pb-10 xl:w-[28%] xl:pb-14">
        <div class="mx-[var(--lr-space-gutter)] bg-cream p-6 md:p-8 lg:mx-0 lg:mr-[var(--lr-space-gutter)] lg:bg-cream/95 lg:shadow-[0_20px_60px_rgba(26,20,16,0.15)] lg:backdrop-blur-sm xl:mr-[5vw]" data-reveal>
          <p class="eyebrow">The space</p>
          <h2 class="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.4rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ink">
            Stone, light,<br />and the weight of the sea
          </h2>
          <p class="mt-4 text-[1rem] leading-7 text-stone/70">
            The building is old. The walls are thick and cool. The floors are worn smooth by decades of salt air and footsteps.
          </p>
          <p class="mt-4 font-accent text-[1rem] leading-relaxed text-toast/45">
            built in 1962, reimagined for today
          </p>
        </div>
      </div>
    </section>

    <!-- ═══ CLOSING — image-anchored intimate farewell ═══ -->
    <section class="bg-cream">
      <div class="py-16 md:py-20 lg:py-24">
        <div class="px-[var(--lr-space-gutter)] lg:px-[5vw]">
          <div class="flex flex-col gap-8 sm:flex-row sm:items-end sm:gap-12 lg:gap-16">
            <!-- Coastal detail — focal anchor -->
            <div class="w-36 shrink-0 sm:w-48 lg:w-56" data-image-reveal data-image-reveal-direction="up">
              <div class="aspect-[3/4] overflow-hidden ring-2 ring-ink/[0.06]">
                <img
                  src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400&q=80&auto=format"
                  alt="Weathered Mediterranean door with peeling blue paint and warm stone"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <!-- Text + CTA -->
            <div class="flex-1" data-reveal>
              <p class="font-display text-[clamp(2rem,5vw,4rem)] font-light italic leading-[0.95] tracking-[-0.04em] text-ink/40">
                The table is set.<br />The coast is waiting.
              </p>
              <div class="mt-6 flex items-center gap-6">
                <BaseButton to="/reservations">Reserve your table</BaseButton>
                <div class="max-w-14 text-sage/25">
                  <SignatureStroke />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
