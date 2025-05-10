<template>
  <q-expansion-item
    expand-separator
    :default-opened="defaultOpen"
    header-class="drag-handle"
    style="border-radius: 20px"
    class="shadow-1 overflow-hidden"
  >
    <template v-slot:header
      >`
      <q-item-section avatar>
        <q-avatar :icon="inEvent.icon" color="primary" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ inEvent.title }}</q-item-label>
        <q-item-label caption>{{ inEvent.description }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-chip size="sm" icon="las la-quote-right">
          {{ contentType }}
        </q-chip>
      </q-item-section>
      <q-menu touch-position context-menu>
        <q-list dense separator style="min-width: 100px">
          <q-item
            clickable
            v-close-popup
            v-for="(menu, idx) in menuItems"
            @click="menu.action"
            :key="idx"
          >
            <q-item-section>{{ menu.label }}</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="copyText(inEvent.title)">
            <q-item-section>Copy title</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="copyText(inEvent.description)">
            <q-item-section>Copy description</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="copyText(inEvent.content)">
            <q-item-section>Copy raw content</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </template>
    <template v-slot:default>
      <viewer-index :in-event="inEvent" />
    </template>
  </q-expansion-item>
</template>
<script setup lang="ts">
const props = defineProps({
  inEvent: {
    type: Object as PropType<GSK_EVENT_CONTENT>,
    required: true,
  },
  defaultOpen: {
    type: Boolean,
    default: true,
  },
});

import { computed, type PropType } from 'vue';
import type { GSK_EVENT_CONTENT } from 'src/services/library/types/events';
import ViewerIndex from 'components/Event/Viewers/ViewerIndex.vue';

import { evenContentTypes } from 'src/services/library/constants/events';
import { copyText } from 'src/services/generic/utils';
import { driveLinkToFileShareLink, driveLinkToPreviewLink } from 'src/services/generic/gDrive';

const contentType = computed(() => {
  const type = evenContentTypes.find((type) => type.value === props.inEvent.type);
  if (type) {
    return type.label;
  } else {
    return 'Unknown';
  }
});

const menuItems = computed(() => {
  const allItems: {
    label: string;
    action: () => void | Promise<void>;
  }[] = [
    {
      label: 'Copy title',
      action: () => copyText(props.inEvent.title),
    },
    {
      label: 'Copy description',
      action: () => copyText(props.inEvent.description),
    },
    {
      label: 'Copy raw content',
      action: () => copyText(props.inEvent.content),
    },
  ];
  if (props.inEvent.type === 'pdf') {
    allItems.push({
      label: 'Open in new tab',
      action: () => {
        const url = props.inEvent.content;
        window.open(url, '_blank');
      },
    });
  }
  if (props.inEvent.type === 'google-drive-element') {
    allItems.push(
      {
        label: 'Copy Google Drive link (preview)',
        action: () => copyText(driveLinkToPreviewLink(props.inEvent.content)),
      },
      {
        label: 'Open in Google Drive (Preview)',
        action: () => {
          const url = driveLinkToPreviewLink(props.inEvent.content);
          window.open(url, '_blank');
        },
      },
      {
        label: 'Copy Google Drive link',
        action: () => copyText(driveLinkToFileShareLink(props.inEvent.content)),
      },
      {
        label: 'Open in Google Drive',
        action: () => {
          const url = driveLinkToFileShareLink(props.inEvent.content);
          window.open(url, '_blank');
        },
      },
    );
  }
  return allItems;
});
</script>
