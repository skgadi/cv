<template>
  <div class="q-pa-md">
    <q-input
      v-model="query"
      label="Search"
      outlined
      rounded
      debounce="300"
      class="q-mb-md"
      :autofocus="true"
      placeholder="Type your query here..."
      :clearable="true"
    >
      <template #after>
        <category-button :categories="profileDoc?.categories" :is-admin="isAdmin" />
      </template>
      <template #label>Search </template>
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  profileDoc: GSK_PROFILE | null;
  isAdmin: boolean;
}>();

import { type GSK_PROFILE } from 'src/services/library/types/profile';

import CategoryButton from 'components/Category/CategoryButton.vue';

import { ref } from 'vue';
const query = ref('');
</script>
