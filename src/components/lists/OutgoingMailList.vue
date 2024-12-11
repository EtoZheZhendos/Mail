<!-- OutgoingMailList.vue -->
<template>
  <q-page>
    <q-list bordered>
      <mail-item-list
        v-for="mail in outgoingMails"
        :key="mail.id"
        :data="mail"
        @delete-message="fnDeleteMessage"
      ></mail-item-list>
    </q-list>

    <q-banner v-if="outgoingMails.length === 0" class="bg-grey-2 text-black">
      Нет исходящих писем
    </q-banner>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useMailStore } from "src/store/mailStore";
import MailItemList from "./MailItemList.vue";

const emit = defineEmits(["delete-message"]);

const mailStore = useMailStore();

const outgoingMails = computed(() => mailStore.getOutgoingEmails);

onMounted(async () => {
  await mailStore.fetchOutgoingMails();
});

const fnDeleteMessage = async (id) => {
  try {
    await mailStore.deleteOutgoingMail(id);

    emit("delete-message", id);
  } catch (error) {
    console.error("Ошибка при удалении письма:", error);
  }
};
</script>
