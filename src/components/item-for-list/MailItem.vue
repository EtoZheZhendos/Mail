<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ !!data.theme ? data.theme : "" }}</div>
      <div class="text-subtitle2">{{ data.from }}</div>
      <div class="text-subtitle2">{{ data.date }}</div>
    </q-card-section>
    <q-card-section>
      <div class="q-pa-sm">{{ data.text }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>
