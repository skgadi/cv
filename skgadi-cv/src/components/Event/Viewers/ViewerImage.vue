<template>
  <q-img :src="imgUrl" spinner-color="white" style="width: 100%" />
</template>
<script setup lang="ts">
defineProps({
  imgUrl: {
    type: String,
    required: true,
  },
});
</script>
