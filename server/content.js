import { mockLocales } from '../src/data/mock-locales.js';
import { mockMenuFull } from '../src/data/mock-menu-v2.js';
import { mockSitePayload } from '../src/data/mock-site.js';

function clone(value) {
  return structuredClone(value);
}

function buildPegasuzSiteContentItems() {
  return [
    { key: 'site.brand.name', value: mockSitePayload.brand.name, section: 'site', type: 'text' },
    { key: 'site.brand.tagline', value: mockSitePayload.brand.tagline, section: 'site', type: 'text' },
    { key: 'site.contact.phone', value: mockSitePayload.contact.phone, section: 'site', type: 'text' },
    { key: 'site.contact.email', value: mockSitePayload.contact.email, section: 'site', type: 'text' },
    { key: 'site.contact.whatsapp', value: mockSitePayload.contact.whatsapp, section: 'site', type: 'text' },
    { key: 'site.contact.address_line1', value: mockSitePayload.contact.address, section: 'site', type: 'text' },
    { key: 'site.contact.address_line2', value: mockSitePayload.contact.city, section: 'site', type: 'text' },
    { key: 'site.contact.schedule', value: mockSitePayload.contact.hours, section: 'site', type: 'text' },
    {
      key: 'site.social.instagram',
      value: mockSitePayload.socialLinks.find((item) => item.label === 'Instagram')?.url || '',
      section: 'site',
      type: 'text',
    },
    {
      key: 'site.social.facebook',
      value: mockSitePayload.socialLinks.find((item) => item.label === 'Facebook')?.url || '',
      section: 'site',
      type: 'text',
    },
    {
      key: 'site.social.tripadvisor',
      value: mockSitePayload.socialLinks.find((item) => item.label === 'TripAdvisor')?.url || '',
      section: 'site',
      type: 'text',
    },
    { key: 'header.nav.menu', value: mockSitePayload.navigation[0]?.label || 'Menu', section: 'header', type: 'text' },
    { key: 'header.cta_label', value: mockSitePayload.menu_cta.label, section: 'header', type: 'text' },
    { key: 'home.intro.label', value: mockSitePayload.intro.label, section: 'home', type: 'text' },
    { key: 'home.intro.tagline', value: mockSitePayload.intro.tagline, section: 'home', type: 'text' },
    { key: 'home.hero.headline', value: mockSitePayload.hero.headline, section: 'home', type: 'text' },
    { key: 'home.hero.subheadline', value: mockSitePayload.hero.subheadline, section: 'home', type: 'textarea' },
    { key: 'home.hero.image_url', value: mockSitePayload.hero.image, section: 'home', type: 'text' },
    { key: 'home.hero.image_alt', value: mockSitePayload.hero.image_alt, section: 'home', type: 'text' },
    { key: 'home.short_about', value: mockSitePayload.short_about, section: 'home', type: 'textarea' },
    { key: 'home.menu_cta.label', value: mockSitePayload.menu_cta.label, section: 'home', type: 'text' },
    { key: 'home.menu_cta.href', value: mockSitePayload.menu_cta.href, section: 'home', type: 'text' },
    { key: 'footer.description', value: mockSitePayload.meta.description, section: 'footer', type: 'textarea' },
    { key: 'footer.closing', value: mockSitePayload.footer.closing, section: 'footer', type: 'textarea' },
    { key: 'footer.copyright', value: mockSitePayload.footer.copyright, section: 'footer', type: 'text' },
  ];
}

export function getSiteContent() {
  return clone(mockSitePayload);
}

export function getPegasuzSiteContentPayload() {
  return {
    tenant: 'larucula-mateo',
    items: buildPegasuzSiteContentItems(),
  };
}

export function getMenuContent() {
  return clone(mockMenuFull);
}

export function getMenuCategoriesContent() {
  return {
    categories: mockMenuFull.categories.map(({ id, slug, name, short_description, icon, order }) => ({
      id,
      slug,
      name,
      short_description,
      icon,
      order,
    })),
  };
}

export function getMenuCategoryBySlug(slug) {
  return clone(mockMenuFull.categories.find((category) => category.slug === slug) || null);
}

export function getLocalesContent() {
  return clone(mockLocales);
}
