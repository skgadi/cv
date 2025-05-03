<template>
  <div class="row items-top">
    <div class="col-auto" style="visibility: hidden">
      <q-btn flat round icon="las la-copy" dense>
        <q-tooltip>Copy</q-tooltip>
      </q-btn>
    </div>
    <div class="col">
      <slot />
    </div>
  </div>
</template>
