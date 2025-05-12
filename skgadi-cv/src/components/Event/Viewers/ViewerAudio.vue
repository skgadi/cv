<template>
  <div style="width: 100%; line-height: 0px !important; font-size: 0px">
    <audio controls style="width: 100%">
      <source :src="audioUrl" />
    </audio>
  </div>
</template>
<script setup lang="ts">
defineProps({
  audioUrl: {
    type: String,
    required: true,
  },
});
</script>
