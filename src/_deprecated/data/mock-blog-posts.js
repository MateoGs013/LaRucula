/**
 * Mock blog posts for the blog index and detail pages.
 * Structured for easy replacement with a CMS or API.
 */

export const mockBlogPosts = [
  {
    slug: 'the-morning-catch',
    title: 'The Morning Catch',
    subtitle: 'How the day\'s menu begins at the harbour',
    date: '2026-03-10',
    readTime: '4 min',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=1200&q=80&auto=format',
    imageAlt: 'Fresh Mediterranean fish displayed at the morning market',
    excerpt: 'Every morning before the kitchen lights come on, the chef walks the harbour. The menu is still unwritten — it waits for the sea to speak first.',
    body: [
      { type: 'paragraph', content: 'Every morning before the kitchen lights come on, the chef walks the harbour. The boats are coming in. The crates are being stacked on the quay. There is no menu yet — just the smell of salt and diesel, and the sound of ice being shoveled over the catch.' },
      { type: 'paragraph', content: 'This is where LaRucula\'s day begins. Not with a recipe book or a supplier list, but with a conversation. The fisherman shows what the net brought. The chef reads the quality of the scales, the firmness of the flesh, the clarity of the eyes. Decisions are made quickly and quietly.' },
      { type: 'quote', content: 'The sea writes the first draft of the menu. We just edit.' },
      { type: 'paragraph', content: 'By nine, the fish is in the kitchen. By ten, the specials are written on a small board in the chef\'s handwriting. By noon, the terrace smells of grilling octopus and the first guests are arriving.' },
      { type: 'paragraph', content: 'This rhythm hasn\'t changed since we opened. It\'s slow, and it\'s deliberate. Because the best food isn\'t planned months in advance — it\'s decided that morning, by the coast.' },
    ],
  },
  {
    slug: 'spring-on-the-terrace',
    title: 'Spring on the Terrace',
    subtitle: 'The season that changes everything',
    date: '2026-03-05',
    readTime: '3 min',
    category: 'Season',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80&auto=format',
    imageAlt: 'Mediterranean restaurant terrace in warm spring light',
    excerpt: 'When the afternoons stretch past eight and the breeze softens, the terrace becomes the true dining room. Spring at LaRucula is when the coast comes alive.',
    body: [
      { type: 'paragraph', content: 'Spring arrives without announcement on the Costa del Sol. One morning the air is different — warmer, lighter, carrying the scent of jasmine from the garden wall. The terrace tables come out, the awning unfurls, and suddenly the restaurant is twice as large.' },
      { type: 'paragraph', content: 'The menu shifts too. Heavier winter dishes give way to crudo, raw preparations, lighter sauces. The kitchen starts working with green almonds, young artichokes, the first sardines of the season. Every plate feels brighter.' },
      { type: 'paragraph', content: 'But it\'s the light that changes most. By seven in the evening, the sun drops to a perfect angle — golden, low, painting everything in that warm Mediterranean amber that photographers spend careers chasing. This is the hour our terrace was built for.' },
    ],
  },
  {
    slug: 'wine-and-the-coast',
    title: 'Wine & the Coast',
    subtitle: 'A short guide to what we\'re pouring this season',
    date: '2026-02-20',
    readTime: '5 min',
    category: 'Wine',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80&auto=format',
    imageAlt: 'Wine glasses catching warm Mediterranean evening light',
    excerpt: 'The wine list at LaRucula reads like a map of Spain — from the cool Atlantic whites of Galicia to the deep, sun-baked reds of the south.',
    body: [
      { type: 'paragraph', content: 'We don\'t chase labels. The wine list at LaRucula is personal — it\'s built from relationships with small producers, from bottles we\'ve tasted on drives through the countryside, from wines that tell a story about the ground they grew from.' },
      { type: 'paragraph', content: 'This season, we\'re pouring an Albariño from a tiny estate in Rías Baixas that smells like the ocean. A Garnacha from old vines in Priorat that tastes like iron and blackberry. A rosado from Navarra that is so pale it barely has colour, but the flavour is extraordinary.' },
      { type: 'quote', content: 'A good wine doesn\'t need explanation. It just needs the right table, the right light, and the right company.' },
      { type: 'paragraph', content: 'Ask your server. They know the list like they know the menu — intimately, personally, with opinions. We\'d rather you discover something unexpected than play it safe.' },
    ],
  },
  {
    slug: 'the-art-of-slow-lunch',
    title: 'The Art of Slow Lunch',
    subtitle: 'Why two hours at the table is never enough',
    date: '2026-02-10',
    readTime: '3 min',
    category: 'Ritual',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format',
    imageAlt: 'Beautifully set lunch table with Mediterranean plating',
    excerpt: 'Lunch at LaRucula is not a meal — it\'s a practice. The bread arrives warm. The wine is poured slowly. The courses come when the table is ready, not when the kitchen decides.',
    body: [
      { type: 'paragraph', content: 'There is no rush. The terrace faces south. The sea is always in view. And every table is paced to the rhythm of the guests, not the kitchen clock.' },
      { type: 'paragraph', content: 'This is what Mediterranean dining was always supposed to be — not a transaction, but a conversation. Between the kitchen and the table. Between the season and the plate. Between the afternoon light and the glass of wine catching it.' },
      { type: 'paragraph', content: 'We serve lunch from one until four. But the best tables linger past five, when the shadows get long and the coffee arrives with something sweet and unplanned.' },
    ],
  },
];

/**
 * Get a single post by slug.
 * In production, this would be an API call.
 */
export function getBlogPost(slug) {
  return mockBlogPosts.find((p) => p.slug === slug) ?? null;
}

/**
 * Blog categories for filtering (future feature).
 */
export const blogCategories = ['Kitchen', 'Season', 'Wine', 'Ritual'];
