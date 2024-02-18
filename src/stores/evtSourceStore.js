import { defineStore } from "pinia";

import { useNotificationStore } from "./notifications";

export const useEvtSourceStore = defineStore("completedNotesStore", () => {
  const notificationStore = useNotificationStore();

  let evtSource;

  async function notesServerEvent() {
    const idUser = localStorage.getItem("user");
    alert("se ejecuto el eventSource");
    try {
      evtSource = new EventSource(
        process.env.URL_SERVER + `/notes/note_event/${idUser}`
      );

      evtSource.addEventListener("message", (e) => {
        console.log("event");
        console.log(e.data);

        notificationStore.notificationsLength += 1;
      });

      window.addEventListener("beforeunload", () => {
        evtSource.close();
      });
    } catch (error) {
      console.log(error);
      console.log("error store completed notes");
    }
  }

  function closeEventSource() {
    evtSource.close();
  }

  return {
    closeEventSource,
    notesServerEvent,
  };
});
