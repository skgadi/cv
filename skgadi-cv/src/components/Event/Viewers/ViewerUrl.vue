<template>
  <div class="column">
    <div class="col">
      <pre>
        {{ inUrl }}
      </pre>
    </div>
    <div class="col-auto q-gutter-sm q-ma-sm text-center">
      <q-btn outline :href="inUrl" round icon="las la-link" />
      <q-btn outline color="primary" :href="inUrl" target="_blank" round icon="open_in_new" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  inUrl: {
    type: String,
    required: true,
  },
});
</script>
