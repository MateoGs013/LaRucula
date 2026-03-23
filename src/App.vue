<script setup>
import { computed, provide, ref, watch } from 'vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';

import IntroOverlay from '@/components/intro/IntroOverlay.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import WhatsAppButton from '@/components/ui/WhatsAppButton.vue';
import { contactDetails, siteContent } from '@/app/app-config';

const route = useRoute();
const introComplete = ref(true);
const hasSeenIntro = ref(false);

const shouldShowIntro = computed(
  () =>
    route.name === 'home' &&
    String(route.query.entry || '').trim().toLowerCase() !== 'qr' &&
    !hasSeenIntro.value &&
    !introComplete.value
);

function markIntroSeen() {
  hasSeenIntro.value = true;
  introComplete.value = true;

  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem('larucula-intro-seen', '1');
  }
}

if (typeof window !== 'undefined') {
  hasSeenIntro.value = window.sessionStorage.getItem('larucula-intro-seen') === '1';
}

watch(
  () => route.fullPath,
  () => {
    const isHomeRoute = route.name === 'home';
    const isQrEntry = String(route.query.entry || '').trim().toLowerCase() === 'qr';

    if (!isHomeRoute || isQrEntry || hasSeenIntro.value) {
      introComplete.value = true;
      return;
    }

    introComplete.value = false;
  },
  { immediate: true }
);

provide('introComplete', introComplete);
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
  <IntroOverlay
    v-if="shouldShowIntro"
    :label="siteContent.intro.label"
    :tagline="siteContent.intro.tagline"
    :image="siteContent.hero.image"
    @complete="markIntroSeen"
  />
  <WhatsAppButton :phone="contactDetails.whatsapp" />
</template>
