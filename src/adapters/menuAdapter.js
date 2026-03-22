import { mockMenuData } from '@/data/mock-menu';

function pickFirstValue(...values) {
  return values.find((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null && value !== '';
  });
}

function normalizeDish(item, fallback = {}) {
  return {
    name: pickFirstValue(item?.name, item?.title, fallback.name, ''),
    detail: pickFirstValue(item?.detail, item?.description, fallback.detail, ''),
    signature: Boolean(item?.signature ?? fallback.signature ?? false),
    note: pickFirstValue(item?.note, fallback.note, ''),
  };
}

function normalizeWineGroup(item, fallback = {}) {
  return {
    category: pickFirstValue(item?.category, item?.label, fallback.category, ''),
    items: Array.isArray(item?.items) && item.items.length > 0 ? item.items : fallback.items || [],
  };
}

function normalizeMenuArray(items, fallbackItems) {
  const source = Array.isArray(items) && items.length > 0 ? items : fallbackItems;
  return source.map((item, index) => normalizeDish(item, fallbackItems[index]));
}

function normalizeWineArray(items, fallbackItems) {
  const source = Array.isArray(items) && items.length > 0 ? items : fallbackItems;
  return source.map((item, index) => normalizeWineGroup(item, fallbackItems[index]));
}

export function adaptMenuData(rawPayload = {}) {
  const fallback = mockMenuData;
  const hero = rawPayload.hero || {};
  const seaSection = rawPayload.sections?.sea || {};
  const landSection = rawPayload.sections?.land || {};
  const sweetSection = rawPayload.sections?.sweet || {};
  const wineSection = rawPayload.sections?.wine || {};

  return {
    seasonLabel: pickFirstValue(hero.seasonLabel, rawPayload.seasonLabel, fallback.seasonLabel),
    heroTitle: pickFirstValue(hero.title, rawPayload.heroTitle, fallback.heroTitle),
    seasonalNote: pickFirstValue(rawPayload.seasonalNote, rawPayload.note?.text, fallback.seasonalNote),
    closingNote: pickFirstValue(rawPayload.closingNote, rawPayload.footerNote, fallback.closingNote),
    seaMenu: normalizeMenuArray(rawPayload.seaMenu || seaSection.items, fallback.seaMenu),
    landMenu: normalizeMenuArray(rawPayload.landMenu || landSection.items, fallback.landMenu),
    sweetMenu: normalizeMenuArray(rawPayload.sweetMenu || sweetSection.items, fallback.sweetMenu),
    wines: normalizeWineArray(rawPayload.wines || wineSection.groups, fallback.wines),
  };
}
