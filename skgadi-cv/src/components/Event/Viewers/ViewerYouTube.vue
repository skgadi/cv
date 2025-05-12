<template>
  <q-video :ratio="16 / 9" :src="formUrl" />
</template>

<script setup lang="ts">
import { youtubeLinkToEmbedLink } from 'src/services/generic/youtube';
import { computed } from 'vue';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const formUrl = computed(() => {
  const url = youtubeLinkToEmbedLink(props.url);
  return url;
});
</script>
