<template>
  <q-editor v-model="textToEdit" height="calc(75vh - 80px - 36px - 4px - 32px)" />
</template>
<script setup lang="ts">
const textToEdit = defineModel<string>({
  required: true,
});
</script>
