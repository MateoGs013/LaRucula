<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
});

const icons = {
  fish: `<path d="M2 10c3-3 7-5 12-4-1 3-3 6-5 8 4-1 7-3 9-6-4-1-8 0-12 2-1-1-2.5-1-4 0z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14" cy="8" r="1" fill="currentColor"/>`,
  leaf: `<path d="M17 3C12 3 4 6 4 14c0 0 2.5-1 5-1 1 0 2 .2 3 .5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 14c2-4 6-7 13-11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  dessert: `<path d="M5 12h14M7 12c0-4 2-7 5-7s5 3 5 7M9 12v5c0 1 1 2 3 2s3-1 3-2v-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  wine: `<path d="M8 2h8l-1 7c-.3 2-1.5 3-3 3s-2.7-1-3-3L8 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="12" x2="12" y2="18" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="18" x2="15" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  cocktail: `<path d="M6 3h12l-6 8v6h4M8 17h8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="6" y1="7" x2="18" y2="7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>`,
  star: `<path d="M12 2l2.9 5.8L21 9l-5 4.9L17.2 20 12 17l-5.2 3 1.2-6.1L3 9l6.1-1.2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`,
  flame: `<path d="M12 2c0 4-4 6-4 10a4 4 0 008 0c0-4-4-6-4-10z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`,
  vegetarian: `<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 12c0-2 1.5-4 3-4s3 2 3 4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  'gluten-free': `<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  clock: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><polyline points="12 7 12 12 15 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  seasonal: `<path d="M12 3v1M18.4 5.6l-.7.7M21 12h-1M18.4 18.4l-.7-.7M12 21v-1M5.6 18.4l.7-.7M3 12h1M5.6 5.6l.7.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
  unavailable: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  globe: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.2"/>`,
  'arrow-right': `<line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><polyline points="14 7 19 12 14 17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  whatsapp: `<path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.3A10 10 0 1012 2z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 10c.3-.6.7-1 1.2-1 .3 0 .5.1.7.3l.5.8c.2.3.1.6-.1.8l-.4.3c.4.8 1 1.4 1.8 1.8l.3-.4c.2-.2.5-.3.8-.1l.8.5c.2.2.3.4.3.7 0 .5-.4.9-1 1.2-.8.3-1.8.1-2.8-.5a7 7 0 01-2.6-2.6c-.6-1-.8-2-.5-2.8z" fill="currentColor"/>`,
  location: `<path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="9" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
  // New icons for the real menu
  coffee: `<path d="M5 12h11a3 3 0 010 6H5V12z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 18v1M16 18v1M4 19h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7 8c0-1.5 1-2 1-3M10 8c0-1.5 1-2 1-3M13 8c0-1.5 1-2 1-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>`,
  juice: `<path d="M8 3h8l-1 16H9L8 3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 8h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/><circle cx="12" cy="13" r="2" fill="none" stroke="currentColor" stroke-width="1.2"/>`,
  combo: `<rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="1.2" opacity="0.4"/><line x1="12" y1="10" x2="12" y2="20" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>`,
  toast: `<rect x="5" y="3" width="14" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 9h8M8 13h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity="0.5"/>`,
  croissant: `<path d="M4 15c2-6 5-10 8-10s6 4 8 10c-3-1-5.5-.5-8 1-2.5-1.5-5-2-8-1z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  appetizer: `<circle cx="12" cy="14" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 14h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/><path d="M12 3v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 4l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`,
  kids: `<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 20c0-3 2.7-6 6-6s6 3 6 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  chef: `<path d="M6 12c-2 0-3-1.5-3-3s1.5-3 3-3c0-2 1.5-3 3-3 1 0 2 .5 2.5 1.5C12 3.5 13 3 14 3c1.5 0 3 1 3 3 1.5 0 3 1.5 3 3s-1 3-3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 12v6c0 1 1 2 2 2h8c1 0 2-1 2-2v-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  hamburger: `<path d="M4 11h16c0 0 0 2-2 2H6c-2 0-2-2-2-2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M5 8c0-2 3-4 7-4s7 2 7 4H5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M5 16h14c0 2-3 3-7 3s-7-1-7-3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="5" y1="13" x2="19" y2="13" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>`,
  pasta: `<path d="M5 10c0 5 3 9 7 9s7-4 7-9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 3c0 3 1 5 4 7M12 3c0 3 1 5 4 7M16 3c0 3-1 5-4 7" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  salad: `<path d="M4 13c0 4 3.5 7 8 7s8-3 8-7H4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 10c-1-2 0-4 2-5M14 8c0-2 1-4 3-4M11 6c0-2-1-4-2-4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  drink: `<rect x="6" y="4" width="12" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="8" x2="18" y2="8" stroke="currentColor" stroke-width="1.2" opacity="0.4"/><circle cx="12" cy="14" r="2" fill="none" stroke="currentColor" stroke-width="1.2"/>`,
  lemon: `<ellipse cx="12" cy="12" rx="6" ry="8" transform="rotate(-30 12 12)" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 9c1 2 1 4 0 6" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>`,
  beer: `<rect x="6" y="4" width="10" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 8h2c1 0 2 1 2 2v4c0 1-1 2-2 2h-2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="6" y1="8" x2="16" y2="8" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>`,
  smoothie: `<path d="M8 4h8l-1 15c0 1-1 2-2.5 2h-1c-1.5 0-2.5-1-2.5-2L8 4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 4h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11 4v-2h4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`,
  aperitif: `<path d="M8 3h8l-2 7h-4L8 3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="10" x2="12" y2="17" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="17" x2="15" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="16" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>`,
  mocktail: `<path d="M6 3h12l-6 8v6h4M8 17h8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6l2 2M13 4l1 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>`,
  menu: `<line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="4" y1="18" x2="14" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
};
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    v-html="icons[name] || ''"
  />
</template>
