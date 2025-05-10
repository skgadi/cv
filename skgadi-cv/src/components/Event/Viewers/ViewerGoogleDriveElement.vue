<template>
  <div style="height: calc(75vh - 41px); width: 100%">
    <object :data="previewUrl" width="100%" height="100%"></object>
  </div>
</template>

<script setup lang="ts">
import { driveLinkToPreviewLink } from 'src/services/generic/gDrive';
import { computed } from 'vue';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const previewUrl = computed(() => {
  const url = driveLinkToPreviewLink(props.url);
  return url;
});
</script>
