<template>
  <div class="full-width option-container">
    <addNote></addNote>
    <getNotes></getNotes>
    <logoutSession></logoutSession>
  </div>
</template>

<script setup>
import addNote from "./addNote.vue";
import getNotes from "./getNotes.vue";
import logoutSession from "./logoutSession.vue";
</script>

<style scoped>
.option-container {
  margin-top: 20px;
  padding-right: 5px;
}

.option-container div {
  cursor: pointer;
  transition: 0.6s;
  border-radius: 5px;
}

.option-container div:hover {
  background: #ddd;
  transition: 0.6s;
}
</style>
