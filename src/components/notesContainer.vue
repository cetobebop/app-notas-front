<template>
  <div>
    <div
      v-if="noteStore?.notes?.notes?.length || noteStore?.notes === null"
      class="container-notas"
    >
      <ItemNote
        v-if="!noteStore.loading || noteStore?.notes?.notes?.length"
        :notes="noteStore.notes.notes"
      ></ItemNote>

      <notesSkeleton
        v-if="
          (noteStore.loading || noteStore.loading === null) &&
          !noteStore?.notes?.notes?.length
        "
      ></notesSkeleton>
    </div>

    <div
      v-if="!noteStore?.notes?.notes?.length && noteStore.loading === false"
      class="mensaje q-px-md"
    >
      Vamos! crea una nota.
    </div>
    <div
      v-if="!noteStore?.notes?.notes?.length"
      style="height: 200px"
      class="espacio"
    ></div>
  </div>
</template>

<script setup>
import ItemNote from "./ItemNote.vue";
import notesSkeleton from "./notesSkeleton.vue";

import { useNoteStore } from "src/stores/noteStore";

const noteStore = useNoteStore();

noteStore.getNotes();
</script>

<style scoped>
.container-notas {
  gap: 4px;
  margin: 20px 20px 20px 0;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
}

.mensaje {
  font-size: 2em;
  position: fixed;
  left: 0;
  right: 0;
  width: fit-content;
  margin: 50px auto 0 auto;
  opacity: 0.3;
  font-weight: 700;
}

@media (max-width: 1023px) {
  .container-notas {
    margin: 20px;
  }
}

@media (max-width: 800px) {
  .container-notas {
    margin: 20px 10px;
  }
}

@media (max-width: 600px) {
  .container-notas {
    margin: 20px 2px;
  }

  .mensaje {
    font-size: 1.5em;
  }
}

@media (min-width: 1023px) {
  .espacio {
    display: none;
  }
}
</style>
