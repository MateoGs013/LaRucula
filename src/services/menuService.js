import { apiRequest } from '@/api/client';
import { isApiEnabled } from '@/api/config';
import { adaptMenuPayload } from '@/adapters/menuAdapter';
import { getCurrentLocale } from '@/composables/useLocale';
import { mockMenuFull } from '@/data/mock-menu-v2';

const menuCache = new Map();
const pendingRequests = new Map();

function resolveLocale(options = {}) {
  return String(options.locale || getCurrentLocale() || 'es').trim().toLowerCase();
}

function cloneMenu(menu) {
  return structuredClone(menu);
}

function getFallbackMenu(locale) {
  return adaptMenuPayload(mockMenuFull, { locale });
}

export function getMenuSnapshot(options = {}) {
  const locale = resolveLocale(options);
  const cachedMenu = menuCache.get(locale) || getFallbackMenu(locale);
  return cloneMenu(cachedMenu);
}

export function getMenuCategories(options = {}) {
  return getMenuSnapshot(options).categories.map((category) => ({
    id: category.id,
    slug: category.slug,
    name: category.name,
    short_description: category.short_description,
    icon: category.icon,
    order: category.order,
    section: category.section,
    sectionName: category.sectionName,
  }));
}

export function getMenuSections(options = {}) {
  return getMenuSnapshot(options).sections.map((section) => ({
    id: section.id,
    slug: section.slug,
    name: section.name,
    icon: section.icon,
    order: section.order,
    categoryCount: section.categories.length,
  }));
}

export function getMenuCategoryBySlug(slug, options = {}) {
  if (!slug) return null;

  return getMenuSnapshot(options).categories.find((category) => category.slug === slug) || null;
}

export function getMenuSectionBySlug(slug, options = {}) {
  if (!slug) return null;

  return getMenuSnapshot(options).sections.find((section) => section.slug === slug) || null;
}

export async function getMenuData(options = {}) {
  const locale = resolveLocale(options);
  const { force = false } = options;

  if (!isApiEnabled()) {
    const fallbackMenu = getFallbackMenu(locale);
    menuCache.set(locale, fallbackMenu);
    return cloneMenu(fallbackMenu);
  }

  if (!force && pendingRequests.has(locale)) {
    return pendingRequests.get(locale);
  }

  if (!force && menuCache.has(locale)) {
    return cloneMenu(menuCache.get(locale));
  }

  const request = (async () => {
    try {
      const payload = await apiRequest('/menu', {
        query: { locale },
      });
      const adaptedPayload = adaptMenuPayload(payload, { locale });
      menuCache.set(locale, adaptedPayload);
      return cloneMenu(adaptedPayload);
    } catch (error) {
      const fallbackMenu = getFallbackMenu(locale);
      menuCache.set(locale, fallbackMenu);
      return cloneMenu(fallbackMenu);
    }
  })();

  pendingRequests.set(locale, request);

  try {
    return await request;
  } finally {
    pendingRequests.delete(locale);
  }
}
