<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import MenuIcon from '@/components/svg/MenuIcon.vue';
import { useRouteContext } from '@/composables/useRouteContext';
import { useRevealMotion } from '@/composables/useRevealMotion';

const pageRef = ref(null);
const { withContext } = useRouteContext();
useRevealMotion(pageRef);
</script>

<template>
  <div ref="pageRef">
    <section class="relative -mt-[var(--header-h)] overflow-hidden bg-dusk">
      <div class="relative flex min-h-[100svh] flex-col justify-center">

        <!-- Ghost "404" -->
        <div class="pointer-events-none absolute -right-[5vw] top-[15vh] select-none" aria-hidden="true">
          <p class="font-display text-[clamp(12rem,30vw,28rem)] font-light italic leading-none tracking-[-0.08em] text-ivory/[0.04]">
            404
          </p>
        </div>

        <div class="px-[var(--lr-space-gutter)] lg:px-[5vw]">
          <p class="text-[0.78rem] font-medium uppercase tracking-[0.22em] text-ivory/55" data-reveal>Ruta perdida</p>
          <h1 class="mt-3 max-w-md font-display text-[clamp(2rem,5vw,3.5rem)] font-light italic leading-[0.92] tracking-[-0.04em] text-ivory/80" data-reveal>
            Esta página se perdió mar adentro
          </h1>
          <p class="mt-4 max-w-sm text-[1rem] leading-relaxed text-ivory/60" data-reveal>
            La ruta que seguiste no lleva a ningún sitio.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-4" data-reveal>
            <BaseButton to="/" variant="ghost" class="border-ivory/20! text-ivory! hover:border-ivory/40! hover:bg-ivory/8!">
              Volver al inicio
            </BaseButton>
            <RouterLink
              :to="withContext('/menu')"
              class="inline-flex items-center gap-2 text-[0.82rem] font-medium uppercase tracking-[0.15em] text-ivory/68 transition-colors hover:text-ivory"
            >
              Ver la carta
              <MenuIcon name="arrow-right" :size="15" />
            </RouterLink>
          </div>

          <div class="mt-12 max-w-10 text-ivory/10" data-reveal>
            <SignatureStroke />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
