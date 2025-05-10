<template>
  <pre v-if="highlightedCode" v-html="highlightedCode"></pre>
</template>

<script setup lang="ts">
const props = defineProps({
  inEvent: {
    type: Object as PropType<GSK_EVENT_CONTENT>,
    required: true,
  },
});
import { onMounted, type PropType, ref, watch } from 'vue';
import type { GSK_EVENT_CONTENT } from 'src/services/library/types/events';

import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // Import a style for syntax highlighting

const detectedLanguage = ref('Unknown');
const highlightedCode = ref('');

onMounted(() => {
  detectLanguage();
});

watch(
  () => props.inEvent.content,
  (newValue) => {
    if (newValue !== '') {
      detectLanguage();
    }
  },
);

const detectLanguage = () => {
  if (props.inEvent.content.trim() === '') {
    detectedLanguage.value = 'No code provided';
    highlightedCode.value = '';
    return;
  }

  // Use highlight.js to auto-detect the language
  const result = hljs.highlightAuto(props.inEvent.content);
  detectedLanguage.value = result.language || 'Unknown';
  highlightedCode.value = result.value; // Highlighted HTML code
};

//import ViewerHtml from 'components/Event/Viewers/ViewerHtml.vue';
</script>

<style scoped>
pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 0;
}
</style>
