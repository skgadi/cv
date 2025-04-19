<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Suresh Kumar Gadi's CV </q-toolbar-title>
        <div><auth-button /></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="400">
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :is-logged-in="isLoggedIn" :profile-doc="profileDoc" :user="user" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { type User } from 'firebase/auth'; // Import signIn and signOut
import { computed, ref, inject, type Ref, watch } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import AuthButton from 'components/AuthButton.vue';
import { getProfileDocumentSnapshot } from 'src/services/firebase/profile-document';
import { onSnapshot, type Unsubscribe } from 'firebase/firestore';
import type { GSK_PROFILE } from 'src/services/library/types/profile';

const linksList: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const user = inject<Ref<User | null>>('user'); // Inject with proper type
if (!user) {
  throw new Error('User ref not provided. Make sure the boot file is registered.');
}
const isLoggedIn = computed(() => {
  return user.value !== null;
});

const snapshotUnSubscription = ref<Unsubscribe | null>(null);
const profileDoc = ref<GSK_PROFILE | null>(null);

watch(
  () => user.value,
  () => {
    // remove previous subscription
    if (snapshotUnSubscription.value) {
      snapshotUnSubscription.value();
      snapshotUnSubscription.value = null;
    }
    profileDoc.value = null;

    if (user.value) {
      const dbQ = getProfileDocumentSnapshot(user.value.uid);
      if (!dbQ) {
        console.log('No query snapshot found');
        return;
      }
      snapshotUnSubscription.value = onSnapshot(dbQ, (profileDocumentSnapshot) => {
        console.log('Profile document snapshot:', profileDocumentSnapshot);
        profileDoc.value = (profileDocumentSnapshot.docs?.[0]?.data() as GSK_PROFILE) || null;
      });
    }
  },
  { immediate: true },
);
</script>
