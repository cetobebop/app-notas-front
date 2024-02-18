<template>
  <div>
    <optionPanelBtn
      name-icon="description"
      message="Ver Todas"
      @click="onClick"
    ></optionPanelBtn>
  </div>
</template>

<script setup>
import optionPanelBtn from "./optionPanelBtn.vue";

import { useNoteStore } from "src/stores/noteStore";

const noteStore = useNoteStore();

function onClick() {
  try {
    noteStore.getNotes();
  } catch (error) {
    console.log(error);
  }
}
</script>
