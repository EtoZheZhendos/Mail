<template>
  <q-page>
    <q-list bordered>
      <q-item
        v-for="mail in items"
        :key="mail.id"
        clickable
        @click="selectMail(mail.id)"
      >
        <q-item-section>
          <q-item-label>{{ mail.theme }}</q-item-label>
          <q-item-label caption>{{ mail.from }}</q-item-label>
          <q-item-label>{{ mail.date }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            icon="clear"
            color="negative"
            flat
            @click.stop="deleteMail(mail.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-banner v-if="items.length === 0" class="bg-grey-2 text-black">
      Нет писем
    </q-banner>

    <q-banner v-if="error" class="bg-negative text-white">
      {{ error }}
    </q-banner>

    <q-spinner v-if="loading" size="50px" class="q-mt-xl" />
  </q-page>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useMailStore } from "src/store/mailStore";

const mailStore = useMailStore();

const { incomingEmails, fetchIncomingMails, loading, error } = mailStore;

const items = computed(() => mailStore.getIncomingEmails);

onMounted(async () => {
  await fetchIncomingMails();
});

const selectMail = (id) => {
  mailStore.fetchMailById(id);
};

const deleteMail = async (id) => {
  try {
    await mailStore.deleteMail(id);
  } catch (error) {
    console.error("Ошибка удаления письма:", error);
  }
};
</script>
