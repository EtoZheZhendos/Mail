<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none justify-between">
      <div class="text-h6 text-primary">Информация о письме</div>
      <q-btn icon="close" flat round color="negative" @click="closeFn" />
    </q-card-section>

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

const emit = defineEmits(["close"]);

const closeFn = () => {
  emit("close");
};
</script>
