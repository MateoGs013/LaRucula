<script setup>
import { ref } from 'vue';

import { getErrorMessage } from '@/api/errors';
import SignatureStroke from '@/components/svg/SignatureStroke.vue';
import { useSiteContentValue } from '@/composables/useSiteContent';
import { submitContact } from '@/services/contactService';

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
});

const submitted = ref(false);
const submitting = ref(false);
const errorMessage = ref('');
const nameLabel = useSiteContentValue('contact.form.name_label', 'Name *');
const namePlaceholder = useSiteContentValue('contact.form.name_placeholder', 'Your name');
const emailLabel = useSiteContentValue('contact.form.email_label', 'Email *');
const emailPlaceholder = useSiteContentValue('contact.form.email_placeholder', 'your@email.com');
const phoneLabel = useSiteContentValue('contact.form.phone_label', 'Phone');
const phonePlaceholder = useSiteContentValue('contact.form.phone_placeholder', '+34 000 000 000');
const subjectLabel = useSiteContentValue('contact.form.service_label', 'Subject');
const subjectPlaceholder = useSiteContentValue('contact.form.service_placeholder', 'Reservation, event, or general inquiry');
const messageLabel = useSiteContentValue('contact.form.message_label', 'Message *');
const messagePlaceholder = useSiteContentValue('contact.form.message_placeholder', 'Tell us how we can help…');
const submitLabel = useSiteContentValue('contact.form.submit', 'Send message');
const submittingLabel = useSiteContentValue('contact.form.submitting', 'Sending…');
const successMessage = useSiteContentValue('contact.form.success', "Thank you. We'll get back to you within 24 hours.");

async function handleSubmit() {
  submitting.value = true;
  errorMessage.value = '';

  try {
    await submitContact(form.value);
    submitted.value = true;
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Unable to send the message right now.');
  } finally {
    submitting.value = false;
  }
}

function resetForm() {
  form.value = { name: '', email: '', phone: '', subject: '', message: '' };
  submitted.value = false;
  errorMessage.value = '';
}
</script>

<template>
  <div class="contact-form">
    <!-- Success state -->
    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0 translate-y-4"
    >
      <div v-if="submitted" class="text-center lg:text-left">
        <p class="eyebrow text-sage/70!">Sent</p>
        <h3 class="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ink">
          Message received
        </h3>
        <p class="mt-3 text-[1rem] leading-7 text-stone/60">
          {{ successMessage }}
        </p>
        <div class="mt-6 max-w-16 text-sage/30">
          <SignatureStroke />
        </div>
        <button
          class="mt-6 text-[0.8rem] uppercase tracking-[0.18em] text-stone/50 transition-colors hover:text-ink"
          @click="resetForm"
        >
          Send another message
        </button>
      </div>
    </Transition>

    <!-- Form -->
    <form v-if="!submitted" @submit.prevent="handleSubmit" class="space-y-6">
      <p
        v-if="errorMessage"
        class="border-l-2 border-toast/30 pl-4 text-[0.95rem] leading-7 text-toast/80"
      >
        {{ errorMessage }}
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <label for="contact-name" class="eyebrow mb-2 block text-[0.75rem]">{{ nameLabel }}</label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            required
            autocomplete="name"
            class="w-full border-b border-ink/15 bg-transparent py-3 font-display text-[1.1rem] italic text-ink outline-none transition-colors placeholder:text-stone/25 focus:border-toast/50"
            :placeholder="namePlaceholder"
          />
        </div>
        <div>
          <label for="contact-email" class="eyebrow mb-2 block text-[0.75rem]">{{ emailLabel }}</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            class="w-full border-b border-ink/15 bg-transparent py-3 font-display text-[1.1rem] italic text-ink outline-none transition-colors placeholder:text-stone/25 focus:border-toast/50"
            :placeholder="emailPlaceholder"
          />
        </div>
      </div>
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <label for="contact-phone" class="eyebrow mb-2 block text-[0.75rem]">{{ phoneLabel }}</label>
          <input
            id="contact-phone"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            class="w-full border-b border-ink/15 bg-transparent py-3 font-display text-[1.1rem] italic text-ink outline-none transition-colors placeholder:text-stone/25 focus:border-toast/50"
            :placeholder="phonePlaceholder"
          />
        </div>
        <div>
          <label for="contact-subject" class="eyebrow mb-2 block text-[0.75rem]">{{ subjectLabel }}</label>
          <input
            id="contact-subject"
            v-model="form.subject"
            type="text"
            class="w-full border-b border-ink/15 bg-transparent py-3 font-display text-[1.1rem] italic text-ink outline-none transition-colors placeholder:text-stone/25 focus:border-toast/50"
            :placeholder="subjectPlaceholder"
          />
        </div>
      </div>
      <div>
        <label for="contact-message" class="eyebrow mb-2 block text-[0.75rem]">{{ messageLabel }}</label>
        <textarea
          id="contact-message"
          v-model="form.message"
          required
          rows="4"
          class="w-full resize-none border-b border-ink/15 bg-transparent py-3 text-[1rem] leading-7 text-ink outline-none transition-colors placeholder:text-stone/25 focus:border-toast/50"
          :placeholder="messagePlaceholder"
        />
      </div>
      <div class="pt-2">
        <button
          type="submit"
          :disabled="submitting"
          class="inline-flex items-center border border-ink bg-ink px-6 py-4 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:bg-dusk disabled:opacity-50"
        >
          {{ submitting ? submittingLabel : submitLabel }}
        </button>
      </div>
    </form>
  </div>
</template>
