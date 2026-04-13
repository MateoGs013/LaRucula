<script setup>
import MenuIcon from '@/components/svg/MenuIcon.vue';

defineProps({
  notes: { type: Array, required: true },
});

const noteIcon = {
  warning: 'unavailable',
  extras: 'star',
  dietary: 'vegetarian',
  allergy: 'flame',
  general: 'star',
  schedule: 'clock',
};
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="note in notes"
      :key="`${note.type}-${note.text}`"
      class="flex items-start gap-2.5 rounded-xl px-3.5 py-2.5"
      :class="
        note.type === 'warning'
          ? 'bg-toast/8 border border-toast/15'
          : 'bg-stone/[0.05] border border-stone/8'
      "
    >
      <div
        class="mt-0.5 flex-shrink-0"
        :class="note.type === 'warning' ? 'text-toast/70' : 'text-stone/50'"
      >
        <MenuIcon :name="noteIcon[note.type] || 'star'" :size="14" />
      </div>
      <p
        class="text-[0.82rem] leading-relaxed"
        :class="
          note.type === 'warning'
            ? 'text-ink/80 font-medium'
            : 'text-stone/78'
        "
      >
        {{ note.text }}
      </p>
    </div>
  </div>
</template>
