<template>
  <q-card-section>
    <div class="text-h6">My Profile</div>
    <div class="q-mt-md">
      <p v-if="isLoggedIn">Welcome, {{ userName }}!</p>
      <p v-else>Please log in to view your profile.</p>
    </div>
  </q-card-section>

  <q-separator />

  <q-card-section v-if="isLoggedIn">
    <template v-if="profileDoc">
      <q-markup-table flat bordered>
        <tbody>
          <tr>
            <td>Full name</td>
            <td>{{ profileDoc.name }}</td>
            <td class="text-right">
              <q-btn
                flat
                round
                icon="edit"
                size="md"
                dense
                @click="editElement(profileDoc.name, 'name')"
              />
            </td>
          </tr>
          <tr>
            <td>Date of birth</td>
            <td>{{ profileDoc.date_of_birth }}</td>
            <td class="text-right">
              <q-btn
                flat
                round
                icon="edit"
                size="md"
                dense
                @click="editElement(profileDoc.date_of_birth, 'date_of_birth')"
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <list-array :in-array="profileDoc?.emails || []" />
            </td>
            <td class="text-right">
              <q-btn
                flat
                round
                icon="edit"
                size="md"
                dense
                @click="editElement(profileDoc.emails, 'emails')"
              />
            </td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{{ profileDoc?.phones?.join('; ') }}</td>
            <td class="text-right">
              <q-btn
                flat
                round
                icon="edit"
                size="md"
                dense
                @click="editElement(profileDoc.phones, 'phones')"
              />
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{{ profileDoc?.addresses?.join('; ') }}</td>
            <td class="text-right">
              <q-btn
                flat
                round
                icon="edit"
                size="md"
                dense
                @click="editElement(profileDoc.addresses, 'addresses')"
              />
            </td>
          </tr>
          <tr>
            <td>Nationality</td>
            <td>{{ profileDoc?.nationalities?.join('; ') }}</td>
            <td class="text-right">
              <q-btn
                flat
                round
                icon="edit"
                size="md"
                dense
                @click="editElement(profileDoc.nationalities, 'nationalities')"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </template>
    <template v-else>
      <p>No profile data available.</p>
      <q-btn
        outline
        rounded
        no-caps
        color="positive"
        label="Create your new profile"
        icon="add"
        @click="createANewProfile"
      />
    </template>
  </q-card-section>

  <q-separator />

  <q-card-actions>
    <q-btn v-if="isLoggedIn" flat label="Logout" color="negative" @click="logout" />
    <q-btn v-if="!isLoggedIn" flat label="Login" color="primary" @click="login" />
  </q-card-actions>
  <main-editor
    v-model:showDialog="showDialog"
    v-model:inputModel="elementToEditValue"
    :is-logged-in="isLoggedIn"
    @submitted="submitChange"
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

import ListArray from 'src/components/Generic/ListArray.vue';
import MainEditor from 'src/components/DialogEditor/MainEditor.vue';

import { ref, computed, type PropType } from 'vue';
import { type User } from 'firebase/auth';
import { login, logout } from 'src/services/firebase/auth'; // Import login and logout functions
import type { GSK_PROFILE } from 'src/services/library/types/profile';
import { setProfileDocument } from 'src/services/firebase/profile-document';

const userName = computed(() => {
  if (props.isLoggedIn && props.user) {
    return props.user.displayName || 'User';
  }
  return '';
});

const elementToEditValue = ref<string | number | Array<string> | null>(null);
const elementToEditName = ref<keyof GSK_PROFILE | null>(null);
const showDialog = ref(false);

const editElement = (element: string | number | Array<string>, elementId: keyof GSK_PROFILE) => {
  elementToEditName.value = elementId;
  if (Array.isArray(element)) {
    elementToEditValue.value = [...element]; // Create a copy of the array
  } else {
    elementToEditValue.value = element;
  }
  showDialog.value = true;
};

const submitChange = async () => {
  // Prepare the profile data by updating the specific field
  const updatedProfile: GSK_PROFILE = { ...props.profileDoc };
  if (elementToEditName.value && elementToEditValue.value) {
    if (Array.isArray(updatedProfile[elementToEditName.value])) {
      (updatedProfile[elementToEditName.value] as Array<string>) = [
        ...(elementToEditValue.value as Array<string>),
      ];
    } else {
      (updatedProfile[elementToEditName.value] as string) = elementToEditValue.value as string;
    }
  }
  await setProfileDocument(props.user.uid, updatedProfile);
};

const newProfile: GSK_PROFILE = {
  name: '',
  emails: [],
  phones: [],
  addresses: [],
  affiliations: [],
  date_of_birth: 'x',
  nationalities: [],
  uid: '',
};

const createANewProfile = async () => {
  // Create a new profile document with default values
  const newProfileToCreate: GSK_PROFILE = {
    ...newProfile,
    uid: props.user.uid,
    name: props.user.displayName || '',
  };

  await setProfileDocument(props.user.uid, newProfileToCreate);
};
</script>
