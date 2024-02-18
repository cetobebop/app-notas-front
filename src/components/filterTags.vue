<template>
  <div class="row justify-center content-center q-gutter-md">
    <q-select
      label-color="gray"
      color="grey"
      v-model="model"
      :options="options"
      label="Etiqueta"
      class="col-md-2 col-xs-10"
      @update:model-value="handleSelect"
    >
      <template v-slot:prepend>
        <q-badge rounded style="color" />
      </template>
    </q-select>
    <!-- <div class="col-md-3 col-xs-12 justify-center row">
      <q-chip
        v-model:selected="desert.a"
        color="black"
        text-color="white"
        icon="radio_button_unchecked"
      >
        Proximas
      </q-chip>
      <q-chip
        v-model:selected="desert.a"
        color="black"
        text-color="white"
        icon="radio_button_unchecked"
      >
        Lejanas
      </q-chip>
    </div> -->
  </div>
</template>

<script setup>
import { reactive, computed, ref, watchEffect } from "vue";

import { useFilterStore } from "src/stores/filterStore";
import { useTagStore } from "src/stores/tagStore";
import { useNoteStore } from "src/stores/noteStore";

const tagStore = useTagStore();
const filterStore = useFilterStore();
const noteStore = useNoteStore();

const options = ref([]);
const colorBadge = ref("red");

function handleSelect(tagSelected) {
  filterStore.selectedTags = [tagSelected.value];
  noteStore.getNotes(undefined, undefined, [tagSelected.value]);
}

watchEffect(() => {
  options.value = tagStore.tags.map((t) => {
    return { label: t.name, value: t._id };
  });
});

const desert = reactive({
  a: true,
  b: true,
});
const model = ref("Todos");

const selection = computed(() => {
  return Object.keys(desert)
    .filter((type) => desert[type] === true)
    .join(", ");
});
</script>

<style scoped>
.q-chip {
  align-self: center;
}
</style>
