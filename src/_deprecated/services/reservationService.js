import { apiRequest } from '@/api/client';
import { isApiEnabled } from '@/api/config';
import {
  adaptReservationAvailability,
  adaptReservationLayout,
  adaptReservationSubmission,
} from '@/adapters/reservationAdapter';
import { floorPlanMeta, mockTables, mockTimeSlots } from '@/data/mock-tables';

let cachedLayout = adaptReservationLayout({
  floorPlanMeta,
  tables: mockTables,
});
let pendingLayoutRequest = null;

function clone(value) {
  return structuredClone(value);
}

export function getReservationLayoutSnapshot() {
  return clone(cachedLayout);
}

export function getReservationAvailabilitySnapshot() {
  return adaptReservationAvailability(
    {
      timeSlots: mockTimeSlots,
      tables: cachedLayout.tables,
    },
    { fallbackTables: cachedLayout.tables }
  );
}

export async function getReservationLayout(options = {}) {
  const { force = false } = options;

  if (!isApiEnabled()) {
    cachedLayout = adaptReservationLayout({
      floorPlanMeta,
      tables: mockTables,
    });
    return getReservationLayoutSnapshot();
  }

  if (!force && pendingLayoutRequest) {
    return pendingLayoutRequest;
  }

  pendingLayoutRequest = (async () => {
    const payload = await apiRequest('/reservations/layout');
    cachedLayout = adaptReservationLayout(payload);
    return getReservationLayoutSnapshot();
  })();

  try {
    return await pendingLayoutRequest;
  } finally {
    pendingLayoutRequest = null;
  }
}

export async function getReservationAvailability(params = {}) {
  if (!isApiEnabled()) {
    return adaptReservationAvailability(
      {
        timeSlots: mockTimeSlots,
        tables: cachedLayout.tables,
      },
      { fallbackTables: cachedLayout.tables }
    );
  }

  const payload = await apiRequest('/reservations/availability', {
    query: {
      date: params.date,
      time: params.time,
      partySize: params.partySize,
    },
  });

  return adaptReservationAvailability(payload, {
    fallbackTables: cachedLayout.tables,
  });
}

export async function createReservation(payload) {
  const body = {
    date: payload?.date || '',
    time: payload?.time || '',
    partySize: payload?.partySize || 0,
    tableId: payload?.tableId || null,
    guest: {
      name: String(payload?.guest?.name || '').trim(),
      email: String(payload?.guest?.email || '').trim(),
      phone: String(payload?.guest?.phone || '').trim(),
      notes: String(payload?.guest?.notes || '').trim(),
    },
  };

  if (!isApiEnabled()) {
    await new Promise((resolve) => window.setTimeout(resolve, 1200));
    return adaptReservationSubmission(
      {
        success: true,
        confirmationId: `LR-${Date.now().toString(36).toUpperCase()}`,
        reservation: body,
      },
      body
    );
  }

  const payloadResponse = await apiRequest('/reservations', {
    method: 'POST',
    body,
  });

  return adaptReservationSubmission(payloadResponse, body);
}
