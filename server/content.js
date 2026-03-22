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
