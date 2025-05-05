<template>sample code</template>

<script setup lang="ts">
defineProps({
  inEvent: {
    type: Object as PropType<GSK_EVENT_CONTENT>,
    required: true,
  },
});
import { type PropType } from 'vue';
import type { GSK_EVENT_CONTENT } from 'src/services/library/types/events';

//import ViewerHtml from 'components/Event/Viewers/ViewerHtml.vue';
</script>
