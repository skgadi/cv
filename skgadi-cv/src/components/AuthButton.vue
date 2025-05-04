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
        <q-list>
          <q-item v-if="isAdmin" clickable :to="{ name: 'create' }">
            <q-item-section>New element</q-item-section>
          </q-item>
          <q-item v-if="isAdmin" clickable :to="{ name: 'profile' }">
            <q-item-section>My&nbsp;profile</q-item-section>
          </q-item>
          <q-item clickable @click="logout">
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
defineProps({
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

import { inject, type Ref } from 'vue';

import { type User } from 'firebase/auth'; // Import signIn and signOut
import { login, logout } from 'src/services/firebase/auth'; // Import login and logout functions

const user = inject<Ref<User | null>>('user'); // Inject with proper type

if (!user) {
  throw new Error('User ref not provided. Make sure the boot file is registered.');
}
</script>
