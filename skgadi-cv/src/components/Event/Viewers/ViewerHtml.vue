<template>
  <div class="q-pa-sm">
    <div v-html="htmlText" />
  </div>
</template>
<script setup lang="ts">
defineProps({
  htmlText: {
    type: String,
    required: true,
  },
});
</script>
