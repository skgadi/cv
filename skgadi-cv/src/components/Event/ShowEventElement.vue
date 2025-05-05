<template>
  <q-expansion-item
    dense
    expand-separator
    :icon="inEvent.icon"
    :caption="inEvent.description"
    :label="inEvent.title"
    :default-opened="defaultOpen"
    header-class="drag-handle"
     style="border-radius: 20px"
      class="shadow-1 overflow-hidden"
  >
  <viewer-index :in-event="inEvent" />
  </q-expansion-item>
</template>
<script setup lang="ts">
defineProps({
  inEvent: {
    type: Object as PropType<GSK_EVENT_CONTENT>,
    required: true,
  },
  defaultOpen: {
    type: Boolean,
    default: true,
  },
});

import { type PropType } from 'vue';
import type { GSK_EVENT_CONTENT } from 'src/services/library/types/events';
import ViewerIndex from 'components/Event/Viewers/ViewerIndex.vue';
</script>
