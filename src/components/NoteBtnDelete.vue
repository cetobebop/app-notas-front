<template>
  <MyBtn
    style="background: rgb(87, 83, 83); color: #fff"
    size="xs"
    @click="onClick"
    icon="fa-solid fa-trash"
    v-close-popup
    class="absolute-top-left btn"
  ></MyBtn>
</template>

<script setup>
import { useNoteStore } from "src/stores/noteStore";

import MyBtn from "./MyBtn.vue";

const props = defineProps(["id"]);

const noteStore = useNoteStore();

function onClick() {
  noteStore.deleteNote(props.id);
}
</script>

<style scoped>
@media (max-width: 400px) {
  .btn {
    position: static;
  }
}
</style>
