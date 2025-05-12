<template>
  <q-card-section>
    <event-editor v-if="profileDoc" v-model="event" :is-admin="isAdmin" :profile-doc="profileDoc" />
  </q-card-section>
</template>
<script setup lang="ts">
defineProps({
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

import type { GSK_PROFILE } from 'src/services/library/types/profile';
import { type User } from 'firebase/auth';

import type { GSK_EVENT } from 'src/services/library/types/events';
import { ref, type Ref, type PropType } from 'vue';
import moment from 'moment';

const event: Ref<GSK_EVENT> = ref({
  id: '',
  title: '',
  description: '',
  categories: [],
  content: [],
  isFeatured: false,
  isPublic: true,
  priority: 0,
  endDate: new Date(moment().valueOf()),
  startDate: new Date(moment().valueOf()),
  createdDate: new Date(moment().valueOf()),
  lastUpdated: new Date(moment().valueOf()),
});
</script>
