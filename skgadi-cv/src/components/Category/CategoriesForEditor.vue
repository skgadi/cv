<template>
  <template v-if="profileDoc?.categories">
    <div class="row items-center">
      <div class="col text-h6">Categories</div>
      <div class="col-auto">
        <q-btn flat round icon="las la-plus-square">
          <q-menu>
            <template v-for="category in profileDoc.categories" :key="category">
              <q-item clickable @click="addCategory(category.id)" v-close-popup>
                <q-item-section>
                  <display-category :category="category" />
                </q-item-section>
              </q-item>
            </template>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <display-category-from-ids v-model="categories" :profile-doc="profileDoc" :is-editable="true" />
  </template>
</template>
<script setup lang="ts">
const categories = defineModel<string[]>({ required: true });
defineProps({
  profileDoc: {
    type: Object as PropType<GSK_PROFILE>,
    required: true,
  },
});

import DisplayCategory from 'components/Category/DisplayCategory.vue';
import DisplayCategoryFromIds from 'components/Category/DisplayCategoriesFromIds.vue';

import { type PropType } from 'vue';
import type { GSK_PROFILE } from 'src/services/library/types/profile';

const addCategory = (category: string) => {
  if (!categories.value.includes(category)) {
    categories.value.push(category);
  }
};
</script>
