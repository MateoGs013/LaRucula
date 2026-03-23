import { mockMenuFull } from '@/data/mock-menu-v2';
import { getMenuUiCopy } from '@/data/menu-ui-copy';

function pickFirstValue(...values) {
  return values.find((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null && value !== '';
  });
}

function normalizeNote(note) {
  if (typeof note === 'string') {
    return { text: note, type: 'general' };
  }

  return {
    text: String(note?.text || '').trim(),
    type: String(note?.type || 'general').trim(),
  };
}

function normalizeItem(item, fallbackItem = {}) {
  return {
    id: pickFirstValue(item?.id, fallbackItem.id, ''),
    slug: pickFirstValue(item?.slug, fallbackItem.slug, ''),
    name: pickFirstValue(item?.name, item?.title, fallbackItem.name, ''),
    description: pickFirstValue(item?.description, item?.detail, fallbackItem.description, ''),
    price: item?.price ?? fallbackItem.price ?? null,
    currency: pickFirstValue(item?.currency, fallbackItem.currency, 'EUR'),
    image: pickFirstValue(item?.image, fallbackItem.image, null),
    badges: Array.isArray(item?.badges) ? item.badges : fallbackItem.badges || [],
    availability: pickFirstValue(item?.availability, fallbackItem.availability, 'available'),
    recommended: Boolean(item?.recommended ?? fallbackItem.recommended ?? false),
    order: item?.order ?? fallbackItem.order ?? 999,
  };
}

function normalizeCategory(category, fallbackCategory = {}) {
  const fallbackItems = Array.isArray(fallbackCategory.items) ? fallbackCategory.items : [];
  const items = Array.isArray(category?.items) && category.items.length > 0 ? category.items : fallbackItems;

  return {
    id: pickFirstValue(category?.id, fallbackCategory.id, ''),
    slug: pickFirstValue(category?.slug, fallbackCategory.slug, ''),
    name: pickFirstValue(category?.name, fallbackCategory.name, ''),
    short_description: pickFirstValue(
      category?.short_description,
      category?.shortDescription,
      fallbackCategory.short_description,
      ''
    ),
    icon: pickFirstValue(category?.icon, fallbackCategory.icon, 'star'),
    order: category?.order ?? fallbackCategory.order ?? 999,
    intro: pickFirstValue(category?.intro, fallbackCategory.intro, ''),
    notes: (Array.isArray(category?.notes) ? category.notes : fallbackCategory.notes || [])
      .map(normalizeNote)
      .filter((note) => note.text),
    items: items
      .map((item, index) => normalizeItem(item, fallbackItems[index]))
      .sort((a, b) => a.order - b.order),
  };
}

function adaptLegacyMenuPayload(rawPayload = {}, fallback) {
  const categoryBySlug = fallback.categories.reduce((accumulator, category) => {
    accumulator[category.slug] = category;
    return accumulator;
  }, {});

  return [
    {
      ...categoryBySlug.mar,
      items: Array.isArray(rawPayload.seaMenu) ? rawPayload.seaMenu : categoryBySlug.mar.items,
    },
    {
      ...categoryBySlug.tierra,
      items: Array.isArray(rawPayload.landMenu) ? rawPayload.landMenu : categoryBySlug.tierra.items,
    },
    {
      ...categoryBySlug.postres,
      items: Array.isArray(rawPayload.sweetMenu) ? rawPayload.sweetMenu : categoryBySlug.postres.items,
    },
    {
      ...categoryBySlug.vinos,
      items: Array.isArray(rawPayload.wines)
        ? rawPayload.wines.flatMap((group) => group.items || [])
        : categoryBySlug.vinos.items,
    },
    categoryBySlug.cocteles,
  ];
}

function resolveCategories(rawPayload, fallback) {
  if (Array.isArray(rawPayload?.categories) && rawPayload.categories.length > 0) {
    return rawPayload.categories;
  }

  if (rawPayload?.seaMenu || rawPayload?.landMenu || rawPayload?.sweetMenu || rawPayload?.wines) {
    return adaptLegacyMenuPayload(rawPayload, fallback);
  }

  return fallback.categories;
}

function resolveFeaturedItems(categories, featuredSlugs = []) {
  const allItems = categories.flatMap((category) => category.items);

  if (Array.isArray(featuredSlugs) && featuredSlugs.length > 0) {
    return featuredSlugs
      .map((slug) => allItems.find((item) => item.slug === slug))
      .filter(Boolean);
  }

  return allItems.filter((item) => item.recommended).slice(0, 3);
}

export function adaptMenuPayload(rawPayload = {}, options = {}) {
  const fallback = mockMenuFull;
  const locale = String(options.locale || 'es').trim().toLowerCase();

  const fallbackCategories = fallback.categories.reduce((accumulator, category) => {
    accumulator[category.slug] = category;
    return accumulator;
  }, {});

  const categories = resolveCategories(rawPayload, fallback)
    .map((category) => normalizeCategory(category, fallbackCategories[category.slug] || category))
    .sort((a, b) => a.order - b.order);

  const featuredSlugs = pickFirstValue(rawPayload.featured, fallback.featured, []);
  const featuredItems = resolveFeaturedItems(categories, featuredSlugs);

  return {
    title: pickFirstValue(rawPayload.title, rawPayload.heroTitle, fallback.title),
    subtitle: pickFirstValue(rawPayload.subtitle, rawPayload.seasonalNote, fallback.subtitle),
    updatedAt: pickFirstValue(rawPayload.updated_at, rawPayload.updatedAt, fallback.updated_at),
    notes: pickFirstValue(rawPayload.notes, fallback.notes, []).map(normalizeNote).filter((note) => note.text),
    categories,
    featuredItems,
    uiCopy: getMenuUiCopy(locale),
  };
}
