<template>
  <q-input
    v-model="stringToEdit"
    :type="typeof stringToEdit === 'string' ? 'text' : 'number'"
    outlined
    rounded
    autofocus
    @keyup.enter="handleEnter"
    @keyup.esc="handleEsc"
  />
</template>
<script setup lang="ts">
const stringToEdit = defineModel('stringToEdit', {
  type: [String, Number] as unknown as PropType<string | number>,
  default: '',
});

const emit = defineEmits(['submitted', 'cancelled']);

import type { PropType } from 'vue';

const handleEsc = (event: KeyboardEvent) => {
  emit('cancelled'); // Emit the event
  event.stopPropagation(); // Stop the event from bubbling up
};

const handleEnter = (event: KeyboardEvent) => {
  emit('submitted'); // Emit the event
  // If you want to stop propagation for Enter too, uncomment the line below
  event.stopPropagation();
};
</script>
