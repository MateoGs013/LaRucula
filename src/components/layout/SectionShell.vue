<script setup>
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps({
  as: {
    type: String,
    default: 'section',
  },
  shell: {
    type: String,
    default: 'default',
  },
  tone: {
    type: String,
    default: 'default',
  },
  padded: {
    type: Boolean,
    default: true,
  },
});

const shellClass = computed(() =>
  props.shell === 'wide' ? 'shell-wide' : props.shell === 'none' ? '' : 'shell'
);

const toneClass = computed(
  () =>
    ({
      default: '',
      cream: 'bg-cream',
      sand: 'bg-sand/50',
      sage: 'bg-sage/10',
      dusk: 'bg-dusk text-ivory',
      ink: 'bg-ink text-ivory',
    })[props.tone] ?? ''
);
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    :class="[toneClass, props.padded && 'section-space']"
  >
    <div :class="shellClass">
      <slot />
    </div>
  </component>
</template>
