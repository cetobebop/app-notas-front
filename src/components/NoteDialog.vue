<template>
  <q-dialog @show="onShow">
    <q-card style="min-width: 50%; min-height: 200px" class="bg-white">
      <q-card-section>
        <q-form
          class="column overflow-hidden add-notes-form"
          @submit.prevent="onSubmit"
        >
          <input
            type="text"
            placeholder="Sin Título"
            id="title"
            class="titulo q-ma-md q-mb-sm"
            v-model="computedTitle"
            maxlength="50"
          />
          <textarea
            class="text-area q-ma-md"
            placeholder="Sin Descripción"
            id="message"
            cols="30"
            rows="10"
            v-model="computedMessage"
            maxlength="100"
          ></textarea>
          <div
            class="full-width row justify-center text-weight-regular q-py-sm"
            style="font-size: 4em"
          >
            <div>{{ min }}</div>
            :
            <div>{{ seconds }}</div>
          </div>

          <div
            class="full-width row justify-end q-mt-md relative-position container-btn-dialog"
          >
            <NoteBtnDelete
              :id="note._id"
              class="btn-dialog btn-delete"
            ></NoteBtnDelete>

            <MyBtnClose></MyBtnClose>
            <MyBtn
              type="submit"
              label="Actualizar"
              class="q-ml-sm btn-dialog"
              :loading="noteStore.loading"
            ></MyBtn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import moment from "moment";
import { useQuasar } from "quasar";

import MyBtn from "./MyBtn.vue";
import MyBtnClose from "./MyBtnClose.vue";
import NoteBtnDelete from "./NoteBtnDelete.vue";

import { useNoteStore } from "src/stores/noteStore";
import { computed } from "vue";
import { watchEffect } from "vue";

const $q = useQuasar();
const noteStore = useNoteStore();
const props = defineProps(["note", "timer"]);

const noteToUpdate = ref(null);
const duration = ref(null);
const min = ref(null);
const seconds = ref(null);

watchEffect(() => {
  duration.value = moment.duration(props.timer?.timeLeft, "seconds");
  min.value = duration.value.minutes() * -1;
  seconds.value =
    `${duration.value.seconds() * -1}`.length < 2
      ? `0${duration.value.seconds() * -1}`
      : `${duration.value.seconds() * -1}`;
});

const computedTitle = computed({
  get: () => props.note.title,
  set: (newTitle) => {
    noteToUpdate.value.title = newTitle;
  },
});

const computedMessage = computed({
  get: () => props.note.message,
  set: (newMessage) => {
    noteToUpdate.value.message = newMessage;
  },
});
async function onShow() {
  noteToUpdate.value = props.note;
}

async function onSubmit() {
  try {
    await noteStore.updateNote(noteToUpdate.value);
    $q.notify({
      message: "Nota actualizada",
      color: "green-8",
    });
  } catch (error) {
    $q.notify({
      message: "Ha ocurrido un error",
      color: "red-8",
    });
  }
}
</script>

<style scoped>
.add-notes-form {
  width: 100%;
  box-sizing: border-box;
}

input {
  outline: none;
  border: none;
  font-weight: 700;
  width: 90%;
}

textarea {
  font-size: 1.2em;
  outline: none;
  border: none;
  font-weight: 700;
  width: 90%;
}

input::placeholder {
  opacity: 0.3;
}
textarea::placeholder {
  opacity: 0.3;
}
.titulo {
  font-size: 2em;
}

.q-select:deep(.q-field__label) {
  font-weight: 900;
  font-size: 1.5em;
  opacity: 0.25;
  padding-bottom: 0.5em;
}

@media (max-width: 400px) {
  .titulo {
    font-size: 0.9em;
  }

  .text-area {
    font-size: 0.8em;
  }

  .container-btn-dialog {
    gap: 6px;
  }
  .btn-dialog {
    width: 40%;
    font-size: 0.7em;
  }

  .btn-delete {
    width: 20%;
    position: relative;
    left: -30%;
  }
}
</style>
