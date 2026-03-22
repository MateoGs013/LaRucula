import { reactive } from 'vue';

import { getErrorMessage } from '@/api/errors';
import { adaptSitePayload } from '@/adapters/siteAdapter';
import { mockSitePayload } from '@/data/mock-site';
import { getSiteConfig } from '@/services/siteService';

const defaultSiteConfig = adaptSitePayload(mockSitePayload);

export const siteMeta = reactive({ ...defaultSiteConfig.meta });
export const primaryNavigation = reactive([...defaultSiteConfig.navigation]);
export const contactDetails = reactive({ ...defaultSiteConfig.contact });
export const socialLinks = reactive([...defaultSiteConfig.socialLinks]);

export const siteConfigState = reactive({
  loading: false,
  ready: false,
  error: null,
  source: 'mock',
});

let bootstrapPromise = null;

function applySiteConfig(config) {
  Object.assign(siteMeta, config.meta);
  Object.assign(contactDetails, config.contact);

  primaryNavigation.splice(0, primaryNavigation.length, ...config.navigation);
  socialLinks.splice(0, socialLinks.length, ...config.socialLinks);
}

export async function bootstrapSiteConfig(options = {}) {
  const { force = false } = options;

  if (!force && siteConfigState.ready) {
    return {
      siteMeta,
      primaryNavigation,
      contactDetails,
      socialLinks,
    };
  }

  if (!force && bootstrapPromise) {
    return bootstrapPromise;
  }

  bootstrapPromise = (async () => {
    siteConfigState.loading = true;
    siteConfigState.error = null;

    try {
      const config = await getSiteConfig({ force });
      applySiteConfig(config);
      siteConfigState.source = 'remote';
    } catch (error) {
      applySiteConfig(defaultSiteConfig);
      siteConfigState.error = getErrorMessage(error, 'Unable to load the site configuration.');
      siteConfigState.source = 'mock';
    } finally {
      siteConfigState.loading = false;
      siteConfigState.ready = true;
    }

    return {
      siteMeta,
      primaryNavigation,
      contactDetails,
      socialLinks,
    };
  })();

  return bootstrapPromise;
}
