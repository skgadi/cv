<template>
  <div style="height: calc(75vh - 58px); width: 100%">
    <iframe :src="formUrl" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script setup lang="ts">
import { extractSrcFromEmbed } from 'src/services/generic/gMaps';
import { computed } from 'vue';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const formUrl = computed(() => {
  const url = extractSrcFromEmbed(props.url);
  return url;
});
</script>
