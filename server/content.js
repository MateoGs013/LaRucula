import { mockBlogPosts } from '../src/data/mock-blog-posts.js';
import { mockMenuData } from '../src/data/mock-menu.js';
import { mockSitePayload } from '../src/data/mock-site.js';
import { floorPlanMeta, mockTables, mockTimeSlots } from '../src/data/mock-tables.js';
import {
  appendContact,
  appendReservation,
  readReservations,
} from './storage.js';

function clone(value) {
  return structuredClone(value);
}

function toBlogSummary(post) {
  return {
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    date: post.date,
    readTime: post.readTime,
    category: post.category,
    image: post.image,
    imageAlt: post.imageAlt,
    excerpt: post.excerpt,
  };
}

function normalizeText(value) {
  return String(value || '').trim();
}

function normalizePhone(value) {
  return String(value || '').replace(/[^\d+]/g, '').trim();
}

function reservationKey({ date, time, tableId }) {
  return `${date}::${time}::${tableId}`;
}

function getBaseReservationLayout() {
  return {
    floorPlanMeta: clone(floorPlanMeta),
    tables: clone(mockTables),
  };
}

function buildPegasuzSiteContentItems() {
  return [
    { key: 'site.brand.name', value: mockSitePayload.meta.name, section: 'site', type: 'text' },
    { key: 'site.contact.phone', value: mockSitePayload.contact.phone, section: 'site', type: 'text' },
    { key: 'site.contact.email', value: mockSitePayload.contact.email, section: 'site', type: 'text' },
    { key: 'site.contact.whatsapp', value: mockSitePayload.contact.whatsapp, section: 'site', type: 'text' },
    { key: 'site.contact.address_line1', value: mockSitePayload.contact.address, section: 'site', type: 'text' },
    { key: 'site.contact.address_line2', value: mockSitePayload.contact.city, section: 'site', type: 'text' },
    { key: 'site.contact.schedule', value: mockSitePayload.contact.hours, section: 'site', type: 'text' },
    { key: 'site.social.instagram', value: mockSitePayload.socialLinks.find((item) => item.label === 'Instagram')?.url || '', section: 'site', type: 'text' },
    { key: 'site.social.facebook', value: mockSitePayload.socialLinks.find((item) => item.label === 'Facebook')?.url || '', section: 'site', type: 'text' },
    { key: 'site.social.linkedin', value: mockSitePayload.socialLinks.find((item) => item.label === 'LinkedIn')?.url || '', section: 'site', type: 'text' },
    { key: 'header.cta_label', value: mockSitePayload.meta.reservationLabel, section: 'header', type: 'text' },
    { key: 'header.nav.services', value: mockSitePayload.navigation.find((item) => item.to === '/menu')?.label || 'Menu', section: 'header', type: 'text' },
    { key: 'header.nav.about', value: mockSitePayload.navigation.find((item) => item.to === '/story')?.label || 'Story', section: 'header', type: 'text' },
    { key: 'header.nav.blog', value: mockSitePayload.navigation.find((item) => item.to === '/blog')?.label || 'Blog', section: 'header', type: 'text' },
    { key: 'header.nav.contact', value: mockSitePayload.navigation.find((item) => item.to === '/visit')?.label || 'Visit', section: 'header', type: 'text' },
    { key: 'footer.description', value: mockSitePayload.meta.description, section: 'footer', type: 'textarea' },
    { key: 'contact.hero.label', value: 'Visit & reserve', section: 'contact', type: 'text' },
    { key: 'contact.hero.title', value: 'Your table is waiting', section: 'contact', type: 'text' },
    { key: 'contact.hero.description', value: 'Find us by the coast, stay for dinner, and write directly if you need anything before you arrive.', section: 'contact', type: 'textarea' },
    { key: 'contact.info.title', value: 'We answer the old way', section: 'contact', type: 'text' },
    { key: 'contact.info.description', value: 'For private dining, celebrations, or special requests, write to the house directly and we will reply with care.', section: 'contact', type: 'textarea' },
    { key: 'contact.info.response_time', value: 'We usually reply within the day.', section: 'contact', type: 'text' },
    { key: 'contact.info.follow_us', value: 'Follow along', section: 'contact', type: 'text' },
    { key: 'contact.form.title', value: 'Write to us', section: 'contact', type: 'text' },
    { key: 'contact.form.name_label', value: 'Name *', section: 'contact', type: 'text' },
    { key: 'contact.form.name_placeholder', value: 'Your name', section: 'contact', type: 'text' },
    { key: 'contact.form.email_label', value: 'Email *', section: 'contact', type: 'text' },
    { key: 'contact.form.email_placeholder', value: 'your@email.com', section: 'contact', type: 'text' },
    { key: 'contact.form.phone_label', value: 'Phone', section: 'contact', type: 'text' },
    { key: 'contact.form.phone_placeholder', value: '+34 000 000 000', section: 'contact', type: 'text' },
    { key: 'contact.form.service_label', value: 'Subject', section: 'contact', type: 'text' },
    { key: 'contact.form.service_placeholder', value: 'Reservation, event, or general inquiry', section: 'contact', type: 'text' },
    { key: 'contact.form.message_label', value: 'Message *', section: 'contact', type: 'text' },
    { key: 'contact.form.message_placeholder', value: 'Tell us how we can help…', section: 'contact', type: 'textarea' },
    { key: 'contact.form.submit', value: 'Send message', section: 'contact', type: 'text' },
    { key: 'contact.form.submitting', value: 'Sending…', section: 'contact', type: 'text' },
    { key: 'contact.form.success', value: 'Thank you. We will get back to you within 24 hours.', section: 'contact', type: 'text' },
    { key: 'reservations.hero.label', value: 'Reservations', section: 'reservations', type: 'text' },
    { key: 'reservations.hero.title', value: 'Choose your evening', section: 'reservations', type: 'text' },
    { key: 'reservations.hero.description', value: 'Thirty covers, each with a view. Select your table, set your time, and let the coast take care of the rest.', section: 'reservations', type: 'textarea' },
    { key: 'reservations.progress.details', value: 'Date & time', section: 'reservations', type: 'text' },
    { key: 'reservations.progress.table', value: 'Your table', section: 'reservations', type: 'text' },
    { key: 'reservations.progress.guest', value: 'Details', section: 'reservations', type: 'text' },
    { key: 'reservations.progress.confirm', value: 'Confirmed', section: 'reservations', type: 'text' },
    { key: 'reservations.details.title', value: 'When shall we expect you?', section: 'reservations', type: 'text' },
    { key: 'reservations.details.description', value: 'Choose your date, party size, and preferred time. We will show you the available tables.', section: 'reservations', type: 'textarea' },
    { key: 'reservations.details.loading', value: 'Refreshing the room for that time and party size…', section: 'reservations', type: 'text' },
    { key: 'reservations.details.image_caption', value: 'every table has a story', section: 'reservations', type: 'text' },
    { key: 'reservations.form.date_label', value: 'Date', section: 'reservations', type: 'text' },
    { key: 'reservations.form.guests_label', value: 'Guests', section: 'reservations', type: 'text' },
    { key: 'reservations.form.time_label', value: 'Time', section: 'reservations', type: 'text' },
    { key: 'reservations.form.lunch_label', value: 'Lunch', section: 'reservations', type: 'text' },
    { key: 'reservations.form.dinner_label', value: 'Dinner', section: 'reservations', type: 'text' },
    { key: 'reservations.form.submit', value: 'Choose your table', section: 'reservations', type: 'text' },
    { key: 'reservations.table.title', value: 'Your table', section: 'reservations', type: 'text' },
    { key: 'reservations.table.guest_singular', value: 'guest', section: 'reservations', type: 'text' },
    { key: 'reservations.table.guest_plural', value: 'guests', section: 'reservations', type: 'text' },
    { key: 'reservations.table.description', value: 'Tables with enough seats are highlighted.', section: 'reservations', type: 'text' },
    { key: 'reservations.table.loading_layout', value: 'Loading the dining room…', section: 'reservations', type: 'text' },
    { key: 'reservations.table.loading_availability', value: 'Checking which tables are still open…', section: 'reservations', type: 'text' },
    { key: 'reservations.table.continue', value: 'Continue', section: 'reservations', type: 'text' },
    { key: 'reservations.table.back', value: '← Change date', section: 'reservations', type: 'text' },
    { key: 'reservations.guest.title', value: 'Almost there', section: 'reservations', type: 'text' },
    { key: 'reservations.guest.description', value: 'A few details so we can welcome you properly.', section: 'reservations', type: 'textarea' },
    { key: 'reservations.guest.name_label', value: 'Name *', section: 'reservations', type: 'text' },
    { key: 'reservations.guest.name_placeholder', value: 'Your name', section: 'reservations', type: 'text' },
    { key: 'reservations.guest.phone_label', value: 'Phone *', section: 'reservations', type: 'text' },
    { key: 'reservations.guest.phone_placeholder', value: '+34 000 000 000', section: 'reservations', type: 'text' },
    { key: 'reservations.guest.email_label', value: 'Email', section: 'reservations', type: 'text' },
    { key: 'reservations.guest.email_placeholder', value: 'your@email.com', section: 'reservations', type: 'text' },
    { key: 'reservations.guest.notes_label', value: 'Special requests', section: 'reservations', type: 'text' },
    { key: 'reservations.guest.notes_placeholder', value: 'Allergies, celebrations, preferences…', section: 'reservations', type: 'textarea' },
    { key: 'reservations.guest.submit', value: 'Confirm reservation', section: 'reservations', type: 'text' },
    { key: 'reservations.guest.back', value: '← Back', section: 'reservations', type: 'text' },
    { key: 'reservations.sidebar.eyebrow', value: 'Your reservation', section: 'reservations', type: 'text' },
    { key: 'reservations.summary.loading', value: 'Confirming your table…', section: 'reservations', type: 'text' },
    { key: 'reservations.summary.eyebrow', value: 'Confirmed', section: 'reservations', type: 'text' },
    { key: 'reservations.summary.title', value: 'Your table is set', section: 'reservations', type: 'text' },
    { key: 'reservations.summary.confirmation_label', value: 'Confirmation', section: 'reservations', type: 'text' },
    { key: 'reservations.summary.date_label', value: 'Date', section: 'reservations', type: 'text' },
    { key: 'reservations.summary.time_label', value: 'Time', section: 'reservations', type: 'text' },
    { key: 'reservations.summary.guests_label', value: 'Guests', section: 'reservations', type: 'text' },
    { key: 'reservations.summary.table_label', value: 'Table', section: 'reservations', type: 'text' },
    { key: 'reservations.summary.name_label', value: 'Name', section: 'reservations', type: 'text' },
    { key: 'reservations.summary.note', value: 'A confirmation will be sent to your phone. For changes or cancellations, please call us directly.', section: 'reservations', type: 'textarea' },
    { key: 'reservations.summary.reset', value: 'Make another reservation', section: 'reservations', type: 'text' },
    { key: 'reservations.contact.title', value: 'Prefer the direct route?', section: 'reservations', type: 'text' },
    { key: 'reservations.contact.description', value: 'Call us, write to us, or send a message. We answer the old way.', section: 'reservations', type: 'textarea' },
    { key: 'reservations.contact.whatsapp_label', value: 'WhatsApp', section: 'reservations', type: 'text' },
    { key: 'menu.kitchen.credit', value: '— the kitchen', section: 'menu', type: 'text' },
    { key: 'menu.loading', value: 'Refreshing today’s selections…', section: 'menu', type: 'text' },
    { key: 'menu.sea.label', value: 'Mar', section: 'menu', type: 'text' },
    { key: 'menu.sea.title', value: 'From the sea', section: 'menu', type: 'text' },
    { key: 'menu.sea.featured_note', value: 'catch of the day', section: 'menu', type: 'text' },
    { key: 'menu.sea.empty', value: 'The fish board is being rewritten for today’s catch.', section: 'menu', type: 'text' },
    { key: 'menu.land.label', value: 'Tierra', section: 'menu', type: 'text' },
    { key: 'menu.land.title', value: 'From the land', section: 'menu', type: 'text' },
    { key: 'menu.land.featured_note', value: "chef's choice", section: 'menu', type: 'text' },
    { key: 'menu.land.empty', value: 'The kitchen is still writing the land chapter for today.', section: 'menu', type: 'text' },
    { key: 'menu.land.quote', value: 'The lamb rests for three hours before we serve it. Patience is a flavour.', section: 'menu', type: 'textarea' },
    { key: 'menu.sweet.label', value: 'Dulce', section: 'menu', type: 'text' },
    { key: 'menu.sweet.title', value: 'To finish', section: 'menu', type: 'text' },
    { key: 'menu.sweet.empty', value: 'Something sweet is still being plated for tonight.', section: 'menu', type: 'text' },
    { key: 'menu.sweet.caption', value: 'something sweet, if the evening asks for it', section: 'menu', type: 'text' },
    { key: 'menu.wine.label', value: 'IV · Bodega', section: 'menu', type: 'text' },
    { key: 'menu.wine.title', value: 'Wine & aperitivo', section: 'menu', type: 'text' },
    { key: 'menu.wine.description', value: "A short list of what we're drinking this season. Ask your server for the full cellar.", section: 'menu', type: 'textarea' },
    { key: 'menu.wine.empty', value: 'The cellar notes are being refreshed.', section: 'menu', type: 'text' },
    { key: 'menu.closing.cta', value: 'Reserve your table', section: 'menu', type: 'text' },
    { key: 'story.hero.label', value: 'Our story', section: 'story', type: 'text' },
    { key: 'story.hero.title', value: 'Built where\nthe land ends', section: 'story', type: 'textarea' },
    { key: 'story.place.line_1', value: 'A kitchen', section: 'story', type: 'text' },
    { key: 'story.place.line_2', value: 'facing', section: 'story', type: 'text' },
    { key: 'story.place.line_3', value: 'the sea', section: 'story', type: 'text' },
    { key: 'story.place.body_1', value: 'The Costa del Sol taught us what a restaurant could be — not a building with a menu, but a place where light, tide, and season shape everything that reaches the table.', section: 'story', type: 'textarea' },
    { key: 'story.place.body_2', value: 'LaRucula sits at the edge. The terrace faces south. The mornings smell of salt and rosemary. The afternoons stretch long and golden.', section: 'story', type: 'textarea' },
    { key: 'story.kitchen.label', value: 'The kitchen', section: 'story', type: 'text' },
    { key: 'story.kitchen.title', value: 'Hands that\nknow the coast', section: 'story', type: 'textarea' },
    { key: 'story.kitchen.body', value: 'The kitchen runs on instinct refined by decades of Mediterranean work. Every morning begins at the port — choosing fish, reading the catch, weighing what the sea decided to offer. The menu follows.', section: 'story', type: 'textarea' },
    { key: 'story.kitchen.quote', value: 'We cook what the fisherman brings.\nNothing more, nothing less.', section: 'story', type: 'textarea' },
    { key: 'story.ritual.label', value: 'The day', section: 'story', type: 'text' },
    { key: 'story.ritual.title', value: 'A restaurant that lives by the hours', section: 'story', type: 'textarea' },
    { key: 'story.ritual.morning.time', value: '7am', section: 'story', type: 'text' },
    { key: 'story.ritual.morning.title', value: 'The port', section: 'story', type: 'text' },
    { key: 'story.ritual.morning.body', value: 'The day begins before the kitchen opens. The chef walks the harbour, reads the boats, selects the catch. The menu is still unwritten.', section: 'story', type: 'textarea' },
    { key: 'story.ritual.afternoon.time', value: '1pm', section: 'story', type: 'text' },
    { key: 'story.ritual.afternoon.title', value: 'The terrace', section: 'story', type: 'text' },
    { key: 'story.ritual.afternoon.body', value: 'Lunch is long and unhurried. The terrace fills slowly. Bread arrives warm. Wine is poured from a local bottle. The sea is always in view.', section: 'story', type: 'textarea' },
    { key: 'story.ritual.evening.time', value: '9pm', section: 'story', type: 'text' },
    { key: 'story.ritual.evening.title', value: 'The table', section: 'story', type: 'text' },
    { key: 'story.ritual.evening.body', value: 'Candles are lit. The dinner menu arrives with the evening breeze. Courses come slowly, each one a conversation between land and sea.', section: 'story', type: 'textarea' },
    { key: 'story.space.label', value: 'The space', section: 'story', type: 'text' },
    { key: 'story.space.title', value: 'Stone, light,\nand the weight of the sea', section: 'story', type: 'textarea' },
    { key: 'story.space.body', value: 'The building is old. The walls are thick and cool. The floors are worn smooth by decades of salt air and footsteps.', section: 'story', type: 'textarea' },
    { key: 'story.space.note', value: 'built in 1962, reimagined for today', section: 'story', type: 'text' },
    { key: 'story.closing.title', value: 'The table is set.\nThe coast is waiting.', section: 'story', type: 'textarea' },
    { key: 'story.closing.cta', value: 'Reserve your table', section: 'story', type: 'text' },
  ];
}

export function getSiteContent() {
  return clone(mockSitePayload);
}

export function getPegasuzSiteContentPayload() {
  return {
    tenant: 'larucula',
    items: buildPegasuzSiteContentItems(),
  };
}

export function getMenuContent() {
  return clone(mockMenuData);
}

export function getBlogPostSummaries() {
  return {
    items: mockBlogPosts.map((post) => toBlogSummary(post)),
  };
}

export function getBlogPostBySlug(slug) {
  const normalizedSlug = normalizeText(slug);
  if (!normalizedSlug) return null;

  const match = mockBlogPosts.find((post) => post.slug === normalizedSlug);
  return match ? clone(match) : null;
}

export async function createContactSubmission(rawPayload = {}) {
  const payload = {
    name: normalizeText(rawPayload.name),
    email: normalizeText(rawPayload.email),
    phone: normalizePhone(rawPayload.phone),
    subject: normalizeText(rawPayload.subject),
    message: normalizeText(rawPayload.message),
  };

  const errors = [];
  if (!payload.name) errors.push('name');
  if (!payload.email) errors.push('email');
  if (!payload.message) errors.push('message');

  if (errors.length > 0) {
    return {
      ok: false,
      statusCode: 422,
      code: 'invalid_contact_payload',
      message: 'Name, email, and message are required.',
      details: { fields: errors },
    };
  }

  const submission = {
    id: `contact_${Date.now().toString(36)}`,
    submittedAt: new Date().toISOString(),
    ...payload,
  };

  await appendContact(submission);

  return {
    ok: true,
    payload: {
      success: true,
      message: 'Message received',
      submittedAt: submission.submittedAt,
      id: submission.id,
    },
  };
}

export function getReservationLayoutContent() {
  return getBaseReservationLayout();
}

export async function getReservationAvailabilityContent(query = {}) {
  const date = normalizeText(query.date);
  const time = normalizeText(query.time);
  const partySize = Number.parseInt(query.partySize || '0', 10);

  if (!date || !time || !Number.isFinite(partySize) || partySize <= 0) {
    return {
      ok: false,
      statusCode: 422,
      code: 'invalid_availability_query',
      message: 'date, time, and partySize are required.',
      details: {
        date,
        time,
        partySize: query.partySize,
      },
    };
  }

  const persistedReservations = await readReservations();
  const layout = getBaseReservationLayout();
  const reservedTableKeys = new Set(
    persistedReservations
      .filter((record) => record.date === date && record.time === time)
      .map((record) => reservationKey(record))
  );

  const tables = layout.tables.map((table) => {
    const isReserved = reservedTableKeys.has(
      reservationKey({ date, time, tableId: table.id })
    );
    const exceedsParty = partySize > table.seats;

    return {
      ...table,
      status: table.status === 'unavailable' || isReserved || exceedsParty ? 'unavailable' : 'available',
    };
  });

  return {
    ok: true,
    payload: {
      timeSlots: clone(mockTimeSlots),
      tables,
    },
  };
}

export async function createReservationRecord(rawPayload = {}) {
  const date = normalizeText(rawPayload.date);
  const time = normalizeText(rawPayload.time);
  const tableId = normalizeText(rawPayload.tableId);
  const partySize = Number.parseInt(rawPayload.partySize || '0', 10);
  const guest = {
    name: normalizeText(rawPayload.guest?.name),
    email: normalizeText(rawPayload.guest?.email),
    phone: normalizePhone(rawPayload.guest?.phone),
    notes: normalizeText(rawPayload.guest?.notes),
  };

  const missingFields = [];
  if (!date) missingFields.push('date');
  if (!time) missingFields.push('time');
  if (!tableId) missingFields.push('tableId');
  if (!Number.isFinite(partySize) || partySize <= 0) missingFields.push('partySize');
  if (!guest.name) missingFields.push('guest.name');
  if (!guest.phone) missingFields.push('guest.phone');

  if (missingFields.length > 0) {
    return {
      ok: false,
      statusCode: 422,
      code: 'invalid_reservation_payload',
      message: 'Reservation date, time, table, party size, guest name, and guest phone are required.',
      details: { fields: missingFields },
    };
  }

  const baseTable = mockTables.find((table) => table.id === tableId);
  if (!baseTable) {
    return {
      ok: false,
      statusCode: 404,
      code: 'table_not_found',
      message: 'The selected table does not exist.',
      details: { tableId },
    };
  }

  const availability = await getReservationAvailabilityContent({ date, time, partySize });
  if (!availability.ok) {
    return availability;
  }

  const selectedTable = availability.payload.tables.find((table) => table.id === tableId);
  if (!selectedTable || selectedTable.status !== 'available') {
    return {
      ok: false,
      statusCode: 409,
      code: 'table_unavailable',
      message: 'The selected table is no longer available for that time.',
      details: { tableId, date, time },
    };
  }

  const reservation = {
    date,
    time,
    partySize,
    tableId,
    guest,
  };

  const confirmationId = `LR-${Date.now().toString(36).toUpperCase()}`;
  const reservationRecord = {
    ...reservation,
    confirmationId,
    createdAt: new Date().toISOString(),
  };

  await appendReservation(reservationRecord);

  return {
    ok: true,
    payload: {
      success: true,
      confirmationId,
      reservation,
    },
  };
}
