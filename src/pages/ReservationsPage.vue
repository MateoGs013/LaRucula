<script setup>
import { ref } from 'vue';

import BaseButton from '@/components/ui/BaseButton.vue';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import FloorMap from '@/components/reservation/FloorMap.vue';
import BookingForm from '@/components/reservation/BookingForm.vue';
import GuestForm from '@/components/reservation/GuestForm.vue';
import BookingSummary from '@/components/reservation/BookingSummary.vue';
import { contactDetails } from '@/app/app-config';
import { useReservation } from '@/composables/useReservation';
import { useRevealMotion } from '@/composables/useRevealMotion';
import { useImageReveal } from '@/composables/useImageReveal';

const pageRef = ref(null);
useRevealMotion(pageRef);
useImageReveal(pageRef);

const {
  step,
  date,
  time,
  partySize,
  floorPlanMeta,
  selectedTableId,
  hoveredTableId,
  guest,
  tables,
  selectedTable,
  timeSlots,
  layoutLoading,
  availabilityLoading,
  loadError,
  submitError,
  canProceedToTable,
  canProceedToGuest,
  canConfirm,
  bookingSummary,
  selectTable,
  hoverTable,
  unhoverTable,
  nextStep,
  prevStep,
  submitReservation,
  reset,
} = useReservation();

const submitting = ref(false);
const confirmationId = ref(null);

async function handleConfirm() {
  submitting.value = true;
  try {
    const result = await submitReservation();
    confirmationId.value = result.confirmationId;
    nextStep();
  } catch {
    // Keep the user on the guest step so they can retry.
  } finally {
    submitting.value = false;
  }
}

function handleReset() {
  confirmationId.value = null;
  reset();
}

// Step labels for progress indicator
const steps = [
  { key: 'details', label: 'Date & time' },
  { key: 'table', label: 'Your table' },
  { key: 'guest', label: 'Details' },
  { key: 'confirm', label: 'Confirmed' },
];
</script>

<template>
  <div ref="pageRef">

    <!-- ═══ HERO — editorial reservation arrival ═══ -->
    <section class="relative -mt-[var(--header-h)] overflow-hidden bg-ink">
      <div class="relative flex min-h-[70vh] flex-col justify-end">
        <img
          src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1600&q=80&auto=format"
          alt="Elegantly set dinner table with warm Mediterranean evening light"
          class="absolute inset-0 h-full w-full object-cover opacity-30"
          loading="eager"
          fetchpriority="high"
        />
        <div class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/60 to-transparent" />

        <!-- Ghost word — reservation identity -->
        <div class="pl-[var(--lr-space-gutter)] lg:pl-[5vw]" aria-hidden="true">
          <p class="pointer-events-none select-none font-display text-[clamp(8rem,20vw,20rem)] font-light italic leading-[0.78] tracking-[-0.06em] text-ivory/[0.07]">
            noche
          </p>
        </div>

        <div class="relative z-10 -mt-8 pb-10 pl-[var(--lr-space-gutter)] md:-mt-12 md:pb-14 lg:-mt-14 lg:pb-16 lg:pl-[5vw]" data-reveal>
          <p class="eyebrow text-ivory/40!">Reservations</p>
          <h1 class="mt-3 max-w-xl font-display text-[clamp(3rem,7vw,6rem)] font-light italic leading-[0.88] tracking-[-0.04em] text-ivory [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">
            Choose your<br />evening
          </h1>
          <p class="mt-4 max-w-md text-[1rem] leading-7 text-ivory/45">
            Thirty covers, each with a view. Select your table, set your time, and let the coast take care of the rest.
          </p>
          <div class="mt-5 max-w-16 text-ivory/20">
            <SignatureStroke />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ RESERVATION FLOW ═══ -->
    <section id="booking" class="relative py-16 md:py-20 lg:py-28">
      <div class="px-[var(--lr-space-gutter)] lg:px-[5vw]">

        <!-- Progress indicator — editorial, not stepper -->
        <div class="mb-14 lg:mb-18" data-reveal>
          <div class="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em]">
            <template v-for="(s, i) in steps" :key="s.key">
              <span
                class="whitespace-nowrap transition-colors duration-300"
                :class="step === s.key ? 'text-toast font-medium' : 'text-stone/30'"
              >
                {{ s.label }}
              </span>
              <span v-if="i < steps.length - 1" class="h-px w-4 bg-stone/12" />
            </template>
          </div>
        </div>

        <!-- Step: Details -->
        <Transition
          enter-active-class="transition-all duration-400 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0 translate-y-4"
          leave-to-class="opacity-0 -translate-y-4"
          mode="out-in"
        >
          <div v-if="step === 'details'" key="details">
            <div class="lg:grid lg:grid-cols-[5fr_3fr] lg:gap-20">
              <div>
                <div data-reveal>
                  <h2 class="font-display text-[clamp(2.2rem,5vw,4rem)] font-light italic leading-[0.92] tracking-[-0.04em] text-ink">
                    When shall we<br />expect you?
                  </h2>
                  <p class="mt-4 max-w-md text-[1rem] leading-7 text-stone/70">
                    Choose your date, party size, and preferred time. We'll show you the available tables.
                  </p>
                </div>
                <div class="mt-10">
                  <BookingForm
                    :date="date"
                    :time="time"
                    :party-size="partySize"
                    :time-slots="timeSlots"
                    :can-proceed="canProceedToTable"
                    @update:date="date = $event"
                    @update:time="time = $event"
                    @update:party-size="partySize = $event"
                    @next="nextStep"
                  />
                  <p
                    v-if="availabilityLoading || loadError"
                    class="mt-5 max-w-md text-[0.95rem] leading-7 text-stone/55"
                    data-reveal
                  >
                    {{ availabilityLoading ? 'Refreshing the room for that time and party size…' : loadError }}
                  </p>
                </div>
              </div>
              <!-- Atmospheric image — right column on desktop -->
              <div class="mt-12 hidden lg:block" data-image-reveal data-image-reveal-direction="right">
                <div class="aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80&auto=format"
                    alt="Intimate restaurant interior with warm stone walls"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p class="mt-3 font-accent text-[1rem] text-toast/40">
                  every table has a story
                </p>
              </div>
            </div>
          </div>

          <!-- Step: Table selection — IMMERSIVE MAP -->
          <div v-else-if="step === 'table'" key="table">
            <div class="mb-8" data-reveal>
              <h2 class="font-display text-[clamp(2.2rem,5vw,4rem)] font-light italic leading-[0.92] tracking-[-0.04em] text-ink">
                Your table
              </h2>
              <p class="mt-3 max-w-lg text-[1rem] leading-7 text-stone/70">
                {{ partySize }} {{ partySize === 1 ? 'guest' : 'guests' }} · {{ time }} ·
                Tables with enough seats are highlighted.
              </p>
            </div>

            <!-- Full-bleed map — the emotional centerpiece -->
            <div class="-mx-[var(--lr-space-gutter)] lg:-mx-[5vw]">
              <div class="relative bg-dusk/[0.03] px-[var(--lr-space-gutter)] py-10 lg:px-[5vw] lg:py-14">
                <!-- Subtle atmospheric border -->
                <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-ink/8 to-transparent" />
                <div class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-ink/8 to-transparent" />

                <FloorMap
                  :tables="tables"
                  :layout-meta="floorPlanMeta"
                  :selected-table-id="selectedTableId"
                  :hovered-table-id="hoveredTableId"
                  :party-size="partySize"
                  @select="selectTable"
                  @hover="hoverTable"
                  @unhover="unhoverTable"
                />
                <p
                  v-if="layoutLoading || availabilityLoading || loadError"
                  class="mt-5 max-w-md text-[0.95rem] leading-7 text-stone/55"
                  data-reveal
                >
                  {{
                    layoutLoading
                      ? 'Loading the dining room…'
                      : availabilityLoading
                        ? 'Checking which tables are still open…'
                        : loadError
                  }}
                </p>
              </div>
            </div>

            <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                :disabled="!canProceedToGuest"
                class="inline-flex items-center justify-center border border-ink bg-ink px-6 py-4 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:bg-dusk disabled:cursor-not-allowed disabled:opacity-30"
                @click="nextStep"
              >
                Continue
              </button>
              <button
                class="inline-flex items-center px-4 py-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-stone/60 transition-colors hover:text-ink"
                @click="prevStep"
              >
                ← Change date
              </button>
            </div>
          </div>

          <!-- Step: Guest details -->
          <div v-else-if="step === 'guest'" key="guest">
            <div class="lg:grid lg:grid-cols-[5fr_3fr] lg:gap-20">
              <div>
                <div data-reveal>
                  <h2 class="font-display text-[clamp(2.2rem,5vw,4rem)] font-light italic leading-[0.92] tracking-[-0.04em] text-ink">
                    Almost there
                  </h2>
                  <p class="mt-4 max-w-md text-[1rem] leading-7 text-stone/70">
                    A few details so we can welcome you properly.
                  </p>
                </div>
                <div class="mt-10">
                  <GuestForm
                    :guest="guest"
                    :can-confirm="canConfirm"
                    @update:guest="Object.assign(guest, $event)"
                    @next="handleConfirm"
                    @prev="prevStep"
                  />
                  <p
                    v-if="submitError"
                    class="mt-5 max-w-md text-[0.95rem] leading-7 text-toast/70"
                    data-reveal
                  >
                    {{ submitError }}
                  </p>
                </div>
              </div>
              <!-- Editorial summary sidebar -->
              <div class="mt-12 lg:mt-0">
                <div class="border-l-2 border-toast/15 pl-8">
                  <p class="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-toast/50">Your reservation</p>
                  <div class="mt-5 space-y-4 text-[1.05rem]">
                    <p class="font-display italic text-ink/70">{{ date }}</p>
                    <p class="text-stone/70">{{ time }} · {{ partySize }} {{ partySize === 1 ? 'guest' : 'guests' }}</p>
                    <p v-if="selectedTable" class="font-display text-[1.2rem] italic text-ink">
                      Table {{ selectedTable.id }} — {{ selectedTable.label }}
                    </p>
                  </div>
                  <div class="mt-8 max-w-12 text-toast/20">
                    <SignatureStroke />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step: Confirmation -->
          <div v-else-if="step === 'confirm'" key="confirm">
            <BookingSummary
              :summary="bookingSummary"
              :confirmation-id="confirmationId"
              :loading="submitting"
              @reset="handleReset"
            />
          </div>
        </Transition>
      </div>
    </section>

    <!-- ═══ ALTERNATIVE CONTACT — editorial farewell ═══ -->
    <section class="bg-cream">
      <div class="px-[var(--lr-space-gutter)] py-16 md:py-20 lg:px-[5vw]">
        <div class="lg:grid lg:grid-cols-[5fr_4fr] lg:gap-16 lg:items-end" data-reveal>
          <div>
            <p class="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light italic leading-[0.92] tracking-[-0.04em] text-ink/40">
              Prefer the<br />direct route?
            </p>
            <p class="mt-3 text-[1rem] leading-7 text-stone/50">
              Call us, write to us, or send a message. We answer the old way.
            </p>
          </div>
          <div class="mt-8 lg:mt-0 lg:text-right">
            <a
              :href="`tel:${contactDetails.phone}`"
              class="block font-display text-[clamp(1.8rem,4vw,3rem)] font-light italic leading-tight tracking-[-0.03em] text-ink/60 transition-colors hover:text-ink"
            >
              {{ contactDetails.phone }}
            </a>
            <div class="mt-4 flex flex-wrap gap-4 lg:justify-end">
              <BaseButton
                variant="ghost"
                :href="`https://wa.me/${contactDetails.whatsapp}`"
                external
              >
                WhatsApp
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
