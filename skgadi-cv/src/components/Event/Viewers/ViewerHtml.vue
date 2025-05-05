<template>
  <div v-html="htmlText" />
</template>
<script setup lang="ts">
defineProps({
  htmlText: {
    type: String,
    required: true,
  },
});
</script>
