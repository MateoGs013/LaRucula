import HomePage from '@/pages/HomePage.vue';
import MenuPage from '@/pages/MenuPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import StoryPage from '@/pages/StoryPage.vue';
import VisitPage from '@/pages/VisitPage.vue';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'LaRucula | Editorial beachfront dining',
      description:
        'Foundation route for LaRucula’s editorial, Mediterranean home experience.',
    },
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuPage,
    meta: {
      title: 'Menu | LaRucula',
      description:
        'Placeholder route for seasonal menus, tasting narratives, and editorial food storytelling.',
    },
  },
  {
    path: '/story',
    name: 'story',
    component: StoryPage,
    meta: {
      title: 'Story | LaRucula',
      description:
        'Placeholder route for atmosphere, authorship, and the restaurant’s narrative world.',
    },
  },
  {
    path: '/visit',
    name: 'visit',
    component: VisitPage,
    meta: {
      title: 'Visit | LaRucula',
      description:
        'Placeholder route for reservation flow, contact details, and the coastal arrival experience.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
    meta: {
      title: 'Page not found | LaRucula',
      description: 'Fallback route for unavailable LaRucula pages.',
    },
  },
];
