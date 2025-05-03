<template>
  <q-chip>
    <q-avatar
      class="cursor-pointer"
      color="primary"
      text-color="white"
      @click="copyText(dateTimeText)"
      @mouseover="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <q-icon :name="isHovering ? 'las la-clipboard' : icon" size="1.2em" />
      <q-tooltip>Copy</q-tooltip>
    </q-avatar>
    <span @click="iterateDateTimeViews">{{ dateTimeText }}</span>
  </q-chip>
</template>
<script setup lang="ts">
const props = defineProps({
  dateTime: {
    type: Date,
    required: true,
  },
  icon: {
    type: String,
    default: 'las la-calendar',
  },
});

import { computed, ref } from 'vue';
import moment from 'moment';
import { copyText } from 'src/services/generic/utils';

const dateTimeViews = [
  'MMMM Do YYYY, H:mm:ss',
  'YYYY/MM/DD',
  'HH:mm:ss',
  'DD/MM/YYYY HH:mm:ss',
  'YYYY-MM-DD HH:mm:ss',
  'YYYY/MM/DD HH:mm:ss',
  'HH:mm',
  'DD/MM/YYYY',
  'YYYY-MM-DD',
  'MMMM Do YYYY, h:mm:ss a',
];
const selectedIndex = ref(0);

const dateTimeText = computed(() => {
  return moment(props.dateTime).format(dateTimeViews[selectedIndex.value]);
});

const iterateDateTimeViews = () => {
  selectedIndex.value = (selectedIndex.value + 1) % dateTimeViews.length;
};

const isHovering = ref(false);
</script>
