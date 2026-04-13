import { mockSitePayload } from '@/data/mock-site';

function normalizeLocaleCode(value, fallback = 'es') {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'en') return 'en';
  if (normalized === 'de') return 'de';
  if (normalized === 'es') return 'es';
  return fallback;
}

function pickFirstValue(...values) {
  return values.find((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null && value !== '';
  });
}

function normalizeNavigation(items, fallbackItems) {
  const source = Array.isArray(items) && items.length > 0 ? items : fallbackItems;
  const normalizedItems = source
    .map((item) => ({
      label: String(item.label || item.name || '').trim(),
      to: String(item.to || item.href || item.path || '').trim(),
    }))
    .filter((item) => item.to === '/menu');

  return normalizedItems.length > 0 ? normalizedItems : fallbackItems;
}

function normalizeSocialLinks(items, fallbackItems) {
  const source = Array.isArray(items) && items.length > 0 ? items : fallbackItems;

  return source.map((item) => ({
    label: String(item.label || item.name || '').trim(),
    url: String(item.url || item.href || '').trim(),
  }));
}

function resolveLocalizedSiteContentValue(item, locale) {
  const normalizedLocale = normalizeLocaleCode(locale, 'es');

  if (normalizedLocale === 'en') {
    return pickFirstValue(item?.valueEn, item?.value, '');
  }

  if (normalizedLocale === 'de') {
    return pickFirstValue(item?.valueDe, item?.value, '');
  }

  return pickFirstValue(item?.value, '');
}

function buildContentMap(rawPayload = {}, locale = 'es') {
  const items = Array.isArray(rawPayload)
    ? rawPayload
    : Array.isArray(rawPayload.items)
      ? rawPayload.items
      : null;

  if (!items) {
    return null;
  }

  return items.reduce((map, item) => {
    const key = String(item?.key || '').trim();
    if (!key) return map;
    map[key] = resolveLocalizedSiteContentValue(item, locale);
    return map;
  }, {});
}

function buildAddress(contentMap, fallbackContact) {
  const line1 = String(contentMap['site.contact.address_line1'] || '').trim();
  const line2 = String(contentMap['site.contact.address_line2'] || '').trim();
  const address = [line1, line2].filter(Boolean).join(', ');

  return address || fallbackContact.address;
}

function buildPegasuzNavigation(contentMap, fallbackNavigation) {
  const menuLabel = pickFirstValue(
    contentMap['header.nav.menu'],
    contentMap['header.nav.services'],
    fallbackNavigation.find((item) => item.to === '/menu')?.label,
    'Carta'
  );

  return [
    {
      label: menuLabel,
      to: '/menu',
    },
  ];
}

function buildPegasuzSocialLinks(contentMap, fallbackSocialLinks) {
  const socialLabels = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    tripadvisor: 'TripAdvisor',
    linkedin: 'LinkedIn',
  };

  const primaryLinks = Object.entries(socialLabels)
    .map(([key, label]) => {
      const url = String(contentMap[`site.social.${key}`] || '').trim();
      return url ? { label, url } : null;
    })
    .filter(Boolean);

  if (primaryLinks.length > 0) {
    return primaryLinks;
  }

  return fallbackSocialLinks;
}

export function adaptSitePayload(rawPayload = {}, options = {}) {
  const fallback = mockSitePayload;
  const locale = normalizeLocaleCode(options?.locale, 'es');
  const contentMap = buildContentMap(rawPayload, locale);

  if (contentMap) {
    const structuredContent = {
      brand: {
        name: pickFirstValue(contentMap['site.brand.name'], fallback.brand.name),
        tagline: pickFirstValue(contentMap['site.brand.tagline'], fallback.brand.tagline),
      },
      hero: {
        headline: pickFirstValue(
          contentMap['home.hero.headline'],
          contentMap['hero.headline'],
          fallback.hero.headline
        ),
        subheadline: pickFirstValue(
          contentMap['home.hero.subheadline'],
          contentMap['hero.subheadline'],
          fallback.hero.subheadline
        ),
        image: pickFirstValue(
          contentMap['home.hero.image_url'],
          contentMap['hero.image_url'],
          fallback.hero.image
        ),
        image_alt: pickFirstValue(
          contentMap['home.hero.image_alt'],
          contentMap['hero.image_alt'],
          fallback.hero.image_alt
        ),
      },
      intro: {
        label: pickFirstValue(contentMap['home.intro.label'], fallback.intro.label),
        tagline: pickFirstValue(contentMap['home.intro.tagline'], fallback.intro.tagline),
      },
      short_about: pickFirstValue(
        contentMap['home.short_about'],
        contentMap['site.short_about'],
        fallback.short_about
      ),
      menu_cta: {
        label: pickFirstValue(
          contentMap['home.menu_cta.label'],
          contentMap['menu.cta.label'],
          contentMap['header.cta_label'],
          fallback.menu_cta.label
        ),
        href: pickFirstValue(contentMap['home.menu_cta.href'], fallback.menu_cta.href),
      },
      footer: {
        closing: pickFirstValue(contentMap['footer.closing'], fallback.footer.closing),
        copyright: pickFirstValue(contentMap['footer.copyright'], fallback.footer.copyright),
      },
    };

    return {
      meta: {
        name: pickFirstValue(contentMap['site.brand.name'], fallback.meta.name),
        label: pickFirstValue(fallback.meta.label),
        description: pickFirstValue(contentMap['footer.description'], fallback.meta.description),
        reservationHref: pickFirstValue(structuredContent.menu_cta.href, fallback.meta.reservationHref),
        reservationLabel: pickFirstValue(structuredContent.menu_cta.label, fallback.meta.reservationLabel),
        ogImage: pickFirstValue(structuredContent.hero.image, fallback.meta.ogImage),
      },
      navigation: buildPegasuzNavigation(contentMap, fallback.navigation),
      contact: {
        city: pickFirstValue(contentMap['site.contact.address_line2'], fallback.contact.city),
        address: buildAddress(contentMap, fallback.contact),
        hours: pickFirstValue(contentMap['site.contact.schedule'], fallback.contact.hours),
        phone: pickFirstValue(contentMap['site.contact.phone'], fallback.contact.phone),
        email: pickFirstValue(contentMap['site.contact.email'], fallback.contact.email),
        whatsapp: pickFirstValue(contentMap['site.contact.whatsapp'], contentMap['site.contact.phone'], fallback.contact.whatsapp),
      },
      socialLinks: buildPegasuzSocialLinks(contentMap, fallback.socialLinks),
      content: structuredContent,
      contentMap,
    };
  }

  const rawMeta = rawPayload.meta || rawPayload.siteMeta || rawPayload.site || {};
  const rawContact =
    rawPayload.contact ||
    rawPayload.contactDetails ||
    rawPayload.siteContact ||
    rawPayload.site?.contact ||
    {};

  return {
    meta: {
      name: pickFirstValue(rawMeta.name, rawPayload.name, fallback.meta.name),
      label: pickFirstValue(rawMeta.label, fallback.meta.label),
      description: pickFirstValue(rawMeta.description, rawPayload.description, fallback.meta.description),
      reservationHref: pickFirstValue(rawMeta.reservationHref, rawMeta.reservationPath, fallback.meta.reservationHref),
      reservationLabel: pickFirstValue(rawMeta.reservationLabel, rawMeta.ctaLabel, fallback.meta.reservationLabel),
      ogImage: pickFirstValue(rawMeta.ogImage, rawMeta.image, fallback.meta.ogImage),
    },
    navigation: normalizeNavigation(
      rawPayload.navigation || rawPayload.primaryNavigation || rawPayload.site?.navigation,
      fallback.navigation
    ),
    contact: {
      city: pickFirstValue(rawContact.city, fallback.contact.city),
      address: pickFirstValue(rawContact.address, rawContact.addressLine1, fallback.contact.address),
      hours: pickFirstValue(rawContact.hours, rawContact.schedule, fallback.contact.hours),
      phone: pickFirstValue(rawContact.phone, fallback.contact.phone),
      email: pickFirstValue(rawContact.email, fallback.contact.email),
      whatsapp: pickFirstValue(rawContact.whatsapp, rawContact.phone, fallback.contact.whatsapp),
    },
    socialLinks: normalizeSocialLinks(
      rawPayload.socialLinks || rawPayload.social || rawPayload.site?.socialLinks,
      fallback.socialLinks
    ),
    content: {
      brand: {
        ...fallback.brand,
        ...(rawPayload.brand || {}),
      },
      hero: {
        ...fallback.hero,
        ...(rawPayload.hero || {}),
      },
      intro: {
        ...fallback.intro,
        ...(rawPayload.intro || {}),
      },
      short_about: pickFirstValue(rawPayload.short_about, fallback.short_about),
      menu_cta: {
        ...fallback.menu_cta,
        ...(rawPayload.menu_cta || {}),
      },
      footer: {
        ...fallback.footer,
        ...(rawPayload.footer || {}),
      },
    },
    contentMap: {},
  };
}
