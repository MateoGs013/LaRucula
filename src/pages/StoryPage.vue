<script setup>
import SectionHeading from '@/components/layout/SectionHeading.vue';
import PageShell from '@/components/layout/PageShell.vue';
import SectionShell from '@/components/layout/SectionShell.vue';

const storyBeats = [
  {
    title: 'Place',
    copy: 'A quieter route for location, sea light, architecture, and atmosphere.',
  },
  {
    title: 'Authorship',
    copy: 'Room for founder, chef, or material-led storytelling with generous pacing.',
  },
  {
    title: 'Ritual',
    copy: 'An editorial sequence for arrival, service, and the dining rhythm across the day.',
  },
];
</script>

<template>
  <PageShell>
    <SectionShell>
      <SectionHeading
        eyebrow="Story route"
        title="Prepared for atmosphere, authorship, and the quiet luxury behind the restaurant."
        lede="This route should eventually carry the softer narrative side of the brand. For now it establishes a clean page shell with enough structure to receive image-led editorial sections."
        heading-tag="h1"
        data-reveal
      />
    </SectionShell>

    <SectionShell>
      <div class="grid gap-8 lg:grid-cols-3">
        <article
          v-for="beat in storyBeats"
          :key="beat.title"
          class="frame-soft min-h-[17rem] p-6 md:p-8"
          data-reveal
        >
          <p class="eyebrow">
            Story beat
          </p>
          <h2 class="mt-5 font-display text-[2rem] leading-none tracking-[-0.04em] text-ink">
            {{ beat.title }}
          </h2>
          <p class="mt-4 text-base leading-7 text-stone">
            {{ beat.copy }}
          </p>
        </article>
      </div>
    </SectionShell>
  </PageShell>
</template>
