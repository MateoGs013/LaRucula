import { apiRequest } from '@/api/client';
import { isApiEnabled, isPegasuzProvider } from '@/api/config';
import { adaptSitePayload } from '@/adapters/siteAdapter';
import { mockSitePayload } from '@/data/mock-site';
import { getSiteContentPayload } from '@/services/siteContentService';

let cachedSite = adaptSitePayload(mockSitePayload);
let pendingSiteRequest = null;
let hasRemoteSite = false;

function cloneSite(site) {
  return {
    meta: { ...site.meta },
    navigation: site.navigation.map((item) => ({ ...item })),
    contact: { ...site.contact },
    socialLinks: site.socialLinks.map((item) => ({ ...item })),
    contentMap: { ...(site.contentMap || {}) },
  };
}

export function getSiteConfigSnapshot() {
  return cloneSite(cachedSite);
}

export async function getSiteConfig(options = {}) {
  const { force = false } = options;

  if (!isApiEnabled()) {
    cachedSite = adaptSitePayload(mockSitePayload);
    hasRemoteSite = false;
    return getSiteConfigSnapshot();
  }

  if (!force && pendingSiteRequest) {
    return pendingSiteRequest;
  }

  if (!force && hasRemoteSite) {
    return getSiteConfigSnapshot();
  }

  pendingSiteRequest = (async () => {
    const payload = isPegasuzProvider()
      ? await getSiteContentPayload({ force })
      : await apiRequest('/site');
    cachedSite = adaptSitePayload(payload);
    hasRemoteSite = true;
    return getSiteConfigSnapshot();
  })();

  try {
    return await pendingSiteRequest;
  } finally {
    pendingSiteRequest = null;
  }
}
