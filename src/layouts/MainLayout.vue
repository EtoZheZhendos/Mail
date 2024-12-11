<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Моя Почта</q-toolbar-title>
        <q-btn flat label="Отправить письмо" @click="openSendMailDialog" />
      </q-toolbar>
    </q-header>
    <q-dialog v-model="sendMailDialogVisible">
      <send-mail-form
        @close-form="sendMailDialogVisible = !sendMailDialogVisible"
      />
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useMailStore } from "src/store/mailStore";
import SendMailForm from "src/components/forms/SendMailForm.vue";

const mailStore = useMailStore();

const recipientEmail = ref("");
const mailSubject = ref("");
const mailText = ref("");
const isDraft = ref(false);
const sendMailDialogVisible = ref(false); // Референсное значение отображения модального окна

const openSendMailDialog = () => {
  sendMailDialogVisible.value = !sendMailDialogVisible.value;
};

const sendMail = async () => {
  await mailStore.sendMail({
    recipientEmail: recipientEmail.value,
    subject: mailSubject.value,
    text: mailText.value,
    draft: isDraft.value,
  });
  sendMailDialogVisible.value = false;
  recipientEmail.value = "";
  mailSubject.value = "";
  mailText.value = "";
};
</script>
