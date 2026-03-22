import { computed, unref } from 'vue';

import { siteContentMap } from '@/app/app-config';

function resolveFallback(fallback) {
  return typeof fallback === 'function' ? fallback() : unref(fallback);
}

export function useSiteContentValue(key, fallback = '') {
  return computed(() => {
    const value = String(siteContentMap[key] ?? '').trim();
    const resolvedFallback = String(resolveFallback(fallback) ?? '').trim();
    return value || resolvedFallback;
  });
}
