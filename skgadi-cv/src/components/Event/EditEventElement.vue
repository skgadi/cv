<template>
  <q-splitter
    v-model="splitterModel"
    style="height: calc(75vh); border: 1px solid #e0e0e0; border-radius: 20px"
  >
    <template v-slot:before>
      <div class="column" style="width: 100%">
        <div class="col" style="width: 100%">
          <div>
            <div class="row items-center justify-evenly">
              <div class="col">
                <div class="column">
                  <q-select
                    v-model="eventToEdit.type"
                    :options="selectorOptions"
                    label="Content Type"
                    outlined
                    rounded
                    use-input
                    @filter="filterFn"
                    dense
                    emit-value
                    map-options
                    :autofocus="true"
                  />
                  <q-input v-model="eventToEdit.icon" label="Icon" rounded dense outlined>
                    <template v-slot:prepend>
                      <q-icon :name="eventToEdit.icon" />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="col">
                <div class="column">
                  <q-input v-model="eventToEdit.title" label="Title" rounded dense outlined />
                  <q-input
                    v-model="eventToEdit.description"
                    label="Description"
                    rounded
                    dense
                    outlined
                  />
                </div>
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

const selectorOptions = ref(evenContentTypes);

//type OptionsType = typeof evenContentTypes;
function filterFn(val: string, update: (arg0: { (): void; (): void }) => void) {
  if (val === '') {
    update(() => {
      selectorOptions.value = evenContentTypes;
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    selectorOptions.value = evenContentTypes.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1,
    );
  });
}
</script>
