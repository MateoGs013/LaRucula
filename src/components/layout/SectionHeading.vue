<script setup>
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  lede: {
    type: String,
    default: '',
  },
  align: {
    type: String,
    default: 'left',
  },
  size: {
    type: String,
    default: 'section',
  },
  headingTag: {
    type: String,
    default: 'h2',
  },
});

const alignmentClass = computed(() =>
  props.align === 'center'
    ? 'mx-auto items-center text-center'
    : 'items-start text-left'
);

const sizeClass = computed(
  () =>
    ({
      hero: 'max-w-[13ch] text-[clamp(3.5rem,9vw,7.2rem)]',
      section: 'max-w-[14ch] text-[clamp(2.3rem,5vw,4.6rem)]',
      compact: 'max-w-[16ch] text-[clamp(1.9rem,4vw,3rem)]',
    })[props.size] ?? 'max-w-[14ch] text-[clamp(2.3rem,5vw,4.6rem)]'
);
</script>

<template>
  <header
    v-bind="$attrs"
    class="flex flex-col gap-5"
    :class="alignmentClass"
  >
    <p v-if="eyebrow" class="eyebrow">
      {{ eyebrow }}
    </p>

    <div class="w-full max-w-[50rem]">
      <component
        :is="headingTag"
        class="balance font-display leading-[0.96] tracking-[-0.05em] text-current"
        :class="sizeClass"
      >
        {{ title }}
      </component>

      <div v-if="$slots.accent" class="mt-4 max-w-[13rem] text-toast/70">
        <slot name="accent" />
      </div>
    </div>

    <p
      v-if="lede"
      class="pretty max-w-copy text-base leading-7 text-stone md:text-lg md:leading-8"
    >
      {{ lede }}
    </p>

    <slot />
  </header>
</template>
