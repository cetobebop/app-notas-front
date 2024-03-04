<template>
  <transition-group
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div
      v-for="(note, index) in notes"
      class="row items q-my-none container-note cursor-pointer"
      :key="index"
    >
      <div class="justify-between full-width row" @click="onClick(note)">
        <div>
          <q-badge rounded :color="colors[note.tag]" class="q-mr-md" />
          <span
            >{{ note.title?.slice(0, n) }}
            <b v-if="note.title.length >= n">...</b></span
          >
        </div>

        <CircularProgress
          :timeLeft="note.timeLeft"
          :totalSeconds="note.totalSeconds"
        />

        <p style="font-size: 1.2em; margin-bottom: 0" class="col-12 q-mt-md">
          {{ note.message.slice(0, 36) }}
        </p>
      </div>

      <q-resize-observer @resize="onResize" />
    </div>
  </transition-group>

  <NoteDialog
    :note="note"
    :timer="timer"
    :model-value="active"
    @hide="onHide"
  ></NoteDialog>
</template>

<script setup>
import { watchEffect } from "vue";

import CircularProgress from "./CircularProgress.vue";
import NoteDialog from "./NoteDialog.vue";
import { useTimerStore } from "src/stores/timerStore";
import { colors } from "src/composables/colorsTags";
import { ref } from "vue";

const timerStore = useTimerStore();
const props = defineProps(["notes"]);

timerStore.initTimer();

const n = ref(100);
const report = ref({});
const active = ref(false);
const note = ref(null);
const timer = ref(null);

function onResize(size) {
  report.value = size;
}

function onHide() {
  note.value = null;
  active.value = false;
}

watchEffect(() => {
  if (report.value.width < 600) {
    n.value = 19;
  } else n.value = 100;
});

function onClick(noteClicked) {
  timer.value = noteClicked;
  note.value = JSON.parse(JSON.stringify(noteClicked));
  active.value = true;
}
</script>

<style scoped>
.container-note {
  align-items: center;
}

span {
  font-size: 1.5em;
}

.cosa {
  justify-self: end;
}
.items {
  height: 100px;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 2px solid #e5e7eb;
}

@media (max-width: 800px) {
  p {
    font-size: 1;
  }
  span {
    font-size: 1.3em;
  }
}

@media (max-width: 600px) {
  p {
    font-size: 0.7;
    display: none;
  }
  span {
    font-size: 1em;
  }

  .items {
    height: 60px;
  }
}
</style>
