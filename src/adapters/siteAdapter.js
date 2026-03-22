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

export function adaptSitePayload(rawPayload = {}) {
  const fallback = mockSitePayload;
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
  };
}
