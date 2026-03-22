# Open Issues

## Resolved
- ~~the guidance was too generic to steer a real redesign~~ → the docs now include inspiration synthesis, Awwwards research, and a Claude-specific design guide
- ~~the docs were over-protecting the current scaffold~~ → Claude now has explicit permission to replace weak primitives, patterns, and technologies
- ~~there was no browser-based UX validation loop~~ → Playwright screenshot automation and Axe baseline are now available

## Pending decisions
- the exact backend contract shape for `GET /site`, `GET /menu`, `GET /blog/posts`, `POST /contact`, and the three reservation endpoints
- whether the API should expose already-shaped editorial copy blocks or more neutral content objects for the adapters to compose
- how much real-time behavior reservations need in v1 beyond layout, availability, and booking submission
- how far the site should lean into editorial hospitality versus dining-led storytelling once production content arrives
- how much motion is appropriate once real imagery and real copy land

## Pending implementation
- connect the real API to `site`, `menu`, and `blog` through the new service layer
- replace mock submission in `contactService` with the production endpoint
- replace reservation layout and availability placeholders with real API data while keeping the existing table-selection UI
- decide whether visit/contact-specific copy should also move behind `siteService`
- replace placeholder imagery with a coherent photography set
- validate mobile rhythm and performance again once real API content is flowing through the pages
