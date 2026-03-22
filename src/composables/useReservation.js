import { computed, readonly, ref, watch } from 'vue';

import { getErrorMessage } from '@/api/errors';
import { reservationContract } from '@/data/mock-tables';
import {
  createReservation,
  getReservationAvailability,
  getReservationAvailabilitySnapshot,
  getReservationLayout,
  getReservationLayoutSnapshot,
} from '@/services/reservationService';

/**
 * Reservation flow state with explicit API boundaries.
 *
 * The UI works against three distinct concerns:
 * - layout: geometry and zones of the dining room
 * - availability: time slots and per-table status for the current request
 * - submit: confirmation call for the selected table and guest data
 */
export function useReservation() {
  const layoutSnapshot = getReservationLayoutSnapshot();
  const availabilitySnapshot = getReservationAvailabilitySnapshot();

  const step = ref('details');
  const date = ref('');
  const time = ref('');
  const partySize = ref(2);
  const selectedTableId = ref(null);
  const guest = ref({ ...reservationContract.guest });

  const floorPlanMeta = ref(layoutSnapshot.floorPlanMeta);
  const tables = ref(layoutSnapshot.tables);
  const timeSlots = ref(availabilitySnapshot.timeSlots);
  const hoveredTableId = ref(null);

  const layoutLoading = ref(false);
  const availabilityLoading = ref(false);
  const loadError = ref('');
  const submitError = ref('');

  let availabilityRequestId = 0;

  const selectedTable = computed(() =>
    tables.value.find((table) => table.id === selectedTableId.value) ?? null
  );

  const availableTables = computed(() =>
    tables.value.filter((table) => table.status === 'available' && table.seats >= partySize.value)
  );

  const canProceedToTable = computed(() => Boolean(date.value) && Boolean(time.value) && partySize.value > 0);
  const canProceedToGuest = computed(() => Boolean(selectedTableId.value));
  const canConfirm = computed(() => Boolean(guest.value.name) && Boolean(guest.value.phone));

  const bookingSummary = computed(() => ({
    date: date.value,
    time: time.value,
    partySize: partySize.value,
    table: selectedTable.value,
    guest: { ...guest.value },
  }));

  function selectTable(tableId) {
    const table = tables.value.find((item) => item.id === tableId);
    if (table && table.status === 'available' && table.seats >= partySize.value) {
      selectedTableId.value = tableId;
    }
  }

  function deselectTable() {
    selectedTableId.value = null;
  }

  function hoverTable(tableId) {
    hoveredTableId.value = tableId;
  }

  function unhoverTable() {
    hoveredTableId.value = null;
  }

  function goToStep(target) {
    step.value = target;
  }

  function nextStep() {
    const flow = ['details', 'table', 'guest', 'confirm'];
    const idx = flow.indexOf(step.value);
    if (idx < flow.length - 1) step.value = flow[idx + 1];
  }

  function prevStep() {
    const flow = ['details', 'table', 'guest', 'confirm'];
    const idx = flow.indexOf(step.value);
    if (idx > 0) step.value = flow[idx - 1];
  }

  async function loadLayout() {
    layoutLoading.value = true;
    loadError.value = '';

    try {
      const layout = await getReservationLayout();
      floorPlanMeta.value = layout.floorPlanMeta;
      tables.value = layout.tables;

      if (date.value && time.value) {
        await loadAvailability();
      }
    } catch (error) {
      loadError.value = getErrorMessage(error, 'Unable to load the dining room layout.');
      const fallbackLayout = getReservationLayoutSnapshot();
      floorPlanMeta.value = fallbackLayout.floorPlanMeta;
      tables.value = fallbackLayout.tables;
    } finally {
      layoutLoading.value = false;
    }
  }

  async function loadAvailability() {
    const requestId = ++availabilityRequestId;
    availabilityLoading.value = true;
    loadError.value = '';

    try {
      const availability = await getReservationAvailability({
        date: date.value,
        time: time.value,
        partySize: partySize.value,
      });

      if (requestId !== availabilityRequestId) {
        return;
      }

      timeSlots.value = availability.timeSlots;
      tables.value = availability.tables;

      if (
        selectedTableId.value &&
        !availability.tables.some(
          (table) =>
            table.id === selectedTableId.value &&
            table.status === 'available' &&
            table.seats >= partySize.value
        )
      ) {
        selectedTableId.value = null;
      }
    } catch (error) {
      if (requestId !== availabilityRequestId) {
        return;
      }

      loadError.value = getErrorMessage(error, 'Unable to refresh table availability.');
      const fallbackAvailability = getReservationAvailabilitySnapshot();
      const fallbackLayout = getReservationLayoutSnapshot();
      timeSlots.value = fallbackAvailability.timeSlots;
      tables.value = fallbackLayout.tables;
    } finally {
      if (requestId === availabilityRequestId) {
        availabilityLoading.value = false;
      }
    }
  }

  async function submitReservation() {
    submitError.value = '';

    try {
      const result = await createReservation({
        date: date.value,
        time: time.value,
        partySize: partySize.value,
        tableId: selectedTableId.value,
        guest: guest.value,
      });

      return {
        success: result.success,
        confirmationId: result.confirmationId,
        ...bookingSummary.value,
      };
    } catch (error) {
      submitError.value = getErrorMessage(error, 'Unable to confirm the reservation right now.');
      throw error;
    }
  }

  function reset() {
    const fallbackAvailability = getReservationAvailabilitySnapshot();
    const fallbackLayout = getReservationLayoutSnapshot();

    step.value = 'details';
    date.value = '';
    time.value = '';
    partySize.value = 2;
    selectedTableId.value = null;
    hoveredTableId.value = null;
    guest.value = { ...reservationContract.guest };
    floorPlanMeta.value = fallbackLayout.floorPlanMeta;
    timeSlots.value = fallbackAvailability.timeSlots;
    tables.value = fallbackLayout.tables;
    loadError.value = '';
    submitError.value = '';
  }

  watch([date, time, partySize], async ([nextDate, nextTime]) => {
    if (!nextDate || !nextTime) {
      const fallbackAvailability = getReservationAvailabilitySnapshot();
      const fallbackLayout = getReservationLayoutSnapshot();
      selectedTableId.value = null;
      timeSlots.value = fallbackAvailability.timeSlots;
      tables.value = fallbackLayout.tables;
      return;
    }

    selectedTableId.value = null;
    await loadAvailability();
  });

  void loadLayout();

  return {
    step: readonly(step),
    date,
    time,
    partySize,
    floorPlanMeta: readonly(floorPlanMeta),
    selectedTableId: readonly(selectedTableId),
    hoveredTableId: readonly(hoveredTableId),
    guest,
    tables: readonly(tables),
    timeSlots: readonly(timeSlots),
    layoutLoading: readonly(layoutLoading),
    availabilityLoading: readonly(availabilityLoading),
    loadError: readonly(loadError),
    submitError: readonly(submitError),

    selectedTable,
    availableTables,
    canProceedToTable,
    canProceedToGuest,
    canConfirm,
    bookingSummary,

    selectTable,
    deselectTable,
    hoverTable,
    unhoverTable,
    goToStep,
    nextStep,
    prevStep,
    loadLayout,
    loadAvailability,
    submitReservation,
    reset,
  };
}
