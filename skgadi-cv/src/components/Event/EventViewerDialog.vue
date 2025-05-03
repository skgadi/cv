<template>
  <q-dialog v-model="showDialog" position="right" full-height>
    <q-card style="min-width: 500px">
      <q-bar>
        <div>Preview</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <event-viewer :event="event" :profile-doc="profileDoc" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const showDialog = defineModel<boolean>({ required: true });

defineProps({
  profileDoc: {
    type: Object as PropType<GSK_PROFILE>,
    required: true,
  },
  event: {
    type: Object as PropType<GSK_EVENT>,
    required: true,
  },
});

import EventViewer from 'components/Event/EventViewer.vue';
import { type PropType } from 'vue';
import type { GSK_EVENT } from 'src/services/library/types/events';
import type { GSK_PROFILE } from 'src/services/library/types/profile';
</script>
