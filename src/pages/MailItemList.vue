<template>
  <q-item clickable @click="openMessageById">
    <q-item-section>
      <q-item-label>{{ data.theme }}</q-item-label>
      <q-item-label caption>{{ data.from }}</q-item-label>
      <q-item-label>{{ data.date }}</q-item-label>
      <q-item-label>{{
        !!data.draft ? "Черновик" : "Отправлено"
      }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-btn icon="clear" color="negative" flat @click="deleteItem" />
    </q-item-section>
  </q-item>
</template>
<script setup>
const emit = defineEmits(["deleteMessage", "openMessage"]);
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
const deleteItem = () => {
  emit("deleteMessage", props.data.id);
};
const openMessageById = () => {
  emit("openMessage", props.data.id);
};
</script>
