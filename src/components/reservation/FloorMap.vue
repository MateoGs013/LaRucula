<script setup>
/**
 * Interactive SVG floor plan for table selection.
 *
 * The plan uses a percentage-based coordinate system (0–100)
 * mapped to an SVG viewBox so the layout is resolution-independent.
 *
 * The entire floor plan shape (zones, furniture positions, decorative elements)
 * is driven by data, making it easy to replace once real dimensions arrive.
 */
import TableNode from './TableNode.vue';

const props = defineProps({
  tables: { type: Array, required: true },
  layoutMeta: { type: Object, required: true },
  selectedTableId: { type: String, default: null },
  hoveredTableId: { type: String, default: null },
  partySize: { type: Number, default: 2 },
});

const emit = defineEmits(['select', 'hover', 'unhover']);

function isSelectable(table) {
  return table.status === 'available' && table.seats >= props.partySize;
}
</script>

<template>
  <div class="floor-map-wrapper">
    <!-- Legend -->
    <div class="mb-4 flex flex-wrap items-center gap-4 text-[0.75rem] uppercase tracking-[0.15em] text-stone/60">
      <span class="flex items-center gap-1.5">
        <span class="inline-block h-3 w-3 rounded-full bg-sage/40 ring-1 ring-sage/60" />
        Available
      </span>
      <span class="flex items-center gap-1.5">
        <span class="inline-block h-3 w-3 rounded-full bg-toast/40 ring-1 ring-toast/60" />
        Selected
      </span>
      <span class="flex items-center gap-1.5">
        <span class="inline-block h-3 w-3 rounded-full bg-stone/15 ring-1 ring-stone/20" />
        Unavailable
      </span>
    </div>

    <!-- SVG Floor Plan -->
    <div class="relative overflow-hidden rounded-sm border border-ink/6 bg-cream/50">
      <svg
        :viewBox="`0 0 100 ${100 / layoutMeta.aspectRatio}`"
        class="w-full"
        role="img"
        aria-label="Restaurant floor plan — select your preferred table"
      >
        <!-- Background zones -->
        <g class="zones" aria-hidden="true">
          <rect
            v-for="zone in layoutMeta.zones"
            :key="zone.id"
            :x="zone.bounds.x"
            :y="zone.bounds.y * (100 / layoutMeta.aspectRatio) / 100"
            :width="zone.bounds.w"
            :height="zone.bounds.h * (100 / layoutMeta.aspectRatio) / 100"
            :class="`zone-${zone.id}`"
          />
        </g>

        <!-- Zone labels -->
        <g class="zone-labels" aria-hidden="true">
          <text
            v-for="zone in layoutMeta.zones"
            :key="zone.id + '-label'"
            :x="zone.bounds.x + zone.bounds.w / 2"
            :y="(zone.bounds.y + 5) * (100 / layoutMeta.aspectRatio) / 100"
            text-anchor="middle"
            class="zone-label-text"
          >{{ zone.label }}</text>
        </g>

        <!-- Decorative elements — sea edge on top -->
        <line
          x1="0" y1="1" x2="100" y2="1"
          stroke="var(--lr-color-sage)"
          stroke-width="0.3"
          stroke-opacity="0.3"
          stroke-dasharray="2 1"
          aria-hidden="true"
        />
        <text x="50" y="3.5" text-anchor="middle" class="sea-label">↑ Sea view</text>

        <!-- Tables -->
        <TableNode
          v-for="table in tables"
          :key="table.id"
          :table="table"
          :is-selected="table.id === selectedTableId"
          :is-hovered="table.id === hoveredTableId"
          :is-selectable="isSelectable(table)"
          @select="emit('select', $event)"
          @hover="emit('hover', $event)"
          @unhover="emit('unhover')"
        />
      </svg>
    </div>

    <!-- Selected table detail -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 translate-y-2"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="selectedTableId"
        class="mt-4 border-l-2 border-toast/30 pl-4"
      >
        <p class="text-[0.8rem] font-medium uppercase tracking-[0.18em] text-toast/70">
          Table {{ tables.find(t => t.id === selectedTableId)?.id }}
        </p>
        <p class="mt-1 font-display text-[1.1rem] italic text-ink/70">
          {{ tables.find(t => t.id === selectedTableId)?.label }}
        </p>
        <p class="mt-0.5 text-[0.875rem] text-stone/50">
          {{ tables.find(t => t.id === selectedTableId)?.seats }} seats ·
          {{ tables.find(t => t.id === selectedTableId)?.zone }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Zone fills */
.zone-terrace {
  fill: var(--lr-color-sage);
  fill-opacity: 0.06;
}
.zone-interior {
  fill: var(--lr-color-sand);
  fill-opacity: 0.1;
}
.zone-private {
  fill: var(--lr-color-toast);
  fill-opacity: 0.05;
}

/* Zone labels */
.zone-label-text {
  font-family: var(--lr-font-body);
  font-size: 1.6px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  fill: var(--lr-color-stone);
  opacity: 0.25;
}

.sea-label {
  font-family: var(--lr-font-body);
  font-size: 1.4px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  fill: var(--lr-color-sage);
  opacity: 0.35;
}
</style>
