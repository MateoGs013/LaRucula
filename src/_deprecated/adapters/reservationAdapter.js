import { floorPlanMeta, mockTables, mockTimeSlots } from '@/data/mock-tables';

function pickFirstValue(...values) {
  return values.find((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null && value !== '';
  });
}

function normalizeTableStatus(rawStatus) {
  const status = String(rawStatus || 'available').trim().toLowerCase();
  if (status === 'reserved' || status === 'booked' || status === 'occupied') {
    return 'unavailable';
  }

  return status === 'available' ? 'available' : 'unavailable';
}

function normalizeNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeTable(rawTable = {}, fallbackTable = {}) {
  return {
    id: pickFirstValue(rawTable.id, rawTable.code, fallbackTable.id),
    zone: pickFirstValue(rawTable.zone, fallbackTable.zone),
    shape: pickFirstValue(rawTable.shape, fallbackTable.shape, 'round'),
    seats: normalizeNumber(rawTable.seats, fallbackTable.seats ?? 2),
    position: {
      x: normalizeNumber(rawTable.position?.x, fallbackTable.position?.x ?? 50),
      y: normalizeNumber(rawTable.position?.y, fallbackTable.position?.y ?? 50),
    },
    size: rawTable.size || fallbackTable.size || { r: 3.5 },
    status: normalizeTableStatus(rawTable.status ?? fallbackTable.status),
    label: pickFirstValue(rawTable.label, fallbackTable.label, ''),
  };
}

function normalizeLayoutMeta(rawMeta = {}) {
  const zones = Array.isArray(rawMeta.zones) && rawMeta.zones.length > 0 ? rawMeta.zones : floorPlanMeta.zones;

  return {
    name: pickFirstValue(rawMeta.name, floorPlanMeta.name),
    aspectRatio: normalizeNumber(rawMeta.aspectRatio, floorPlanMeta.aspectRatio),
    zones,
  };
}

function normalizeTimeSlots(rawSlots = {}) {
  return {
    lunch: Array.isArray(rawSlots.lunch) ? rawSlots.lunch : mockTimeSlots.lunch,
    dinner: Array.isArray(rawSlots.dinner) ? rawSlots.dinner : mockTimeSlots.dinner,
  };
}

export function adaptReservationLayout(rawPayload = {}) {
  const rawLayout = rawPayload.layout || rawPayload.floorPlan || rawPayload;
  const rawTables = Array.isArray(rawLayout.tables) && rawLayout.tables.length > 0 ? rawLayout.tables : mockTables;

  return {
    floorPlanMeta: normalizeLayoutMeta(rawLayout.floorPlanMeta || rawLayout.meta || floorPlanMeta),
    tables: rawTables.map((table, index) => normalizeTable(table, mockTables[index])),
  };
}

export function adaptReservationAvailability(rawPayload = {}, options = {}) {
  const fallbackTables = options.fallbackTables || mockTables;
  const rawTables = Array.isArray(rawPayload.tables) && rawPayload.tables.length > 0 ? rawPayload.tables : fallbackTables;

  return {
    timeSlots: normalizeTimeSlots(rawPayload.timeSlots || rawPayload.slots || mockTimeSlots),
    tables: rawTables.map((table, index) => normalizeTable(table, fallbackTables[index])),
  };
}

export function adaptReservationSubmission(rawPayload = {}, fallbackPayload = {}) {
  return {
    success: rawPayload.success ?? true,
    confirmationId:
      pickFirstValue(rawPayload.confirmationId, rawPayload.id) ||
      `LR-${Date.now().toString(36).toUpperCase()}`,
    reservation: rawPayload.reservation || fallbackPayload,
  };
}
