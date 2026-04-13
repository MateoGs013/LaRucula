import { apiRequest } from '@/api/client';
import { isApiEnabled, isPegasuzProvider } from '@/api/config';
import { adaptSitePayload } from '@/adapters/siteAdapter';
import { mockSitePayload } from '@/data/mock-site';
import { getSiteContentPayload } from '@/services/siteContentService';
import { getCurrentLocale } from '@/composables/useLocale';

let cachedSitePayload = mockSitePayload;
let pendingSiteRequest = null;
let hasRemoteSitePayload = false;

function resolveLocale(options = {}) {
  return String(options.locale || getCurrentLocale() || 'es').trim().toLowerCase();
}

function cloneSite(site) {
  return {
    meta: { ...site.meta },
    navigation: site.navigation.map((item) => ({ ...item })),
    contact: { ...site.contact },
    socialLinks: site.socialLinks.map((item) => ({ ...item })),
    content: structuredClone(site.content || {}),
    contentMap: { ...(site.contentMap || {}) },
  };
}

export function getSiteConfigSnapshot(options = {}) {
  const locale = resolveLocale(options);
  return cloneSite(adaptSitePayload(cachedSitePayload, { locale }));
}

export async function getSiteConfig(options = {}) {
  const locale = resolveLocale(options);
  const { force = false } = options;

  if (!isApiEnabled()) {
    cachedSitePayload = mockSitePayload;
    hasRemoteSitePayload = false;
    return getSiteConfigSnapshot({ locale });
  }

  if (!force && pendingSiteRequest) {
    await pendingSiteRequest;
    return getSiteConfigSnapshot({ locale });
  }

  if (!force && hasRemoteSitePayload) {
    return getSiteConfigSnapshot({ locale });
  }

  pendingSiteRequest = (async () => {
    cachedSitePayload = isPegasuzProvider()
      ? await getSiteContentPayload({ force })
      : await apiRequest('/site', {
        query: { locale },
      });
    hasRemoteSitePayload = true;
    return getSiteConfigSnapshot({ locale });
  })();

  try {
    return await pendingSiteRequest;
  } finally {
    pendingSiteRequest = null;
  }
}
