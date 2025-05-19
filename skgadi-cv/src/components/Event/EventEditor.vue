<template>
  <template v-if="isAdmin">
    <q-card-section style="height: 100%">
      <div>
        <q-input
          v-model="event.title"
          label="Title"
          outlined
          rounded
          class="q-mb-md"
          :autofocus="true"
          :clearable="true"
        />
        <q-input
          v-model="event.description"
          label="Description"
          outlined
          rounded
          class="q-mb-md"
          :clearable="true"
          type="textarea"
          :rows="3"
        />
        <get-date-time icon="las la-chevron-right" v-model="event.startDate" />
        <div class="row items-center text-center">
          <div class="col">
            <q-btn flat round @click="event.startDate = event.endDate" icon="las la-chevron-up" />
          </div>
          <div class="col">
            <q-btn flat round @click="event.endDate = event.startDate" icon="las la-chevron-down" />
          </div>
        </div>
        <get-date-time icon="las la-chevron-left" v-model="event.endDate" />
        <categories-for-editor v-model="event.categories" :profile-doc="profileDoc" />
        <event-content-editor v-model="event.content" :profile-doc="profileDoc" />
      </div>
    </q-card-section>

    <q-card-actions>
      <div class="row items-center justify-evenly full-width">
        <q-btn
          no-caps
          flat
          :label="previewEvent ? 'Hide Preview' : 'Show Preview'"
          :icon="previewEvent ? 'las la-eye-slash' : 'las la-eye'"
          @click="previewEvent = !previewEvent"
        />
        <q-btn
          no-caps
          flat
          label="Save"
          color="positive"
          icon="las la-save"
          @click="saveEventToDb"
        />
      </div>
    </q-card-actions>
    <event-viewer-dialog v-model="previewEvent" :event="event" :profile-doc="profileDoc" />
  </template>
  <template v-else>
    <q-card-section>
      <div class="text-center">
        <q-icon name="las la-exclamation-triangle" size="5em" color="warning" />
        <br />
        You need to Signin as admin to add new elements
      </div>
    </q-card-section>
  </template>
</template>
<script setup lang="ts">
const event = defineModel<GSK_EVENT>({ required: true });

const props = defineProps({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profileDoc: {
    type: Object as PropType<GSK_PROFILE>,
    required: true,
  },
});

import GetDateTime from 'components/Generic/GetDateTime.vue';
import CategoriesForEditor from 'components/Category/CategoriesForEditor.vue';
import EventViewerDialog from 'components/Event/EventViewerDialog.vue';
import EventContentEditor from 'components/Event/EventContentEditor.vue';

import { copyAndPrepareEvent, type GSK_EVENT } from 'src/services/library/types/events';
import { type PropType, ref } from 'vue';
import type { GSK_PROFILE } from 'src/services/library/types/profile';
import { Notify, uid } from 'quasar';
import { createOrUpdateEvent } from 'src/services/firebase/event-update';
import { useRouter } from 'vue-router';
import { generateNGrams } from 'src/services/generic/utils';

const router = useRouter();

const previewEvent = ref(false);

const saveEventToDb = async () => {
  try {
    const uidOfElement = event.value.id || uid();
    const eventToSave = copyAndPrepareEvent(event.value);
    eventToSave.id = uidOfElement;
    eventToSave.lastUpdated = new Date();
    eventToSave.createdDate = eventToSave.createdDate || new Date(); // set createdDate only if not already set
    const titleNGrams = generateNGrams(eventToSave.title);
    const descriptionNGrams = generateNGrams(eventToSave.description);
    eventToSave.searchableText = [...titleNGrams, ...descriptionNGrams];
    const id = await createOrUpdateEvent(eventToSave, props.profileDoc.id, props.isAdmin);
    await router.push({
      name: 'view',
      params: {
        eventId: id,
      },
    });
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: 'Error saving event. Please try again.',
      icon: 'las la-exclamation-triangle',
    });
    console.error('Error saving event:', error);
  }
};
</script>
