<template>
  <q-page>
    <q-tabs v-model="tab" align="justify">
      <q-tab name="incoming" label="Входящие" />
      <q-tab name="outgoing" label="Исходящие" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="incoming" animated>
        <MailList @visible-message="visiableMassage" />
        <q-dialog v-model="visibleMaileItem">
          <MailItem :data="mailInfo" @close="closeDialog" />
        </q-dialog>
      </q-tab-panel>
      <q-tab-panel name="outgoing" animated>
        <OutgoingMailList @visible-message="visiableMassage" />
        <q-dialog v-model="visibleMaileItem">
          <MailItem
            :data="mailInfo"
            @close="closeDialog"
            v-if="!mailInfo.draft"
          />
          <send-mail-form :data="mailInfo" v-else @close-form="closeDialog" />
        </q-dialog>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import MailList from "components/lists/MailList.vue";
import OutgoingMailList from "components/lists/OutgoingMailList.vue";
import MailItem from "components/item-for-list/MailItem.vue";
import { ref } from "vue";
import SendMailForm from "components/forms/SendMailForm.vue";

const tab = ref("incoming");
const visibleMaileItem = ref(false);
const mailInfo = ref({});

const visiableMassage = (newMail) => {
  mailInfo.value = newMail;
  visibleMaileItem.value = true;
};

const closeDialog = () => {
  visibleMaileItem.value = false;
};
</script>

<style scoped>
.center-btn {
  position: fixed;
  top: 38%;
  left: 65%;
  transform: translate(-50%, -50%);
}
</style>
