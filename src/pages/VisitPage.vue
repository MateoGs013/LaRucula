<script setup>
import { contactDetails } from '@/app/app-config';
import SectionHeading from '@/components/layout/SectionHeading.vue';
import PageShell from '@/components/layout/PageShell.vue';
import SectionShell from '@/components/layout/SectionShell.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const visitNotes = [
  'Reservation tooling is intentionally deferred so the final experience can match the visual direction.',
  'Map, travel guidance, and coastal line graphics should live here once the visual language is locked.',
  'This page is ready for a refined arrival narrative instead of a generic contact template.',
];
</script>

<template>
  <PageShell>
    <SectionShell>
      <SectionHeading
        eyebrow="Visit route"
        title="Prepared for reservations, location guidance, and arrival details."
        lede="The foundation is in place for a premium contact and booking page without defaulting to a generic hospitality template."
        heading-tag="h1"
        data-reveal
      />
    </SectionShell>

    <SectionShell tone="mist" id="reservation">
      <div class="frame-soft grid gap-10 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)]">
        <div data-reveal>
          <p class="eyebrow">
            Placeholder reservation block
          </p>
          <h2 class="mt-5 max-w-[12ch] font-display text-[clamp(2rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.04em] text-ink">
            A refined booking flow belongs here next.
          </h2>
          <p class="mt-4 max-w-copy text-base leading-7 text-stone md:text-lg md:leading-8">
            Until the reservation approach is chosen, keep the layout editorial and calm. Avoid plugin-heavy styling and keep the interaction pattern integrated with the brand.
          </p>
          <BaseButton class="mt-6" :href="`mailto:${contactDetails.email}`">
            Placeholder inquiry
          </BaseButton>
        </div>

        <div class="space-y-6 text-base leading-7 text-stone" data-reveal>
          <div>
            <p class="eyebrow">
              Address
            </p>
            <p class="mt-3">{{ contactDetails.address }}</p>
            <p>{{ contactDetails.city }}</p>
          </div>
          <div>
            <p class="eyebrow">
              Hours
            </p>
            <p class="mt-3">{{ contactDetails.hours }}</p>
          </div>
          <div>
            <p class="eyebrow">
              Contact
            </p>
            <a class="mt-3 block hover:text-ink" :href="`tel:${contactDetails.phone}`">
              {{ contactDetails.phone }}
            </a>
            <a class="block hover:text-ink" :href="`mailto:${contactDetails.email}`">
              {{ contactDetails.email }}
            </a>
          </div>
        </div>
      </div>
    </SectionShell>

    <SectionShell>
      <div class="grid gap-5 md:grid-cols-3">
        <article
          v-for="note in visitNotes"
          :key="note"
          class="border-t border-ink/10 pt-4 text-base leading-7 text-stone"
          data-reveal
        >
          {{ note }}
        </article>
      </div>
    </SectionShell>
  </PageShell>
</template>
