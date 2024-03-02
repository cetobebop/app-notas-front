<template>
  <filterTags class="q-mt-md"></filterTags>

  <div class="row container">
    <div class="col-xs-12 col-sm-12 col-md-2 col-lg-1 col-2 container-data">
      <optionsNotes></optionsNotes>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-8 container-notas">
      <notesContainer></notesContainer>
    </div>
  </div>
  <notesPagination class="q-mb-md"></notesPagination>
</template>

<script setup>
import notesContainer from "./notesContainer.vue";
import optionsNotes from "./optionsNotes.vue";
import filterTags from "./filterTags.vue";
import notesPagination from "./notesPagination.vue";
</script>

<style scoped>
.container {
  width: 100%;
}

@media (max-width: 1023px) {
  .container {
    height: auto;
  }
  .container-data {
    height: auto;
  }
}
</style>
