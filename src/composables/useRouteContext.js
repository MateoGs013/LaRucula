import { computed } from 'vue';
import { useRoute } from 'vue-router';

function cleanQuery(query = {}) {
  return Object.entries(query).reduce((accumulator, [key, value]) => {
    if (value === undefined || value === null || value === '') {
      return accumulator;
    }

    accumulator[key] = value;
    return accumulator;
  }, {});
}

export function useRouteContext() {
  const route = useRoute();

  const currentLocale = computed(() => String(route.query.lang || '').trim());
  const isQrMode = computed(() => String(route.query.entry || '').trim().toLowerCase() === 'qr');

  function withContext(to, options = {}) {
    const {
      preserveLang = true,
      preserveEntry = false,
      query = {},
      hash,
    } = options;

    const baseQuery = {};

    if (preserveLang && currentLocale.value) {
      baseQuery.lang = currentLocale.value;
    }

    if (preserveEntry && isQrMode.value) {
      baseQuery.entry = 'qr';
    }

    if (typeof to === 'string') {
      return {
        path: to,
        query: cleanQuery({
          ...baseQuery,
          ...query,
        }),
        hash,
      };
    }

    return {
      ...to,
      query: cleanQuery({
        ...baseQuery,
        ...(to.query || {}),
        ...query,
      }),
      hash: hash ?? to.hash,
    };
  }

  return {
    currentLocale,
    isQrMode,
    withContext,
  };
}
