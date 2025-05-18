<template>
  <q-card-section>
    <event-editor
      v-if="profileDoc && event"
      v-model="event"
      :is-admin="isAdmin"
      :profile-doc="profileDoc"
    />
    <div v-else class="q-pa-md flex flex-center">
      {{ eventsStore.getAvailableEvent }}
      <q-spinner-facebook color="primary" size="2em" />
    </div>
  </q-card-section>
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

import EventEditor from 'components/Event/EventEditor.vue';

import { onMounted, ref, watch, type PropType } from 'vue';
import type { GSK_PROFILE } from 'src/services/library/types/profile';
import { type User } from 'firebase/auth';
import { useEventsStore } from 'src/stores/events-store';
import type { GSK_EVENT } from 'src/services/library/types/events';
import { useRoute } from 'vue-router';

const eventsStore = useEventsStore();
const route = useRoute();

const event = ref<GSK_EVENT | null>(null);

const updateEvent = () => {
  const inEvent = eventsStore.availableEvent;
  if (!inEvent) {
    return;
  }
  if (inEvent.id === route.params.eventId) {
    event.value = inEvent;
  }
};

watch(
  () => eventsStore.availableEvent,
  () => {
    updateEvent();
  },
);

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
  updateEvent();
});

watch(
  () => [route.params.eventId, props?.profileDoc?.id],
  async () => {
    await getEvent();
    updateEvent();
  },
);
</script>
