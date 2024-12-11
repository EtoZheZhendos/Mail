<template>
  <q-item clickable @click="openMessageById">
    <q-item-section>
      <q-item-label>{{ data.theme }}</q-item-label>
      <q-item-label caption>{{ data.from }}</q-item-label>
      <q-item-label>{{ data.date }}</q-item-label>
      <q-item-label v-if="!isIncomingMail">
        {{ !!data.draft ? "Черновик" : "Отправлено" }}
      </q-item-label>
    </q-item-section>

    <q-item-section side class="row">
      <q-btn
        icon="clear"
        class="q-mb-md"
        color="negative"
        @click="deleteItem"
        label="Удалить"
        dense
      />

      <q-btn
        icon="send"
        color="positive"
        label="Отправить"
        dense
        @click="sendDraftFn"
        v-if="data.draft"
      />
    </q-item-section>
  </q-item>
</template>

<script setup>
const emit = defineEmits(["deleteMessage", "openMessage", "sendDraft"]);

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  isIncomingMail: {
    type: Boolean,
    default: false,
  },
});

const deleteItem = () => {
  emit("deleteMessage", props.data.id);
};

const openMessageById = () => {
  emit("openMessage", props.data.id);
};

const sendDraftFn = () => {
  emit("sendDraft", props.data.id);
};
</script>
