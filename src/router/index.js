import { createRouter, createWebHistory } from 'vue-router';

import { getMenuCategoryBySlug } from '@/services/menuService';
import { getSiteConfigSnapshot } from '@/services/siteService';

import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 96,
        behavior: 'smooth',
      };
    }

    return { top: 0 };
  },
});

function setMeta(attr, name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

router.afterEach((to) => {
  const siteConfig = getSiteConfigSnapshot({ locale: to.query.lang });
  let title = to.meta?.title ?? siteConfig.meta.name;
  let description = to.meta?.description ?? siteConfig.meta.description;
  const ogImage = to.meta?.ogImage ?? siteConfig.meta.ogImage;

  // Dynamic menu category meta
  if (to.name === 'menu-category' && to.params.slug) {
    const cat = getMenuCategoryBySlug(to.params.slug, {
      locale: to.query.lang,
    });
    if (cat) {
      title = `${cat.name} | Carta | LaRucula`;
      description = cat.short_description;
    }
  }

  document.title = title;
  setMeta('name', 'description', description);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', to.meta?.ogType ?? 'website');
  setMeta('property', 'og:image', ogImage);
  setMeta('property', 'og:url', window.location.href);
});

export default router;
