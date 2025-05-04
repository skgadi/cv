<template>
  <div class="text-h6">
    {{ inEvent.id }}
  </div>
  <div>
    {{ inEvent.title }}
  </div>
  <div>
    {{ inEvent.description }}
  </div>
  <div>
    {{ inEvent.type }}
  </div>
  <div>
    {{ inEvent.content }}
  </div>
</template>
<script setup lang="ts">
defineProps({
  inEvent: {
    type: Object as PropType<GSK_EVENT_CONTENT>,
    required: true,
  },
});

import { type PropType } from 'vue';
import type { GSK_EVENT_CONTENT } from 'src/services/library/types/events';
</script>
