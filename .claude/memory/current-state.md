# Current State

## Status
The public site has been simplified into a `menu-first` experience and is now deploy-ready against Pegasuz for shell content, with menu data still using local fallback until the SaaS exposes its menu domain.

## What exists
- public site reduced to `/`, `/menu`, `/menu/:slug`, and `404`
- `menu-first` IA focused on QR usage and direct menu access
- Home remains authored and immersive, but much simpler than the previous multi-page editorial site
- Playwright UX review automation for desktop/tablet/mobile
- Axe baseline checks wired into the review flow
- API/service/adapter foundation still in place
- Pegasuz shell bootstrap through `GET /api/site-contents`
- footer `Admin` link wired to `https://admin.pegasuz.com.ar/admin/login?tenant=larucula-mateo`
- locale query preservation through route changes
- QR mode for `/menu` and `/menu/:slug`
- local fallback menu data in Spanish while Pegasuz menu endpoints are still missing
- deploy guide and updated API contract docs aligned with the current menu-first app

## What should happen next
1. apply the reduced LaRucula CMS contract to tenant `larucula-mateo` in Pegasuz
2. implement Pegasuz menu endpoints so the public site can stop using local menu fallback
3. expose Pegasuz locales so the language selector can become real instead of dormant
4. keep using `npm run ux` and `npm run a11y` during visual iteration and before deploys
5. document any additional Pegasuz integration decisions back into `docs/decisions.md`
