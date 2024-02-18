import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore("filterStore", () => {
  const selectedTags = ref([]);
  const selectedChip = ref([]);

  return {
    selectedTags,
    selectedChip,
  };
});
