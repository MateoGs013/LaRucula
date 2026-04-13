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
    price_alt: item?.price_alt ?? fallbackItem.price_alt ?? null,
    price_label: pickFirstValue(item?.price_label, fallbackItem.price_label, null),
    price_alt_label: pickFirstValue(item?.price_alt_label, fallbackItem.price_alt_label, null),
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
    price_label: pickFirstValue(category?.price_label, fallbackCategory.price_label, null),
    price_alt_label: pickFirstValue(category?.price_alt_label, fallbackCategory.price_alt_label, null),
    notes: (Array.isArray(category?.notes) ? category.notes : fallbackCategory.notes || [])
      .map(normalizeNote)
      .filter((note) => note.text),
    items: items
      .map((item, index) => {
        const normalized = normalizeItem(item, fallbackItems[index]);
        // Inherit price labels from category if item doesn't have its own
        if (!normalized.price_label && category?.price_label) {
          normalized.price_label = category.price_label;
        }
        if (!normalized.price_alt_label && category?.price_alt_label) {
          normalized.price_alt_label = category.price_alt_label;
        }
        return normalized;
      })
      .sort((a, b) => a.order - b.order),
  };
}

function normalizeSection(section, fallbackSection = {}) {
  const fallbackCategories = Array.isArray(fallbackSection.categories) ? fallbackSection.categories : [];
  const categories = Array.isArray(section?.categories) && section.categories.length > 0
    ? section.categories
    : fallbackCategories;

  const fallbackCatBySlug = fallbackCategories.reduce((acc, cat) => {
    acc[cat.slug] = cat;
    return acc;
  }, {});

  return {
    id: pickFirstValue(section?.id, fallbackSection.id, ''),
    slug: pickFirstValue(section?.slug, fallbackSection.slug, ''),
    name: pickFirstValue(section?.name, fallbackSection.name, ''),
    icon: pickFirstValue(section?.icon, fallbackSection.icon, 'star'),
    order: section?.order ?? fallbackSection.order ?? 999,
    intro: pickFirstValue(section?.intro, fallbackSection.intro, ''),
    notes: (Array.isArray(section?.notes) ? section.notes : fallbackSection.notes || [])
      .map(normalizeNote)
      .filter((note) => note.text),
    categories: categories
      .map((cat) => normalizeCategory(cat, fallbackCatBySlug[cat.slug] || cat))
      .sort((a, b) => a.order - b.order),
  };
}

/**
 * Convert a flat-categories payload (legacy / Pegasuz API) into the sections structure.
 * Groups categories by their `section` field if present, otherwise puts them in a single section.
 */
function categoriesToSections(categories) {
  const sectionMap = new Map();

  for (const cat of categories) {
    // Pegasuz API returns snake_case (section_slug, section_name, ...).
    // Internal / mock shape uses camelCase (section, sectionName, ...).
    // Support both so the adapter works against either source.
    const sectionSlug = cat.section_slug || cat.section || 'general';
    const sectionName = cat.section_name || cat.sectionName || sectionSlug || 'Menú';
    const sectionIcon = cat.section_icon || cat.sectionIcon || cat.icon || 'star';
    const sectionOrderRaw = cat.section_order ?? cat.sectionOrder;
    const sectionOrder = Number.isFinite(sectionOrderRaw) ? sectionOrderRaw : sectionMap.size + 1;

    if (!sectionMap.has(sectionSlug)) {
      sectionMap.set(sectionSlug, {
        id: `sec-${sectionSlug}`,
        slug: sectionSlug,
        name: sectionName,
        icon: sectionIcon,
        order: sectionOrder,
        intro: '',
        notes: [],
        categories: [],
      });
    }

    sectionMap.get(sectionSlug).categories.push(cat);
  }

  return Array.from(sectionMap.values()).sort((a, b) => a.order - b.order);
}

function resolveSections(rawPayload, fallback) {
  // New format: sections array
  if (Array.isArray(rawPayload?.sections) && rawPayload.sections.length > 0) {
    return rawPayload.sections;
  }

  // Legacy format: flat categories array — group into sections
  if (Array.isArray(rawPayload?.categories) && rawPayload.categories.length > 0) {
    return categoriesToSections(rawPayload.categories);
  }

  // Fallback to mock
  return fallback.sections;
}

function resolveFeaturedItems(sections, featuredSlugs = []) {
  const allItems = sections
    .flatMap((section) => section.categories)
    .flatMap((category) => category.items);

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

  const fallbackSectionBySlug = fallback.sections.reduce((acc, section) => {
    acc[section.slug] = section;
    return acc;
  }, {});

  const sections = resolveSections(rawPayload, fallback)
    .map((section) => normalizeSection(section, fallbackSectionBySlug[section.slug] || section))
    .sort((a, b) => a.order - b.order);

  // Build flat categories list for backward compatibility
  const categories = sections.flatMap((section) =>
    section.categories.map((cat) => ({
      ...cat,
      section: section.slug,
      sectionName: section.name,
    }))
  );

  const featuredSlugs = pickFirstValue(rawPayload.featured, fallback.featured, []);
  const featuredItems = resolveFeaturedItems(sections, featuredSlugs);

  return {
    title: pickFirstValue(rawPayload.title, rawPayload.heroTitle, fallback.title),
    subtitle: pickFirstValue(rawPayload.subtitle, rawPayload.seasonalNote, fallback.subtitle),
    updatedAt: pickFirstValue(rawPayload.updated_at, rawPayload.updatedAt, fallback.updated_at),
    notes: pickFirstValue(rawPayload.notes, fallback.notes, []).map(normalizeNote).filter((note) => note.text),
    sections,
    categories,
    featuredItems,
    uiCopy: getMenuUiCopy(locale),
  };
}
