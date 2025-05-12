<template>
  <div style="height: calc(75vh - 58px); width: 100%">
    <object :data="formUrl" width="100%" height="100%"></object>
  </div>
</template>

<script setup lang="ts">
import { driveLinkToFormShareLink } from 'src/services/generic/gDrive';
import { computed } from 'vue';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const formUrl = computed(() => {
  const url = driveLinkToFormShareLink(props.url);
  return url;
});
</script>
