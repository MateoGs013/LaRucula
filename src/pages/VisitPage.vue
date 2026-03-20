<script setup>
import { ref } from 'vue';

import BaseButton from '@/components/ui/BaseButton.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import ContactForm from '@/components/contact/ContactForm.vue';
import SocialLinks from '@/components/ui/SocialLinks.vue';
import { contactDetails, socialLinks } from '@/app/app-config';
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

    <!-- ═══ HERO — typographic arrival ═══ -->
    <section class="relative -mt-[var(--header-h)] overflow-hidden bg-ink">
      <div class="relative flex min-h-[85vh] flex-col justify-end">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=80&auto=format"
          alt="Restaurant terrace overlooking the Mediterranean coast at golden hour"
          class="absolute inset-0 h-full w-full object-cover opacity-30"
          loading="eager"
          fetchpriority="high"
        />
        <div class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/60 to-transparent" />

        <!-- "venir" as the hero’s visual identity — not a ghost, THE element -->
        <div class="pl-[var(--lr-space-gutter)] lg:pl-[5vw]" aria-hidden="true">
          <p
            class="pointer-events-none select-none font-display text-[clamp(10rem,20vw,22rem)] font-light italic leading-[0.78] tracking-[-0.06em] text-ivory/[0.06]"
          >venir</p>
        </div>

        <!-- Invitation text overlapping the oversized word -->
        <div class="relative z-10 -mt-6 pb-10 pl-[var(--lr-space-gutter)] md:-mt-10 md:pb-14 lg:-mt-14 lg:pb-16 lg:pl-[5vw]" data-reveal>
          <p class="eyebrow text-ivory/40!">Visit &amp; reserve</p>
          <h1
            class="mt-3 max-w-xl font-display text-[clamp(2.6rem,6vw,5rem)] font-light italic leading-[0.92] tracking-[-0.04em] text-ivory [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]"
          >
            Your table is waiting
          </h1>
          <div class="mt-5 max-w-16 text-ivory/20">
            <SignatureStroke />
          </div>
        </div>

        <!-- Address at bottom-right -->
        <div class="absolute bottom-6 right-[var(--lr-space-gutter)] z-10 hidden text-right md:block lg:right-[5vw]">
          <p class="text-[0.85rem] font-medium uppercase tracking-[0.2em] text-ivory/25">Passeig de la Mar 18</p>
          <p class="mt-0.5 text-[0.8rem] tracking-[0.15em] text-ivory/15">Costa del Sol</p>
        </div>

        <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ink/40 to-transparent" />
      </div>
    </section>

    <!-- ═══ RESERVATION — clear CTA to table selection ═══ -->
    <section id="reservation" class="relative overflow-hidden bg-cream py-20 md:py-28 lg:py-36">
      <!-- Overscaled typographic moment -->
      <div class="pointer-events-none absolute left-[-4vw] top-1/2 -translate-y-1/2 select-none" aria-hidden="true">
        <span class="font-display text-[clamp(8rem,18vw,20rem)] font-light italic leading-none tracking-[-0.05em] text-ink/[0.035]">reserva</span>
      </div>

      <div class="relative z-10 px-[var(--lr-space-gutter)] lg:px-[5vw]">
        <div class="lg:grid lg:grid-cols-[5fr_3fr] lg:items-start lg:gap-20">
          <!-- Left — flush invitation -->
          <div>
            <div data-reveal>
              <p class="eyebrow">Reservations</p>
              <h2 class="mt-3 max-w-lg font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ink">
                Every evening begins<br />with a conversation
              </h2>
              <p class="mt-5 max-w-md text-[1rem] leading-7 text-stone">
                We keep the dining room intimate — thirty covers, no more.
                Choose your table and reserve your evening online.
              </p>
            </div>
            <div class="mt-8 flex flex-wrap items-center gap-4" data-reveal>
              <BaseButton to="/reservations">
                Choose your table
              </BaseButton>
              <BaseButton variant="ghost" href="https://wa.me/34000000000" external>
                WhatsApp
              </BaseButton>
            </div>
          </div>

          <!-- Right — editorial hours strip -->
          <div class="mt-12 lg:mt-2" data-reveal>
            <div class="border-l-2 border-ink/8 pl-6">
              <div class="space-y-6">
                <div>
                  <p class="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-stone/45">Lunch</p>
                  <p class="mt-1 font-display text-[1.4rem] italic leading-tight text-ink">13 – 16</p>
                </div>
                <div>
                  <p class="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-stone/45">Dinner</p>
                  <p class="mt-1 font-display text-[1.4rem] italic leading-tight text-ink">20 – 23:30</p>
                </div>
                <div>
                  <p class="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-stone/45">Rest</p>
                  <p class="mt-1 font-display text-[1.4rem] italic leading-tight text-ink">Monday</p>
                </div>
              </div>
              <p class="mt-6 font-accent text-[1rem] text-toast/40">
                For six or more, call directly.
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

    <!-- ═══ THE JOURNEY — how to arrive ═══ -->
    <section class="relative overflow-hidden py-16 md:py-20 lg:py-28">
      <div class="relative z-10 px-[var(--lr-space-gutter)] lg:px-[5vw]">
        <div data-reveal>
          <p class="eyebrow">Finding us</p>
          <h2 class="mt-2 max-w-md font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ink">
            Where the road<br />meets the shore
          </h2>
        </div>

        <!-- Address + directions — asymmetric 3fr/5fr grid -->
        <div class="mt-10 lg:mt-14">
          <div class="lg:grid lg:grid-cols-[3fr_5fr] lg:items-start lg:gap-12">
            <!-- Left — overscaled number + address -->
            <div data-reveal>
              <div class="flex items-baseline gap-3">
                <span class="font-display text-[clamp(4rem,8vw,7rem)] font-light italic leading-none tracking-[-0.04em] text-ink/15" aria-hidden="true">18</span>
                <address class="not-italic">
                  <p class="font-display text-[1.3rem] italic leading-snug text-ink">
                    Passeig de la Mar
                  </p>
                  <p class="font-display text-[1.1rem] italic leading-snug text-ink/50">
                    Costa del Sol
                  </p>
                </address>
              </div>
              <div class="mt-6 space-y-3 text-[1rem] leading-7 text-stone/70">
                <p>The restaurant sits at the end of the passeig, where the promenade turns to sand. Look for the arched stone entrance.</p>
                <p>Street parking along the coastal road. The town car park is a three-minute walk east.</p>
              </div>
            </div>

            <!-- Right — coastal arrival image -->
            <div class="mt-10 lg:mt-0" data-image-reveal data-image-reveal-direction="right">
              <div class="aspect-[16/10] overflow-hidden">
                <img
                  data-parallax="60"
                  src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1200&q=80&auto=format"
                  alt="Narrow Mediterranean street with warm stone buildings leading toward the sea"
                  class="h-[112%] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ THE SPACE — bold diptych with scale contrast ═══ -->
    <section class="py-10 md:py-14 lg:py-20">
      <div class="px-[var(--lr-space-gutter)] lg:px-[5vw]">
        <div class="relative grid grid-cols-1 gap-4 md:grid-cols-[7fr_3fr] md:items-start md:gap-5">
          <!-- Large image — tall portrait -->
          <div data-image-reveal data-image-reveal-direction="left">
            <div class="aspect-[3/4] overflow-hidden">
              <img
                data-parallax="50"
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format"
                alt="Restaurant terrace with Mediterranean architecture and set tables in warm evening light"
                class="h-[110%] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <!-- Small image — square, massive offset, overlapping -->
          <div data-image-reveal data-image-reveal-direction="right" class="md:-ml-[12%] md:mt-[25vh]">
            <div class="aspect-square overflow-hidden">
              <img
                data-parallax="35"
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80&auto=format"
                alt="Intimate restaurant interior with stone walls and warm candlelight"
                class="h-[108%] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <!-- Caption — flush left, editorial -->
        <div class="mt-6 md:mt-8" data-reveal>
          <p class="font-display text-[clamp(1.3rem,2.5vw,1.7rem)] italic leading-snug text-ink/50">
            Thirty seats facing south
          </p>
          <p class="mt-1 font-accent text-[1rem] text-toast/35">
            and the sound of the sea — private dining on request
          </p>
        </div>
      </div>
    </section>

    <!-- ═══ CONTACT — sculptural form on dark field ═══ -->
    <section class="relative overflow-hidden bg-ink">
      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80&auto=format"
        alt="Warm candlelit table setting"
        class="absolute inset-0 h-full w-full object-cover opacity-[0.06]"
        loading="lazy"
      />

      <!-- Architectural overscaled word bleeding left -->
      <div class="pointer-events-none absolute -left-[3vw] top-[8vh] select-none" aria-hidden="true">
        <p class="font-display text-[clamp(8rem,16vw,16rem)] font-light italic leading-none tracking-[-0.06em] text-ivory/[0.03]">
          escríbenos
        </p>
      </div>

      <div class="relative px-[var(--lr-space-gutter)] py-20 md:py-28 lg:px-[5vw] lg:py-36">
        <div class="lg:grid lg:grid-cols-[4fr_5fr] lg:items-start lg:gap-12 xl:gap-20">

          <!-- Left — direct contact, vertical rhythm -->
          <div class="text-ivory">
            <div data-reveal>
              <p class="eyebrow text-ivory/30!">Get in touch</p>
              <h2 class="mt-3 max-w-sm font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light italic leading-[0.92] tracking-[-0.03em] text-ivory/80">
                We answer<br />the old way
              </h2>
            </div>

            <a
              :href="`tel:${contactDetails.phone}`"
              class="mt-10 block font-display text-[clamp(2.4rem,6vw,5rem)] font-light italic leading-tight tracking-[-0.04em] text-ivory/90 transition-colors hover:text-sand"
              data-reveal
            >
              {{ contactDetails.phone }}
            </a>

            <div class="mt-8 space-y-2" data-reveal>
              <a :href="`mailto:${contactDetails.email}`" class="block font-display text-[1.2rem] italic text-ivory/40 transition-colors hover:text-ivory">
                {{ contactDetails.email }}
              </a>
              <p class="text-[0.95rem] text-ivory/20">
                {{ contactDetails.address }}
              </p>
            </div>

            <div class="mt-10 border-t border-ivory/8 pt-8" data-reveal>
              <SocialLinks :links="socialLinks" tone="dark" />
            </div>

            <div class="mt-10 max-w-14 text-ivory/10" data-reveal>
              <SignatureStroke />
            </div>
          </div>

          <!-- Right — form as sculptural ivory surface -->
          <div class="mt-14 lg:mt-0" data-reveal>
            <div class="bg-ivory/[0.97] px-8 py-10 shadow-[0_8px_60px_rgba(0,0,0,0.25)] md:px-10 md:py-12 lg:px-12 lg:py-14">
              <p class="font-display text-[1.4rem] italic leading-tight text-ink/60">
                Write to us
              </p>
              <div class="mt-1 mb-8 h-px w-10 bg-toast/25" />
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══ CLOSING — asymmetric farewell ═══ -->
    <section class="bg-cream">
      <div class="py-14 md:py-18 lg:py-22">
        <div class="px-[var(--lr-space-gutter)] lg:px-[5vw]">
          <div class="lg:flex lg:items-end lg:justify-between lg:gap-16">
            <div class="lg:flex-1" data-reveal>
              <p class="font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-light italic leading-[0.92] tracking-[-0.04em] text-ink/35">
                See you at<br />the coast.
              </p>
            </div>
            <div class="mt-6 flex items-center gap-6 lg:mt-0" data-reveal>
              <BaseButton to="/menu">View the menu</BaseButton>
              <div class="max-w-14 text-sage/25">
                <SignatureStroke />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
