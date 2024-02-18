<template>
  <q-dialog>
    <q-card style="min-width: 50%; min-height: 200px">
      <q-card-section>
        <div class="text-dark">
          <q-list
            dark
            bordered
            separator
            style="max-width: 318px"
            v-for="note in notes"
            :key="note._id"
          >
            <q-item v-ripple>
              <q-item-section
                class="text-dark text-text-weight-bold"
                style="font-size: 1.3em"
                >{{ note.title }}</q-item-section
              >
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  notes: {
    type: Array,
    default: () => [{ title: "Sin notificaciones" }],
  },
});
</script>
