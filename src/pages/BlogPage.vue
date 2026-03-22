<script setup>
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

import { getErrorMessage } from '@/api/errors';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useAsyncData } from '@/composables/useAsyncData';
import { useImageReveal } from '@/composables/useImageReveal';
import { useRevealMotion } from '@/composables/useRevealMotion';
import { useScrollScenes } from '@/composables/useScrollScenes';
import { getBlogPosts, getBlogPostsSnapshot } from '@/services/blogService';

const pageRef = ref(null);
useRevealMotion(pageRef);
useImageReveal(pageRef);
useScrollScenes(pageRef);

const { data: posts, loading, error } = useAsyncData(() => getBlogPosts(), {
  initialValue: getBlogPostsSnapshot(),
  immediate: true,
});

const featured = computed(() => posts.value?.[0] ?? null);
const entries = computed(() => posts.value?.slice(1, 4) ?? []);

const loadErrorMessage = computed(() =>
  error.value
    ? getErrorMessage(error.value, 'Unable to refresh the journal. Showing the editorial fallback.')
    : ''
);

function formatDate(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
</script>

<template>
  <div ref="pageRef">
    <section class="relative -mt-[var(--header-h)] overflow-hidden bg-ink">
      <div class="relative flex min-h-[75vh] flex-col justify-end">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format"
          alt="Mediterranean coastline in golden light"
          class="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="eager"
          fetchpriority="high"
        />
        <div class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/60 to-transparent" />

        <div class="pl-[var(--lr-space-gutter)] lg:pl-[5vw]" aria-hidden="true">
          <p class="pointer-events-none select-none font-display text-[clamp(8rem,20vw,20rem)] font-light italic leading-[0.78] tracking-[-0.06em] text-ivory/[0.07]">
            costa
          </p>
        </div>

        <div class="relative z-10 -mt-8 pb-10 pl-[var(--lr-space-gutter)] md:-mt-12 md:pb-14 lg:-mt-14 lg:pb-16 lg:pl-[5vw]" data-reveal>
          <p class="eyebrow text-ivory/40!">From the coast</p>
          <h1 class="mt-3 font-display text-[clamp(3.5rem,9vw,8rem)] font-light italic leading-[0.85] tracking-[-0.05em] text-ivory [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">
            Stories
          </h1>
          <p class="mt-4 max-w-md text-[1rem] leading-7 text-ivory/45">
            Kitchen notes, seasonal reflections, and the rituals that shape what we put on the table.
          </p>
          <p
            v-if="loading || loadErrorMessage"
            class="mt-5 max-w-md text-[0.95rem] leading-7 text-ivory/38"
          >
            {{ loading ? 'Refreshing the journal…' : loadErrorMessage }}
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 lg:py-32">
      <div class="px-[var(--lr-space-gutter)] lg:px-[5vw]">
        <div class="relative mb-8 lg:mb-12" data-reveal>
          <span class="font-display text-[clamp(5rem,12vw,10rem)] font-light leading-none tracking-[-0.05em] text-ink/[0.05]" aria-hidden="true">
            01
          </span>
        </div>

        <template v-if="featured">
          <RouterLink
            :to="`/blog/${featured.slug}`"
            class="group -mx-[var(--lr-space-gutter)] block lg:-mx-[5vw]"
            data-image-reveal
            data-image-reveal-direction="up"
          >
            <div class="aspect-[21/9] overflow-hidden">
              <img
                :src="featured.image"
                :alt="featured.imageAlt"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
              />
            </div>
          </RouterLink>

          <div class="mt-8 lg:mt-12 lg:grid lg:grid-cols-[7fr_5fr] lg:gap-16" data-reveal>
            <div>
              <p class="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-toast/60">
                {{ featured.category }} · {{ featured.readTime }} · {{ formatDate(featured.date) }}
              </p>
              <RouterLink :to="`/blog/${featured.slug}`" class="group">
                <h2 class="mt-3 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-light italic leading-[0.92] tracking-[-0.04em] text-ink transition-colors group-hover:text-ink/70">
                  {{ featured.title }}
                </h2>
              </RouterLink>
            </div>
            <div class="mt-4 lg:mt-0 lg:flex lg:flex-col lg:justify-end">
              <p class="font-display text-[1.15rem] italic leading-relaxed text-stone/50">
                {{ featured.subtitle }}
              </p>
              <p class="mt-4 max-w-md text-[1rem] leading-7 text-stone/70">
                {{ featured.excerpt }}
              </p>
              <div class="mt-6">
                <BaseButton :to="`/blog/${featured.slug}`" variant="text">
                  Read the story →
                </BaseButton>
              </div>
            </div>
          </div>
        </template>

        <div
          v-else
          class="max-w-xl border-t border-ink/10 pt-6 text-[1rem] leading-7 text-stone/60"
          data-reveal
        >
          The journal is being prepared. Come back shortly for stories from the kitchen and the coast.
        </div>
      </div>
    </section>

    <section class="pb-16 md:pb-24 lg:pb-32">
      <div class="px-[var(--lr-space-gutter)] lg:px-[5vw]">
        <article v-if="entries[0]" class="lg:grid lg:grid-cols-[7fr_4fr] lg:items-end lg:gap-14">
          <RouterLink
            :to="`/blog/${entries[0].slug}`"
            class="group block"
            data-image-reveal
            data-image-reveal-direction="left"
          >
            <div class="aspect-[3/2] overflow-hidden">
              <img
                :src="entries[0].image"
                :alt="entries[0].imageAlt"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </RouterLink>
          <div class="mt-6 lg:mt-0 lg:pb-4" data-reveal>
            <span class="font-display text-[clamp(3rem,6vw,5rem)] font-light leading-none tracking-[-0.04em] text-ink/[0.06]" aria-hidden="true">
              02
            </span>
            <p class="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-toast/50">
              {{ entries[0].category }} · {{ entries[0].readTime }}
            </p>
            <RouterLink :to="`/blog/${entries[0].slug}`" class="group">
              <h3 class="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ink transition-colors group-hover:text-ink/70">
                {{ entries[0].title }}
              </h3>
            </RouterLink>
            <p class="mt-3 text-[0.95rem] leading-7 text-stone/60">
              {{ entries[0].excerpt }}
            </p>
          </div>
        </article>

        <div v-if="entries[0] && entries[1]" class="my-14 lg:my-20 lg:ml-[20%]" data-reveal>
          <div class="h-px w-20 bg-toast/20" />
        </div>

        <article v-if="entries[1]" class="lg:grid lg:grid-cols-[4fr_6fr] lg:items-start lg:gap-14">
          <div class="order-2 lg:order-1" data-reveal>
            <span class="font-display text-[clamp(3rem,6vw,5rem)] font-light leading-none tracking-[-0.04em] text-ink/[0.06]" aria-hidden="true">
              03
            </span>
            <p class="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-toast/50">
              {{ entries[1].category }} · {{ entries[1].readTime }}
            </p>
            <RouterLink :to="`/blog/${entries[1].slug}`" class="group">
              <h3 class="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ink transition-colors group-hover:text-ink/70">
                {{ entries[1].title }}
              </h3>
            </RouterLink>
            <p class="mt-3 max-w-sm text-[0.95rem] leading-7 text-stone/60">
              {{ entries[1].excerpt }}
            </p>
            <div class="mt-5">
              <BaseButton :to="`/blog/${entries[1].slug}`" variant="text">
                Continue reading →
              </BaseButton>
            </div>
          </div>
          <RouterLink
            :to="`/blog/${entries[1].slug}`"
            class="group order-1 mb-6 block lg:order-2 lg:mb-0"
            data-image-reveal
            data-image-reveal-direction="right"
          >
            <div class="aspect-[4/5] overflow-hidden">
              <img
                :src="entries[1].image"
                :alt="entries[1].imageAlt"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </RouterLink>
        </article>

        <div v-if="entries[1] && entries[2]" class="my-14 lg:my-20 lg:mr-[30%] lg:ml-auto" data-reveal>
          <div class="h-px w-20 bg-toast/20 lg:ml-auto" />
        </div>

        <article v-if="entries[2]" class="lg:grid lg:grid-cols-[5fr_3fr_4fr] lg:items-end lg:gap-10">
          <div data-reveal>
            <span class="font-display text-[clamp(3rem,6vw,5rem)] font-light leading-none tracking-[-0.04em] text-ink/[0.06]" aria-hidden="true">
              04
            </span>
            <p class="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-toast/50">
              {{ entries[2].category }} · {{ entries[2].readTime }}
            </p>
            <RouterLink :to="`/blog/${entries[2].slug}`" class="group">
              <h3 class="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ink transition-colors group-hover:text-ink/70">
                {{ entries[2].title }}
              </h3>
            </RouterLink>
            <p class="mt-3 text-[0.95rem] leading-7 text-stone/60">
              {{ entries[2].excerpt }}
            </p>
          </div>
          <div class="hidden lg:block" />
          <RouterLink
            :to="`/blog/${entries[2].slug}`"
            class="group mt-6 block lg:mt-0"
            data-image-reveal
            data-image-reveal-direction="right"
          >
            <div class="aspect-square overflow-hidden">
              <img
                :src="entries[2].image"
                :alt="entries[2].imageAlt"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <p class="mt-2 font-accent text-[0.95rem] text-toast/35">{{ entries[2].subtitle }}</p>
          </RouterLink>
        </article>
      </div>
    </section>

    <section class="border-t border-ink/8">
      <div class="px-[var(--lr-space-gutter)] py-12 md:py-14 lg:px-[5vw]">
        <div class="flex items-center justify-between" data-reveal>
          <p class="font-accent text-[1rem] text-stone/40">
            More stories from the kitchen, the terrace, and the sea.
          </p>
          <div class="max-w-12 text-sage/20">
            <SignatureStroke />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
