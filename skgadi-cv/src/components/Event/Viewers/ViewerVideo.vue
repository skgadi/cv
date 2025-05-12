<template>
  <div style="width: 100%; line-height: 0px !important; font-size: 0px">
    <video controls autoplay muted loop playsinline style="width: 100%">
      <source :src="videoUrl" />
      Your browser does not support HTML5 video.
    </video>
  </div>
</template>
<script setup lang="ts">
defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
});
</script>
