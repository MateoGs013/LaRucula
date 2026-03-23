# LaRucula API Contract

## Purpose
This document describes the public data contract the current `menu-first` front-end expects.

The public site now has a reduced scope:
- `/`
- `/menu`
- `/menu/:slug`
- `404`

There is no active `blog`, `visit`, `story`, or `reservations` surface in the current public app.

## Current integration model

### What is already connected to Pegasuz
LaRucula already boots its editable shell content from Pegasuz `site-contents` when:

```env
VITE_API_MODE=api
VITE_API_PROVIDER=pegasuz
VITE_API_BASE_URL=https://api.pegasuz.com.ar
VITE_CLIENT_SLUG=larucula-mateo
```

That shell includes:
- brand
- header navigation label
- home intro copy
- home hero copy + image
- short about
- footer copy
- contact/social fields used in footer and WhatsApp

### What is not implemented yet in Pegasuz production
The live Pegasuz API does not currently expose:
- `GET /api/menu`
- `GET /api/menu/categories`
- `GET /api/menu/categories/:slug`
- `GET /api/locales`

Because of that, the site currently falls back to local menu mocks for:
- menu categories
- menu items
- prices
- badges
- locale list

This is intentional fallback behavior, not a front-end bug.

## Scope
This contract only covers the active public website.

It does not cover:
- admin authentication
- tenant provisioning
- superadmin flows
- legacy reservations/blog/contact page surfaces
- CMS internals beyond `site-contents`

## Environment

### Recommended production env
```env
VITE_API_MODE=api
VITE_API_BASE_URL=https://api.pegasuz.com.ar
VITE_API_PROVIDER=pegasuz
VITE_CLIENT_SLUG=larucula-mateo
VITE_API_TIMEOUT_MS=10000
VITE_ADMIN_URL=https://admin.pegasuz.com.ar/admin/login
VITE_ADMIN_TENANT=larucula-mateo
VITE_ADMIN_LABEL=Admin
```

### Local mock fallback
If `VITE_API_MODE=mock`, the site runs entirely from local data in `src/data/`.

## Existing live endpoint

### GET `/api/site-contents`
Headers:

```http
x-client: larucula-mateo
```

This is the current Pegasuz-managed editable shell entry point.

Expected usage in LaRucula:
- `src/services/siteContentService.js`
- `src/services/siteService.js`
- `src/adapters/siteAdapter.js`

### Canonical content keys used by the active public site
These are the only `site-contents` keys the current public shell should depend on:

```text
site.brand.name
site.brand.tagline
site.contact.phone
site.contact.email
site.contact.whatsapp
site.contact.address_line1
site.contact.address_line2
site.contact.schedule
site.social.instagram
site.social.facebook
site.social.tripadvisor
header.nav.menu
header.cta_label
home.intro.label
home.intro.tagline
home.hero.headline
home.hero.subheadline
home.hero.image_url
home.hero.image_alt
home.short_about
home.menu_cta.label
home.menu_cta.href
footer.description
footer.closing
footer.copyright
```

The current production tenant still returns many extra legacy keys. The front ignores those extras.

## Menu domain contract still needed from Pegasuz

### GET `/api/menu?locale=es`
Used by:
- `src/services/menuService.js`
- `src/pages/MenuPage.vue`

Canonical response:

```json
{
  "title": "Carta",
  "subtitle": "Cocina mediterránea · de temporada y cercana",
  "updated_at": "2026-03-23",
  "notes": [
    { "text": "La carta cambia a diario con la lonja y el mercado.", "type": "general" }
  ],
  "featured": ["grilled-octopus", "lamb-shoulder"],
  "categories": [
    {
      "id": "cat-1",
      "slug": "mar",
      "name": "Mar",
      "short_description": "Pesca del día y mariscos",
      "icon": "fish",
      "order": 1,
      "intro": "Lo que trae el mar cada mañana, trabajado con respeto y sin exceso.",
      "notes": [],
      "items": [
        {
          "id": "dish-1",
          "slug": "grilled-octopus",
          "name": "Pulpo a la brasa",
          "description": "Hinojo, limón preservado y aceite de pimentón ahumado",
          "price": 28,
          "currency": "EUR",
          "image": null,
          "badges": ["recommended"],
          "availability": "available",
          "recommended": true,
          "order": 1
        }
      ]
    }
  ]
}
```

### GET `/api/menu/categories?locale=es`
Used by:
- optional category listing / prefetching

Canonical response:

```json
{
  "categories": [
    {
      "id": "cat-1",
      "slug": "mar",
      "name": "Mar",
      "short_description": "Pesca del día y mariscos",
      "icon": "fish",
      "order": 1
    }
  ]
}
```

### GET `/api/menu/categories/:slug?locale=es`
Used by:
- `src/pages/MenuCategoryPage.vue`

Canonical response:

```json
{
  "id": "cat-1",
  "slug": "mar",
  "name": "Mar",
  "short_description": "Pesca del día y mariscos",
  "icon": "fish",
  "order": 1,
  "intro": "Lo que trae el mar cada mañana, trabajado con respeto y sin exceso.",
  "notes": [],
  "items": [
    {
      "id": "dish-1",
      "slug": "grilled-octopus",
      "name": "Pulpo a la brasa",
      "description": "Hinojo, limón preservado y aceite de pimentón ahumado",
      "price": 28,
      "currency": "EUR",
      "image": null,
      "badges": ["recommended"],
      "availability": "available",
      "recommended": true,
      "order": 1
    }
  ]
}
```

### GET `/api/locales`
Used by:
- future locale selector once Pegasuz exposes multiple locales

Canonical response:

```json
{
  "default": "es",
  "locales": [
    { "code": "es", "label": "Español" },
    { "code": "en", "label": "English" }
  ]
}
```

## Translation expectations
- Locale should stay query-based for now: `?lang=es`
- The front already preserves `lang` across route changes via `useRouteContext`
- Pegasuz should return menu and shell data already translated by locale
- The front should not own long-term translation dictionaries for the public content

## Admin connection
The public site already exposes an admin link through the footer using:
- `VITE_ADMIN_URL`
- `VITE_ADMIN_TENANT`

Current target:
- admin login: `https://admin.pegasuz.com.ar/admin/login`
- tenant: `larucula-mateo`

Because admin lives on a different origin, the tenant is passed through the URL query and not through shared `localStorage`.

## Deploy readiness summary
Today the site is deploy-ready with this behavior:
- shell content comes from Pegasuz `site-contents`
- menu content falls back to local data if Pegasuz menu endpoints are missing
- QR mode works on `/menu` and `/menu/:slug`
- admin link points to the correct Pegasuz tenant login

For full admin-driven functionality, Pegasuz still needs:
1. the reduced LaRucula shell contract applied to tenant `larucula-mateo`
2. menu endpoints implemented
3. locale endpoint implemented
