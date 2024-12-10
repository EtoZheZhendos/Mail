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
        <MailList @visible-message="visiableMassage" />
        <q-dialog v-model="visibleMaileItem"
          ><MailItem :data="mailInfo"
        /></q-dialog>
      </q-page>

      <q-page v-if="tab === 'outgoing'">
        <OutgoingMailList />
      </q-page>
    </q-page-container>

    <q-dialog v-model="sendMailDialogVisible">
      <q-card style="width: 80vw">
        <q-card-section>
          <div class="text-h6">Отправить письмо</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="recipientEmail" label="Кому" />

          <q-input v-model="mailSubject" label="Тема" />
          <q-input v-model="mailText" label="Сообщение" type="textarea" />
          <q-checkbox v-model="isDraft" label="Добавить в черновик" />
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
import OutgoingMailList from "src/pages/OutgoingMailList.vue";

const mailStore = useMailStore();
const selectedMail = computed(() => mailStore.selectedMail);

const tab = ref("incoming"); // Реф значение для перключения владок
const sendMailDialogVisible = ref(false); // Референсное значение отображения модального окна
const recipientEmail = ref("");
const mailSubject = ref("");
const mailText = ref("");
const isDraft = ref(false);
const visibleMaileItem = ref(false);
const mailInfo = ref({});
const visiableMassage = (newMail) => {
  mailInfo.value = newMail;
  visibleMaileItem.value = true;
};

const openSendMailDialog = () => {
  sendMailDialogVisible.value = true;
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
