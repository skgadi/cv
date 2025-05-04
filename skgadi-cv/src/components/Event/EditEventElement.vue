<template>
  <q-splitter
    v-model="splitterModel"
    style="height: calc(50vh + 80px + 36px + 4px); border: 1px solid; border-radius: 20px"
  >
    <template v-slot:before>
      <div class="column" style="width: 100%">
        <div class="col" style="width: 100%">
          <div>
            <div class="row items-center justify-evenly">
              <div class="col">
                <div class="column">
                  <q-input
                    v-model="eventToEdit.title"
                    label="Title"
                    rounded
                    dense
                    outlined
                    :autofocus="true"
                  />
                  <q-select
                    v-model="eventToEdit.type"
                    :options="evenContentTypes"
                    label="Content Type"
                    outlined
                    rounded
                    use-input
                    @filter="filterFn"
                    dense
                    emit-value
                    map-options
                  />
                </div>
              </div>
              <div class="col">
                <q-input
                  v-model="eventToEdit.description"
                  label="Description"
                  rounded
                  dense
                  outlined
                  type="textarea"
                  rows="3"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col" style="width: 100%">
          <EditorRichText v-if="eventToEdit.type === 'rich-text'" v-model="eventToEdit.content" />
          <editor-codemirror v-else v-model="eventToEdit.content" :type="eventToEdit.type" />
        </div>
        <div class="col" style="width: 100%">
          <div class="row items-center justify-evenly">
            <q-btn
              flat
              rounded
              class="q-mr-sm"
              icon="las la-save"
              no-caps
              label="Save"
              color="primary"
              @click="updateEvent"
            />
            <q-btn
              flat
              rounded
              class="q-mr-sm"
              icon="las la-times"
              no-caps
              label="Cancel"
              color="negative"
              @click="cancelEdit"
            />
          </div>
        </div>
      </div>
    </template>

    <template v-slot:after>
      <show-event-element :in-event="eventToEdit" />
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
const eventToEdit = defineModel<GSK_EVENT_CONTENT>({
  required: true,
});

import EditorRichText from 'components/Event/Editors/EditorRichText.vue';
import EditorCodemirror from 'components/Event/Editors/EditorCodemirror.vue';
import ShowEventElement from 'components/Event/ShowEventElement.vue';

import type { GSK_EVENT_CONTENT } from 'src/services/library/types/events';
import { evenContentTypes } from 'src/services/library/constants/events';
import type { QSelect } from 'quasar'; // Import for type reference
import { ref } from 'vue';

const emit = defineEmits(['save', 'cancel']);

const updateEvent = () => {
  emit('save');
};

const cancelEdit = () => {
  emit('cancel');
};

const splitterModel = ref(50);

// Custom filter function with a more specific type
const filterFn = (
  val: string,
  doneFn: (callback: () => typeof evenContentTypes, afterFn?: (ref: QSelect) => void) => void, // Changed any[] to Option[]
) => {
  if (val === '') {
    // If input is empty, return all options
    doneFn(() => evenContentTypes); // evenContentTypes.value is now typed as Option[]
  } else {
    const needle = val.toLowerCase(); // Case-insensitive search
    const filtered: typeof evenContentTypes = evenContentTypes.filter(
      (option) => option.label.toLowerCase().includes(needle), // Filter based on 'label' property
    );
    doneFn(() => filtered); // Callback returns an array of Option[]
  }
  // No need to call abortFn unless you want to abort the process
};
</script>
