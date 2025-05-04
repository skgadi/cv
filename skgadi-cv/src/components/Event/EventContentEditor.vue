<template>
  <div class="row items-center">
    <div class="col text-h6">Content</div>
    <div class="col-auto">
      <q-btn flat round icon="mdi-table-row-plus-after" @click="addContent(true)" />
      <q-btn flat round icon="mdi-table-row-plus-before" @click="addContent(false)" />
    </div>
  </div>
  <vue-draggable
    v-model="allEvents"
    :list="allEvents"
    :group="{ name: 'events', pull: 'clone', put: false }"
    :animation="200"
    :handle="'.drag-handle'"
  >
    <div v-for="(item, idx) in allEvents" :key="idx">
      <div class="row items-top">
        <div class="col-auto drag-handle">
          <q-icon class="q-mr-sm" name="mdi-drag" style="cursor: move" />
        </div>
        <div class="col">
          <edit-event-element
            v-if="editItem?.id === item.id"
            v-model="editItem"
            @save="saveItem"
            @cancel="cancelEdit"
          />
          <show-event-element v-else :in-event="item" />
        </div>
        <div class="col-auto" v-if="editItem?.id !== item.id">
          <q-btn
            class="q-mx-sm"
            round
            dense
            flat
            icon="edit"
            @click="editItem = JSON.parse(JSON.stringify(item))"
          />
          <q-btn
            class="q-mr-sm"
            round
            dense
            flat
            icon="delete"
            @click="() => allEvents.splice(idx, 1)"
          />
        </div>
      </div>
    </div>
  </vue-draggable>
</template>
<script setup lang="ts">
const allEvents = defineModel<GSK_EVENT_CONTENT[]>({
  required: true,
});

defineProps({
  profileDoc: {
    type: Object as PropType<GSK_PROFILE>,
    required: true,
  },
});

import { VueDraggable } from 'vue-draggable-plus';
import ShowEventElement from 'src/components/Event/ShowEventElement.vue';
import EditEventElement from 'src/components/Event/EditEventElement.vue';

import { type PropType, ref } from 'vue';
import type { GSK_PROFILE } from 'src/services/library/types/profile';
import type { GSK_EVENT_CONTENT } from 'src/services/library/types/events';
import { uid } from 'quasar';

const addContent = (isBottom: boolean) => {
  const elementToAdd: GSK_EVENT_CONTENT = {
    type: 'markdown',
    content: '',
    description: '',
    id: uid(),
    title: '',
  };
  if (isBottom) {
    allEvents.value.push(elementToAdd);
  } else {
    allEvents.value.unshift(elementToAdd);
  }
};

const editItem = ref<GSK_EVENT_CONTENT | null>(null);
const saveItem = () => {
  const item = JSON.parse(JSON.stringify(editItem.value));
  const index = allEvents.value.findIndex((i) => i.id === item.id);
  if (index !== -1) {
    allEvents.value[index] = item;
  }
  console.log('saveItem', editItem.value);
  editItem.value = null;
};

const cancelEdit = () => {
  editItem.value = null;
};
</script>
