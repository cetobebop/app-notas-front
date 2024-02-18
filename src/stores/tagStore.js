import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useTagStore = defineStore("tagStore", () => {
  const tags = ref([]);

  async function getTags() {
    try {
      const res = await api.get("tags/tag");

      tags.value = res.data.tags;
    } catch (error) {
      console.log(error);
      console.log("error store tag");
    }
  }

  return {
    tags,
    getTags,
  };
});
