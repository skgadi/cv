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
import { inject, type Ref } from 'vue';

import { type Auth, signInWithPopup, GoogleAuthProvider, type User } from 'firebase/auth'; // Import signIn and signOut

const auth = inject<Auth>('auth'); // Use the Auth type directly
const user = inject<Ref<User | null>>('user'); // Inject with proper type

if (!user) {
  throw new Error('User ref not provided. Make sure the boot file is registered.');
}

const login = async (): Promise<void> => {
  if (!auth) return; // Safety check
  try {
    const provider = new GoogleAuthProvider(); // Create a Google provider
    const result = await signInWithPopup(auth, provider); // Perform sign-in
    console.log('Logged in:', result.user);
    // The user ref should update automatically via onAuthStateChanged
  } catch (error) {
    console.error('Login error:', error);
    // Handle error (e.g., show a Quasar notification)
    // Example: import { Notify } from 'quasar'; Notify.create('Login failed: ' + error.message);
  }
};

const logout = async (): Promise<void> => {
  if (!auth) return; // Safety check
  try {
    await auth.signOut(); // Perform sign-out
    console.log('Logged out');
  } catch (error) {
    console.error('Logout error:', error);
    // Handle error (e.g., show a Quasar notification)
    // Example: import { Notify } from 'quasar'; Notify.create('Logout failed: ' + error.message);
  }
};
</script>
