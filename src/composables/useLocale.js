import { readonly, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { apiRequest } from '@/api/client';
import { isApiEnabled, isPegasuzProvider } from '@/api/config';
import { mockLocales } from '@/data/mock-locales';

function normalizeLocaleCode(value, fallback = 'es') {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'en') return 'en';
  if (normalized === 'de') return 'de';
  if (normalized === 'es') return 'es';
  return fallback;
}

function normalizeLocaleEntry(locale, fallback = 'es') {
  const code = normalizeLocaleCode(locale?.code || locale, fallback);
  return {
    code,
    label: String(locale?.label || code.toUpperCase()),
  };
}

function normalizeLocalesPayload(payload) {
  const defaultLocale = normalizeLocaleCode(payload?.default, 'es');
  const sourceLocales = Array.isArray(payload?.locales) && payload.locales.length
    ? payload.locales
    : mockLocales.locales;

  const seen = new Set();
  const locales = sourceLocales
    .map((locale) => normalizeLocaleEntry(locale, defaultLocale))
    .filter((locale) => {
      if (seen.has(locale.code)) return false;
      seen.add(locale.code);
      return true;
    });

  if (!locales.some((locale) => locale.code === defaultLocale)) {
    locales.unshift(normalizeLocaleEntry({ code: defaultLocale, label: defaultLocale.toUpperCase() }, defaultLocale));
  }

  return {
    default: defaultLocale,
    locales,
  };
}

function getLocaleFromLocation() {
  if (typeof window === 'undefined') return '';

  try {
    const params = new URLSearchParams(window.location.search);
    return String(params.get('lang') || '').trim().toLowerCase();
  } catch (_error) {
    return '';
  }
}

function resolveNextLocale(locales, defaultLocale, preferredLocale = '') {
  const normalizedPreferred = normalizeLocaleCode(preferredLocale, '');
  if (normalizedPreferred && locales.some((locale) => locale.code === normalizedPreferred)) {
    return normalizedPreferred;
  }

  return locales.some((locale) => locale.code === defaultLocale)
    ? defaultLocale
    : (locales[0]?.code || 'es');
}

const localeConfig = normalizeLocalesPayload(mockLocales);
const currentLocale = ref(localeConfig.default);
const defaultLocale = ref(localeConfig.default);
const availableLocales = ref(localeConfig.locales);

let cachedLocalesPayload = null;
let hasRemoteLocales = false;
let pendingLocalesRequest = null;

function applyLocalesPayload(payload) {
  const normalized = normalizeLocalesPayload(payload);
  cachedLocalesPayload = normalized;
  defaultLocale.value = normalized.default;
  availableLocales.value = normalized.locales;
  currentLocale.value = resolveNextLocale(
    normalized.locales,
    normalized.default,
    getLocaleFromLocation() || currentLocale.value,
  );
  return normalized;
}

export function getCurrentLocale() {
  return currentLocale.value;
}

export function getLocalesSnapshot() {
  return {
    default: defaultLocale.value,
    locales: availableLocales.value.map((locale) => ({ ...locale })),
  };
}

export async function bootstrapLocales(options = {}) {
  const { force = false } = options;

  if (!isApiEnabled() || !isPegasuzProvider()) {
    hasRemoteLocales = false;
    return applyLocalesPayload(mockLocales);
  }

  if (!force && pendingLocalesRequest) {
    return pendingLocalesRequest;
  }

  if (!force && hasRemoteLocales && cachedLocalesPayload) {
    return applyLocalesPayload(cachedLocalesPayload);
  }

  pendingLocalesRequest = (async () => {
    try {
      const payload = await apiRequest('/locales');
      hasRemoteLocales = true;
      return applyLocalesPayload(payload);
    } catch (_error) {
      hasRemoteLocales = false;
      return applyLocalesPayload(mockLocales);
    }
  })();

  try {
    return await pendingLocalesRequest;
  } finally {
    pendingLocalesRequest = null;
  }
}

export function watchCurrentLocale(callback, options) {
  return watch(currentLocale, callback, options);
}

/** Sync locale from ?lang= query param */
export function useLocale() {
  const route = useRoute();
  const router = useRouter();

  const syncLocaleFromQuery = (nextLang) => {
    const nextLocale = resolveNextLocale(
      availableLocales.value,
      defaultLocale.value,
      String(nextLang || '').trim().toLowerCase(),
    );

    currentLocale.value = nextLocale;
  };

  syncLocaleFromQuery(route.query.lang);

  watch(
    () => route.query.lang,
    (newLang) => {
      syncLocaleFromQuery(newLang);
    },
  );

  function setLocale(code) {
    const nextLocale = resolveNextLocale(availableLocales.value, defaultLocale.value, code);
    if (!availableLocales.value.some((locale) => locale.code === nextLocale)) return;

    currentLocale.value = nextLocale;
    router.replace({ query: { ...route.query, lang: nextLocale } });
  }

  return {
    locale: readonly(currentLocale),
    locales: readonly(availableLocales),
    defaultLocale: readonly(defaultLocale),
    setLocale,
  };
}
