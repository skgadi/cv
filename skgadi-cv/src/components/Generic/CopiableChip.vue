<template>
  <q-chip>
    <q-avatar
      class="cursor-pointer"
      :color="color"
      :text-color="textColor"
      @click="copyText(textToCopy)"
      @mouseover="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <q-icon :name="isHovering ? 'las la-clipboard' : icon" size="1.2em" />
      <q-tooltip>Copy</q-tooltip>
    </q-avatar>
    <span>{{ label }}</span>
  </q-chip>
</template>
<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'las la-calendar',
  },
  copyIcon: {
    type: String,
    default: 'las la-clipboard',
  },
  textToCopy: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'primary',
  },
  textColor: {
    type: String,
    default: 'white',
  },
});

import { ref } from 'vue';
import { copyText } from 'src/services/generic/utils';

const isHovering = ref(false);
</script>
