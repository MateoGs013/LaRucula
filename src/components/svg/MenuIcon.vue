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
