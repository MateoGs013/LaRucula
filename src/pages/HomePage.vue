<script setup>
import SectionHeading from '@/components/layout/SectionHeading.vue';
import PageShell from '@/components/layout/PageShell.vue';
import SectionShell from '@/components/layout/SectionShell.vue';
import CoastalDivider from '@/components/svg/CoastalDivider.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const foundationLanes = [
  {
    title: 'Layout primitives',
    copy: 'Page, section, and heading building blocks are in place so larger editorial compositions can stay consistent.',
    to: '/story',
  },
  {
    title: 'Token structure',
    copy: 'Tailwind now reads from CSS variables grouped by color, typography, spacing, and motion concerns.',
    to: '/menu',
  },
  {
    title: 'Motion hooks',
    copy: 'GSAP is isolated in composables and motion presets with a reduced-motion branch already prepared.',
    to: '/visit',
  },
];
</script>

<template>
  <PageShell>
    <SectionShell as="section" shell="wide">
      <div class="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div class="space-y-10 lg:col-span-6">
          <SectionHeading
            eyebrow="Project foundation"
            title="An editorial Vue scaffold for a calm Mediterranean launch."
            lede="This is the architecture pass only: routes, primitives, tokens, and motion helpers are ready so Claude can focus on composition, imagery, and polish."
            size="hero"
            heading-tag="h1"
            data-reveal
          >
            <template #accent>
              <SignatureStroke />
            </template>

            <div class="flex flex-wrap gap-4" data-reveal>
              <BaseButton to="/visit">
                Reserve route
              </BaseButton>
              <BaseButton to="/menu" variant="ghost">
                Menu route
              </BaseButton>
            </div>
          </SectionHeading>
        </div>

        <div class="lg:col-span-5 lg:col-start-8">
          <div
            class="frame-soft flex min-h-[29rem] flex-col justify-between overflow-hidden bg-[linear-gradient(160deg,rgba(248,242,232,0.92),rgba(220,198,161,0.28))] p-6 md:p-8"
            data-reveal
          >
            <div class="flex items-start justify-between gap-4">
              <p class="eyebrow text-ink/55">
                Hero canvas
              </p>
              <p class="text-right text-sm leading-6 text-stone">
                Reserved for large-scale photography, a sea-facing crop, or an image-driven opening sequence.
              </p>
            </div>

            <div class="space-y-6">
              <div class="aspect-[4/5] overflow-hidden rounded-[1.7rem] border border-ink/10 bg-[linear-gradient(180deg,rgba(122,86,59,0.16),rgba(248,242,232,0.1))]" />
              <CoastalDivider class="max-w-[12rem] text-toast/65" />
            </div>
          </div>
        </div>
      </div>
    </SectionShell>

    <SectionShell tone="mist">
      <div class="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <SectionHeading
          eyebrow="Foundation lanes"
          title="The scaffold separates layout, UI, motion, and SVG concerns."
          lede="Claude should be able to extend sections without rewriting the setup layer or mixing animation code into templates."
          size="compact"
          data-reveal
        >
          <template #accent>
            <CoastalDivider />
          </template>
        </SectionHeading>

        <div class="grid gap-8 md:grid-cols-3">
          <article
            v-for="lane in foundationLanes"
            :key="lane.title"
            class="border-t border-ink/10 pt-5"
            data-reveal
          >
            <h3 class="font-display text-[1.8rem] leading-tight tracking-[-0.04em] text-ink">
              {{ lane.title }}
            </h3>
            <p class="mt-3 text-base leading-7 text-stone">
              {{ lane.copy }}
            </p>
            <BaseButton class="mt-6" :to="lane.to" variant="text">
              Open route
            </BaseButton>
          </article>
        </div>
      </div>
    </SectionShell>

    <SectionShell>
      <div class="frame-soft grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.75fr)] lg:items-end">
        <SectionHeading
          eyebrow="Claude handoff"
          title="The next pass can stay focused on visual authorship."
          lede="Use the home route as the main narrative canvas, reuse the shell components, and replace the placeholders with image-led sections, tactile typography, and restrained scroll motion."
          size="compact"
          data-reveal
        />

        <div class="space-y-4 text-sm leading-7 text-stone" data-reveal>
          <p>
            Tokens: `src/styles/tokens/`
          </p>
          <p>
            Motion helpers: `src/composables/` + `src/motion/`
          </p>
          <p>
            Route pages: `src/pages/`
          </p>
          <p>
            Shared shells and UI: `src/components/layout/` + `src/components/ui/`
          </p>
        </div>
      </div>
    </SectionShell>
  </PageShell>
</template>
