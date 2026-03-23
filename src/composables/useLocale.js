import { ref, readonly, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mockLocales } from '@/data/mock-locales';

const currentLocale = ref(mockLocales.default);
const availableLocales = ref(mockLocales.locales);

/** Sync locale from ?lang= query param */
export function useLocale() {
  const route = useRoute();
  const router = useRouter();

  // Read initial locale from query
  const langParam = route.query.lang;
  if (langParam && availableLocales.value.some((l) => l.code === langParam)) {
    currentLocale.value = langParam;
  }

  // Watch for query changes
  watch(() => route.query.lang, (newLang) => {
    if (newLang && availableLocales.value.some((l) => l.code === newLang)) {
      currentLocale.value = newLang;
    }
  });

  function setLocale(code) {
    if (!availableLocales.value.some((l) => l.code === code)) return;
    currentLocale.value = code;
    router.replace({ query: { ...route.query, lang: code } });
  }

  return {
    locale: readonly(currentLocale),
    locales: readonly(availableLocales),
    setLocale,
  };
}

/** Non-reactive read for services/adapters */
export function getCurrentLocale() {
  return currentLocale.value;
}
