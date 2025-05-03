<template>
  <q-chip :removable="isEditable" @remove="$emit('remove', category.id)">
    <q-avatar
      :style="`background-color: ${category.bgColor}; color: ${category.fgColor}`"
      class="cursor-pointer"
      @mouseover="hoveringAvatar = true"
      @mouseleave="hoveringAvatar = false"
      @click="copyText(category.name)"
    >
      <q-icon :name="hoveringAvatar ? 'las la-clipboard' : category.icon" size="xs" />
    </q-avatar>
    {{ category.name }}
    <q-tooltip anchor="bottom start" self="top left">
      {{ category.desc }}
    </q-tooltip>
  </q-chip>
</template>
<script setup lang="ts">
defineProps({
  category: {
    type: Object as PropType<GSK_CATEGORY>,
    required: true,
  },
  isEditable: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['remove']);

import { type GSK_CATEGORY } from 'src/services/library/types/profile';
import { type PropType, ref } from 'vue';
import { copyText } from 'src/services/generic/utils';

const hoveringAvatar = ref(false);
</script>
