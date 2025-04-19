<template>
  <q-list dense separator>
    <q-item v-for="(item, index) in inArray" :key="index">
      <q-item-section>{{ item }}</q-item-section>
    </q-item>
  </q-list>
</template>
<script setup lang="ts">
defineProps({
  inArray: {
    type: Array,
    required: true,
  },
});
</script>
