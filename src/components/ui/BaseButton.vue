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
        'border border-toast bg-toast text-ivory hover:-translate-y-0.5 hover:bg-toast/92',
      ghost:
        'border border-ink/12 bg-transparent text-ink hover:-translate-y-0.5 hover:bg-ivory/80',
      text:
        'border border-transparent bg-transparent px-0 text-ink hover:text-toast',
    })[props.variant] ??
    'border border-toast bg-toast text-ivory hover:-translate-y-0.5 hover:bg-toast/92'
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
    class="inline-flex w-fit items-center gap-3 px-5 py-3 transition duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-toast"
    :class="variantClass"
  >
    <span class="font-body text-[0.72rem] font-medium uppercase tracking-[0.28em]">
      <slot />
    </span>
    <span aria-hidden="true" class="text-sm">
      →
    </span>
  </component>
</template>
