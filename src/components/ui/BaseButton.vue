<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: 'solid',
  },
  external: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
});

const componentTag = computed(() => {
  if (props.to) {
    return RouterLink;
  }

  if (props.href) {
    return 'a';
  }

  return 'button';
});

const variantClass = computed(
  () =>
    ({
      solid:
        'border border-ink bg-ink text-ivory hover:bg-dusk hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(26,20,16,0.2)]',
      ghost:
        'border border-ink/15 bg-transparent text-ink hover:border-ink/30 hover:bg-ink hover:text-ivory hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(26,20,16,0.12)]',
      text:
        'border border-transparent bg-transparent px-0 py-0 text-ink hover:text-stone',
    })[props.variant] ??
    'border border-ink bg-ink text-ivory hover:bg-dusk'
);

const elementBindings = computed(() => {
  if (props.to) {
    return { to: props.to };
  }

  if (props.href) {
    return {
      href: props.href,
      target: props.external ? '_blank' : undefined,
      rel: props.external ? 'noreferrer' : undefined,
    };
  }

  return { type: props.type };
});
</script>

<template>
  <component
    :is="componentTag"
    v-bind="elementBindings"
    class="inline-flex w-fit items-center gap-2 px-5 py-3 transition-all duration-400 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    :class="variantClass"
  >
    <span class="font-body text-[0.68rem] font-medium uppercase tracking-[0.2em]">
      <slot />
    </span>
  </component>
</template>
