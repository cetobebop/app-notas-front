import { defineStore } from "pinia";
import moment from "moment";

import { useNoteStore } from "./noteStore";
import { ref } from "vue";

export const useTimerStore = defineStore("timerStore", () => {
  const noteStore = useNoteStore();

  const intervalId = ref(null);

  function initTimer() {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      console.log("interval reiniciado");
    }
    const obtainTime = (isfirstTime) => {
      for (let i = 0; i < noteStore.notes.notes.length; i++) {
        noteStore.notes.notes[i].timeLeft = moment().diff(
          noteStore.notes.notes[i].alertIn,
          "s"
        );

        if (isfirstTime) {
          noteStore.notes.notes[i].totalSeconds = moment(
            noteStore.notes.notes[i].alertIn
          ).diff(noteStore.notes.notes[i].createdAt, "s");
        }
        if (noteStore.notes.notes[i]?.timeLeft >= 0) {
          noteStore.notes.notes[i].timeLeft = 0;
          continue;
        }
      }
    };
    obtainTime(true);
    intervalId.value = setInterval(obtainTime, 1000);
  }

  return {
    initTimer,
  };
});
