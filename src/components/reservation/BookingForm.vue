<script setup>
/**
 * Reservation booking form — date, time, party size selection.
 * Step 1 of the reservation flow.
 */
const props = defineProps({
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  partySize: { type: Number, default: 2 },
  timeSlots: { type: Object, default: () => ({ lunch: [], dinner: [] }) },
  canProceed: { type: Boolean, default: false },
});

const emit = defineEmits(['update:date', 'update:time', 'update:partySize', 'next']);

const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

function getTodayISO() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}
</script>

<template>
  <div class="booking-form">
    <div class="space-y-8">
      <!-- Date -->
      <div>
        <label for="res-date" class="eyebrow mb-2 block text-[0.75rem]">Date</label>
        <input
          id="res-date"
          type="date"
          :min="getTodayISO()"
          :value="date"
          class="w-full border-b border-ink/15 bg-transparent py-3 font-display text-[1.1rem] italic text-ink outline-none transition-colors focus:border-toast/50"
          @input="emit('update:date', $event.target.value)"
        />
      </div>

      <!-- Party size -->
      <div>
        <p class="eyebrow mb-3 text-[0.75rem]">Guests</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="size in partySizes"
            :key="size"
            class="flex h-11 w-11 items-center justify-center border text-[0.95rem] transition-all duration-300"
            :class="partySize === size
              ? 'border-toast/40 bg-toast/10 text-toast font-medium'
              : 'border-ink/10 text-stone/60 hover:border-ink/20 hover:text-ink'"
            @click="emit('update:partySize', size)"
          >
            {{ size }}
          </button>
        </div>
      </div>

      <!-- Time -->
      <div>
        <p class="eyebrow mb-3 text-[0.75rem]">Time</p>

        <!-- Lunch -->
        <p class="mb-2 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-stone/40">Lunch</p>
        <div class="mb-4 flex flex-wrap gap-2">
          <button
            v-for="slot in timeSlots.lunch"
            :key="slot"
            class="border px-4 py-2 font-display text-[1rem] italic transition-all duration-300"
            :class="time === slot
              ? 'border-toast/40 bg-toast/10 text-toast'
              : 'border-ink/10 text-stone/60 hover:border-ink/20 hover:text-ink'"
            @click="emit('update:time', slot)"
          >
            {{ slot }}
          </button>
        </div>

        <!-- Dinner -->
        <p class="mb-2 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-stone/40">Dinner</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="slot in timeSlots.dinner"
            :key="slot"
            class="border px-4 py-2 font-display text-[1rem] italic transition-all duration-300"
            :class="time === slot
              ? 'border-toast/40 bg-toast/10 text-toast'
              : 'border-ink/10 text-stone/60 hover:border-ink/20 hover:text-ink'"
            @click="emit('update:time', slot)"
          >
            {{ slot }}
          </button>
        </div>
      </div>
    </div>

    <!-- Proceed button -->
    <div class="mt-10">
      <button
        :disabled="!canProceed"
        class="inline-flex w-full items-center justify-center border border-ink bg-ink px-6 py-4 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:bg-dusk disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
        @click="emit('next')"
      >
        Choose your table
      </button>
    </div>
  </div>
</template>
