# LaRucula API Contract

## Purpose
This document defines the canonical public API contract that the current front-end expects.

The front already supports `mock` and `api` modes through `.env.example` and the service layer in `src/services/`.
Backend work should implement these shapes as closely as possible so the UI can switch from mock data to live data without route-level rewrites.

## Scope
This contract covers public website data only:
- site configuration
- menu
- blog
- contact
- reservations

This document does not cover:
- admin panel
- authentication
- multi-tenant logic
- CMS internals
- internal back-office workflows

## Environment
Current front-end toggle:

```env
VITE_API_MODE=mock
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT_MS=10000
```

When `VITE_API_MODE=api`, the front will request `${VITE_API_BASE_URL}/api/...`.

## Local development
The repository now includes a minimal public API implementation for the first integration phase.

Run it with:

```bash
npm run api:dev
```

Current local coverage:
- `GET /api/health`
- `GET /api/site`
- `GET /api/site-contents` (Pegasuz-compatible bootstrap bridge for local development)
- `GET /api/menu`
- `GET /api/blog/posts`
- `GET /api/blog/posts/:slug`
- `POST /api/contact`
- `GET /api/reservations/layout`
- `GET /api/reservations/availability`
- `POST /api/reservations`

The server lives in `server/` and intentionally stays small: Node `http`, no admin concerns, no database, no auth.
For local persistence only, `contact` and `reservations` are stored in JSON files under `server/runtime/`. This is a development bridge, not the final production persistence strategy.

## Response conventions

### Preferred success shape
The current adapters are tolerant, but the preferred backend output is:

```json
{
  "data": {}
}
```

or direct payloads for simple endpoints when there is no added value in wrapping.

To keep things simple, the backend may return direct payloads as long as they match the canonical structures below.

### Preferred error shape
For non-2xx responses, return:

```json
{
  "error": {
    "code": "string_code",
    "message": "Human readable message",
    "details": {}
  }
}
```

Minimum requirement:
- `message`
- useful HTTP status code

## Endpoints

### GET `/site`
Used by:
- `src/app/app-config.js`
- header
- footer
- visit/contact areas

Canonical response:

```json
{
  "meta": {
    "name": "LaRucula",
    "label": "Editorial beachfront dining in Spain",
    "description": "LaRucula is a premium beachfront restaurant on the Costa del Sol.",
    "reservationHref": "/reservations",
    "reservationLabel": "Reserve",
    "ogImage": "https://..."
  },
  "navigation": [
    { "label": "Menu", "to": "/menu" },
    { "label": "Story", "to": "/story" },
    { "label": "Blog", "to": "/blog" },
    { "label": "Visit", "to": "/visit" }
  ],
  "contact": {
    "city": "Costa del Sol",
    "address": "Passeig de la Mar 18, Costa del Sol",
    "hours": "Lunch 13–16 · Dinner 20–23:30 · Closed Monday",
    "phone": "+34 000 000 000",
    "email": "hola@larucula.com",
    "whatsapp": "34000000000"
  },
  "socialLinks": [
    { "label": "Instagram", "url": "https://instagram.com/..." },
    { "label": "Facebook", "url": "https://facebook.com/..." }
  ]
}
```

Notes:
- `whatsapp` should be digits only if possible.
- `navigation` is public-site navigation, not admin-driven routing rules.

### GET `/menu`
Used by:
- `src/pages/MenuPage.vue`

Canonical response:

```json
{
  "seasonLabel": "Seasonal menu · Spring 2026",
  "heroTitle": "What the coast brings",
  "seasonalNote": "The menu changes with the tides, the markets, and the season.",
  "closingNote": "Menus are written daily. Prices and availability shift with the season.",
  "seaMenu": [
    {
      "name": "Red prawn crudo",
      "detail": "citrus oil · fennel pollen",
      "note": "signature"
    }
  ],
  "landMenu": [
    {
      "name": "Charred lamb shoulder",
      "detail": "smoked aubergine · rosemary jus",
      "signature": true
    }
  ],
  "sweetMenu": [
    {
      "name": "Crema catalana",
      "detail": "orange zest · caramelised sugar"
    }
  ],
  "wines": [
    {
      "category": "White",
      "items": ["Albariño, Rías Baixas"]
    }
  ]
}
```

Notes:
- Keep copy editorial-ready; the page is designed around descriptive strings, not raw ingredient codes.
- `signature` is optional and only needed for the land feature logic.

### GET `/blog/posts`
Used by:
- `src/pages/BlogPage.vue`
- `src/pages/BlogPostPage.vue` for related content snapshot

Canonical response:

```json
{
  "items": [
    {
      "slug": "the-morning-catch",
      "title": "The Morning Catch",
      "subtitle": "How the day's menu begins at the harbour",
      "date": "2026-03-10",
      "readTime": "4 min",
      "category": "Kitchen",
      "image": "https://...",
      "imageAlt": "Fresh Mediterranean fish at the market",
      "excerpt": "Every morning before the kitchen lights come on..."
    }
  ]
}
```

Notes:
- The list endpoint only needs summary content.
- Order should be newest first.

### GET `/blog/posts/:slug`
Used by:
- `src/pages/BlogPostPage.vue`
- `src/router/index.js` for dynamic meta

Canonical response:

```json
{
  "slug": "the-morning-catch",
  "title": "The Morning Catch",
  "subtitle": "How the day's menu begins at the harbour",
  "date": "2026-03-10",
  "readTime": "4 min",
  "category": "Kitchen",
  "image": "https://...",
  "imageAlt": "Fresh Mediterranean fish at the market",
  "excerpt": "Every morning before the kitchen lights come on...",
  "body": [
    {
      "type": "paragraph",
      "content": "Every morning before the kitchen lights come on..."
    },
    {
      "type": "quote",
      "content": "The sea writes the first draft of the menu."
    }
  ]
}
```

Notes:
- `body` should already come grouped into editorial blocks.
- Allowed block types right now: `paragraph`, `quote`.

### POST `/contact`
Used by:
- `src/components/contact/ContactForm.vue`

Canonical request:

```json
{
  "name": "Mateo",
  "email": "mateo@example.com",
  "phone": "+34 000 000 000",
  "subject": "Private dinner",
  "message": "We would like to book a table for six."
}
```

Canonical response:

```json
{
  "success": true,
  "message": "Message received"
}
```

Validation expectations:
- `name` required
- `email` required
- `message` required
- keep response message human-readable for possible future UI reuse

### GET `/reservations/layout`
Used by:
- `src/composables/useReservation.js`
- `src/components/reservation/FloorMap.vue`

Canonical response:

```json
{
  "floorPlanMeta": {
    "name": "Main Dining Room",
    "aspectRatio": 1.6,
    "zones": [
      {
        "id": "terrace",
        "label": "Terrace",
        "bounds": { "x": 0, "y": 0, "w": 100, "h": 45 }
      }
    ]
  },
  "tables": [
    {
      "id": "T1",
      "zone": "terrace",
      "shape": "round",
      "seats": 2,
      "position": { "x": 12, "y": 15 },
      "size": { "r": 3.5 },
      "status": "available",
      "label": "Sea view · intimate"
    }
  ]
}
```

Notes:
- Coordinate system is percentage-based.
- Allowed shapes: `round`, `square`, `rect`.
- This endpoint defines room geometry only.

### GET `/reservations/availability`
Query params:
- `date`
- `time`
- `partySize`

Used by:
- `src/composables/useReservation.js`

Canonical response:

```json
{
  "timeSlots": {
    "lunch": ["13:00", "13:30", "14:00"],
    "dinner": ["20:00", "20:30", "21:00"]
  },
  "tables": [
    {
      "id": "T1",
      "zone": "terrace",
      "shape": "round",
      "seats": 2,
      "position": { "x": 12, "y": 15 },
      "size": { "r": 3.5 },
      "status": "available",
      "label": "Sea view · intimate"
    },
    {
      "id": "T2",
      "status": "unavailable"
    }
  ]
}
```

Notes:
- This endpoint may return full table objects or partial updates, but full objects are preferred for simplicity.
- The front currently expects statuses such as `available`, `unavailable`, `reserved`, and `selected` is UI-only.

### POST `/reservations`
Used by:
- `src/composables/useReservation.js`

Canonical request:

```json
{
  "date": "2026-03-24",
  "time": "21:00",
  "partySize": 4,
  "tableId": "T5",
  "guest": {
    "name": "Mateo",
    "email": "mateo@example.com",
    "phone": "+34 000 000 000",
    "notes": "Anniversary dinner"
  }
}
```

Canonical response:

```json
{
  "success": true,
  "confirmationId": "LR-ABC123",
  "reservation": {
    "date": "2026-03-24",
    "time": "21:00",
    "partySize": 4,
    "tableId": "T5",
    "guest": {
      "name": "Mateo",
      "email": "mateo@example.com",
      "phone": "+34 000 000 000",
      "notes": "Anniversary dinner"
    }
  }
}
```

Notes:
- v1 does not need a temporary table hold system.
- If backend later adds hold/expiry, expose it as additive data without breaking this response.

## Rollout order
Recommended backend rollout:
1. `GET /site`
2. `GET /menu`
3. `GET /blog/posts`
4. `GET /blog/posts/:slug`
5. `POST /contact`
6. `GET /reservations/layout`
7. `GET /reservations/availability`
8. `POST /reservations`

## Front-end integration notes
- Keep API transport logic inside `src/api/`.
- Keep domain access inside `src/services/`.
- Keep payload normalization inside `src/adapters/`.
- Do not reintroduce direct `fetch` calls inside route components.
- If backend payloads need to change, prefer adapting in `src/adapters/` instead of rewriting the pages.
