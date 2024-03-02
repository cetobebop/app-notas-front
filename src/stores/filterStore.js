import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore("filterStore", () => {
  const model = ref("Todos");

  const selectedTags = ref([]);
  const selectedChip = ref([]);

  return {
    model,
    selectedTags,
    selectedChip,
  };
});
