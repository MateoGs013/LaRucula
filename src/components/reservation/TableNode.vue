<script setup>
/**
 * Individual table element in the floor plan.
 * Renders as SVG shape with visual states for available/selected/unavailable/hovered.
 */
const props = defineProps({
  table: { type: Object, required: true },
  isSelected: { type: Boolean, default: false },
  isHovered: { type: Boolean, default: false },
  isSelectable: { type: Boolean, default: true },
});

const emit = defineEmits(['select', 'hover', 'unhover']);

function getStateClasses() {
  if (props.table.status === 'unavailable') return 'table-unavailable';
  if (props.isSelected) return 'table-selected';
  if (props.isHovered && props.isSelectable) return 'table-hovered';
  if (props.isSelectable) return 'table-available';
  return 'table-unavailable';
}

function handleClick() {
  if (props.table.status === 'available' && props.isSelectable) {
    emit('select', props.table.id);
  }
}
</script>

<template>
  <g
    :class="['table-node', getStateClasses()]"
    :transform="`translate(${table.position.x}, ${table.position.y})`"
    role="button"
    :tabindex="table.status === 'available' && isSelectable ? 0 : -1"
    :aria-label="`Table ${table.id} — ${table.seats} seats — ${table.label} — ${table.status === 'unavailable' ? 'unavailable' : isSelected ? 'selected' : 'available'}`"
    @click="handleClick"
    @mouseenter="emit('hover', table.id)"
    @mouseleave="emit('unhover')"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <!-- Round table -->
    <circle
      v-if="table.shape === 'round'"
      :r="table.size.r"
      class="table-shape"
    />
    <!-- Square table -->
    <rect
      v-else-if="table.shape === 'square'"
      :x="-table.size.w / 2"
      :y="-table.size.h / 2"
      :width="table.size.w"
      :height="table.size.h"
      rx="0.8"
      class="table-shape"
    />
    <!-- Rectangular table -->
    <rect
      v-else
      :x="-table.size.w / 2"
      :y="-table.size.h / 2"
      :width="table.size.w"
      :height="table.size.h"
      rx="0.8"
      class="table-shape"
    />

    <!-- Seat indicators — small circles around the table -->
    <circle
      v-for="(_, i) in table.seats"
      :key="i"
      :cx="Math.cos((2 * Math.PI * i) / table.seats) * ((table.size.r ?? Math.max(table.size.w, table.size.h) / 2) + 2)"
      :cy="Math.sin((2 * Math.PI * i) / table.seats) * ((table.size.r ?? Math.max(table.size.w, table.size.h) / 2) + 2)"
      r="0.9"
      class="seat-dot"
    />

    <!-- Table ID label -->
    <text
      y="0.4"
      text-anchor="middle"
      class="table-label"
    >{{ table.id }}</text>
  </g>
</template>

<style scoped>
.table-node {
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.table-node:focus-visible {
  outline: none;
}

.table-node:focus-visible .table-shape {
  stroke: var(--lr-color-toast);
  stroke-width: 0.6;
}

/* ── States ── */
.table-available .table-shape {
  fill: var(--lr-color-sage);
  fill-opacity: 0.3;
  stroke: var(--lr-color-sage);
  stroke-width: 0.3;
  transition: all 0.3s ease;
}

.table-hovered .table-shape {
  fill: var(--lr-color-sage);
  fill-opacity: 0.5;
  stroke: var(--lr-color-olive);
  stroke-width: 0.4;
}

.table-hovered {
  transform-origin: center;
}

.table-selected .table-shape {
  fill: var(--lr-color-toast);
  fill-opacity: 0.35;
  stroke: var(--lr-color-toast);
  stroke-width: 0.5;
}

.table-unavailable .table-shape {
  fill: var(--lr-color-stone);
  fill-opacity: 0.12;
  stroke: var(--lr-color-stone);
  stroke-width: 0.15;
}

.table-unavailable {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Seats ── */
.seat-dot {
  fill: currentColor;
  opacity: 0.2;
  transition: opacity 0.3s ease;
}

.table-available .seat-dot { fill: var(--lr-color-sage); opacity: 0.35; }
.table-hovered .seat-dot { fill: var(--lr-color-olive); opacity: 0.5; }
.table-selected .seat-dot { fill: var(--lr-color-toast); opacity: 0.5; }
.table-unavailable .seat-dot { fill: var(--lr-color-stone); opacity: 0.1; }

/* ── Label ── */
.table-label {
  font-family: var(--lr-font-body);
  font-size: 1.8px;
  font-weight: 500;
  letter-spacing: 0.02em;
  fill: var(--lr-color-ink);
  opacity: 0.5;
  pointer-events: none;
}

.table-selected .table-label {
  fill: var(--lr-color-toast);
  opacity: 0.8;
}

.table-unavailable .table-label {
  opacity: 0.2;
}
</style>
