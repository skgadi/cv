<template>
  <div v-if="user">
    <q-btn flat round>
      <template v-if="user.photoURL">
        <q-avatar size="32px">
          <img :src="user.photoURL" />
        </q-avatar>
      </template>
      <template v-else>
        <q-icon name="person" />
      </template>
      <q-menu>
        <q-list style="min-width: 150px">
          <q-item v-if="showEditButton" clickable v-close-popup :to="generateRoute(route, 'edit')">
            <q-item-section>Edit this event</q-item-section>
          </q-item>
          <q-item v-if="isAdmin" clickable v-close-popup :to="generateRoute(route, 'create')">
            <q-item-section>New event</q-item-section>
          </q-item>
          <q-item v-if="isAdmin" clickable v-close-popup :to="generateRoute(route, 'profile')">
            <q-item-section>My&nbsp;profile</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="logout">
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
  <div v-else>
    <q-btn flat round icon="login" @click="login" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

import { computed, inject, type Ref } from 'vue';

import { type User } from 'firebase/auth'; // Import signIn and signOut
import { login, logout } from 'src/services/firebase/auth'; // Import login and logout functions
import { useRoute } from 'vue-router';
import { generateRoute } from 'src/services/route/utils';

const user = inject<Ref<User | null>>('user'); // Inject with proper type
const route = useRoute();

if (!user) {
  throw new Error('User ref not provided. Make sure the boot file is registered.');
}

const showEditButton = computed(() => {
  // Check if the user is viewing an event and if they are the owner
  const eventId = route.params.eventId as string;
  const isAdmin = props.isAdmin;
  return eventId && isAdmin;
});
</script>
