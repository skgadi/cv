<template>
  <q-video :ratio="16 / 9" :src="formUrl" />
</template>

<script setup lang="ts">
import { youtubePlaylistLinkToEmbedLink } from 'src/services/generic/youtube';
import { computed } from 'vue';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const formUrl = computed(() => {
  const url = youtubePlaylistLinkToEmbedLink(props.url);
  return url;
});
</script>
