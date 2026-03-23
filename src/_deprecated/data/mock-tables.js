/**
 * Mock floor plan data for the reservation table-selection experience.
 *
 * Structure is designed for easy replacement once real restaurant
 * dimensions, table positions, and availability come from an API.
 *
 * Coordinate system: percentage-based (0–100) within the floor plan container.
 * This makes the layout resolution-independent and easy to remap.
 */

export const floorPlanMeta = {
  name: 'Main Dining Room',
  aspectRatio: 16 / 10,
  // Zones help group tables visually (terrace, interior, bar, etc.)
  zones: [
    { id: 'terrace', label: 'Terrace', bounds: { x: 0, y: 0, w: 100, h: 45 } },
    { id: 'interior', label: 'Interior', bounds: { x: 0, y: 45, w: 70, h: 55 } },
    { id: 'private', label: 'Private', bounds: { x: 70, y: 45, w: 30, h: 55 } },
  ],
};

/**
 * Table shapes: 'round', 'square', 'rect'
 * Status: 'available', 'unavailable', 'reserved'
 * Seats: number of chairs
 * Position: { x, y } as percentages of the floor plan container
 * Size: { w, h } as percentages (for rect/square) or { r } for round
 */
export const mockTables = [
  // ── Terrace tables (sea view) ──
  { id: 'T1', zone: 'terrace', shape: 'round', seats: 2, position: { x: 12, y: 15 }, size: { r: 3.5 }, status: 'available', label: 'Sea view · intimate' },
  { id: 'T2', zone: 'terrace', shape: 'round', seats: 2, position: { x: 28, y: 12 }, size: { r: 3.5 }, status: 'available', label: 'Sea view · corner' },
  { id: 'T3', zone: 'terrace', shape: 'round', seats: 4, position: { x: 45, y: 15 }, size: { r: 4.2 }, status: 'unavailable', label: 'Sea view · family' },
  { id: 'T4', zone: 'terrace', shape: 'square', seats: 2, position: { x: 62, y: 12 }, size: { w: 6, h: 6 }, status: 'available', label: 'Sea view · bistro' },
  { id: 'T5', zone: 'terrace', shape: 'round', seats: 4, position: { x: 80, y: 15 }, size: { r: 4.2 }, status: 'available', label: 'Sea view · sunset' },
  { id: 'T6', zone: 'terrace', shape: 'rect', seats: 6, position: { x: 35, y: 33 }, size: { w: 12, h: 6 }, status: 'available', label: 'Terrace · group' },
  { id: 'T7', zone: 'terrace', shape: 'round', seats: 2, position: { x: 15, y: 35 }, size: { r: 3.5 }, status: 'unavailable', label: 'Terrace · railing' },

  // ── Interior tables ──
  { id: 'I1', zone: 'interior', shape: 'round', seats: 2, position: { x: 12, y: 58 }, size: { r: 3.5 }, status: 'available', label: 'Interior · window' },
  { id: 'I2', zone: 'interior', shape: 'round', seats: 4, position: { x: 28, y: 62 }, size: { r: 4.2 }, status: 'available', label: 'Interior · centre' },
  { id: 'I3', zone: 'interior', shape: 'square', seats: 2, position: { x: 45, y: 58 }, size: { w: 6, h: 6 }, status: 'available', label: 'Interior · arch' },
  { id: 'I4', zone: 'interior', shape: 'rect', seats: 6, position: { x: 28, y: 80 }, size: { w: 12, h: 6 }, status: 'available', label: 'Interior · long table' },
  { id: 'I5', zone: 'interior', shape: 'round', seats: 2, position: { x: 55, y: 78 }, size: { r: 3.5 }, status: 'unavailable', label: 'Interior · bar side' },

  // ── Private dining ──
  { id: 'P1', zone: 'private', shape: 'rect', seats: 8, position: { x: 80, y: 60 }, size: { w: 14, h: 7 }, status: 'available', label: 'Private dining · 8 guests' },
  { id: 'P2', zone: 'private', shape: 'round', seats: 4, position: { x: 82, y: 82 }, size: { r: 4.5 }, status: 'available', label: 'Private · intimate' },
];

/**
 * Available time slots — mock data.
 * In production, these come from the reservation API based on date + party size.
 */
export const mockTimeSlots = {
  lunch: ['13:00', '13:30', '14:00', '14:30', '15:00'],
  dinner: ['20:00', '20:30', '21:00', '21:30', '22:00', '22:30'],
};

/**
 * Reservation state shape — this is what the API would accept.
 * Kept here as a reference contract.
 */
export const reservationContract = {
  date: null,        // ISO date string
  time: null,        // 'HH:MM'
  partySize: null,   // number
  tableId: null,     // string (table ID from floor plan)
  guest: {
    name: '',
    email: '',
    phone: '',
    notes: '',
  },
};
