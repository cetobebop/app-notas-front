<template>
  <q-pagination
    @update:model-value="paginationHandle"
    v-model="current"
    :max="max"
    :min="1"
    direction-links
    flat
    color="grey"
    active-color="grey"
    class="row justify-center"
  />
</template>

<script setup>
import { ref, watchEffect } from "vue";

import { useNoteStore } from "src/stores/noteStore";
import { useFilterStore } from "src/stores/filterStore";

const noteStore = useNoteStore();
const filterStore = useFilterStore();
const max = ref(null);
const current = ref(parseInt(sessionStorage.getItem("pagination") || 1));

watchEffect(() => {
  max.value = Math.ceil(noteStore.notes.totalNotes / 10);
});

async function paginationHandle(value) {
  await noteStore.getNotes((value - 1) * 10, 10, filterStore.selectedTags);
  sessionStorage.setItem("pagination", value);
}
</script>
