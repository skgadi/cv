<template>
  <viewer-html v-if="inEvent.type === 'html' || inEvent.type === 'rich-text'" :html-text="inEvent.content" />
  <viewer-markdown v-if="inEvent.type === 'markdown'" :markdown-text="inEvent.content" />
  <template v-if="inEvent.type ==='text'">
    {{ inEvent.content }}
  </template>
  <viewer-pdf v-if="inEvent.type === 'pdf'" :pdf-url = "inEvent.content" />
  <viewer-code v-if="inEvent.type === 'code-snippet'" :inEvent = "inEvent" />
  
</template>
<script setup lang="ts">
defineProps({
  inEvent: {
    type: Object as PropType<GSK_EVENT_CONTENT>,
    required: true,
  },
});
import { type PropType } from 'vue';
import type { GSK_EVENT_CONTENT } from 'src/services/library/types/events';

import ViewerHtml from 'components/Event/Viewers/ViewerHtml.vue';
import ViewerMarkdown from 'components/Event/Viewers/ViewerMarkdown.vue';
import ViewerPdf from 'components/Event/Viewers/ViewerPdf.vue';
import ViewerCode from 'components/Event/Viewers/ViewerCode.vue';
</script>
