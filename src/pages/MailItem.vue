<!-- src/components/MailItem.vue -->
<template>
  <q-page v-if="selectedMail" class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ selectedMail.theme }}</div>
        <div class="text-subtitle2">{{ selectedMail.from }}</div>
        <div class="text-subtitle2">{{ selectedMail.date }}</div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-sm">{{ selectedMail.text }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed } from "vue";
import { useMailStore } from "src/store/mailStore";

const mailStore = useMailStore();
const selectedMail = computed(() => mailStore.selectedMail); // Получаем выбранное письмо из хранилища
</script>

<style scoped>
/* Стили для письма */
</style>
