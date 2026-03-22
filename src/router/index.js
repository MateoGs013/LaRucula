import { createRouter, createWebHistory } from 'vue-router';

import { siteMeta } from '@/app/app-config';
import { getBlogPost, getBlogPostSnapshot } from '@/services/blogService';

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

function applyMeta({
  title = siteMeta.name,
  description = siteMeta.description,
  ogType = 'website',
  ogImage = siteMeta.ogImage,
  url = window.location.href,
}) {
  document.title = title;
  setMeta('name', 'description', description);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', ogType);
  setMeta('property', 'og:image', ogImage);
  setMeta('property', 'og:url', url);
}

router.afterEach((to) => {
  let title = to.meta?.title ?? siteMeta.name;
  let description = to.meta?.description ?? siteMeta.description;
  let ogImage = to.meta?.ogImage ?? siteMeta.ogImage;

  // Dynamic blog post meta from the cached service snapshot first.
  if (to.name === 'blog-post' && to.params.slug) {
    const slug = String(to.params.slug);
    const post = getBlogPostSnapshot(slug);
    if (post) {
      title = `${post.title} | LaRucula`;
      description = post.excerpt;
      ogImage = post.image;
    }

    void (async () => {
      try {
        const resolvedPost = await getBlogPost(slug);
        const currentRoute = router.currentRoute.value;

        if (currentRoute.name !== 'blog-post' || String(currentRoute.params.slug) !== slug || !resolvedPost) {
          return;
        }

        applyMeta({
          title: `${resolvedPost.title} | LaRucula`,
          description: resolvedPost.excerpt,
          ogType: to.meta?.ogType ?? 'article',
          ogImage: resolvedPost.image,
        });
      } catch {
        // Keep the static route meta if the post cannot be resolved.
      }
    })();
  }

  applyMeta({
    title,
    description,
    ogType: to.meta?.ogType ?? 'website',
    ogImage,
  });
});

export default router;
