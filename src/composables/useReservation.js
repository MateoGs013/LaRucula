import { ref, computed, readonly } from 'vue';
import { mockTables, mockTimeSlots, reservationContract } from '@/data/mock-tables';

/**
 * Composable managing the reservation flow state.
 *
 * All state is local and reactive. In production, table availability
 * and booking confirmation would come from an API — the composable
 * is shaped so that swapping mock data for fetch calls is trivial.
 *
 * Flow steps: 'details' → 'table' → 'guest' → 'confirm'
 */
export function useReservation() {
  // ── Flow step ──
  const step = ref('details'); // 'details' | 'table' | 'guest' | 'confirm'

  // ── Booking data ──
  const date = ref('');
  const time = ref('');
  const partySize = ref(2);
  const selectedTableId = ref(null);
  const guest = ref({ ...reservationContract.guest });

  // ── Tables ──
  const tables = ref(mockTables.map((t) => ({ ...t })));
  const hoveredTableId = ref(null);

  // ── Derived ──
  const selectedTable = computed(() =>
    tables.value.find((t) => t.id === selectedTableId.value) ?? null
  );

  const availableTables = computed(() =>
    tables.value.filter(
      (t) => t.status === 'available' && t.seats >= partySize.value
    )
  );

  const timeSlots = computed(() => {
    // In production: fetch slots for the selected date
    return mockTimeSlots;
  });

  const canProceedToTable = computed(() => !!date.value && !!time.value && partySize.value > 0);
  const canProceedToGuest = computed(() => !!selectedTableId.value);
  const canConfirm = computed(() => guest.value.name && guest.value.phone);

  const bookingSummary = computed(() => ({
    date: date.value,
    time: time.value,
    partySize: partySize.value,
    table: selectedTable.value,
    guest: { ...guest.value },
  }));

  // ── Actions ──
  function selectTable(tableId) {
    const table = tables.value.find((t) => t.id === tableId);
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

  /**
   * Submit reservation — mock implementation.
   * Returns a promise that resolves after a short delay,
   * simulating an API round-trip. Replace with real fetch.
   */
  function submitReservation() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          confirmationId: 'LR-' + Date.now().toString(36).toUpperCase(),
          ...bookingSummary.value,
        });
      }, 1200);
    });
  }

  function reset() {
    step.value = 'details';
    date.value = '';
    time.value = '';
    partySize.value = 2;
    selectedTableId.value = null;
    hoveredTableId.value = null;
    guest.value = { ...reservationContract.guest };
  }

  return {
    // State
    step: readonly(step),
    date,
    time,
    partySize,
    selectedTableId: readonly(selectedTableId),
    hoveredTableId: readonly(hoveredTableId),
    guest,
    tables: readonly(tables),

    // Derived
    selectedTable,
    availableTables,
    timeSlots,
    canProceedToTable,
    canProceedToGuest,
    canConfirm,
    bookingSummary,

    // Actions
    selectTable,
    deselectTable,
    hoverTable,
    unhoverTable,
    goToStep,
    nextStep,
    prevStep,
    submitReservation,
    reset,
  };
}
