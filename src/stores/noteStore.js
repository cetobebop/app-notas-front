import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

import { useUserStore } from "./userStore";
import { useTimerStore } from "./timerStore";

export const useNoteStore = defineStore("noteStore", () => {
  const userStore = useUserStore();
  const timerStore = useTimerStore();
  const notes = ref({});

  const loading = ref(false);

  async function getNotes(skip, limit, tags = [], text) {
    const query = skip && limit ? `?skip=${skip}&limit=${limit}` : "";
    const body = tags.length ? { tags, text } : { text };

    try {
      loading.value = true;
      const res = await api.post(`notes/getnote${query}`, body, {
        headers: {
          x_access_token: userStore.token,
        },
      });
      const { status, ...data } = res.data;
      console.log(data);
      console.log(res);
      notes.value = data;
    } catch (error) {
      console.log(error);
      console.log("error store notes");
    } finally {
      loading.value = false;
    }
  }

  async function createNotes(title, alertIn, message, tag) {
    try {
      const res = await api.post(
        "/notes/note",
        {
          title,
          alertIn,
          message,
          tag,
        },
        {
          headers: {
            x_access_token: userStore.token,
          },
        }
      );
      notes.value.notes.unshift(res.data.newNote);
      notes.value.totalNotes += 1;
      if (notes.value.notes.length > 10) notes.value.notes.pop();
      timerStore.initTimer();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    loading,
    notes,
    createNotes,
    getNotes,
  };
});
