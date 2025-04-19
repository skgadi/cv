<template>
  <q-dialog v-model="showDialog">
    <q-card>
      <q-card-section style="min-width: 300px">
        <template v-if="typeof inputModel === 'string' || typeof inputModel === 'number'">
          <string-editor v-model="inputModel" @submitted="submitChange" @cancelled="cancelChange" />
        </template>
        <template v-else-if="Array.isArray(inputModel)">
          <array-editor v-model="inputModel" @submitted="submitChange" @cancelled="cancelChange" />
        </template>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat no-caps label="Submit" color="primary" @click="submitChange" />
        <q-btn flat no-caps label="Cancel" color="negative" @click="cancelChange" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
const showDialog = defineModel('showDialog', {
  type: Boolean,
  default: false,
});

const inputModel = defineModel('inputModel', {
  type: [String, Number, Array, null] as unknown as PropType<
    string | number | Array<string> | null
  >,
  default: '',
});

const emit = defineEmits(['submitted', 'cancelled']);

import StringEditor from 'src/components/DialogEditor/StringEditor.vue';
import ArrayEditor from 'src/components/DialogEditor/ArrayEditor.vue';

import type { PropType } from 'vue';
import { defineModel } from 'vue';

const submitChange = () => {
  showDialog.value = false;
  emit('submitted', inputModel.value);
};

const cancelChange = () => {
  showDialog.value = false;
  emit('cancelled');
};
</script>
