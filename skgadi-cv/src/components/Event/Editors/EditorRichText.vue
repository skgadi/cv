<template>
  <q-editor v-model="textToEdit" height="calc(50vh - 32px)" />
</template>
<script setup lang="ts">
const textToEdit = defineModel<string>({
  required: true,
});
</script>
