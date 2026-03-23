<script setup>
import { RouterLink } from 'vue-router';

import { adminAccessConfig, prepareAdminAccess } from '@/app/admin-config';
import SocialLinks from '@/components/ui/SocialLinks.vue';
import MenuIcon from '@/components/svg/MenuIcon.vue';
import { contactDetails, primaryNavigation, siteMeta, socialLinks, siteContent } from '@/app/app-config';
import { useRouteContext } from '@/composables/useRouteContext';

const { withContext } = useRouteContext();
</script>

<template>
  <footer class="bg-dusk text-ivory">
    <div class="shell py-16 md:py-20 lg:py-24">
      <!-- Closing statement -->
      <p class="max-w-3xl font-display text-[clamp(1.8rem,4.5vw,3.5rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ivory/50">
        {{ siteContent.footer.closing }}
      </p>

      <!-- Two-column: contact | nav -->
      <div class="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1fr_auto]">
        <div class="space-y-6">
          <!-- Menu CTA -->
          <RouterLink
            :to="withContext(siteContent.menu_cta.href)"
            class="inline-flex items-center gap-2 border border-ivory/20 px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ivory/65 transition-all duration-300 hover:border-ivory/40 hover:bg-ivory/6"
          >
            {{ siteContent.menu_cta.label }}
            <MenuIcon name="arrow-right" :size="14" class="text-ivory/40" />
          </RouterLink>

          <div class="text-[0.95rem] leading-7 text-ivory/45">
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
              <a
                :href="`https://wa.me/${contactDetails.whatsapp}`"
                class="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-ivory/70"
                target="_blank"
                rel="noopener"
              >
                <MenuIcon name="whatsapp" :size="14" />
                WhatsApp
              </a>
            </div>
          </div>

          <SocialLinks :links="socialLinks" tone="dark" />
        </div>

        <nav class="flex flex-col gap-3">
          <p class="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory/30">Navegación</p>
          <RouterLink
            :to="withContext('/')"
            class="text-[0.875rem] uppercase tracking-[0.15em] text-ivory/50 transition-colors duration-300 hover:text-ivory/80"
          >
            Inicio
          </RouterLink>
          <RouterLink
            v-for="item in primaryNavigation"
            :key="item.to"
            :to="withContext(item.to)"
            class="text-[0.875rem] uppercase tracking-[0.15em] text-ivory/50 transition-colors duration-300 hover:text-ivory/80"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>
    </div>

    <div class="border-t border-ivory/8">
      <div class="shell flex flex-col items-start gap-3 py-5 text-[0.875rem] text-ivory/35 md:flex-row md:items-center md:justify-between">
        <p class="font-display text-[1.1rem] tracking-[-0.02em] text-ivory/45">{{ siteMeta.name }}</p>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p>&copy; {{ new Date().getFullYear() }} · {{ siteContent.footer.copyright }}</p>
          <a
            v-if="adminAccessConfig.enabled"
            :href="adminAccessConfig.url"
            class="text-[0.75rem] uppercase tracking-[0.16em] text-ivory/25 transition-colors duration-300 hover:text-ivory/60"
            @click="prepareAdminAccess"
          >
            {{ adminAccessConfig.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
