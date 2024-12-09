// store/mailStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useMailStore = defineStore("mail", {
  state: () => ({
    mails: [], // Список писем
    selectedMail: null, // Текущее выбранное письмо
    loading: false, // Индикатор загрузки
  }),
  actions: {
    async fetchMails() {
      this.loading = true;
      try {
        const response = await axios.get("/api/mails"); // Здесь может быть ваш эндпоинт
        this.mails = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке писем:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchMailById(id) {
      this.loading = true;
      try {
        const response = await axios.get(`/api/mails/${id}`); // Получение письма по id
        this.selectedMail = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке письма:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
