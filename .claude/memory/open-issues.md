# Open Issues

## Resolved
- ~~the guidance was too generic to steer a real redesign~~ → the docs now include inspiration synthesis, Awwwards research, and a Claude-specific design guide
- ~~the docs were over-protecting the current scaffold~~ → Claude now has explicit permission to replace weak primitives, patterns, and technologies
- ~~there was no browser-based UX validation loop~~ → Playwright screenshot automation and Axe baseline are now available

## Pending decisions
- whether the API should expose already-shaped editorial copy blocks or more neutral content objects for the adapters to compose
- how much real-time behavior reservations need in v1 beyond the current local SQLite-backed layout, availability, and booking submission
- how far the site should lean into editorial hospitality versus dining-led storytelling once production content arrives
- how much motion is appropriate once real imagery and real copy land
- whether `Home` should map any of its editorial copy onto Pegasuz CMS keys or remain entirely authored in code at first
- whether the temporary local SQLite persistence should later be replaced by the main Pegasuz backend data layer or treated as the first production store

## Pending implementation
- decide how much of `Home` copy should be editable from Pegasuz `site-contents`
- decide whether reservation availability should derive from explicit time-slot inventory, table rules, or held bookings
- decide whether visit/contact-specific copy should also move behind `siteService`
- replace placeholder imagery with a coherent photography set
- validate mobile rhythm and performance again once real API content is flowing through the pages
