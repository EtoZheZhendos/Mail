<template>
  <q-page>
    <q-list bordered>
      <mail-item-list
        v-for="mail in outgoingMails"
        :key="mail.id"
        :data="mail"
        @delete-message="fnDeleteMessage"
        @open-message="selectMail"
        @send-draft="sendDraftFn"
      />
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

const emit = defineEmits(["visibleMessage", "delete-message", "send-draft"]);

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

const selectMail = async (id) => {
  const { data } = await mailStore.fetchMailByIdOutgoing(id);
  emit("visibleMessage", data);
};

const sendDraftFn = async (id) => {
  try {
    await mailStore.changeDraftToOutgoing(id);
    emit("send-draft", id);
  } catch (error) {
    console.error("Ошибка при отправке черновика:", error);
  }
};
</script>
