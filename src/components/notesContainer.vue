<template>
  <div class="container-notas">
    <ItemNote
      v-if="!noteStore.loading"
      :notes="noteStore.notes.notes"
    ></ItemNote>
    <notesSkeleton v-if="noteStore.loading"></notesSkeleton>
  </div>
</template>

<script setup>
import ItemNote from "./ItemNote.vue";
import notesSkeleton from "./notesSkeleton.vue";

import { useNoteStore } from "src/stores/noteStore";

const noteStore = useNoteStore();

try {
  noteStore.getNotes();
} catch (error) {
  console.log(error);
  console.log("error en notes container");
}
</script>

<style scoped>
.container-notas {
  gap: 4px;
  margin: 20px 20px 20px 0;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
}
</style>
