<template>
  <q-btn round flat icon="las la-filter">
    <q-menu>
      <q-list style="min-width: 200px" separator>
        <q-item v-if="isAdmin" clickable v-close-popup :to="{ name: 'category' }">
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>Add a new category</q-item-section>
        </q-item>
        <template v-if="categories">
          <template v-for="category in categories" :key="category.id">
            <q-item clickable v-close-popup>
              <display-category :category="category" />
            </q-item>
          </template>
        </template>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script setup lang="ts">
defineProps<{
  categories: GSK_CATEGORY[] | undefined;
  isAdmin: boolean;
}>();

import DisplayCategory from 'components/Category/DisplayCategory.vue';

import { type GSK_CATEGORY } from 'src/services/library/types/profile';
</script>
