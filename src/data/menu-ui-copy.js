const MENU_UI_COPY = {
  es: {
    allLabel: 'Todas',
    homeMenuEyebrow: 'El centro de la casa',
    featuredListTitle: 'Lo más pedido esta noche',
    featuredTitle: 'Selección de cocina',
    featuredBadge: 'recomendado',
    qrReadyLabel: 'Categorías listas para QR',
    openCategoryLabel: 'Abrir categoría',
    closingNote: 'La carta cambia con el mercado y la marea. Algunos platos pueden variar según la temporada.',
    unavailableLabel: 'agotado',
    menuLabel: 'Carta',
    qrBadge: 'Modo QR',
    qrHint: 'Pensado para leer rápido desde la mesa.',
    backToMenu: 'Carta completa',
    badgeLabels: {
      recommended: 'Recomendado',
      spicy: 'Picante',
      vegetarian: 'Vegetariano',
      gluten_free: 'Sin gluten',
      seasonal: 'De temporada',
      lunch_only: 'Solo mediodía',
      dinner_only: 'Solo noche',
    },
  },
  en: {
    allLabel: 'All',
    homeMenuEyebrow: 'The centre of the house',
    featuredListTitle: 'Most asked tonight',
    featuredTitle: "Chef's selection",
    featuredBadge: 'recommended',
    qrReadyLabel: 'QR-ready categories',
    openCategoryLabel: 'Open category',
    closingNote: 'The menu changes with the market and the sea. Some dishes may vary with the season.',
    unavailableLabel: 'not available',
    menuLabel: 'Menu',
    qrBadge: 'QR mode',
    qrHint: 'Built for quick reading at the table.',
    backToMenu: 'Full menu',
    badgeLabels: {
      recommended: "Chef's pick",
      spicy: 'Spicy',
      vegetarian: 'Vegetarian',
      gluten_free: 'Gluten free',
      seasonal: 'Seasonal',
      lunch_only: 'Lunch only',
      dinner_only: 'Dinner only',
    },
  },
  ca: {
    allLabel: 'Totes',
    homeMenuEyebrow: 'El centre de la casa',
    featuredListTitle: 'El més demanat aquesta nit',
    featuredTitle: 'Selecció de cuina',
    featuredBadge: 'recomanat',
    qrReadyLabel: 'Categories preparades per a QR',
    openCategoryLabel: 'Obrir categoria',
    closingNote: 'La carta canvia amb el mercat i la marea. Alguns plats poden variar segons la temporada.',
    unavailableLabel: 'esgotat',
    menuLabel: 'Carta',
    qrBadge: 'Mode QR',
    qrHint: 'Pensat per llegir ràpidament des de la taula.',
    backToMenu: 'Carta completa',
    badgeLabels: {
      recommended: 'Recomanat',
      spicy: 'Picant',
      vegetarian: 'Vegetarià',
      gluten_free: 'Sense gluten',
      seasonal: 'De temporada',
      lunch_only: 'Només migdia',
      dinner_only: 'Només nit',
    },
  },
};

const NUMBER_FORMATS = {
  es: 'es-ES',
  en: 'en-GB',
  ca: 'ca-ES',
};

export function getMenuUiCopy(locale = 'es') {
  return MENU_UI_COPY[locale] || MENU_UI_COPY.es;
}

export function getMenuNumberLocale(locale = 'es') {
  return NUMBER_FORMATS[locale] || NUMBER_FORMATS.es;
}
