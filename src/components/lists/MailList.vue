<template>
  <q-list bordered separator>
    <mail-item-list
      @delete-message="deleteMessage"
      @open-message="selectMail"
      v-for="element in items"
      :key="element.id"
      :data="element"
      is-incoming-mail
      @changeDraftToOutgoing="handleChangeDraftToOutgoing"
    >
    </mail-item-list>
  </q-list>

  <q-banner v-if="items.length === 0" class="bg-grey-2 text-black">
    Нет писем
  </q-banner>

  <q-banner v-if="error" class="bg-negative text-white">
    {{ error }}
  </q-banner>

  <q-spinner v-if="loading" size="50px" class="q-mt-xl" />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useMailStore } from "src/store/mailStore";
import MailItemList from "components/lists/MailItemList.vue";

const mailStore = useMailStore();
const {
  changeDraftToOutgoing,
  incomingEmails,
  fetchIncomingMails,
  loading,
  error,
} = mailStore;

const emit = defineEmits(["visibleMessage"]);

const items = computed(() => mailStore.getIncomingEmails);

const deleteMessage = async (id) => {
  await mailStore.deleteMail(id);
};

const selectMail = async (id) => {
  const { data } = await mailStore.fetchMailById(id);
  emit("visibleMessage", data);
};

const handleChangeDraftToOutgoing = (id) => {
  mailStore.changeDraftToOutgoing(id);
};

onMounted(async () => {
  await fetchIncomingMails();
});
</script>
