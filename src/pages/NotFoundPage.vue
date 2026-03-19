<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import { useRevealMotion } from '@/composables/useRevealMotion';

const pageRef = ref(null);
useRevealMotion(pageRef);
</script>

<template>
  <div ref="pageRef">
    <section class="relative -mt-[var(--header-h)] overflow-hidden bg-ink">
      <div class="relative min-h-[100vh]">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format"
          alt="Empty Mediterranean shoreline at dusk"
          class="absolute inset-0 h-full w-full object-cover opacity-15"
          loading="eager"
        />

        <!-- Architectural ghost "404" — bleeds off right edge -->
        <div class="pointer-events-none absolute -right-[5vw] top-[15vh] select-none lg:top-[10vh]" aria-hidden="true">
          <p class="font-display text-[clamp(12rem,30vw,28rem)] font-light italic leading-none tracking-[-0.08em] text-ivory/[0.04]">
            404
          </p>
        </div>

        <!-- Content — flush left, asymmetric -->
        <div class="relative flex min-h-[100vh] flex-col justify-between">
          <div class="flex-1" />

          <div class="pb-16 pl-[var(--lr-space-gutter)] pr-[var(--lr-space-gutter)] md:pb-20 lg:pb-24 lg:pl-[5vw]">
            <!-- Ghost word — lyrical, not literal -->
            <div class="mb-6 lg:mb-8" aria-hidden="true" data-reveal>
              <p class="font-display text-[clamp(4rem,10vw,8rem)] font-light italic leading-[0.82] tracking-[-0.05em] text-ivory/[0.08]">
                perdido
              </p>
            </div>

            <div class="-mt-4 lg:-mt-6 lg:grid lg:grid-cols-[5fr_4fr] lg:gap-16 lg:items-end" data-reveal>
              <div>
                <p class="eyebrow text-ivory/25!">Lost at sea</p>
                <h1 class="mt-3 max-w-md font-display text-[clamp(2.2rem,5vw,4rem)] font-light italic leading-[0.92] tracking-[-0.04em] text-ivory/80">
                  This page drifted<br />past the shore
                </h1>
                <p class="mt-5 max-w-sm text-[1rem] leading-relaxed text-ivory/35">
                  The route you followed doesn't lead anywhere. Perhaps start from one of these.
                </p>
                <div class="mt-8">
                  <BaseButton to="/">Return home</BaseButton>
                </div>
              </div>

              <!-- Visual sitemap — secondary navigation -->
              <div class="mt-12 lg:mt-0">
                <nav class="border-l border-ivory/8 pl-6 lg:pl-8" aria-label="Site navigation">
                  <ul class="space-y-4">
                    <li>
                      <RouterLink to="/menu" class="group block">
                        <span class="font-display text-[1.3rem] italic text-ivory/50 transition-colors group-hover:text-ivory">The Menu</span>
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/story" class="group block">
                        <span class="font-display text-[1.3rem] italic text-ivory/50 transition-colors group-hover:text-ivory">Our Story</span>
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/reservations" class="group block">
                        <span class="font-display text-[1.3rem] italic text-ivory/50 transition-colors group-hover:text-ivory">Reservations</span>
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/blog" class="group block">
                        <span class="font-display text-[1.3rem] italic text-ivory/50 transition-colors group-hover:text-ivory">Stories</span>
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/visit" class="group block">
                        <span class="font-display text-[1.3rem] italic text-ivory/50 transition-colors group-hover:text-ivory">Visit</span>
                      </RouterLink>
                    </li>
                  </ul>
                </nav>
                <div class="mt-8 max-w-12 text-ivory/8">
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
