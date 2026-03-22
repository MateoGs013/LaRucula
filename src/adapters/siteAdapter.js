import { mockSitePayload } from '@/data/mock-site';

function pickFirstValue(...values) {
  return values.find((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null && value !== '';
  });
}

function normalizeNavigation(items, fallbackItems) {
  const source = Array.isArray(items) && items.length > 0 ? items : fallbackItems;

  return source.map((item) => ({
    label: String(item.label || item.name || '').trim(),
    to: String(item.to || item.href || item.path || '').trim(),
  }));
}

function normalizeSocialLinks(items, fallbackItems) {
  const source = Array.isArray(items) && items.length > 0 ? items : fallbackItems;

  return source.map((item) => ({
    label: String(item.label || item.name || '').trim(),
    url: String(item.url || item.href || '').trim(),
  }));
}

function buildContentMap(rawPayload = {}) {
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
    map[key] = item?.value ?? '';
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
  const labelByRoute = {
    '/menu': contentMap['header.nav.services'],
    '/story': contentMap['header.nav.about'],
    '/blog': contentMap['header.nav.blog'],
    '/visit': contentMap['header.nav.contact'],
  };

  return fallbackNavigation.map((item) => ({
    ...item,
    label: pickFirstValue(labelByRoute[item.to], item.label),
  }));
}

function buildPegasuzSocialLinks(contentMap, fallbackSocialLinks) {
  const socialLabels = {
    instagram: 'Instagram',
    facebook: 'Facebook',
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

export function adaptSitePayload(rawPayload = {}) {
  const fallback = mockSitePayload;
  const contentMap = buildContentMap(rawPayload);

  if (contentMap) {
    return {
      meta: {
        name: pickFirstValue(contentMap['site.brand.name'], fallback.meta.name),
        label: pickFirstValue(fallback.meta.label),
        description: pickFirstValue(contentMap['footer.description'], fallback.meta.description),
        reservationHref: pickFirstValue(fallback.meta.reservationHref),
        reservationLabel: pickFirstValue(contentMap['header.cta_label'], fallback.meta.reservationLabel),
        ogImage: pickFirstValue(fallback.meta.ogImage),
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
    contentMap: {},
  };
}
