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
import { useFilterStore } from "src/stores/filterStore";

const noteStore = useNoteStore();
const filterStore = useFilterStore();

function onClick() {
  try {
    noteStore.getNotes();
    filterStore.selectedTags = [];
    filterStore.model = "Todos";
  } catch (error) {
    console.log(error);
  }
}
</script>
