<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Suresh Kumar Gadi's CV </q-toolbar-title>
        <div><auth-button :is-admin="isAdmin" /></div>
      </q-toolbar>
      <UpdateRibbon ref="updateRibbon" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="400">
      <drawer-main :profile-doc="profileDoc" :is-admin="isAdmin" />
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md">
        <q-card>
          <router-view
            :is-logged-in="isLoggedIn"
            :profile-doc="profileDoc"
            :user="user"
            :is-admin="isAdmin"
          />
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import UpdateRibbon from 'components/Generic/UpdateRibbon.vue';
import DrawerMain from 'components/Drawer/DrawerMain.vue';

import { type User } from 'firebase/auth'; // Import signIn and signOut
import { computed, ref, inject, type Ref, onMounted } from 'vue';
import AuthButton from 'components/AuthButton.vue';
import { getProfileDocumentSnapshot } from 'src/services/firebase/profile-document';
import { onSnapshot, type Unsubscribe } from 'firebase/firestore';
import type { GSK_PROFILE } from 'src/services/library/types/profile';

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

const GSK_UID = 'AArSiXuAWEWjDqpHqEWohgoW64A3';

const loadProfileWithUid = (uid: string) => {
  //console.log('Loading profile with UID:', uid);
  const dbQ = getProfileDocumentSnapshot(uid, false);
  if (!dbQ) {
    console.log('No query snapshot found');
    return;
  }
  snapshotUnSubscription.value = onSnapshot(dbQ, (profileDocumentSnapshot) => {
    //console.log('Profile document snapshot:', profileDocumentSnapshot.docs?.[0]);
    profileDoc.value = (profileDocumentSnapshot.docs?.[0]?.data() as GSK_PROFILE) || null;
  });
};

onMounted(() => {
  loadProfileWithUid(GSK_UID);
});

/*
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
      loadProfileWithUid(user.value.uid);
    } else {
      loadProfileWithUid(GSK_UID);
    }
  },
  { immediate: true },
);*/

const isAdmin = computed(() => {
  return (user.value || {})?.uid === GSK_UID;
});
</script>
