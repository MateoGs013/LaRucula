# LaRucula Deploy Guide (Pegasuz)

## Goal
Deploy the simplified public site so it works against the Pegasuz tenant `larucula-mateo`.

This guide reflects the current public architecture:
- `/`
- `/menu`
- `/menu/:slug`
- `404`

## Required production environment

Configure these variables in the host where LaRucula is built:

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

## What will work immediately after deploy
- the public shell uses Pegasuz `site-contents`
- the footer `Admin` link opens the correct Pegasuz login URL
- the site remains usable if Pegasuz does not yet expose the menu domain
- `/menu` and `/menu/:slug` still work because the front falls back to local menu data
- QR mode works through `?entry=qr`

## What Pegasuz must provide for full admin-driven behavior

### Already expected
- `GET /api/site-contents`
- tenant header: `x-client: larucula-mateo`

### Still needed
- `GET /api/menu?locale=es`
- `GET /api/menu/categories?locale=es`
- `GET /api/menu/categories/:slug?locale=es`
- `GET /api/locales`

Without those endpoints, the public shell is remote but the menu remains local fallback.

## Required Pegasuz admin step
Apply the reduced LaRucula shell contract to tenant `larucula-mateo`.

The intended contract seed lives in Pegasuz at:

`Pegasuz-Core/docs/contracts/larucula-mateo.cms-contract.json`

If the tenant still uses the old oversized contract, the admin will show many irrelevant fields from legacy routes. The public site still works, but the admin UX is noisy and does not reflect the active site map.

## Validation before shipping
Run:

```bash
npm run build
npm run ux:routes -- --project=desktop
npm run a11y -- --project=desktop
```

## Reality check
As of this branch:
- deploy readiness is complete for the public front-end
- admin entry-point wiring is complete
- full menu editing and real translation still depend on Pegasuz SaaS work
