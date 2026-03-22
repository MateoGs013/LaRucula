<script setup>
/**
 * Guest details form — name, email, phone, notes.
 * Step 3 of the reservation flow.
 */
import { useSiteContentValue } from '@/composables/useSiteContent';

const props = defineProps({
  guest: { type: Object, required: true },
  canConfirm: { type: Boolean, default: false },
});

const emit = defineEmits(['update:guest', 'next', 'prev']);
const nameLabel = useSiteContentValue('reservations.guest.name_label', 'Name *');
const namePlaceholder = useSiteContentValue('reservations.guest.name_placeholder', 'Your name');
const phoneLabel = useSiteContentValue('reservations.guest.phone_label', 'Phone *');
const phonePlaceholder = useSiteContentValue('reservations.guest.phone_placeholder', '+34 000 000 000');
const emailLabel = useSiteContentValue('reservations.guest.email_label', 'Email');
const emailPlaceholder = useSiteContentValue('reservations.guest.email_placeholder', 'your@email.com');
const notesLabel = useSiteContentValue('reservations.guest.notes_label', 'Special requests');
const notesPlaceholder = useSiteContentValue('reservations.guest.notes_placeholder', 'Allergies, celebrations, preferences…');
const confirmLabel = useSiteContentValue('reservations.guest.submit', 'Confirm reservation');
const backLabel = useSiteContentValue('reservations.guest.back', '← Back');

function update(field, value) {
  emit('update:guest', { ...props.guest, [field]: value });
}
</script>

<template>
  <div class="guest-form">
    <div class="space-y-6">
      <!-- Name -->
      <div>
        <label for="guest-name" class="eyebrow mb-2 block text-[0.75rem]">{{ nameLabel }}</label>
        <input
          id="guest-name"
          type="text"
          :value="guest.name"
          :placeholder="namePlaceholder"
          autocomplete="name"
          class="w-full border-b border-ink/15 bg-transparent py-3 font-display text-[1.1rem] italic text-ink outline-none transition-colors placeholder:text-stone/25 focus:border-toast/50"
          @input="update('name', $event.target.value)"
        />
      </div>

      <!-- Phone -->
      <div>
        <label for="guest-phone" class="eyebrow mb-2 block text-[0.75rem]">{{ phoneLabel }}</label>
        <input
          id="guest-phone"
          type="tel"
          :value="guest.phone"
          :placeholder="phonePlaceholder"
          autocomplete="tel"
          class="w-full border-b border-ink/15 bg-transparent py-3 font-display text-[1.1rem] italic text-ink outline-none transition-colors placeholder:text-stone/25 focus:border-toast/50"
          @input="update('phone', $event.target.value)"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="guest-email" class="eyebrow mb-2 block text-[0.75rem]">{{ emailLabel }}</label>
        <input
          id="guest-email"
          type="email"
          :value="guest.email"
          :placeholder="emailPlaceholder"
          autocomplete="email"
          class="w-full border-b border-ink/15 bg-transparent py-3 font-display text-[1.1rem] italic text-ink outline-none transition-colors placeholder:text-stone/25 focus:border-toast/50"
          @input="update('email', $event.target.value)"
        />
      </div>

      <!-- Notes -->
      <div>
        <label for="guest-notes" class="eyebrow mb-2 block text-[0.75rem]">{{ notesLabel }}</label>
        <textarea
          id="guest-notes"
          :value="guest.notes"
          :placeholder="notesPlaceholder"
          rows="3"
          class="w-full resize-none border-b border-ink/15 bg-transparent py-3 text-[1rem] leading-7 text-ink outline-none transition-colors placeholder:text-stone/25 focus:border-toast/50"
          @input="update('notes', $event.target.value)"
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <button
        :disabled="!canConfirm"
        class="inline-flex items-center justify-center border border-ink bg-ink px-6 py-4 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:bg-dusk disabled:cursor-not-allowed disabled:opacity-30"
        @click="emit('next')"
      >
        {{ confirmLabel }}
      </button>
      <button
        class="inline-flex items-center justify-center px-4 py-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-stone/60 transition-colors hover:text-ink"
        @click="emit('prev')"
      >
        {{ backLabel }}
      </button>
    </div>
  </div>
</template>
