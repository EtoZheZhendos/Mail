<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Моя Почта </q-toolbar-title>

        <q-input
          v-model="search"
          class="bg-white"
          outlinded
          rounded
          label="Введите поисковое значение"
          dense
          style="width: 400px"
        />

        <q-btn
          :loading="loading[3]"
          color="primary"
          @click="updateMails"
          style="width: 150px; margin-left: 10px"
        >
          Обновить
        </q-btn>

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
import { ref, watch } from "vue";
import { useMailStore } from "src/store/mailStore";
import SendMailForm from "src/components/forms/SendMailForm.vue";

const mailStore = useMailStore();
const sendMailDialogVisible = ref(false);
const loading = ref([]);
const search = ref("");

const updateMails = async () => {
  await mailStore.fetchIncomingMails();
  await mailStore.fetchOutgoingMails();
};

const openSendMailDialog = () => {
  sendMailDialogVisible.value = !sendMailDialogVisible.value;
};

watch(
  () => search.value,
  async (value) => {
    if (value === "") {
      await mailStore.resetMails();
    }
    mailStore.searchMails(search.value);
  }
);
</script>
