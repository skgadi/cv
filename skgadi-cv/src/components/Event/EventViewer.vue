<template>
  <q-card-section>
    <div>
      <text-item :in-text="event.title" in-class="text-h5" />
      <text-item :in-text="event.description" />
      <div class="row items-center justify-evenly">
        <show-date-with-icon :date-time="event.startDate" icon="las la-chevron-right" />
        <show-date-with-icon :date-time="event.endDate" icon="las la-chevron-left" />
      </div>
      <shift-right v-if="event.categories.length > 0">
        <div class="text-h6">Categories</div>

        <display-categories-from-ids
          :model-value="event.categories"
          :profile-doc="profileDoc"
          :is-editable="false"
        />
      </shift-right>
      <div class="q-ma-md q-gutter-md">
        <template v-for="(contentItem, idx) in event.content" :key="idx">
          <show-event-element :in-event="contentItem" />
        </template>
      </div>
    </div>
  </q-card-section>
</template>
<script setup lang="ts">
defineProps({
  profileDoc: {
    type: Object as PropType<GSK_PROFILE>,
    required: true,
  },
  event: {
    type: Object as PropType<GSK_EVENT>,
    required: true,
  },
});

import TextItem from 'components/Event/TextItem.vue';
import ShowDateWithIcon from 'components/Generic/ShowDateWithIcon.vue';
import DisplayCategoriesFromIds from 'components/Category/DisplayCategoriesFromIds.vue';
import ShiftRight from 'components/Event/ShiftRight.vue';
import ShowEventElement from 'components/Event/ShowEventElement.vue';

import { type PropType } from 'vue';
import type { GSK_EVENT } from 'src/services/library/types/events';
import type { GSK_PROFILE } from 'src/services/library/types/profile';
</script>
