import { apiRequest } from '@/api/client';
import { isApiEnabled, isPegasuzProvider } from '@/api/config';

let cachedSiteContentPayload = null;
let pendingSiteContentRequest = null;

function cloneSiteContentPayload(payload) {
  return structuredClone(payload);
}

export async function getSiteContentPayload(options = {}) {
  const { force = false } = options;

  if (!isApiEnabled() || !isPegasuzProvider()) {
    return null;
  }

  if (!force && pendingSiteContentRequest) {
    return pendingSiteContentRequest;
  }

  if (!force && cachedSiteContentPayload) {
    return cloneSiteContentPayload(cachedSiteContentPayload);
  }

  pendingSiteContentRequest = (async () => {
    const payload = await apiRequest('/site-contents');
    cachedSiteContentPayload = cloneSiteContentPayload(payload);
    return cloneSiteContentPayload(cachedSiteContentPayload);
  })();

  try {
    return await pendingSiteContentRequest;
  } finally {
    pendingSiteContentRequest = null;
  }
}
