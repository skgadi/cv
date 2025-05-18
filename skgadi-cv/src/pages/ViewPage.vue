<template>
  <event-viewer
    v-if="eventsStore.getAvailableEvent !== null"
    :event="eventsStore.getAvailableEvent"
    :profile-doc="profileDoc"
  />
</template>
<script setup lang="ts">
const props = defineProps({
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
  profileDoc: {
    type: Object as PropType<GSK_PROFILE>,
    required: false,
    default: () => ({}),
  },
  user: {
    type: Object as PropType<User>,
    required: false,
    default: () => ({}),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

import EventViewer from 'components/Event/EventViewer.vue';

import { type PropType, onMounted, watch } from 'vue';
import type { GSK_PROFILE } from 'src/services/library/types/profile';
import { type User } from 'firebase/auth';
import { useEventsStore } from 'src/stores/events-store';
//import type { GSK_EVENT } from 'src/services/library/types/events';
import { useRoute } from 'vue-router';

const eventsStore = useEventsStore();
const route = useRoute();

const getEvent = async () => {
  const eventId = route.params.eventId as string;
  if (!eventId) {
    return;
  }
  if (!props?.profileDoc?.id) {
    return;
  }
  if (eventId) {
    await eventsStore.getEventById(eventId, props.profileDoc.id);
  }
};

onMounted(async () => {
  await getEvent();
});

watch(
  () => [route.params.eventId, props?.profileDoc?.id],
  async () => {
    await getEvent();
  },
);
</script>
