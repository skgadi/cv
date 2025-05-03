<template>
  <div class="row items-top" @mouseover="showCopy = true" @mouseleave="showCopy = false">
    <div class="col-auto" :style="`visibility: ${showCopy ? 'visible' : 'hidden'}`">
      <q-btn flat round icon="las la-copy" dense @click="copyText(inText)">
        <q-tooltip>Copy</q-tooltip>
      </q-btn>
    </div>
    <div class="col">
      <div :class="inClass" :style="inStyle">{{ inText }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  inText: {
    type: String,
    required: true,
  },
  inClass: {
    type: String,
    default: '',
  },
  inStyle: {
    type: String,
    default: '',
  },
});

import { ref } from 'vue';
import { copyText } from 'src/services/generic/utils';

const showCopy = ref(false);
</script>
