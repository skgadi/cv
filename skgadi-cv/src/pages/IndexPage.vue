<template>
  <UpdateRibbon ref="updateRibbon" />
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
defineProps({
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
  profileDoc: {
    type: Object as PropType<GSK_PROFILE>,
    required: false,
    default: () => ({}),
  },
  user: {
    type: Object as PropType<User>,
    required: false,
    default: () => ({}),
  },
});

import { type PropType, ref } from 'vue';
import type { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import UpdateRibbon from 'components/Generic/UpdateRibbon.vue';
import type { GSK_PROFILE } from 'src/services/library/types/profile';
import { type User } from 'firebase/auth';

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});
</script>
