<template>
  <q-toolbar style="height: 8vh">
    <q-toolbar-title class="text-weight-bold q-ml-sm"> Nota </q-toolbar-title>
    <NotificationsMenu class="q-mr-sm"></NotificationsMenu>
    <q-input
      standout="bg-dark text-white"
      placeholder="Buscar"
      v-model="textSearch"
    >
      <template v-slot:append>
        <q-icon name="search" class="cursor-pointer" @click="onClick" />
      </template>
    </q-input>
  </q-toolbar>
</template>

<script setup>
import { useNoteStore } from "src/stores/noteStore";
import { ref } from "vue";

import NotificationsMenu from "./NotificationsMenu.vue";

const noteStore = useNoteStore();

const textSearch = ref(null);

function onClick() {
  try {
    noteStore.getNotes(undefined, undefined, undefined, textSearch.value);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.q-input {
  width: 20%;
}

@media (max-width: 600px) {
  .q-input {
    width: 50%;
  }
}
</style>
