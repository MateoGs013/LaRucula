import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDir = path.dirname(fileURLToPath(import.meta.url));
const runtimeDir = path.join(serverDir, 'runtime');
const contactsFile = path.join(runtimeDir, 'contacts.json');
const reservationsFile = path.join(runtimeDir, 'reservations.json');

const writeQueues = new Map();
let initialized = false;

async function ensureRuntimeFile(filePath, fallbackValue) {
  try {
    await readFile(filePath, 'utf8');
  } catch {
    await writeFile(filePath, JSON.stringify(fallbackValue, null, 2), 'utf8');
  }
}

async function readCollection(filePath) {
  await initializeRuntimeStorage();
  const rawValue = await readFile(filePath, 'utf8');
  const parsed = JSON.parse(rawValue);
  return Array.isArray(parsed) ? parsed : [];
}

function queueWrite(filePath, task) {
  const previousTask = writeQueues.get(filePath) || Promise.resolve();
  const nextTask = previousTask.catch(() => {}).then(task);
  writeQueues.set(filePath, nextTask);
  return nextTask;
}

async function appendCollectionItem(filePath, item) {
  return queueWrite(filePath, async () => {
    const currentItems = await readCollection(filePath);
    currentItems.push(item);
    await writeFile(filePath, JSON.stringify(currentItems, null, 2), 'utf8');
    return item;
  });
}

export async function initializeRuntimeStorage() {
  if (initialized) {
    return;
  }

  await mkdir(runtimeDir, { recursive: true });
  await ensureRuntimeFile(contactsFile, []);
  await ensureRuntimeFile(reservationsFile, []);
  initialized = true;
}

export async function readContacts() {
  return readCollection(contactsFile);
}

export async function appendContact(contactSubmission) {
  return appendCollectionItem(contactsFile, contactSubmission);
}

export async function readReservations() {
  return readCollection(reservationsFile);
}

export async function appendReservation(reservationRecord) {
  return appendCollectionItem(reservationsFile, reservationRecord);
}
