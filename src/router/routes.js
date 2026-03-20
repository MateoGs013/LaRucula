import HomePage from '@/pages/HomePage.vue';
import MenuPage from '@/pages/MenuPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import StoryPage from '@/pages/StoryPage.vue';
import VisitPage from '@/pages/VisitPage.vue';
import ReservationsPage from '@/pages/ReservationsPage.vue';
import BlogPage from '@/pages/BlogPage.vue';
import BlogPostPage from '@/pages/BlogPostPage.vue';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'LaRucula | Mediterranean beachfront dining',
      description:
        'Premium beachfront restaurant on the Costa del Sol. Mediterranean kitchen shaped by the coast, the season, and the sea.',
      ogType: 'website',
    },
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuPage,
    meta: {
      title: 'Menu | LaRucula',
      description:
        'Seasonal Mediterranean menu — fresh seafood, local produce, and a curated wine selection.',
      ogType: 'website',
    },
  },
  {
    path: '/story',
    name: 'story',
    component: StoryPage,
    meta: {
      title: 'Our Story | LaRucula',
      description:
        'A kitchen built where the land ends, shaped by the Mediterranean coast and decades of culinary tradition.',
      ogType: 'article',
    },
  },
  {
    path: '/visit',
    name: 'visit',
    component: VisitPage,
    meta: {
      title: 'Visit & Contact | LaRucula',
      description:
        'Find us on the Costa del Sol. Directions, hours, contact form, and everything you need to plan your visit.',
      ogType: 'website',
    },
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: ReservationsPage,
    meta: {
      title: 'Reserve Your Table | LaRucula',
      description:
        'Choose your table at LaRucula. Interactive floor plan with sea-view terrace, private dining, and intimate interior.',
      ogType: 'website',
    },
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogPage,
    meta: {
      title: 'Stories | LaRucula',
      description:
        'Kitchen notes, seasonal reflections, and the rituals of Mediterranean coastal dining.',
      ogType: 'website',
    },
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: BlogPostPage,
    meta: {
      title: 'Stories | LaRucula',
      description: 'A story from the coast.',
      ogType: 'article',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
    meta: {
      title: 'Page not found | LaRucula',
      description: 'This page does not exist at LaRucula.',
    },
  },
];
