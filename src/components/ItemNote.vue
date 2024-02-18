<template>
  <transition-group
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div
      v-for="(note, index) in notes"
      class="row items q-my-none justify-between container-note cursor-pointer"
      :key="index"
    >
      <span class="text-h6">{{ note.title }}</span>

      <CircularProgress
        :timeLeft="note.timeLeft"
        :totalSeconds="note.totalSeconds"
      />
    </div>
  </transition-group>
</template>

<script setup>
import { watchEffect } from "vue";

import CircularProgress from "./CircularProgress.vue";
import { useTimerStore } from "src/stores/timerStore";

const timerStore = useTimerStore();
const props = defineProps(["notes"]);

timerStore.initTimer();

watchEffect(() => {
  props.notes;
});
</script>

<style scoped>
.container-note {
  align-items: center;
}

.cosa {
  justify-self: end;
}
.items {
  height: 60px;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 2px solid #e5e7eb;
}
</style>
