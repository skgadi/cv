<template>
  <div class="q-pa-md">
    <q-input
      v-model="tempQuery"
      label="Search"
      outlined
      rounded
      debounce="300"
      class="q-mb-md"
      :autofocus="true"
      placeholder="Type your query here..."
      :clearable="true"
      @blur="query = tempQuery"
      @keyup.enter="query = tempQuery"
      @keyup.esc="
        tempQuery = '';
        query = '';
      "
    >
      <template #after>
        <category-button :categories="profileDoc?.categories" :is-admin="isAdmin" />
      </template>
      <template #label>Search </template>
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-list bordered separator v-if="queryStore.eventsList.length > 0 && profileDoc">
      <template v-for="event in queryStore.eventsList" :key="event.id">
        <q-item clickable v-ripple :to="{ name: 'view', params: { eventId: event.id } }">
          <q-item-section>
            <q-item-label>{{ event.title }}</q-item-label>
            <q-item-label caption>{{ event.description }}</q-item-label>
            <q-item-label>
              <display-category-from-ids v-model="event.categories" :profile-doc="profileDoc" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  profileDoc: GSK_PROFILE | null;
  isAdmin: boolean;
}>();

import { type GSK_PROFILE } from 'src/services/library/types/profile';

import CategoryButton from 'components/Category/CategoryButton.vue';
import { onMounted, ref, watch } from 'vue';
//import { useRoute } from 'vue-router';
import { useQueryStore } from 'src/stores/query-store';
import DisplayCategoryFromIds from 'components/Category/DisplayCategoriesFromIds.vue';

const tempQuery = ref('');
const query = ref('');
//const route = useRoute();
const queryStore = useQueryStore();

onMounted(() => {
  queryStore.setProfileId(props.profileDoc?.id || '');
  void queryStore.refreshQuery();
});

watch(
  () => [query.value, props.profileDoc?.id],

  () => {
    queryStore.setLastVisible(null);
    queryStore.setQueryText(query.value);
    queryStore.setProfileId(props.profileDoc?.id || '');
    void queryStore.refreshQuery();
  },
);
</script>
