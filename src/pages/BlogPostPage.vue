<script setup>
import { ref, computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

import BaseButton from '@/components/ui/BaseButton.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import { getBlogPost, mockBlogPosts } from '@/data/mock-blog-posts';
import { useRevealMotion } from '@/composables/useRevealMotion';
import { useImageReveal } from '@/composables/useImageReveal';

const pageRef = ref(null);
useRevealMotion(pageRef);
useImageReveal(pageRef);

const route = useRoute();
const post = computed(() => getBlogPost(route.params.slug));

// Next post suggestion
const relatedPosts = computed(() => {
  if (!post.value) return [];
  return mockBlogPosts.filter((p) => p.slug !== post.value.slug).slice(0, 2);
});

function formatDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
</script>

<template>
  <div ref="pageRef">
    <!-- Post not found -->
    <template v-if="!post">
      <section class="py-32">
        <div class="shell text-center">
          <p class="eyebrow">404</p>
          <h1 class="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-light italic text-ink/50">
            This story doesn't exist yet.
          </h1>
          <div class="mt-6">
            <BaseButton to="/blog">Back to stories</BaseButton>
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <!-- ═══ HERO — cinematic article header ═══ -->
      <section class="relative -mt-[var(--header-h)] overflow-hidden bg-ink">
        <div class="relative flex min-h-[75vh] flex-col justify-end">
          <img
            :src="post.image"
            :alt="post.imageAlt"
            class="absolute inset-0 h-full w-full object-cover opacity-40"
            loading="eager"
            fetchpriority="high"
          />
          <div class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/60 to-transparent" />
          <div class="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-linear-to-t from-ink/80 via-ink/30 to-transparent" />

          <!-- Ghost word — post category as identity -->
          <div class="absolute bottom-[15vh] right-[var(--lr-space-gutter)] lg:right-[5vw]" aria-hidden="true">
            <p class="pointer-events-none select-none text-right font-display text-[clamp(5rem,14vw,12rem)] font-light italic leading-none tracking-[-0.06em] text-ivory/[0.06]">
              {{ post.category.toLowerCase() }}
            </p>
          </div>

          <div class="relative z-10 pb-10 pl-[var(--lr-space-gutter)] pr-[var(--lr-space-gutter)] md:pb-14 lg:pb-16 lg:pl-[5vw]" data-reveal>
            <p class="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-ivory/40">
              {{ post.category }} · {{ post.readTime }} · {{ formatDate(post.date) }}
            </p>
            <h1 class="mt-4 max-w-3xl font-display text-[clamp(3rem,8vw,7rem)] font-light italic leading-[0.85] tracking-[-0.04em] text-ivory [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">
              {{ post.title }}
            </h1>
            <p class="mt-4 max-w-lg font-display text-[1.3rem] italic text-ivory/50">
              {{ post.subtitle }}
            </p>
          </div>
        </div>
      </section>

      <!-- ═══ ARTICLE BODY — editorial rhythm ═══ -->
      <article class="py-16 md:py-24 lg:py-28">
        <div class="px-[var(--lr-space-gutter)] lg:px-[5vw]">
          <template v-for="(block, i) in post.body" :key="i">

            <!-- First paragraph: overscaled lead, wider column -->
            <p
              v-if="block.type === 'paragraph' && i === 0"
              class="mx-auto max-w-3xl font-display text-[clamp(1.2rem,2vw,1.5rem)] italic leading-[1.6] text-ink/80"
              data-reveal
            >
              {{ block.content }}
            </p>

            <!-- Image break after the first paragraph -->
            <div
              v-else-if="block.type === 'paragraph' && i === 1"
              class="my-14 lg:my-20"
            >
              <!-- Full width image break to shatter the prose column -->
              <div class="-mx-[var(--lr-space-gutter)] lg:-mx-[5vw]" data-image-reveal data-image-reveal-direction="up">
                <div class="aspect-[21/9] overflow-hidden">
                  <img
                    :src="post.image"
                    :alt="post.imageAlt"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <!-- Then render the paragraph below -->
              <p
                class="mx-auto mt-12 max-w-[42rem] text-[1.05rem] leading-8 text-stone lg:mt-16"
                data-reveal
              >
                {{ block.content }}
              </p>
            </div>

            <!-- Blockquote: margin-bleeding pull quote -->
            <div
              v-else-if="block.type === 'quote'"
              class="my-14 lg:my-20 lg:-ml-[8vw]"
              data-reveal
            >
              <div class="relative">
                <span class="absolute -top-6 left-0 font-display text-[clamp(3rem,5vw,4.5rem)] leading-none text-toast/15" aria-hidden="true">"</span>
                <blockquote class="pl-6 lg:pl-8">
                  <p class="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-light italic leading-[1.15] tracking-[-0.02em] text-ink/60">
                    {{ block.content }}
                  </p>
                </blockquote>
              </div>
            </div>

            <!-- Regular paragraphs -->
            <p
              v-else-if="block.type === 'paragraph'"
              class="mx-auto mt-6 max-w-[42rem] text-[1.05rem] leading-8 text-stone first:mt-0"
              data-reveal
            >
              {{ block.content }}
            </p>

          </template>

          <!-- Closing accent -->
          <div class="mx-auto mt-16 max-w-[42rem]" data-reveal>
            <div class="flex items-center gap-6">
              <div class="h-px flex-1 bg-ink/8" />
              <div class="max-w-16 text-sage/30">
                <SignatureStroke />
              </div>
              <div class="h-px flex-1 bg-ink/8" />
            </div>
          </div>
        </div>
      </article>

      <!-- ═══ RELATED — editorial next reads ═══ -->
      <section class="bg-cream py-16 md:py-24" v-if="relatedPosts.length">
        <div class="px-[var(--lr-space-gutter)] lg:px-[5vw]">
          <p class="eyebrow mb-10 lg:mb-14" data-reveal>More from the coast</p>

          <!-- Asymmetric two-column: one large, one compact -->
          <div class="lg:grid lg:grid-cols-[6fr_4fr] lg:gap-14 lg:items-start">
            <!-- Primary next read — large -->
            <article v-if="relatedPosts[0]" data-reveal>
              <RouterLink :to="`/blog/${relatedPosts[0].slug}`" class="group block" data-image-reveal data-image-reveal-direction="left">
                <div class="aspect-[3/2] overflow-hidden">
                  <img
                    :src="relatedPosts[0].image"
                    :alt="relatedPosts[0].imageAlt"
                    class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              </RouterLink>
              <div class="mt-5">
                <p class="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-toast/50">
                  {{ relatedPosts[0].category }} · {{ relatedPosts[0].readTime }}
                </p>
                <RouterLink :to="`/blog/${relatedPosts[0].slug}`" class="group">
                  <h3 class="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ink transition-colors group-hover:text-ink/70">
                    {{ relatedPosts[0].title }}
                  </h3>
                </RouterLink>
                <p class="mt-2 max-w-md text-[0.95rem] leading-7 text-stone/60">
                  {{ relatedPosts[0].excerpt }}
                </p>
              </div>
            </article>

            <!-- Secondary next read — compact, top-offset on desktop -->
            <article v-if="relatedPosts[1]" class="mt-12 lg:mt-[12vh]" data-reveal>
              <RouterLink :to="`/blog/${relatedPosts[1].slug}`" class="group block" data-image-reveal data-image-reveal-direction="right">
                <div class="aspect-[4/5] overflow-hidden">
                  <img
                    :src="relatedPosts[1].image"
                    :alt="relatedPosts[1].imageAlt"
                    class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              </RouterLink>
              <div class="mt-4">
                <p class="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-toast/50">
                  {{ relatedPosts[1].category }}
                </p>
                <RouterLink :to="`/blog/${relatedPosts[1].slug}`" class="group">
                  <h3 class="mt-2 font-display text-[clamp(1.4rem,2.5vw,1.8rem)] font-light italic leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-ink/70">
                    {{ relatedPosts[1].title }}
                  </h3>
                </RouterLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ═══ CLOSING CTA ═══ -->
      <section>
        <div class="px-[var(--lr-space-gutter)] py-14 md:py-18 lg:px-[5vw]">
          <div class="lg:flex lg:items-end lg:justify-between lg:gap-16" data-reveal>
            <p class="font-display text-[clamp(1.8rem,4vw,3rem)] font-light italic leading-[0.92] tracking-[-0.03em] text-ink/35">
              Ready for the table?
            </p>
            <div class="mt-4 lg:mt-0">
              <BaseButton to="/reservations">Reserve your evening</BaseButton>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
