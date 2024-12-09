<template>
  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Отправить письмо</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="mail.to"
          label="Кому"
          :rules="[(val) => (val && val.length >= 2) || 'Минимум 2 символа']"
        />
        <q-input v-model="mail.theme" label="Тема" />
        <q-input
          v-model="mail.text"
          label="Сообщение"
          type="textarea"
          :rules="[(val) => (val && val.length >= 1) || 'Минимум 1 символ']"
        />
      </q-card-section>

      <q-card-actions>
        <q-btn label="Отправить" color="primary" @click="sendMail" />
        <q-btn label="Отмена" color="secondary" @click="dialog = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useMailStore } from "src/store/mailStore";
import { date } from "quasar"; // Для генерации текущей даты

const mailStore = useMailStore();
const dialog = ref(false);

const mail = ref({
  to: "",
  theme: "",
  text: "",
  date: date.formatDate(Date.now(), "DD-MM-YYYY"), // Текущая дата
});

const sendMail = async () => {
  try {
    // Проверка на валидность
    const isValid = mail.value.to.length >= 2 && mail.value.text.length >= 1;
    if (!isValid) {
      throw new Error("Поля не заполнены корректно");
    }

    await mailStore.sendMail(mail.value);
    dialog.value = false;
  } catch (error) {
    console.error("Ошибка отправки письма:", error);
  }
};
</script>
