<script setup>
/**
 * Booking summary and confirmation view.
 * Shows the reservation details after submission.
 */
import SignatureStroke from '@/components/svg/SignatureStroke.vue';

defineProps({
  summary: { type: Object, required: true },
  confirmationId: { type: String, default: null },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(['reset']);

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
</script>

<template>
  <div class="booking-summary">
    <!-- Loading state -->
    <div v-if="loading" class="flex min-h-[300px] flex-col items-center justify-center">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-ink/10 border-t-toast/60" />
      <p class="mt-4 font-display text-[1.1rem] italic text-stone/50">Confirming your table…</p>
    </div>

    <!-- Confirmed state -->
    <div v-else-if="confirmationId">
      <div class="text-center lg:text-left">
        <p class="eyebrow text-sage/70!">Confirmed</p>
        <h3 class="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ink">
          Your table is set
        </h3>
        <p class="mt-2 text-[0.875rem] text-stone/50">
          Confirmation: <span class="font-medium tracking-wide text-toast">{{ confirmationId }}</span>
        </p>
      </div>

      <!-- Reservation details -->
      <div class="mt-8 space-y-4 border-l-2 border-ink/8 pl-6">
        <div>
          <p class="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-stone/40">Date</p>
          <p class="mt-0.5 font-display text-[1.15rem] italic text-ink">{{ formatDate(summary.date) }}</p>
        </div>
        <div>
          <p class="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-stone/40">Time</p>
          <p class="mt-0.5 font-display text-[1.15rem] italic text-ink">{{ summary.time }}</p>
        </div>
        <div>
          <p class="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-stone/40">Guests</p>
          <p class="mt-0.5 font-display text-[1.15rem] italic text-ink">{{ summary.partySize }}</p>
        </div>
        <div v-if="summary.table">
          <p class="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-stone/40">Table</p>
          <p class="mt-0.5 font-display text-[1.15rem] italic text-ink">
            {{ summary.table.id }} · {{ summary.table.label }}
          </p>
        </div>
        <div>
          <p class="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-stone/40">Name</p>
          <p class="mt-0.5 font-display text-[1.15rem] italic text-ink">{{ summary.guest.name }}</p>
        </div>
      </div>

      <div class="mt-8 max-w-20 text-sage/30">
        <SignatureStroke />
      </div>

      <p class="mt-6 text-[1rem] leading-7 text-stone/60">
        A confirmation will be sent to your phone. For changes or cancellations, please call us directly.
      </p>

      <button
        class="mt-8 inline-flex items-center border border-ink/15 px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:border-ink/30 hover:bg-ink hover:text-ivory"
        @click="emit('reset')"
      >
        Make another reservation
      </button>
    </div>
  </div>
</template>
