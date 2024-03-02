<template>
  <div>
    <optionPanelBtn
      name-icon="add_circle"
      message="Nueva Nota"
      @click="value = true"
    ></optionPanelBtn>
    <div>
      <q-dialog :model-value="value" @hide="value = false" persistent>
        <q-card style="min-width: 50%; min-height: 200px" class="row bg">
          <q-card-section class="col-12">
            <addNoteForm></addNoteForm>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import addNoteForm from "./addNoteForm.vue";
import optionPanelBtn from "./optionPanelBtn.vue";

const value = ref(false);
</script>
