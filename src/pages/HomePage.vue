<script setup>
import { computed, ref, inject } from 'vue';
import { RouterLink } from 'vue-router';

import MenuIcon from '@/components/svg/MenuIcon.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import { siteContent, contactDetails, socialLinks } from '@/app/app-config';
import { getMenuNumberLocale } from '@/data/menu-ui-copy';
import { useHeroMotion } from '@/composables/useHeroMotion';
import { useMenuContent } from '@/composables/useMenuContent';
import { useRevealMotion } from '@/composables/useRevealMotion';
import { useRouteContext } from '@/composables/useRouteContext';

const pageRef = ref(null);
const heroRef = ref(null);
const introComplete = inject('introComplete', ref(true));
const { locale, menuData } = useMenuContent();
const { withContext } = useRouteContext();

useHeroMotion(heroRef, introComplete);
useRevealMotion(pageRef);

const categories = computed(() => menuData.value.categories);
const featuredItems = computed(() => menuData.value.featuredItems.slice(0, 3));

function formatPrice(item) {
  return new Intl.NumberFormat(getMenuNumberLocale(locale.value), {
    style: 'currency',
    currency: item.currency || 'EUR',
    minimumFractionDigits: 0,
  }).format(item.price);
}
</script>

<template>
  <div ref="pageRef">

    <!-- ═══ HERO — editorial, warm, direct ═══ -->
    <section ref="heroRef" class="relative -mt-[var(--header-h)] overflow-hidden bg-dusk">
      <div class="relative flex min-h-[72svh] flex-col justify-end pb-12 md:min-h-[76svh] md:pb-16 lg:min-h-[80svh] lg:pb-18">

        <figure
          class="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            v-if="siteContent.hero.image"
            :src="siteContent.hero.image"
            :alt="siteContent.hero.image_alt || ''"
            class="h-full w-full object-cover opacity-65"
            fetchpriority="high"
            data-hero-image
          />
          <div class="absolute inset-0 bg-linear-to-r from-dusk/82 via-dusk/58 to-dusk/76" />
          <div class="absolute inset-0 bg-linear-to-b from-ink/12 via-transparent to-ink/78" />
          <!-- Decorative coastal line -->
          <svg class="absolute bottom-[15%] left-0 w-full opacity-[0.06]" viewBox="0 0 1440 200" fill="none">
            <path d="M0 100 Q 180 40, 360 100 T 720 100 T 1080 100 T 1440 100" stroke="currentColor" stroke-width="1.5" class="text-ivory"/>
            <path d="M0 140 Q 200 80, 400 140 T 800 140 T 1200 140 T 1440 140" stroke="currentColor" stroke-width="1" class="text-ivory" opacity="0.5"/>
          </svg>
        </figure>

        <!-- Content -->
        <div class="relative z-10 px-[var(--lr-space-gutter)] lg:px-[5vw]">
          <div class="max-w-[46rem]">
          <p
            data-hero-lede
            class="invisible inline-flex items-center gap-2 rounded-full border border-ivory/12 bg-ivory/[0.03] px-3 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ivory/44 backdrop-blur-sm"
          >
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-sage/55" />
            {{ siteContent.intro.tagline }}
          </p>

          <h1 data-hero-heading class="invisible mt-4 font-display font-light italic text-ivory">
            <span class="block max-w-[9ch] text-[clamp(3.4rem,9.6vw,8.6rem)] leading-[0.84] tracking-[-0.055em]">
              {{ siteContent.hero.headline }}
            </span>
          </h1>

          <p data-hero-lede class="invisible mt-6 max-w-[32ch] text-[0.98rem] leading-relaxed text-ivory/54">
            {{ siteContent.hero.subheadline }}
          </p>

          <div data-hero-cta class="invisible mt-8 flex flex-wrap items-center gap-4">
            <RouterLink
              :to="withContext(siteContent.menu_cta.href)"
              class="inline-flex items-center gap-2 border border-ivory/25 px-6 py-3.5 text-[0.82rem] font-medium uppercase tracking-[0.18em] text-ivory transition-all duration-300 hover:border-ivory/50 hover:bg-ivory/8"
            >
              {{ siteContent.menu_cta.label }}
              <MenuIcon name="arrow-right" :size="16" />
            </RouterLink>
          </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══ ABOUT — brief, editorial, one shot ═══ -->
    <section class="py-20 md:py-22 lg:py-26">
      <div class="shell">
        <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-20">
          <div>
            <div class="max-w-8 text-sage/30" data-reveal>
              <SignatureStroke />
            </div>
            <blockquote data-reveal class="mt-5">
              <p class="max-w-xl font-display text-[clamp(1.5rem,3.2vw,2.4rem)] font-light italic leading-[1.15] tracking-[-0.02em] text-ink/70">
                {{ siteContent.short_about }}
              </p>
            </blockquote>
          </div>
          <div class="mt-8 lg:mt-2" data-reveal>
            <RouterLink
              :to="withContext('/menu')"
              class="inline-flex items-center gap-2 text-[0.82rem] font-medium uppercase tracking-[0.15em] text-stone/60 transition-colors hover:text-ink"
            >
              {{ menuData.uiCopy.menuLabel }}
              <MenuIcon name="arrow-right" :size="15" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ MENU STAGE — main product focus ═══ -->
    <section class="relative overflow-hidden bg-dusk py-18 text-ivory md:py-24 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,245,230,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_44%)]" />
        <svg class="absolute inset-x-0 top-0 w-full opacity-[0.08]" viewBox="0 0 1440 320" fill="none">
          <path d="M0 118 C 160 92, 240 148, 400 124 C 590 95, 676 38, 862 72 C 1030 102, 1158 170, 1440 132" stroke="currentColor" stroke-width="1.2" class="text-ivory" />
          <path d="M0 212 C 170 178, 312 244, 466 224 C 644 201, 764 132, 940 160 C 1130 190, 1260 260, 1440 236" stroke="currentColor" stroke-width="1" class="text-ivory" opacity="0.55" />
        </svg>
        <p class="absolute left-[4vw] top-8 font-display text-[clamp(5rem,16vw,14rem)] font-light italic leading-none tracking-[-0.08em] text-ivory/[0.04]">
          {{ menuData.title }}
        </p>
      </div>

      <div class="shell relative z-10">
        <div class="lg:grid lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-start lg:gap-14 xl:gap-18">
          <div data-reveal>
            <p class="text-[0.78rem] font-medium uppercase tracking-[0.2em] text-ivory/35">
              {{ menuData.uiCopy.homeMenuEyebrow }}
            </p>
            <h2 class="mt-4 font-display text-[clamp(3rem,8vw,6.4rem)] font-light italic leading-[0.88] tracking-[-0.055em] text-ivory">
              {{ menuData.title }}
            </h2>
            <p class="mt-5 max-w-[29rem] text-[0.98rem] leading-relaxed text-ivory/55">
              {{ menuData.subtitle }}
            </p>

            <div v-if="featuredItems.length" class="mt-12 space-y-4">
              <p class="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ivory/32">
                {{ menuData.uiCopy.featuredListTitle }}
              </p>
              <article
                v-for="item in featuredItems"
                :key="item.id"
                class="flex items-start justify-between gap-6 border-t border-ivory/8 py-4 last:border-b"
              >
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <h3 class="font-display text-[1.15rem] italic leading-snug tracking-[-0.02em] text-ivory/88">
                      {{ item.name }}
                    </h3>
                    <span
                      v-if="item.recommended"
                      class="inline-flex items-center gap-1 rounded-full border border-toast/25 bg-toast/10 px-2 py-0.5 text-[0.66rem] uppercase tracking-[0.14em] text-toast"
                    >
                      <MenuIcon name="star" :size="11" />
                      {{ menuData.uiCopy.featuredBadge }}
                    </span>
                  </div>
                  <p class="mt-1 text-[0.84rem] leading-relaxed text-ivory/45">
                    {{ item.description }}
                  </p>
                </div>
                <span class="flex-shrink-0 font-display text-[1rem] tracking-[-0.02em] text-ivory/58">
                  {{ formatPrice(item) }}
                </span>
              </article>
            </div>

            <div class="mt-12 flex flex-wrap items-center gap-5">
              <RouterLink
                :to="withContext('/menu')"
                class="inline-flex items-center gap-2 border border-ivory/18 px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ivory transition-all duration-300 hover:border-ivory/38 hover:bg-ivory/8"
              >
                {{ siteContent.menu_cta.label }}
                <MenuIcon name="arrow-right" :size="15" />
              </RouterLink>
              <p class="text-[0.78rem] uppercase tracking-[0.18em] text-ivory/28">
                {{ menuData.uiCopy.qrReadyLabel }}
              </p>
            </div>
          </div>

          <div class="mt-12 grid gap-4 md:grid-cols-2 lg:mt-2" data-reveal>
            <RouterLink
              v-for="(cat, index) in categories"
              :key="cat.slug"
              :to="withContext(`/menu/${cat.slug}`)"
              class="group relative overflow-hidden rounded-[1.6rem] border border-ivory/12 bg-ivory/5 px-5 py-5 transition-all duration-300 hover:border-ivory/22 hover:bg-ivory/8"
              :class="index === 0 ? 'md:col-span-2 md:px-7 md:py-7' : 'min-h-[11.5rem] md:min-h-[12.5rem]'"
            >
              <div class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-ivory/25 to-transparent opacity-60" />
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ivory/28">
                    {{ String(index + 1).padStart(2, '0') }}
                  </p>
                  <h3 class="mt-3 font-display text-[clamp(1.5rem,2.8vw,2.35rem)] font-light italic leading-[0.92] tracking-[-0.04em] text-ivory">
                    {{ cat.name }}
                  </h3>
                  <p class="mt-2 max-w-[20rem] text-[0.84rem] leading-relaxed text-ivory/46">
                    {{ cat.short_description }}
                  </p>
                </div>
                <div class="mt-1 flex-shrink-0 text-ivory/26 transition-colors duration-300 group-hover:text-ivory/48">
                  <MenuIcon :name="cat.icon" :size="26" />
                </div>
              </div>
              <div class="mt-8 inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ivory/38 transition-colors duration-300 group-hover:text-ivory/68">
                {{ menuData.uiCopy.openCategoryLabel }}
                <MenuIcon name="arrow-right" :size="13" />
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CONTACT & INFO — practical, compact ═══ -->
    <section class="py-16 md:py-18">
      <div class="shell">
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <!-- Hours -->
          <div data-reveal>
            <p class="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-stone/40">Horario</p>
            <p class="mt-3 font-display text-[1.15rem] italic leading-relaxed text-ink/70">
              {{ contactDetails.hours }}
            </p>
          </div>

          <!-- Location -->
          <div data-reveal>
            <p class="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-stone/40">Ubicación</p>
            <p class="mt-3 font-display text-[1.15rem] italic leading-relaxed text-ink/70">
              {{ contactDetails.address }}
            </p>
          </div>

          <!-- Contact -->
          <div data-reveal>
            <p class="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-stone/40">Contacto</p>
            <div class="mt-3 space-y-2">
              <a
                :href="`tel:${contactDetails.phone}`"
                class="block font-display text-[1.15rem] italic text-ink/70 transition-colors hover:text-ink"
              >
                {{ contactDetails.phone }}
              </a>
              <a
                :href="`https://wa.me/${contactDetails.whatsapp}`"
                class="inline-flex items-center gap-2 text-[0.85rem] text-sage transition-colors hover:text-olive"
                target="_blank"
                rel="noopener"
              >
                <MenuIcon name="whatsapp" :size="16" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <!-- Social -->
        <div class="mt-12 flex flex-wrap gap-6 border-t border-ink/6 pt-10" data-reveal>
          <a
            v-for="link in socialLinks"
            :key="link.url"
            :href="link.url"
            class="text-[0.82rem] uppercase tracking-[0.12em] text-stone/45 transition-colors hover:text-ink"
            target="_blank"
            rel="noopener"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </section>

  </div>
</template>
