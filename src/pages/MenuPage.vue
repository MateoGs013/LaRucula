<script setup>
import SectionHeading from '@/components/layout/SectionHeading.vue';
import PageShell from '@/components/layout/PageShell.vue';
import SectionShell from '@/components/layout/SectionShell.vue';

const menuMoments = [
  'Seasonal menu introduction with art-directed food imagery.',
  'Tasting journey or chapters that feel editorial instead of card-based.',
  'Wine and aperitivo notes with a quieter utility layout.',
];
</script>

<template>
  <PageShell>
    <SectionShell>
      <SectionHeading
        eyebrow="Menu route"
        title="Prepared for seasonal menus, tasting narratives, and image-led dishes."
        lede="This page is intentionally a placeholder shell. The structure is ready for Claude to add curated photography, section pacing, and richer menu composition without changing the underlying architecture."
        heading-tag="h1"
        data-reveal
      />
    </SectionShell>

    <SectionShell tone="mist">
      <div class="frame-soft grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div data-reveal>
          <p class="eyebrow">
            Suggested content blocks
          </p>
          <ol class="mt-5 grid gap-5 text-base leading-7 text-stone">
            <li
              v-for="moment in menuMoments"
              :key="moment"
              class="border-t border-ink/10 pt-4"
            >
              {{ moment }}
            </li>
          </ol>
        </div>

        <div class="grid gap-6 md:grid-cols-2" data-reveal>
          <div class="min-h-[13rem] rounded-[1.5rem] border border-ink/10 bg-ivory/72 p-5">
            <p class="eyebrow">
              Image lane
            </p>
            <p class="mt-4 text-base leading-7 text-stone">
              Reserve this block for plated hero photography or a tactile ingredients close-up.
            </p>
          </div>
          <div class="min-h-[13rem] rounded-[1.5rem] border border-ink/10 bg-ivory/72 p-5">
            <p class="eyebrow">
              Menu notes
            </p>
            <p class="mt-4 text-base leading-7 text-stone">
              Use this area for story-driven copy, pairings, or a quietly premium reservation cue.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  </PageShell>
</template>
