<template>
  <q-form
    class="column overflow-hidden add-notes-form"
    @submit.prevent="onSubmit"
  >
    <input
      type="text"
      placeholder="Sin Título"
      class="titulo q-ma-md q-mb-sm"
      v-model="title"
      maxlength="50"
    />

    <textarea
      class="text-area q-ma-md"
      placeholder="Sin Descripción"
      name=""
      id=""
      cols="30"
      rows="10"
      v-model="description"
      maxlength="100"
    ></textarea>

    <div class="row q-ma-md">
      <q-select
        class="col-xs-12 col-7 q-mr-lg"
        color="dark"
        borderless
        v-model="timeSelect"
        :options="time"
        label-color="dark"
        label="Tiempo"
      />
      <q-select
        class="col-xs-12 col-3"
        color="dark"
        borderless
        v-model="categorySelect"
        :options="category"
        label-color="dark"
        label="Categoria"
      />
    </div>

    <div class="full-width row justify-end">
      <MyBtnClose></MyBtnClose>

      <MyBtn
        type="submit"
        label="Crear"
        class="q-ml-sm"
        :loading="noteStore.loadingOthersRequest"
      ></MyBtn>
    </div>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import moment from "moment";
import { useQuasar } from "quasar";

import MyBtn from "./MyBtn.vue";
import MyBtnClose from "./MyBtnClose.vue";
import { useTagStore } from "src/stores/tagStore";
import { useNoteStore } from "../stores/noteStore";

const $q = useQuasar();
const category = ref([]);
const tagStore = useTagStore();
const noteStore = useNoteStore();

tagStore.tags.map((e) => {
  category.value.push({
    label: e.name,
    value: e._id,
  });
});

const time = [
  {
    label: "1 minuto",
    value: 1,
  },
  {
    label: "2 minutos",
    value: 2,
  },
  {
    label: "5 minutos",
    value: 5,
  },
  {
    label: "10 minutos",
    value: 10,
  },
];

const timeSelect = ref({
  label: "1 minuto",
  value: 1,
});

const defaultCategory = category.value.findIndex(
  (e) => e.label === "Sin marcar"
);

const categorySelect = ref({
  label: category.value[defaultCategory].label,
  value: category.value[defaultCategory].value,
});

const title = ref(null);
const description = ref(null);

async function onSubmit() {
  const date = moment().add(timeSelect.value.value, "m").format();

  try {
    await noteStore.createNotes(
      title.value,
      date,
      description.value,
      categorySelect.value.value
    );
    $q.notify({
      message: "Nota creada",
      color: "green-8",
    });
  } catch (error) {
    $q.notify({
      message: "Hubo un error",
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
  font-weight: 900;
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
}
</style>
