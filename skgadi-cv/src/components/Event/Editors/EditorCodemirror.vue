<template>
  <q-separator />
  <codemirror
    v-model="textToEdit"
    placeholder="Code goes here..."
    :style="{ height: '50vh', width: '100%' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
  />
  <q-separator />
</template>
<script setup lang="ts">
const textToEdit = defineModel<string>({
  required: true,
});

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

import { Codemirror } from 'vue-codemirror';

import { markdown } from '@codemirror/lang-markdown';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { latex } from 'codemirror-lang-latex';

import { computed } from 'vue';

const extensions = computed(() => {
  switch (props.type) {
    case 'markdown':
      return [markdown()];
    case 'html':
      return [html()];
    case 'json':
    case 'geoJSON':
      return [json()];
    case 'latex':
      return [latex()];
    case 'text':
    case 'pdf':
    case 'code-snippet':
    case 'bibtex-one':
    case 'bibtex-multiple':
    case 'download':
    case 'google-drive-element':
    case 'google-form':
    case 'google-map':
    case 'youtube':
    case 'youtube-playlist':
    case 'image':
    case 'video':
    case 'audio':
    case 'link':
    default:
      return [];
  }
});
</script>
