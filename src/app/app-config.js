import { reactive } from 'vue';

import { mockSitePayload } from '@/data/mock-site';
import { bootstrapLocales, getCurrentLocale, watchCurrentLocale } from '@/composables/useLocale';
import { getSiteConfig, getSiteConfigSnapshot } from '@/services/siteService';

const initialSiteConfig = getSiteConfigSnapshot({ locale: mockSitePayload?.defaultLocale || 'es' });

export const siteMeta = reactive({
  name: initialSiteConfig.meta.name,
  label: initialSiteConfig.meta.label,
  description: initialSiteConfig.meta.description,
  ogImage: initialSiteConfig.meta.ogImage,
  reservationHref: initialSiteConfig.meta.reservationHref,
  reservationLabel: initialSiteConfig.meta.reservationLabel,
});

export const primaryNavigation = reactive(initialSiteConfig.navigation.map((item) => ({ ...item })));

export const contactDetails = reactive({
  city: initialSiteConfig.contact.city,
  address: initialSiteConfig.contact.address,
  hours: initialSiteConfig.contact.hours,
  phone: initialSiteConfig.contact.phone,
  email: initialSiteConfig.contact.email,
  whatsapp: initialSiteConfig.contact.whatsapp,
});

export const socialLinks = reactive(initialSiteConfig.socialLinks.map((item) => ({ ...item })));

export const siteContent = reactive({
  brand: { ...initialSiteConfig.content.brand },
  hero: { ...initialSiteConfig.content.hero },
  intro: { ...initialSiteConfig.content.intro },
  short_about: initialSiteConfig.content.short_about,
  menu_cta: { ...initialSiteConfig.content.menu_cta },
  footer: { ...initialSiteConfig.content.footer },
});

export const siteContentMap = reactive({ ...(initialSiteConfig.contentMap || {}) });

function replaceReactiveArray(target, nextItems = []) {
  target.splice(0, target.length, ...nextItems.map((item) => ({ ...item })));
}

function replaceReactiveRecord(target, nextRecord = {}) {
  Object.keys(target).forEach((key) => {
    delete target[key];
  });

  Object.entries(nextRecord || {}).forEach(([key, value]) => {
    target[key] = value;
  });
}

function applySiteConfig(config) {
  Object.assign(siteMeta, config.meta);
  Object.assign(contactDetails, config.contact);
  Object.assign(siteContent.brand, config.content.brand);
  Object.assign(siteContent.hero, config.content.hero);
  Object.assign(siteContent.intro, config.content.intro);
  siteContent.short_about = config.content.short_about;
  Object.assign(siteContent.menu_cta, config.content.menu_cta);
  Object.assign(siteContent.footer, config.content.footer);

  replaceReactiveArray(primaryNavigation, config.navigation);
  replaceReactiveArray(socialLinks, config.socialLinks);
  replaceReactiveRecord(siteContentMap, config.contentMap);
}

let localeWatcherReady = false;

/** Called at startup — fetches locales and the locale-aware site shell when backend is connected. */
export async function bootstrapSiteConfig() {
  await bootstrapLocales();
  applySiteConfig(await getSiteConfig({ locale: getCurrentLocale(), force: true }));

  if (!localeWatcherReady) {
    watchCurrentLocale(async (nextLocale) => {
      applySiteConfig(await getSiteConfig({ locale: nextLocale }));
    });
    localeWatcherReady = true;
  }
}
