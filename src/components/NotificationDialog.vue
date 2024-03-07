<template>
  <q-dialog>
    <q-card style="min-width: 70%; min-height: 200px">
      <q-card-section class="q-pa-lg">
        <h1>Completadas</h1>

        <div
          v-if="notificationStore.loading"
          class="full-width row justify-center q-my-md"
        >
          <q-spinner color="dark" size="8em" />
        </div>

        <div
          v-if="notificationStore.loading === false && !notes.length"
          class="text-center q-mt-lg text-weight-regular"
          style="font-size: 1.5em; opacity: 0.3"
        >
          No hay nada
        </div>

        <div
          v-if="notes.length && !notificationStore.loading"
          class="text-dark"
        >
          <q-list
            dark
            bordered
            separator
            style="max-width: 318px"
            v-for="note in notes"
            :key="note._id"
          >
            <q-item clickable v-ripple class="q-py-md">
              <q-item-section
                class="text-dark text-text-weight-bold"
                style="font-size: 1.3em"
              >
                <q-item-label>
                  {{ note.title }}
                </q-item-label>
                <q-item-label class="text-dark text-text-weight-bold" caption>{{
                  note.message
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div
            v-if="notesLength !== notes.length"
            class="q-pa-md text-weight-bold"
            style="opacity: 0.3; font-size: 1.3em"
          >
            {{ Math.abs(notes.length - notesLength) }}
            notificaciones eliminadas
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useNotificationStore } from "src/stores/notifications";

const notificationStore = useNotificationStore();

const props = defineProps({
  notes: {
    type: Array,
    default: () => [{ title: "Sin notificaciones" }],
  },
  notesLength: {
    type: Number,
  },
});
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 2em;
  height: fit-content;
  line-height: normal;
}
</style>
