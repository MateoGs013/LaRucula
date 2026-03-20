import { createRouter, createWebHistory } from 'vue-router';

import { siteMeta } from '@/app/app-config';
import { getBlogPost } from '@/data/mock-blog-posts';

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
  let title = to.meta?.title ?? siteMeta.name;
  let description = to.meta?.description ?? siteMeta.description;
  let ogImage = to.meta?.ogImage ?? siteMeta.ogImage;

  // Dynamic blog post meta
  if (to.name === 'blog-post' && to.params.slug) {
    const post = getBlogPost(to.params.slug);
    if (post) {
      title = `${post.title} | LaRucula`;
      description = post.excerpt;
      ogImage = post.image;
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
