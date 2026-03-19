<script setup>
import { ref, computed, provide, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import IntroOverlay from '@/components/intro/IntroOverlay.vue';
import WhatsAppButton from '@/components/ui/WhatsAppButton.vue';
import { contactDetails } from '@/app/app-config';

const route = useRoute();

const isAutomated = typeof navigator !== 'undefined' && navigator.webdriver === true;
const introAlreadyShown = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('lr-intro-shown') === 'true';

const introShown = ref(introAlreadyShown || isAutomated);
const introComplete = ref(introShown.value);
const showIntro = computed(() => route.path === '/' && !introShown.value);

watch(showIntro, (showing) => {
  if (!showing && !introComplete.value) {
    introComplete.value = true;
  }
});

function onIntroComplete() {
  introComplete.value = true;
  introShown.value = true;
  try { sessionStorage.setItem('lr-intro-shown', 'true'); } catch {}
}

provide('introComplete', introComplete);
</script>

<template>
  <IntroOverlay v-if="showIntro" @complete="onIntroComplete" />
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
  <WhatsAppButton :phone="contactDetails.whatsapp" />
</template>
