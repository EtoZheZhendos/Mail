<template>
  <q-page>
    <q-list bordered>
      <q-item v-for="mail in outgoingMails" :key="mail.id" clickable>
        <q-item-section>
          <q-item-label>{{ mail.subject }}</q-item-label>
          <q-item-label caption>{{ mail.recipient }}</q-item-label>
          <q-item-label>{{ mail.date }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-banner v-if="outgoingMails.length === 0" class="bg-grey-2 text-black">
      Нет исходящих писем
    </q-banner>
  </q-page>
</template>

<script setup>
import { computed } from "vue";
import { useMailStore } from "src/store/mailStore";

const mailStore = useMailStore();

const outgoingMails = computed(() => mailStore.getOutgoingEmails);
</script>
