# La Rúcula Gastrobar

> Sitio editorial premium para un restaurante frente al mar en Chiclana, España.

**🌊 En producción: [laruculagastrobar.es](https://laruculagastrobar.es/)**

Proyecto de cliente real: una experiencia *menu-first* pensada para el uso con QR en mesa, con una home inmersiva de dirección de arte mediterránea — editorial, artística y calma, lejos del layout genérico de restaurante.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Vue 3 (Composition API) |
| Motion | GSAP (line reveals, text stagger, image masking, parallax sutil, path drawing) |
| Smooth scroll | Lenis |
| CMS | [Pegasuz](https://pegasuz.com.ar) — contenido del shell editable por el cliente vía `site-contents` |
| Testing | Playwright (review UX automatizada desktop/tablet/mobile) + axe (baseline de accesibilidad) |
| Build | Vite |

## Decisiones de diseño

- **Menu-first IA**: el sitio se reduce a `/`, `/menu` y `/menu/:slug` — la mayoría del tráfico entra por QR desde la mesa, así que el menú es el producto.
- **Motion con significado**: reveals de línea, stagger tipográfico y acentos SVG de trazo manual. Nada de timelines largas sin payoff — la regla del proyecto es *cohesión sobre novedad*.
- **Modo QR**: `/menu` y `/menu/:slug` tienen una variante optimizada para llegada directa desde QR.
- **Multi-locale** con preservación del query de idioma entre rutas.
- **Integración CMS multi-tenant**: el contenido editable vive en Pegasuz (tenant `larucula-mateo`); el sitio arranca con fallback local y se hidrata desde la API.

## Calidad

Antes de dar por terminada una sección, el flujo del proyecto exige:

```bash
npm run ux    # review visual automatizada con Playwright (3 viewports)
npm run a11y  # baseline de accesibilidad con axe
```

Los artefactos quedan en `tests/artifacts/` para inspección manual.

## Desarrollo local

```bash
npm install
npm run dev
```

Variables de entorno (ver `docs/api-contract.md`):

```
VITE_API_BASE_URL=<url del CMS>
VITE_CLIENT_SLUG=larucula-mateo
```

---

**Mateo Sonzogni** — [mateogabus@gmail.com](mailto:mateogabus@gmail.com) · [@MateoGs013](https://github.com/MateoGs013)
