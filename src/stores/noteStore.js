import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

import { useUserStore } from "./userStore";
import { useTimerStore } from "./timerStore";
import { useReplaceArrayItem } from "src/composables/replaceArrayItem";
import { useFilterProperties } from "src/composables/filterProperties";

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
      notes.value = data;
    } catch (error) {
      console.log(error);
      console.log("error store notes");
    } finally {
      loading.value = false;
    }
  }

  async function createNotes(title, alertIn, message, tag) {
    const parameters = {
      title,
      alertIn,
      message,
      tag,
    };

    const data = useFilterProperties(parameters);

    try {
      const res = await api.post("/notes/note", data, {
        headers: {
          x_access_token: userStore.token,
        },
      });
      notes.value.notes.unshift(res.data.newNote);
      notes.value.totalNotes += 1;
      if (notes.value.notes.length > 10) notes.value.notes.pop();
      timerStore.initTimer();
    } catch (error) {
      throw new Error(error.response);
    }
  }

  async function getOneNote(_id) {
    try {
      const res = await api.post(
        `/notes/note/${_id}`,
        {},
        {
          headers: {
            x_access_token: userStore.token,
          },
        }
      );

      return res.data?.note;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(_id) {
    try {
      await api.delete(`/notes/note/${_id}`, {
        headers: {
          x_access_token: userStore.token,
        },
      });

      notes.value.notes = notes.value.notes.filter((n) => n._id !== _id);
    } catch (error) {
      console.log("error en delete");
      console.log(error.response);
    }
  }

  async function updateNote(noteToUpdate) {
    try {
      const data = useFilterProperties(noteToUpdate);

      const res = await api.patch(`/notes/note/${noteToUpdate._id}`, data, {
        headers: {
          x_access_token: userStore.token,
        },
      });

      useReplaceArrayItem(notes.value.notes, res.data.updateNote);
    } catch (error) {
      console.log(error);
      throw new Error(error.response);
    }
  }

  return {
    loading,
    notes,
    createNotes,
    getNotes,
    getOneNote,
    updateNote,
    deleteNote,
  };
});
