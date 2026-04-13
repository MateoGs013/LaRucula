/**
 * Real menu data for La Rucula, transcribed from physical menu photos (April 2026).
 *
 * Structure: sections > categories > items
 * Each section maps to a physical page of the restaurant menu.
 * Categories are sub-groups within each section.
 *
 * Dual pricing:
 *   price      = primary price (media racion, unidad, copa, etc.)
 *   price_alt  = secondary price (racion entera, botella, etc.)
 *   price_label / price_alt_label = column headers for the section
 */

export const mockMenuFull = {
  title: 'Carta',
  subtitle: 'Cocina mediterránea · de temporada y cercana',
  updated_at: '2026-04-09',
  notes: [
    { text: 'Por favor, avisa a sala si tienes alergias o intolerancias.', type: 'allergy' },
    { text: 'Tenemos pan SIN GLUTEN disponible.', type: 'dietary' },
  ],
  featured: ['vacio-argentino', 'presa-iberica', 'croquetas-temporada'],

  sections: [
    /* ================================================================
     * SECTION 1: CAFÉ
     * ================================================================ */
    {
      id: 'sec-cafe',
      slug: 'cafe',
      name: 'Café',
      icon: 'coffee',
      order: 1,
      intro: 'Desayunos, cafés y tostadas — servidos por la mañana.',
      notes: [],
      categories: [
        {
          id: 'cat-cafes',
          slug: 'cafes',
          name: 'Cafés',
          icon: 'coffee',
          order: 1,
          notes: [],
          items: [
            { id: 'cafe-1', slug: 'solo', name: 'Solo', description: '', price: 1.50, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'cafe-2', slug: 'espresso', name: 'Espresso', description: '', price: 1.00, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'cafe-3', slug: 'doble-carga', name: 'Doble carga', description: '', price: 2.50, currency: 'EUR', badges: [], availability: 'available', order: 3 },
            { id: 'cafe-4', slug: 'doble-carga-leche', name: 'Doble carga con leche', description: '', price: 2.50, currency: 'EUR', badges: [], availability: 'available', order: 4 },
            { id: 'cafe-5', slug: 'cortado', name: 'Cortado', description: '', price: 1.70, currency: 'EUR', badges: [], availability: 'available', order: 5 },
            { id: 'cafe-6', slug: 'con-leche', name: 'Con leche', description: '', price: 1.80, currency: 'EUR', badges: [], availability: 'available', order: 6 },
            { id: 'cafe-7', slug: 'manchado', name: 'Manchado', description: '', price: 2.00, currency: 'EUR', badges: [], availability: 'available', order: 7 },
            { id: 'cafe-8', slug: 'americano', name: 'Americano', description: '', price: 2.00, currency: 'EUR', badges: [], availability: 'available', order: 8 },
            { id: 'cafe-9', slug: 'descafeinado', name: 'Descafeinado', description: '', price: 2.00, currency: 'EUR', badges: [], availability: 'available', order: 9 },
            { id: 'cafe-10', slug: 'descafeinado-leche', name: 'Descafeinado con leche', description: '', price: 2.00, currency: 'EUR', badges: [], availability: 'available', order: 10 },
            { id: 'cafe-11', slug: 'cafe-xl', name: 'Café XL', description: 'Descafeinado y manchado', price: 2.50, currency: 'EUR', badges: [], availability: 'available', order: 11 },
            { id: 'cafe-12', slug: 'capuchino', name: 'Capuchino', description: '', price: 2.50, currency: 'EUR', badges: [], availability: 'available', order: 12 },
            { id: 'cafe-13', slug: 'capuchino-xl', name: 'Capuchino XL', description: '', price: 3.50, currency: 'EUR', badges: [], availability: 'available', order: 13 },
            { id: 'cafe-14', slug: 'caramel-macchiato', name: 'Caramel macchiato', description: 'Leche al vapor manchada por espresso, con caramelo', price: 3.50, currency: 'EUR', badges: [], availability: 'available', order: 14 },
            { id: 'cafe-15', slug: 'bombon', name: 'Bombón', description: '', price: 1.70, currency: 'EUR', badges: [], availability: 'available', order: 15 },
            { id: 'cafe-16', slug: 'irlandes', name: 'Irlandés', description: '', price: 3.50, currency: 'EUR', badges: [], availability: 'available', order: 16 },
            { id: 'cafe-17', slug: 'triflasico', name: 'Triflásico', description: '', price: 3.50, currency: 'EUR', badges: [], availability: 'available', order: 17 },
            { id: 'cafe-18', slug: 'canario', name: 'Canario', description: 'Leche, azúcar, café y leche', price: 3.70, currency: 'EUR', badges: [], availability: 'available', order: 18 },
          ],
        },
        {
          id: 'cat-bebidas-cafe',
          slug: 'bebidas-cafe',
          name: 'Bebidas',
          icon: 'juice',
          order: 2,
          notes: [],
          items: [
            { id: 'beb-cafe-1', slug: 'zumo-naranja-natural', name: 'Zumo de Naranja Natural', description: '', price: 3.80, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'beb-cafe-2', slug: 'zumos', name: 'Zumos', description: 'Melocotón y manzana', price: 3.00, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'beb-cafe-3', slug: 'batidos-casa', name: 'Batidos de la casa', description: 'Cualquier sabor a elegir', price: 4.00, currency: 'EUR', badges: [], availability: 'available', order: 3 },
          ],
        },
        {
          id: 'cat-combos',
          slug: 'combos',
          name: 'Combos',
          icon: 'combo',
          order: 3,
          notes: [{ text: 'No se permiten cambios.', type: 'warning' }],
          items: [
            { id: 'combo-1', slug: 'desayuno-completo', name: 'Desayuno Completo', description: 'Café con leche o té + Zumo de naranja natural pequeño + Tostada entera', price: 6.50, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'combo-2', slug: 'desayuno-americano', name: 'Desayuno Americano', description: 'Café con leche o té + Zumo de naranja natural pequeño + Tostada entera con huevo revuelto y bacon', price: 9.80, currency: 'EUR', badges: [], availability: 'available', order: 2 },
          ],
        },
        {
          id: 'cat-tostadas',
          slug: 'tostadas',
          name: 'Tostadas',
          icon: 'toast',
          order: 4,
          price_label: '1/2',
          price_alt_label: '1',
          notes: [],
          items: [
            { id: 'tost-1', slug: 'tostada-aceite-tomate', name: 'Con Aceite y Tomate', description: '', price: 1.50, price_alt: 2.00, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'tost-2', slug: 'tostada-mantequilla-mermelada', name: 'Con Mantequilla y mermelada', description: '', price: 2.00, price_alt: 2.20, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'tost-3', slug: 'tostada-pate-iberico', name: 'Con Paté Ibérico', description: '', price: 2.00, price_alt: 2.20, currency: 'EUR', badges: [], availability: 'available', order: 3 },
            { id: 'tost-4', slug: 'tostada-queso-lonchas', name: 'Con Queso en lonchas', description: '', price: 1.40, price_alt: 2.00, currency: 'EUR', badges: [], availability: 'available', order: 4 },
            { id: 'tost-5', slug: 'tostada-jamon-serrano', name: 'Con Jamón Serrano', description: '', price: 2.20, price_alt: 3.00, currency: 'EUR', badges: [], availability: 'available', order: 5 },
            { id: 'tost-6', slug: 'tostada-jamon-york', name: 'Con Jamón York', description: '', price: 2.00, price_alt: 3.00, currency: 'EUR', badges: [], availability: 'available', order: 6 },
            { id: 'tost-7', slug: 'tostada-tortilla-francesa', name: 'Con Tortilla Francesa', description: '', price: 4.00, currency: 'EUR', badges: [], availability: 'available', order: 7 },
          ],
        },
        {
          id: 'cat-ademas',
          slug: 'ademas',
          name: 'Además...',
          icon: 'croissant',
          order: 5,
          notes: [
            { text: 'Extras por unidad: 0,50€ (mantequilla, mermelada, paté) · 0,80€ (tomate en rodajas) · 0,20€ (miel) · 2€ (jamón, queso, huevo)', type: 'extras' },
            { text: 'Hielo para el café: 0,15€', type: 'extras' },
          ],
          items: [
            { id: 'extra-1', slug: 'croissant-mantequilla-mermelada', name: 'Croissant Mantequilla y Mermelada', description: '', price: 2.50, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'extra-2', slug: 'croissant-mixto', name: 'Croissant Mixto', description: '', price: 3.50, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'extra-3', slug: 'croissant-serrano', name: 'Croissant Serrano', description: '', price: 4.50, currency: 'EUR', badges: [], availability: 'available', order: 3 },
            { id: 'extra-4', slug: 'bocadillo-mixto', name: 'Bocadillo Mixto', description: '', price: 3.50, currency: 'EUR', badges: [], availability: 'available', order: 4 },
            { id: 'extra-5', slug: 'bocadillo-serrano', name: 'Bocadillo Serrano', description: '', price: 4.50, currency: 'EUR', badges: [], availability: 'available', order: 5 },
            { id: 'extra-6', slug: 'napolitana-chocolate', name: 'Napolitana de Chocolate', description: '', price: 1.80, currency: 'EUR', badges: [], availability: 'available', order: 6 },
            { id: 'extra-7', slug: 'roll-canela', name: 'Roll de Canela', description: '', price: 3.00, currency: 'EUR', badges: [], availability: 'available', order: 7 },
            { id: 'extra-8', slug: 'bowl-yogurt-griego', name: 'Bowl Yogurt Griego con Granola y Fruta', description: 'Copos de avena, arroz, trigo y maíz con frutas deshidratadas, yogurt griego y frutas del día', price: 5.50, currency: 'EUR', badges: ['vegetarian'], availability: 'available', order: 8 },
          ],
        },
      ],
    },

    /* ================================================================
     * SECTION 2: MENÚ (comida)
     * ================================================================ */
    {
      id: 'sec-menu',
      slug: 'carta',
      name: 'Menú',
      icon: 'menu',
      order: 2,
      intro: 'Nuestra carta de comidas y cenas.',
      notes: [
        { text: 'Extras por unidad: 0,50€ (salsa de la casa) · 1,50€ (embutidos, queso, huevo)', type: 'extras' },
        { text: 'Pan y pico: solicitar al camarero (1,50€)', type: 'extras' },
      ],
      categories: [
        {
          id: 'cat-picar',
          slug: 'para-picar',
          name: 'Para picar',
          icon: 'appetizer',
          order: 1,
          notes: [],
          items: [
            { id: 'pic-1', slug: 'empanada-criolla', name: 'Empanada Criolla', description: 'Veal stew empanada', price: 4.50, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'pic-2', slug: 'empanada-mozzarella', name: 'Empanada Mozzarella', description: 'Mozzarella and corn empanada', price: 4.50, currency: 'EUR', badges: ['vegetarian'], availability: 'available', order: 2 },
            { id: 'pic-3', slug: 'provolone-tomates-asados', name: 'Provolone con Tomates Asados', description: 'Grilled provolone with roasted tomatoes', price: 8.50, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 3 },
            { id: 'pic-4', slug: 'provolone-cheddar-criollo', name: 'Provolone con Cheddar Criollo', description: 'Provolone with cheddar criollo', price: 9.00, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 4 },
            { id: 'pic-5', slug: 'papas-fritas-rusticas', name: 'Papas Fritas Rústicas', description: 'Classic french fries', price: 5.00, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 5 },
            { id: 'pic-6', slug: 'papas-cheddar-bacon', name: 'Papas Fritas con Cheddar y Bacon', description: 'Natural french fries with cheese & bacon', price: 7.50, currency: 'EUR', badges: [], availability: 'available', order: 6 },
            { id: 'pic-7', slug: 'papas-bravas', name: 'Papas Bravas', description: '', price: 7.50, currency: 'EUR', badges: ['spicy'], availability: 'available', order: 7 },
            { id: 'pic-8', slug: 'nachos-cheddar-mozzarella', name: 'Nachos con Cheddar y Mozzarella', description: 'Nachos with cheddar and mozzarella', price: 7.50, currency: 'EUR', badges: ['vegetarian'], availability: 'available', order: 8 },
            { id: 'pic-9', slug: 'nachos-tex-mex', name: 'Nachos Tex Mex', description: 'With beef, tomatoes, sauce & mozzarella', price: 9.00, currency: 'EUR', badges: [], availability: 'available', order: 9 },
            { id: 'pic-10', slug: 'bbq-wings', name: 'BBQ Wings', description: 'Alitas de pollo horneadas con salsa BBQ', price: 7.50, currency: 'EUR', badges: [], availability: 'available', order: 10 },
          ],
        },
        {
          id: 'cat-cadiz',
          slug: 'de-cadiz',
          name: 'De Cádiz',
          icon: 'fish',
          order: 2,
          price_label: '1/2',
          price_alt_label: '1',
          notes: [],
          items: [
            { id: 'cdz-1', slug: 'ensaladilla-rusa', name: 'Ensaladilla Rusa', description: 'Russian salad', price: 6.00, price_alt: 9.50, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'cdz-2', slug: 'albondigas-choco', name: 'Albóndigas de Choco', description: 'Cuttlefish meatballs', price: 8.50, price_alt: 16.50, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'cdz-3', slug: 'tiras-choco-frito', name: 'Tiras de Choco Frito', description: 'Fried cuttlefish strips', price: 7.00, price_alt: 10.00, currency: 'EUR', badges: [], availability: 'available', order: 3 },
            { id: 'cdz-4', slug: 'boquerones-fritos', name: 'Boquerones Fritos', description: 'Fried anchovies', price: 6.00, price_alt: 10.00, currency: 'EUR', badges: [], availability: 'available', order: 4 },
            { id: 'cdz-5', slug: 'boquerones-vinagre', name: 'Boquerones en Vinagre', description: 'Anchovies in vinegar', price: 6.00, price_alt: 10.00, currency: 'EUR', badges: ['gluten_free'], availability: 'available', order: 5 },
            { id: 'cdz-6', slug: 'cazon-adobado-frito', name: 'Cazón Adobado Frito', description: 'Fried marinated dogfish', price: 6.00, price_alt: 10.50, currency: 'EUR', badges: [], availability: 'available', order: 6 },
            { id: 'cdz-7', slug: 'puntillitas-fritas', name: 'Puntillitas Fritas', description: 'Fried baby squid', price: 6.00, price_alt: 10.00, currency: 'EUR', badges: [], availability: 'available', order: 7 },
            { id: 'cdz-8', slug: 'papas-alinadas', name: 'Papas Aliñadas', description: 'Dressed potatoes', price: 5.00, price_alt: 8.50, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 8 },
            { id: 'cdz-9', slug: 'papas-alioli', name: 'Papas al Alioli', description: 'Potatoes with alioli', price: 5.00, price_alt: 8.50, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 9 },
            { id: 'cdz-10', slug: 'cerilladas-en-casa', name: 'Cerilladas en casa', description: '', price: 8.50, price_alt: 15.00, currency: 'EUR', badges: [], availability: 'available', order: 10 },
            { id: 'cdz-11', slug: 'carne-al-toro', name: 'Carne al Toro', description: "Bull's tail stew in sauce", price: 10.00, price_alt: 16.00, currency: 'EUR', badges: [], availability: 'available', order: 11 },
            { id: 'cdz-12', slug: 'carne-salsa-tomate', name: 'Carne en Salsa o en Tomate', description: 'Meat in sauce or tomato', price: 10.00, price_alt: 16.00, currency: 'EUR', badges: [], availability: 'available', order: 12 },
            { id: 'cdz-13', slug: 'presa-iberica', name: 'Presa Ibérica', description: 'Con papas fritas y pimiento de padrón y jamón serrano · Iberic grilled pork with fried chips', price: 12.50, price_alt: 22.50, currency: 'EUR', badges: ['recommended'], availability: 'available', recommended: true, order: 13 },
            { id: 'cdz-14', slug: 'tortilla-camaron', name: 'Tortilla de Camarón', description: 'Shrimp omelette', price: 7.00, price_alt: 12.00, currency: 'EUR', badges: [], availability: 'available', order: 14 },
            { id: 'cdz-15', slug: 'crujiente-langostino', name: 'Crujiente de Langostino', description: 'Crispy shrimp', price: 9.00, currency: 'EUR', badges: [], availability: 'available', order: 15 },
            { id: 'cdz-16', slug: 'croquetas-temporada', name: 'Croquetas de temporada', description: 'Seasonal croquettes (4/8 uds)', price: 7.00, price_alt: 12.50, currency: 'EUR', badges: ['recommended'], availability: 'available', recommended: true, order: 16 },
          ],
        },
        {
          id: 'cat-infantil',
          slug: 'menu-infantil',
          name: 'Menú Infantil',
          icon: 'kids',
          order: 3,
          notes: [],
          items: [
            { id: 'inf-1', slug: 'lagrimitas-pollo', name: 'Lagrimitas de Pollo', description: 'Acompañado de patatas fritas caseras y mayonesa cremosa · Chicken strips with homemade chips', price: 10.50, currency: 'EUR', badges: [], availability: 'available', order: 1 },
          ],
        },
        {
          id: 'cat-chef',
          slug: 'platos-chef',
          name: 'Platos principales del chef',
          icon: 'chef',
          order: 4,
          notes: [],
          items: [
            { id: 'chef-1', slug: 'vacio-argentino', name: 'Vacío Argentino', description: 'Con verduras y papas fritas · Grilled Argentinian meat with chips', price: 27.00, currency: 'EUR', badges: ['recommended', 'gluten_free'], availability: 'available', recommended: true, order: 1 },
            { id: 'chef-2', slug: 'corto-lagarto-iberico', name: 'Corto Lagarto Ibérico', description: 'Con verduras y papas fritas · Grilled iberic cut with fried chips', price: 15.50, currency: 'EUR', badges: ['gluten_free'], availability: 'available', order: 2 },
            { id: 'chef-3', slug: 'corte-entrana-ternera', name: 'Corte Entraña Ternera', description: 'Con verduras y papas fritas · Grilled cut of veal with fried chips', price: 18.00, currency: 'EUR', badges: ['gluten_free'], availability: 'available', order: 3 },
          ],
        },
        {
          id: 'cat-hamburguesas',
          slug: 'hamburguesas',
          name: 'Entre-Panes',
          icon: 'hamburger',
          order: 5,
          notes: [],
          items: [
            { id: 'burg-1', slug: 'hamburguesa-cheese-bacon', name: 'Hamburguesa Cheese Bacon', description: 'Mayonesa, lechuga, tomate, cebolla · Mayo, salad, tomatoes, red onion', price: 14.50, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'burg-2', slug: 'hamburguesa-sunset', name: 'Hamburguesa Sunset', description: 'Mayonesa, barbacoa, bacon, queso, huevo · BBQ, coleslaw, bacon, cheese, egg, grilled', price: 15.00, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'burg-3', slug: 'hamburguesa-top', name: 'Hamburguesa Top', description: 'Mayonesa, cebolla caramelizada con miel · With caramelized onion with honey', price: 18.50, currency: 'EUR', badges: ['recommended'], availability: 'available', recommended: true, order: 3 },
            { id: 'burg-4', slug: 'choripan', name: 'Choripán', description: 'Choricillo criollo con chimichurri · Chorizo criollo sandwich with french fries', price: 13.50, currency: 'EUR', badges: [], availability: 'available', order: 4 },
          ],
        },
        {
          id: 'cat-pasta',
          slug: 'pasta',
          name: 'Deliciosa pasta',
          icon: 'pasta',
          order: 6,
          notes: [],
          items: [
            { id: 'pasta-1', slug: 'tortelloni-espinaca', name: 'Tortelloni de Espinaca', description: 'Con salsa de tomate · Spinach tortelloni with tomato sauce', price: 9.00, currency: 'EUR', badges: ['vegetarian'], availability: 'available', order: 1 },
          ],
        },
        {
          id: 'cat-ensaladas',
          slug: 'ensaladas',
          name: 'Ensaladas de temporada',
          icon: 'salad',
          order: 7,
          price_label: '1/2',
          price_alt_label: '1',
          notes: [],
          items: [
            { id: 'ens-1', slug: 'ensalada-tim', name: 'Tim', description: 'Mezcla de hojas verdes, tomates, papitas, judías verdes, tomates, pepino, granada, romero y miel · Green leaves, tomatoes, green beans, cucumber, pomegranate, honey and rosemary', price: 12.00, price_alt: 15.00, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 1 },
            { id: 'ens-2', slug: 'ensalada-membrillo', name: 'Membrillo', description: 'Mezcla de hojas verdes, peras, queso de cabra y membrillo, gajos de naranja · Green leaves, pear, orange segments, walnuts', price: 14.50, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 2 },
          ],
        },
        {
          id: 'cat-postres',
          slug: 'postres',
          name: 'Para terminar...',
          icon: 'dessert',
          order: 8,
          notes: [],
          items: [
            { id: 'post-1', slug: 'mix-helados', name: 'Mix de Helados', description: '', price: 5.00, currency: 'EUR', badges: ['gluten_free'], availability: 'available', order: 1 },
            { id: 'post-2', slug: 'panqueque-dulce-leche', name: 'Panqueque con dulce de leche', description: '', price: 6.50, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'post-3', slug: 'coulant-chocolate', name: 'Coulant de Chocolate', description: 'Coulant de chocolate acompañado de helado · Chocolate coulant with ice cream', price: 5.50, currency: 'EUR', badges: [], availability: 'available', order: 3 },
            { id: 'post-4', slug: 'maravilloso-pistacho', name: 'Maravilloso Pistacho', description: '', price: 6.00, currency: 'EUR', badges: [], availability: 'available', order: 4 },
            { id: 'post-5', slug: 'souffle-coco-mango-maracuya', name: 'Soufflé Coco Mango y Maracuyá', description: 'Coconut mango passion fruit soufflé on vanilla sauce', price: 6.00, currency: 'EUR', badges: [], availability: 'available', order: 5 },
            { id: 'post-6', slug: 'crumble-manzana', name: 'Crumble de manzana', description: 'Crumble de manzana con bolas acompañado de helado de frutos rojos', price: 5.50, currency: 'EUR', badges: [], availability: 'available', order: 6 },
          ],
        },
      ],
    },

    /* ================================================================
     * SECTION 3: BEBIDAS
     * ================================================================ */
    {
      id: 'sec-bebidas',
      slug: 'bebidas',
      name: 'Bebidas',
      icon: 'drink',
      order: 3,
      intro: '',
      notes: [],
      categories: [
        {
          id: 'cat-refrescos',
          slug: 'refrescos',
          name: 'Bebidas',
          icon: 'drink',
          order: 1,
          notes: [],
          items: [
            { id: 'ref-1', slug: 'agua-pequena', name: 'Agua pequeña', description: '', price: 2.50, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'ref-2', slug: 'agua-grande', name: 'Agua grande', description: '', price: 3.50, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'ref-3', slug: 'agua-con-gas', name: 'Agua con Gas', description: '', price: 2.50, currency: 'EUR', badges: [], availability: 'available', order: 3 },
            { id: 'ref-4', slug: 'refresco', name: 'Refresco', description: '', price: 2.90, currency: 'EUR', badges: [], availability: 'available', order: 4 },
            { id: 'ref-5', slug: 'nestea', name: 'Nestea', description: '', price: 2.90, currency: 'EUR', badges: [], availability: 'available', order: 5 },
            { id: 'ref-6', slug: 'tonica', name: 'Tónica', description: '', price: 2.50, currency: 'EUR', badges: [], availability: 'available', order: 6 },
            { id: 'ref-7', slug: 'tonica-zero', name: 'Tónica Zero', description: '', price: 2.50, currency: 'EUR', badges: [], availability: 'available', order: 7 },
            { id: 'ref-8', slug: 'tonica-berry', name: 'Tónica Berry', description: '', price: 2.50, currency: 'EUR', badges: [], availability: 'available', order: 8 },
            { id: 'ref-9', slug: 'bitter-kas', name: 'Bitter Kas', description: '', price: 2.50, currency: 'EUR', badges: [], availability: 'available', order: 9 },
          ],
        },
        {
          id: 'cat-limonada',
          slug: 'limonada',
          name: 'Limonada',
          icon: 'lemon',
          order: 2,
          notes: [],
          items: [
            { id: 'lim-1', slug: 'jarra-limonada', name: 'Jarra de Limonada', description: '', price: 5.50, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'lim-2', slug: 'vaso-limonada', name: 'Vaso de Limonada', description: '', price: 4.20, currency: 'EUR', badges: [], availability: 'available', order: 2 },
          ],
        },
        {
          id: 'cat-cervezas',
          slug: 'cervezas',
          name: 'Cervezas y tintos',
          icon: 'beer',
          order: 3,
          notes: [],
          items: [
            { id: 'cerv-1', slug: 'cana', name: 'Caña', description: '', price: 2.90, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'cerv-2', slug: 'cana-cortada', name: 'Caña Cortada', description: '', price: 3.00, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'cerv-3', slug: 'maceta', name: 'Maceta', description: '', price: 4.00, currency: 'EUR', badges: [], availability: 'available', order: 3 },
            { id: 'cerv-4', slug: 'cerveza', name: 'Cerveza', description: '', price: 3.00, currency: 'EUR', badges: [], availability: 'available', order: 4 },
            { id: 'cerv-5', slug: 'jarra-xxl', name: 'Jarra XXL', description: '', price: 8.00, currency: 'EUR', badges: [], availability: 'available', order: 5 },
            { id: 'cerv-6', slug: 'tercio', name: 'Tercio', description: '', price: 3.50, currency: 'EUR', badges: [], availability: 'available', order: 6 },
            { id: 'cerv-7', slug: 'alhambra-1925', name: 'Alhambra 1925', description: '', price: 3.50, currency: 'EUR', badges: [], availability: 'available', order: 7 },
            { id: 'cerv-8', slug: '1906', name: '1906', description: '', price: 3.50, currency: 'EUR', badges: [], availability: 'available', order: 8 },
            { id: 'cerv-9', slug: 'vaso-verano', name: 'Vaso de Verano', description: '', price: 3.50, currency: 'EUR', badges: [], availability: 'available', order: 9 },
            { id: 'cerv-10', slug: 'sangria-jarra', name: 'Sangría Jarra 1LT', description: '', price: 12.50, currency: 'EUR', badges: [], availability: 'available', order: 10 },
            { id: 'cerv-11', slug: 'copa-cerveza-xl', name: 'Copa de Cerveza XL', description: '', price: 4.50, currency: 'EUR', badges: [], availability: 'available', order: 11 },
            { id: 'cerv-12', slug: 'corona', name: 'Corona', description: '', price: 4.50, currency: 'EUR', badges: [], availability: 'available', order: 12 },
          ],
        },
        {
          id: 'cat-vinos',
          slug: 'vinos',
          name: 'Vinos',
          icon: 'wine',
          order: 4,
          price_label: 'Copa',
          price_alt_label: 'Botella',
          notes: [],
          items: [
            { id: 'vino-1', slug: 'emina-pasion', name: 'Emina Pasión', description: 'Ribera del Duero', price: 3.00, price_alt: 14.00, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'vino-2', slug: 'coto-mayor', name: 'Coto Mayor', description: 'Rioja', price: 5.00, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'vino-3', slug: 'emina-verdejo', name: 'Emina Verdejo', description: 'Rueda', price: 3.00, price_alt: 14.00, currency: 'EUR', badges: [], availability: 'available', order: 3 },
            { id: 'vino-4', slug: 'tierra-blanca', name: 'Tierra Blanca', description: '', price: 3.00, price_alt: 14.00, currency: 'EUR', badges: [], availability: 'available', order: 4 },
            { id: 'vino-5', slug: 'el-coto-semidulce', name: 'El Coto Semidulce', description: 'Rioja', price: 3.00, price_alt: 14.00, currency: 'EUR', badges: [], availability: 'available', order: 5 },
            { id: 'vino-6', slug: 'emina-rose', name: 'Emina Rosé', description: 'Cigales', price: 3.00, price_alt: 14.00, currency: 'EUR', badges: [], availability: 'available', order: 6 },
            { id: 'vino-7', slug: 'de-la-tierra', name: 'De la Tierra', description: '', price: 3.00, price_alt: 14.00, currency: 'EUR', badges: [], availability: 'available', order: 7 },
            { id: 'vino-8', slug: 'vina-real', name: 'Viña Real', description: '', price: null, price_alt: 25.00, currency: 'EUR', badges: [], availability: 'available', order: 8 },
            { id: 'vino-9', slug: 'lambrusco-frizzante', name: 'Lambrusco Frizzante', description: '', price_alt: 13.00, currency: 'EUR', badges: [], availability: 'available', order: 9 },
            { id: 'vino-10', slug: 'vino-espumante', name: 'Vino Espumante', description: '', price_alt: 15.00, currency: 'EUR', badges: [], availability: 'available', order: 10 },
          ],
        },
        {
          id: 'cat-rebujito-bebidas',
          slug: 'rebujito-bebidas',
          name: 'Rebujito',
          icon: 'wine',
          order: 5,
          notes: [],
          items: [
            { id: 'reb-b-1', slug: 'jarra-rebujito-beb', name: 'Jarra Rebujito', description: '', price: 8.00, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'reb-b-2', slug: 'vaso-rebujito-beb', name: 'Vaso Rebujito', description: '', price: 3.00, price_alt: 6.00, currency: 'EUR', badges: [], availability: 'available', order: 2 },
          ],
        },
      ],
    },

    /* ================================================================
     * SECTION 4: COCKTAILS Y TRAGOS
     * ================================================================ */
    {
      id: 'sec-cocktails',
      slug: 'cocktails',
      name: 'Cocktails y Tragos',
      icon: 'cocktail',
      order: 4,
      intro: '',
      notes: [],
      categories: [
        {
          id: 'cat-clasicos',
          slug: 'clasicos',
          name: 'Clásicos',
          icon: 'cocktail',
          order: 1,
          notes: [],
          items: [
            { id: 'coc-1', slug: 'caipirinha', name: 'Caipirinha', description: '', price: 8.00, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'coc-2', slug: 'negroni', name: 'Negroni', description: '', price: 8.00, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'coc-3', slug: 'mojito', name: 'Mojito', description: '', price: 8.00, currency: 'EUR', badges: [], availability: 'available', order: 3 },
            { id: 'coc-4', slug: 'margarita', name: 'Margarita', description: '', price: 8.00, currency: 'EUR', badges: [], availability: 'available', order: 4 },
            { id: 'coc-5', slug: 'pina-colada', name: 'Piña Colada', description: '', price: 8.00, currency: 'EUR', badges: [], availability: 'available', order: 5 },
            { id: 'coc-6', slug: 'mojito-tropical', name: 'Mojito Tropical', description: 'Sabor a elegir: Fresa, Mango, Maracuyá', price: 8.00, currency: 'EUR', badges: [], availability: 'available', order: 6 },
            { id: 'coc-7', slug: 'tequila-sunrise', name: 'Tequila Sunrise', description: '', price: 8.00, currency: 'EUR', badges: [], availability: 'available', order: 7 },
          ],
        },
        {
          id: 'cat-aperitivos',
          slug: 'aperitivos',
          name: 'Aperitivos',
          icon: 'aperitif',
          order: 2,
          notes: [],
          items: [
            { id: 'aper-1', slug: 'vermouth-lustau-rojo', name: 'Vermouth Lustau Rojo', description: '', price: 5.00, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'aper-2', slug: 'vermouth-lustau-blanco', name: 'Vermouth Lustau blanco', description: '', price: 5.00, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'aper-3', slug: 'martini-rosso', name: 'Martini Rosso', description: '', price: 4.00, currency: 'EUR', badges: [], availability: 'available', order: 3 },
            { id: 'aper-4', slug: 'martini-blanco', name: 'Martini Blanco', description: '', price: 4.00, currency: 'EUR', badges: [], availability: 'available', order: 4 },
            { id: 'aper-5', slug: 'aperol-spritz', name: 'Aperol Spritz', description: '', price: 7.50, currency: 'EUR', badges: [], availability: 'available', order: 5 },
            { id: 'aper-6', slug: 'campari-orange', name: 'Campari Orange', description: '', price: 7.50, currency: 'EUR', badges: [], availability: 'available', order: 6 },
          ],
        },
        {
          id: 'cat-rebujito',
          slug: 'rebujito',
          name: 'Rebujito',
          icon: 'wine',
          order: 3,
          notes: [],
          items: [
            { id: 'reb-1', slug: 'jarra-rebujito', name: 'Jarra Rebujito', description: '', price: 8.00, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'reb-2', slug: 'vaso-rebujito', name: 'Vaso Rebujito', description: '', price: 3.00, currency: 'EUR', badges: [], availability: 'available', order: 2 },
          ],
        },
        {
          id: 'cat-cubateo',
          slug: 'cubateo',
          name: 'Cubateo',
          icon: 'cocktail',
          order: 4,
          notes: [],
          items: [
            { id: 'cub-1', slug: 'cubata-clasico', name: 'Clásicos', description: '', price: 7.50, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'cub-2', slug: 'cubata-premium', name: 'Premium', description: 'A partir de', price: 8.00, currency: 'EUR', badges: [], availability: 'available', order: 2 },
          ],
        },
        {
          id: 'cat-sin-alcohol',
          slug: 'sin-alcohol',
          name: 'Sin Alcohol',
          icon: 'mocktail',
          order: 5,
          notes: [],
          items: [
            { id: 'sin-1', slug: 'mojito-sin', name: 'Mojito', description: '', price: 7.50, currency: 'EUR', badges: [], availability: 'available', order: 1 },
            { id: 'sin-2', slug: 'pina-colada-sin', name: 'Piña Colada', description: '', price: 7.50, currency: 'EUR', badges: [], availability: 'available', order: 2 },
            { id: 'sin-3', slug: 'fruit-mix-sin', name: 'Fruit Mix', description: '', price: 7.50, currency: 'EUR', badges: [], availability: 'available', order: 3 },
            { id: 'sin-4', slug: 'pina-colada-sin-2', name: 'Piña Colada', description: 'Mango, Maracuyá', price: 7.50, currency: 'EUR', badges: [], availability: 'available', order: 4 },
            { id: 'sin-5', slug: 'mojito-tropical-sin', name: 'Mojito Tropical', description: '', price: 7.50, currency: 'EUR', badges: [], availability: 'available', order: 5 },
          ],
        },
        {
          id: 'cat-batidos-cocktail',
          slug: 'batidos',
          name: 'Batidos',
          icon: 'smoothie',
          order: 6,
          notes: [],
          items: [
            { id: 'bat-1', slug: 'batido-sabor', name: 'Sabor a Elegir', description: 'Fresa, chocolate, mango, coco, piña, maracuyá, manzana verde...', price: 4.00, currency: 'EUR', badges: [], availability: 'available', order: 1 },
          ],
        },
      ],
    },

    /* ================================================================
     * SECTION 5: SMOOTHIES
     * ================================================================ */
    {
      id: 'sec-smoothies',
      slug: 'smoothies',
      name: 'Smoothies',
      icon: 'smoothie',
      order: 5,
      intro: '',
      notes: [],
      categories: [
        {
          id: 'cat-smoothies',
          slug: 'smoothies',
          name: 'Smoothies',
          icon: 'smoothie',
          order: 1,
          notes: [],
          items: [
            { id: 'smo-1', slug: 'acai-sunrise', name: 'Açaí Sunrise', description: 'Fresa, naranja, arándanos y açaí', price: 8.00, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 1 },
            { id: 'smo-2', slug: 'beet-boost', name: 'Beet Boost', description: 'Remolacha, piña, zanahoria', price: 8.00, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 2 },
            { id: 'smo-3', slug: 'green-detox', name: 'Green Detox', description: 'Espinaca, espárrago, manzana', price: 8.00, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 3 },
            { id: 'smo-4', slug: 'coco-crush', name: 'Coco Crush', description: 'Leche de coco, piña y dátil', price: 8.00, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 4 },
            { id: 'smo-5', slug: 'fresa-love', name: 'Fresa Love', description: 'Fresa y plátano', price: 6.00, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 5 },
            { id: 'smo-6', slug: 'vitamina-boost', name: 'Vitamina Boost', description: 'Naranja, zanahoria, mango', price: 8.00, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 6 },
            { id: 'smo-7', slug: 'bayas-power', name: 'Bayas Power', description: 'Frutos rojos y plátano', price: 6.00, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 7 },
            { id: 'smo-8', slug: 'tropical-mix', name: 'Tropical Mix', description: 'Piña, mango y coco', price: 6.00, currency: 'EUR', badges: ['vegetarian', 'gluten_free'], availability: 'available', order: 8 },
            { id: 'smo-9', slug: 'frappe-caramelo', name: 'Frappé Caramelo', description: 'Café frappe con caramelo y leche', price: 7.00, currency: 'EUR', badges: [], availability: 'available', order: 9 },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Helpers (backward-compatible with previous flat-category API)     */
/* ------------------------------------------------------------------ */

/** Flatten all categories across sections */
export function getAllCategories() {
  return mockMenuFull.sections.flatMap((section) =>
    section.categories.map((cat) => ({
      ...cat,
      section: section.slug,
      sectionName: section.name,
    }))
  );
}

/** Get section summaries */
export function getMenuSections() {
  return mockMenuFull.sections.map(({ id, slug, name, icon, order, intro, notes }) => ({
    id, slug, name, icon, order, intro, notes,
    categoryCount: mockMenuFull.sections.find((s) => s.slug === slug)?.categories.length || 0,
  }));
}

/** Get all categories for a section */
export function getSectionCategories(sectionSlug) {
  const section = mockMenuFull.sections.find((s) => s.slug === sectionSlug);
  return section ? section.categories : [];
}

/** Get a single section by slug */
export function getSection(slug) {
  return mockMenuFull.sections.find((s) => s.slug === slug) || null;
}

/** Legacy helper: get all category summaries (flat) */
export function getMenuCategories() {
  return getAllCategories().map(({ id, slug, name, icon, order, section, sectionName }) => ({
    id, slug, name, icon, order, section, sectionName,
  }));
}

/** Legacy helper: find category by slug across all sections */
export function getMenuCategory(slug) {
  for (const section of mockMenuFull.sections) {
    const cat = section.categories.find((c) => c.slug === slug);
    if (cat) return { ...cat, section: section.slug, sectionName: section.name };
  }
  return null;
}

/** Get featured items across all sections and categories */
export function getFeaturedItems() {
  const allItems = mockMenuFull.sections
    .flatMap((s) => s.categories)
    .flatMap((c) => c.items);

  return mockMenuFull.featured
    .map((slug) => allItems.find((item) => item.slug === slug))
    .filter(Boolean);
}
