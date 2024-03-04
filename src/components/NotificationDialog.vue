<template>
  <q-dialog>
    <q-card style="min-width: 70%; min-height: 200px">
      <q-card-section>
        <h1>Completadas</h1>

        <div v-if="!notes.length" class="full-width row justify-center q-my-md">
          <q-spinner color="dark" size="8em" />
        </div>

        <div v-if="notes.length" class="text-dark">
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
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const props = defineProps({
  notes: {
    type: Array,
    default: () => [{ title: "Sin notificaciones" }],
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
