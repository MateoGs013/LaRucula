import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const serverDir = path.dirname(fileURLToPath(import.meta.url));
const runtimeDir = path.join(serverDir, 'runtime');
const databaseFile = path.join(runtimeDir, 'larucula.sqlite');
const legacyContactsFile = path.join(runtimeDir, 'contacts.json');
const legacyReservationsFile = path.join(runtimeDir, 'reservations.json');

let database = null;
let initialized = false;

function ensureDatabase() {
  if (!database) {
    throw new Error('Runtime storage has not been initialized.');
  }

  return database;
}

function readLegacyCollection(filePath) {
  if (!existsSync(filePath)) {
    return [];
  }

  try {
    const rawValue = readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getTableCount(tableName) {
  const db = ensureDatabase();
  const query = db.prepare(`SELECT COUNT(*) AS count FROM ${tableName}`);
  return Number(query.get().count || 0);
}

function migrateLegacyContacts() {
  if (getTableCount('contacts') > 0) {
    return;
  }

  const legacyContacts = readLegacyCollection(legacyContactsFile);
  if (legacyContacts.length === 0) {
    return;
  }

  const db = ensureDatabase();
  const insertContact = db.prepare(`
    INSERT OR IGNORE INTO contacts (
      id,
      submitted_at,
      name,
      email,
      phone,
      subject,
      message
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  legacyContacts.forEach((contact) => {
    insertContact.run(
      String(contact.id || ''),
      String(contact.submittedAt || ''),
      String(contact.name || ''),
      String(contact.email || ''),
      String(contact.phone || ''),
      String(contact.subject || ''),
      String(contact.message || '')
    );
  });
}

function migrateLegacyReservations() {
  if (getTableCount('reservations') > 0) {
    return;
  }

  const legacyReservations = readLegacyCollection(legacyReservationsFile);
  if (legacyReservations.length === 0) {
    return;
  }

  const db = ensureDatabase();
  const insertReservation = db.prepare(`
    INSERT OR IGNORE INTO reservations (
      confirmation_id,
      created_at,
      date,
      time,
      party_size,
      table_id,
      guest_name,
      guest_email,
      guest_phone,
      guest_notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  legacyReservations.forEach((reservation) => {
    insertReservation.run(
      String(reservation.confirmationId || ''),
      String(reservation.createdAt || ''),
      String(reservation.date || ''),
      String(reservation.time || ''),
      Number(reservation.partySize || 0),
      String(reservation.tableId || ''),
      String(reservation.guest?.name || ''),
      String(reservation.guest?.email || ''),
      String(reservation.guest?.phone || ''),
      String(reservation.guest?.notes || '')
    );
  });
}

function mapContactRow(row) {
  return {
    id: row.id,
    submittedAt: row.submitted_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
  };
}

function mapReservationRow(row) {
  return {
    confirmationId: row.confirmation_id,
    createdAt: row.created_at,
    date: row.date,
    time: row.time,
    partySize: row.party_size,
    tableId: row.table_id,
    guest: {
      name: row.guest_name,
      email: row.guest_email,
      phone: row.guest_phone,
      notes: row.guest_notes,
    },
  };
}

export async function initializeRuntimeStorage() {
  if (initialized) {
    return;
  }

  mkdirSync(runtimeDir, { recursive: true });
  database = new DatabaseSync(databaseFile);
  database.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      submitted_at TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS reservations (
      confirmation_id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      party_size INTEGER NOT NULL,
      table_id TEXT NOT NULL,
      guest_name TEXT NOT NULL,
      guest_email TEXT,
      guest_phone TEXT NOT NULL,
      guest_notes TEXT,
      UNIQUE(date, time, table_id)
    );
    CREATE INDEX IF NOT EXISTS reservations_lookup_idx
      ON reservations (date, time);
  `);

  migrateLegacyContacts();
  migrateLegacyReservations();
  initialized = true;
}

export async function readContacts() {
  const db = ensureDatabase();
  const query = db.prepare(`
    SELECT
      id,
      submitted_at,
      name,
      email,
      phone,
      subject,
      message
    FROM contacts
    ORDER BY submitted_at DESC
  `);

  return query.all().map(mapContactRow);
}

export async function appendContact(contactSubmission) {
  const db = ensureDatabase();
  const insertContact = db.prepare(`
    INSERT INTO contacts (
      id,
      submitted_at,
      name,
      email,
      phone,
      subject,
      message
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertContact.run(
    contactSubmission.id,
    contactSubmission.submittedAt,
    contactSubmission.name,
    contactSubmission.email,
    contactSubmission.phone,
    contactSubmission.subject,
    contactSubmission.message
  );

  return contactSubmission;
}

export async function readReservations() {
  const db = ensureDatabase();
  const query = db.prepare(`
    SELECT
      confirmation_id,
      created_at,
      date,
      time,
      party_size,
      table_id,
      guest_name,
      guest_email,
      guest_phone,
      guest_notes
    FROM reservations
    ORDER BY created_at DESC
  `);

  return query.all().map(mapReservationRow);
}

export async function appendReservation(reservationRecord) {
  const db = ensureDatabase();
  const insertReservation = db.prepare(`
    INSERT INTO reservations (
      confirmation_id,
      created_at,
      date,
      time,
      party_size,
      table_id,
      guest_name,
      guest_email,
      guest_phone,
      guest_notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  try {
    insertReservation.run(
      reservationRecord.confirmationId,
      reservationRecord.createdAt,
      reservationRecord.date,
      reservationRecord.time,
      reservationRecord.partySize,
      reservationRecord.tableId,
      reservationRecord.guest.name,
      reservationRecord.guest.email,
      reservationRecord.guest.phone,
      reservationRecord.guest.notes
    );
  } catch (error) {
    if (isReservationConflictError(error)) {
      const conflictError = new Error('Reservation already exists for that date, time, and table.');
      conflictError.code = 'reservation_conflict';
      throw conflictError;
    }

    throw error;
  }

  return reservationRecord;
}

export function isReservationConflictError(error) {
  return String(error?.message || '').includes('UNIQUE constraint failed: reservations.date, reservations.time, reservations.table_id');
}
