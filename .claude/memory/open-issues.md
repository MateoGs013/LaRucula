# Open Issues

## Resolved
- ~~the guidance was too generic to steer a real redesign~~ → the docs now include inspiration synthesis, Awwwards research, and a Claude-specific design guide
- ~~the docs were over-protecting the current scaffold~~ → Claude now has explicit permission to replace weak primitives, patterns, and technologies
- ~~there was no browser-based UX validation loop~~ → Playwright screenshot automation and Axe baseline are now available

## Pending decisions
- whether `Home` should expose more of its authored editorial copy to Pegasuz `site-contents` or stay mostly code-driven
- whether the final QR experience should stay query-based (`?entry=qr`) or move to explicit QR-only routes once analytics or product needs justify it
- how much imagery versus illustration/SVG should remain once real restaurant assets are available

## Pending implementation
- apply the reduced LaRucula shell contract to the live Pegasuz tenant `larucula-mateo`
- implement Pegasuz menu endpoints: `/api/menu`, `/api/menu/categories`, `/api/menu/categories/:slug`
- implement Pegasuz locales endpoint so public i18n can move from local fallback to API-driven data
- replace placeholder imagery with a coherent restaurant asset set once content production is ready
- validate mobile rhythm and performance again once real Pegasuz menu content is flowing through the pages
