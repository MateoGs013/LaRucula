<script setup>
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { primaryNavigation, siteMeta } from '@/app/app-config';

const route = useRoute();
const headerEl = ref(null);
const scrolled = ref(false);
const menuOpen = ref(false);
const visible = ref(false);

const introComplete = inject('introComplete', ref(true));

const isHome = computed(() => route.path === '/');
const isTransparent = computed(() => isHome.value && !scrolled.value && !menuOpen.value);

watch(introComplete, (done) => {
  if (done) setTimeout(() => { visible.value = true; }, 150);
}, { immediate: true });

const isActive = (item) =>
  item.to === '/'
    ? route.path === item.to
    : route.path.startsWith(item.to);

function handleScroll() {
  scrolled.value = window.scrollY > window.innerHeight * 0.15;
}

function syncHeight() {
  if (headerEl.value) {
    document.documentElement.style.setProperty('--header-h', headerEl.value.offsetHeight + 'px');
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  syncHeight();
  window.addEventListener('resize', syncHeight, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', syncHeight);
});
</script>

<template>
  <header
    ref="headerEl"
    class="sticky top-0 z-40 transition-all duration-700"
    :class="[
      isTransparent
        ? 'bg-transparent'
        : 'bg-ivory/95 backdrop-blur-xl shadow-[0_1px_0_rgba(26,20,16,0.06)]',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
    ]"
  >
    <div class="shell flex items-center justify-between py-4 md:py-5">
      <RouterLink to="/" class="group">
        <p
          class="font-display text-[1.7rem] leading-none tracking-[-0.04em] transition-colors duration-500"
          :class="isTransparent ? 'text-ivory' : 'text-ink group-hover:opacity-70'"
        >
          {{ siteMeta.name }}
        </p>
      </RouterLink>

      <nav class="hidden items-center gap-8 md:flex">
        <RouterLink
          v-for="item in primaryNavigation"
          :key="item.to"
          :to="item.to"
          class="font-body text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-300"
          :class="[
            isActive(item)
              ? (isTransparent ? 'text-ivory' : 'text-ink')
              : (isTransparent ? 'text-ivory/75 hover:text-ivory' : 'text-stone hover:text-ink')
          ]"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-4">
        <RouterLink
          :to="siteMeta.reservationHref"
          class="hidden items-center border px-4 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] transition-all duration-300 sm:inline-flex"
          :class="isTransparent
            ? 'border-ivory/25 text-ivory hover:border-ivory/50 hover:bg-ivory/10'
            : 'border-ink/15 text-ink hover:border-ink/30 hover:bg-ink hover:text-ivory'"
        >
          {{ siteMeta.reservationLabel }}
        </RouterLink>

        <button
          class="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          aria-controls="mobile-nav"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <span class="sr-only">Menu</span>
          <span class="flex flex-col items-center gap-1.25">
            <span
              class="block h-px w-5 origin-center transition-all duration-300"
              :class="[
                isTransparent && !menuOpen ? 'bg-ivory' : 'bg-ink',
                menuOpen ? 'translate-y-0.75 rotate-45' : ''
              ]"
            />
            <span
              class="block h-px w-5 origin-center transition-all duration-300"
              :class="[
                isTransparent && !menuOpen ? 'bg-ivory' : 'bg-ink',
                menuOpen ? '-translate-y-0.75 -rotate-45' : ''
              ]"
            />
          </span>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-1"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <nav
        v-if="menuOpen"
        id="mobile-nav"
        class="border-t border-ink/5 bg-ivory/98 px-6 pb-8 pt-4 backdrop-blur-xl md:hidden"
      >
        <div class="flex flex-col gap-4">
          <RouterLink
            v-for="item in primaryNavigation"
            :key="item.to"
            :to="item.to"
            class="font-display text-[1.3rem] tracking-[-0.01em] transition-colors"
            :class="isActive(item) ? 'text-ink' : 'text-stone hover:text-ink'"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </RouterLink>
          <RouterLink
            :to="siteMeta.reservationHref"
            class="mt-3 inline-flex w-fit items-center border border-ink/15 px-5 py-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-ivory"
            @click="menuOpen = false"
          >
            {{ siteMeta.reservationLabel }}
          </RouterLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>
