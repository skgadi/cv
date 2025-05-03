<template>VIEW PAGE</template>
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

import { type PropType } from 'vue';
import type { GSK_PROFILE } from 'src/services/library/types/profile';
import { type User } from 'firebase/auth';
</script>
