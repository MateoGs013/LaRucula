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
export const siteContentMap = reactive({ ...(defaultSiteConfig.contentMap || {}) });

// Structured content blocks for templates (footer, hero, etc.)
export const siteContent = reactive({
  brand: { ...defaultSiteConfig.content.brand },
  footer: { ...defaultSiteConfig.content.footer },
  hero: { ...defaultSiteConfig.content.hero },
  intro: { ...defaultSiteConfig.content.intro },
  short_about: defaultSiteConfig.content.short_about,
  menu_cta: { ...defaultSiteConfig.content.menu_cta },
});

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

  Object.keys(siteContentMap).forEach((key) => {
    delete siteContentMap[key];
  });
  Object.assign(siteContentMap, config.contentMap || {});

  Object.assign(siteContent.brand, config.content?.brand || defaultSiteConfig.content.brand);
  Object.assign(siteContent.hero, config.content?.hero || defaultSiteConfig.content.hero);
  Object.assign(siteContent.footer, config.content?.footer || defaultSiteConfig.content.footer);
  Object.assign(siteContent.intro, config.content?.intro || defaultSiteConfig.content.intro);
  Object.assign(siteContent.menu_cta, config.content?.menu_cta || defaultSiteConfig.content.menu_cta);
  siteContent.short_about = config.content?.short_about || defaultSiteConfig.content.short_about;
}

export async function bootstrapSiteConfig(options = {}) {
  const { force = false } = options;

  if (!force && siteConfigState.ready) {
    return {
      siteMeta,
      primaryNavigation,
      contactDetails,
      socialLinks,
      siteContent,
      siteContentMap,
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
      siteConfigState.source = config.contentMap && Object.keys(config.contentMap).length > 0 ? 'remote-cms' : 'remote';
    } catch (error) {
      applySiteConfig(defaultSiteConfig);
      siteConfigState.error = getErrorMessage(error, 'No se pudo cargar la configuración del sitio.');
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
      siteContent,
      siteContentMap,
    };
  })();

  return bootstrapPromise;
}
