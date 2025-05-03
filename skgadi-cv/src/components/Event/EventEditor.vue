<template>
  <template v-if="isAdmin">
    <q-card-section style="height: 100%">
      <div style="max-width: 500px; margin: auto">
        <q-input
          v-model="event.title"
          label="Title"
          outlined
          rounded
          class="q-mb-md"
          :autofocus="true"
          :clearable="true"
          :rules="[(val) => !!val || 'Title is required']"
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
        <div class="text-h6">Content</div>
      </div>
    </q-card-section>
    <event-viewer-dialog v-model="previewEvent" :event="event" :profile-doc="profileDoc" />
    <q-card-actions>
      <q-btn
        no-caps
        flat
        :label="previewEvent ? 'Hide Preview' : 'Show Preview'"
        :icon="previewEvent ? 'las la-eye-slash' : 'las la-eye'"
        class="full-width"
        @click="previewEvent = !previewEvent"
      />
    </q-card-actions>
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

defineProps({
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

import type { GSK_EVENT } from 'src/services/library/types/events';
import { type PropType, ref } from 'vue';
import type { GSK_PROFILE } from 'src/services/library/types/profile';

const previewEvent = ref(false);
</script>
