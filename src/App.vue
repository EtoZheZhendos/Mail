<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Моя Почта</q-toolbar-title>
        <q-btn flat label="Отправить письмо" @click="openSendMailDialog" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-tabs v-model="tab" class="q-mb-md" align="justify">
        <q-tab name="incoming" label="Входящие" />
        <q-tab name="outgoing" label="Исходящие" />
      </q-tabs>

      <q-page v-if="tab === 'incoming'">
        <MailList v-if="!selectedMail" />
        <MailItem v-else />
      </q-page>

      <q-page v-if="tab === 'outgoing'">
        <OutgoingMailList />
      </q-page>
    </q-page-container>

    <!-- Модальное окно для отправки письма -->
    <q-dialog v-model="sendMailDialogVisible">
      <q-card style="width: 80vw">
        <q-card-section>
          <div class="text-h6">Отправить письмо</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="recipientEmail" label="Кому" />
          <q-input v-model="mailSubject" label="Тема" />
          <q-input v-model="mailText" label="Сообщение" type="textarea" />
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Отмена" @click="sendMailDialogVisible = false" />
          <q-btn flat label="Отправить" @click="sendMail" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import { useMailStore } from "src/store/mailStore.js";
import MailList from "src/pages/MailList.vue";
import MailItem from "src/pages/MailItem.vue";
import OutgoingMailList from "src/pages/OutgoingMailList.vue"; // Создадим новый компонент для исходящих писем

const mailStore = useMailStore();
const selectedMail = computed(() => mailStore.selectedMail);

const tab = ref("incoming"); // Переключение между вкладками
const sendMailDialogVisible = ref(false); // Для отображения модального окна
const recipientEmail = ref("");
const mailSubject = ref("");
const mailText = ref("");

const openSendMailDialog = () => {
  sendMailDialogVisible.value = true;
};

const sendMail = async () => {
  await mailStore.sendMail({
    recipientEmail: recipientEmail.value,
    subject: mailSubject.value,
    text: mailText.value,
  });
  sendMailDialogVisible.value = false;
  recipientEmail.value = "";
  mailSubject.value = "";
  mailText.value = "";
};
</script>
