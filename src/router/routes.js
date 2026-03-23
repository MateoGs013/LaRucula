import HomePage from '@/pages/HomePage.vue';
import MenuPage from '@/pages/MenuPage.vue';
import MenuCategoryPage from '@/pages/MenuCategoryPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'LaRucula | Cocina mediterránea frente al mar',
      description:
        'Restaurante premium frente al mar en la Costa del Sol. Cocina mediterránea marcada por la costa, la temporada y el mar.',
      ogType: 'website',
    },
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuPage,
    meta: {
      title: 'Carta | LaRucula',
      description:
        'Carta mediterránea de temporada: pesca fresca, producto local y una selección de vinos curada.',
      ogType: 'website',
    },
  },
  {
    path: '/menu/:slug',
    name: 'menu-category',
    component: MenuCategoryPage,
    meta: {
      title: 'Carta | LaRucula',
      description: 'Categoría de la carta de LaRucula.',
      ogType: 'website',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
    meta: {
      title: '404 | LaRucula',
      description: 'Página no encontrada.',
      ogType: 'website',
    },
  },
];
