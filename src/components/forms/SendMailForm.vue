<template>
  <q-card style="width: 500px">
    <q-card-section class="row items-center q-pb-none justify-between">
      <div class="text-h6" v-if="!data?.id">Отправить письмо</div>
      <div class="text-h6" v-else>Отправить черновик</div>
      <q-btn icon="close" flat round color="negative" @click="closeFormFunc" />
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

      <q-checkbox
        v-if="!data?.id"
        v-model="mail.draft"
        label="Сохранить как черновик"
        color="primary"
      />
    </q-card-section>

    <q-card-actions>
      <q-btn label="Отправить" color="primary" @click="sendMailFunc" />
      <q-btn label="Сбросить" color="negative" @click="clearFormFunc" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useMailStore } from "src/store/mailStore";

const emit = defineEmits(["closeForm"]);

const mailStore = useMailStore();

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

const mail = ref({
  to: props.data?.to || "",
  theme: props.data?.theme || "",
  text: props.data?.text || "",
  draft: props.data?.draft || false,
});

const sendMailFunc = async () => {
  try {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = String(currentDate.getFullYear()).slice(2);

    const formattedDate = `${day}-${month}-${year}`;

    const mailWithDate = {
      ...mail.value,
      date: formattedDate,
    };
    if (!props.data?.id) {
      await mailStore.sendMail(mailWithDate);
    } else {
      await mailStore.changeDraftToOutgoing(props.data.id, {
        ...mail.value,
        draft: false,
        date: formattedDate,
      });
    }

    clearFormFunc();
    closeFormFunc();
  } catch (error) {
    console.error("Ошибка отправки письма:", error);
  }
};

const closeFormFunc = () => {
  emit("closeForm");
};

const clearFormFunc = () => {
  mail.value = {
    to: "",
    theme: "",
    text: "",
    draft: false,
  };
};
</script>
