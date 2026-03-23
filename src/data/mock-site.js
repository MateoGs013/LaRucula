/**
 * Mock site payload — matches GET /site?locale=es API contract.
 * All text fields are CMS-editable via backend.
 */
export const mockSitePayload = {
  brand: {
    name: 'LaRucula',
    tagline: 'Cocina mediterránea frente al mar',
  },
  hero: {
    headline: 'Donde la costa pone la mesa',
    subheadline: 'Cocina mediterránea guiada por la temporada y el mar.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    image_alt: 'Comedor cálido con luz mediterránea y mesas vestidas',
  },
  intro: {
    label: 'LaRucula',
    tagline: 'Costa del Sol · cocina mediterránea',
  },
  short_about: 'Una cocina costera refinada en la Costa del Sol: pescado de temporada, producto local, vinos naturales y una terraza pensada para la hora dorada.',
  menu_cta: {
    label: 'Ver la carta',
    href: '/menu',
  },
  contact: {
    city: 'Costa del Sol, España',
    address: 'Passeig de la Mar 18, Costa del Sol',
    hours: 'Almuerzo 13–16 · Cena 20–23:30 · Cerrado los lunes',
    phone: '+34 000 000 000',
    email: 'hola@larucula.example',
    whatsapp: '+34000000000',
  },
  socialLinks: [
    { label: 'Instagram', url: 'https://instagram.com/larucula' },
    { label: 'Facebook', url: 'https://facebook.com/larucula' },
    { label: 'TripAdvisor', url: 'https://tripadvisor.com/larucula' },
  ],
  navigation: [
    { label: 'Carta', to: '/menu' },
  ],
  footer: {
    closing: 'Donde el apetito se encuentra con el horizonte.',
    copyright: 'Cocina frente al mar, Costa del Sol',
  },
  meta: {
    name: 'LaRucula',
    label: 'Cocina mediterránea frente al mar',
    description:
      'LaRucula es un restaurante premium frente al mar en la Costa del Sol: cocina mediterránea marcada por la costa, la temporada y el mar.',
    ogImage:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80&auto=format',
  },
};
