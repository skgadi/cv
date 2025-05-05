<template>
  <ViewerHtml :htmlText="output" />
</template>

<script setup lang="ts">
const props = defineProps({
  markdownText: {
    type: String,
    required: true,
  },
});

import ViewerHtml from 'components/Event/Viewers/ViewerHtml.vue';
import { computed } from 'vue';

import { marked } from 'marked';

const output = computed(() => marked(props.markdownText) as string);
</script>
