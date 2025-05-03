<template>
  <template v-for="filteredCategory in filteredCategories" :key="filteredCategory.id">
    <display-category
      :category="filteredCategory"
      :is-editable="isEditable"
      @remove="
        (editorId) => {
          categories = categories.filter((cat) => cat !== editorId);
        }
      "
    />
  </template>
</template>
<script setup lang="ts">
const categories = defineModel<string[]>({ required: true });
const props = defineProps({
  profileDoc: {
    type: Object as PropType<GSK_PROFILE>,
    required: true,
  },
  isEditable: {
    type: Boolean,
    default: false,
  },
});

import DisplayCategory from 'components/Category/DisplayCategory.vue';

import { type PropType, computed } from 'vue';
import type { GSK_PROFILE } from 'src/services/library/types/profile';

const getCategoryFromId = (id: string) => {
  const category = props.profileDoc?.categories?.find((cat) => cat.id === id);
  return category;
};
const filteredCategories = computed(() => {
  return categories.value
    .map((id) => getCategoryFromId(id))
    .filter((category) => category !== undefined);
});
</script>
