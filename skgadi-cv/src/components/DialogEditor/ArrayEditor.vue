<template>
  <div>
    <VueDraggable ref="el" v-model="inArray">
      <div v-for="(item, idx) in inArray" :key="idx">
        <q-separator v-if="idx !== 0" class="q-mb-sm" color="grey-3" style="width: 100%" />
        <div class="row">
          <div class="col">
            {{ item }}
          </div>
          <div class="col-auto">
            <q-btn
              class="q-mr-sm"
              round
              dense
              flat
              icon="edit"
              @click="() => editElement(item, idx)"
            />
            <q-btn
              class="q-mr-sm"
              round
              dense
              flat
              icon="delete"
              @click="() => inArray.splice(idx, 1)"
            />
          </div>
        </div>
      </div>
    </VueDraggable>
    <q-btn
      class="full-width"
      rounded
      dense
      flat
      icon="add"
      @click="addElement"
      label="Add"
      color="primary"
    />
  </div>
  <main-editor
    v-model:showDialog="showDialog"
    v-model:inputModel="editItem"
    @submitted="submitChange"
    @cancelled="cancelChange"
  />
</template>
<script setup lang="ts">
const inArray = defineModel({
  type: Array as PropType<Array<string>>,
  default: () => [],
});

import { VueDraggable } from 'vue-draggable-plus';
import MainEditor from 'src/components/DialogEditor/MainEditor.vue';

import { type PropType, ref } from 'vue';

defineEmits(['submitted', 'cancelled']);

const editItem = ref<string | null>(null);
const editItemIndex = ref<number | null>(null);
const showDialog = ref(false);

const editElement = (item: string, idx: number) => {
  editItem.value = item;
  editItemIndex.value = idx;
  showDialog.value = true;
};

const submitChange = (newValue: string) => {
  if (editItemIndex.value === null) {
    inArray.value.push(newValue);
  } else {
    if (editItemIndex?.value < inArray.value.length) {
      inArray.value[editItemIndex.value] = newValue;
    }
  }
  showDialog.value = false;
};
const cancelChange = () => {
  showDialog.value = false;
};
const addElement = () => {
  editItem.value = '';
  editItemIndex.value = null;
  showDialog.value = true;
};
</script>
