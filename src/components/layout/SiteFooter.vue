<script setup>
import { RouterLink } from 'vue-router';

import SocialLinks from '@/components/ui/SocialLinks.vue';
import { contactDetails, primaryNavigation, siteMeta, socialLinks } from '@/app/app-config';
</script>

<template>
  <footer class="bg-dusk text-ivory">
    <div class="shell py-20 md:py-28 lg:py-36">
      <!-- Dominant closing statement — overscaled for presence -->
      <p class="max-w-4xl font-display text-[clamp(2.2rem,5.5vw,5rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ivory/60">
        Where appetite meets the&nbsp;horizon.
      </p>

      <!-- Two-column: CTA + contact | navigation -->
      <div class="mt-16 grid gap-12 md:mt-20 md:grid-cols-[1fr_auto]">
        <div class="space-y-8">
          <RouterLink
            :to="siteMeta.reservationHref"
            class="inline-flex items-center border border-ivory/20 px-6 py-3 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ivory/70 transition-all duration-300 hover:border-ivory/40 hover:bg-ivory/6"
          >
            {{ siteMeta.reservationLabel }}
          </RouterLink>

          <div class="text-[1rem] leading-7 text-ivory/55">
            <p>{{ contactDetails.address }}</p>
            <p>{{ contactDetails.hours }}</p>
            <div class="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              <a
                class="transition-colors duration-300 hover:text-ivory/70"
                :href="`tel:${contactDetails.phone}`"
              >
                {{ contactDetails.phone }}
              </a>
              <a
                class="transition-colors duration-300 hover:text-ivory/70"
                :href="`mailto:${contactDetails.email}`"
              >
                {{ contactDetails.email }}
              </a>
            </div>
          </div>

          <SocialLinks :links="socialLinks" tone="dark" />
        </div>

        <nav class="flex flex-col gap-3">
          <p class="eyebrow text-ivory/45!">Navigate</p>
          <RouterLink
            v-for="item in primaryNavigation"
            :key="item.to"
            :to="item.to"
            class="text-[0.875rem] uppercase tracking-[0.15em] text-ivory/55 transition-colors duration-300 hover:text-ivory/85"
          >
            {{ item.label }}
          </RouterLink>
          <RouterLink
            to="/reservations"
            class="text-[0.875rem] uppercase tracking-[0.15em] text-ivory/55 transition-colors duration-300 hover:text-ivory/85"
          >
            Reservations
          </RouterLink>
        </nav>
      </div>
    </div>

    <div class="border-t border-ivory/8">
      <div class="shell flex flex-col items-start gap-3 py-5 text-[0.875rem] text-ivory/40 md:flex-row md:items-center md:justify-between">
        <p class="font-display text-[1.1rem] tracking-[-0.02em] text-ivory/50">{{ siteMeta.name }}</p>
        <p>&copy; {{ new Date().getFullYear() }} · Beachfront dining, Costa del Sol</p>
      </div>
    </div>
  </footer>
</template>
