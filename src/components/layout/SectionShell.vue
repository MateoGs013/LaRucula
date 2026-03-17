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
  props.shell === 'wide' ? 'shell-wide' : 'shell'
);

const toneClass = computed(
  () =>
    ({
      default: '',
      mist: 'bg-ivory/48',
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
