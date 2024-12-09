// src/store/mailStore.js

import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useMailStore = defineStore("mail", {
  state: () => ({
    incomingEmails: [],
    outgoingEmails: [],
    selectedMail: null,
    loading: false,
    error: null,
  }),
  getters: {
    getIncomingEmails: (state) => state.incomingEmails,
    getOutgoingEmails: (state) => state.outgoingEmails,
    getSelectedMail: (state) => state.selectedMail,
  },
  actions: {
    async fetchIncomingMails() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api({
          url: "/incoming_emails",
          method: "GET",
        });
        this.incomingEmails = response.data;
      } catch (error) {
        this.error = "Не удалось загрузить входящие письма. Попробуйте позже.";
      } finally {
        this.loading = false;
      }
    },

    async fetchOutgoingMails() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api({
          url: "/outgoing_emails",
          method: "GET",
        });
        this.outgoingEmails = response.data;
      } catch (error) {
        this.error = "Не удалось загрузить исходящие письма. Попробуйте позже.";
      } finally {
        this.loading = false;
      }
    },

    async fetchMailById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api({
          url: `/incoming_emails/${id}`,
          method: "GET",
        });
        this.selectedMail = response.data;
      } catch (error) {
        this.error = "Не удалось загрузить письмо. Попробуйте позже.";
      } finally {
        this.loading = false;
      }
    },

    async sendMail(mail) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api({
          url: "/outgoing_emails",
          method: "POST",
          data: mail,
        });
        await this.fetchOutgoingMails();
      } catch (error) {
        this.error = "Не удалось отправить письмо. Попробуйте позже.";
      } finally {
        this.loading = false;
      }
    },

    async deleteMail(id) {
      this.loading = true;
      this.error = null;
      try {
        await api({
          url: `/incoming_emails/${id}`,
          method: "DELETE",
        });

        // Обновляем список входящих писем после удаления
        this.incomingEmails = this.incomingEmails.filter(
          (mail) => mail.id !== id
        );
      } catch (error) {
        this.error = "Не удалось удалить письмо. Попробуйте позже.";
      } finally {
        this.loading = false;
      }
    },
  },
});
