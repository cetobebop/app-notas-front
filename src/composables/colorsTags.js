import { useTagStore } from "src/stores/tagStore";
import { watchEffect } from "vue";

const tagStore = useTagStore();

let obj = {};

watchEffect(() => {
  for (const tag of tagStore.tags) {
    obj[tag._id] = tag.color;
  }
});

export const colors = obj;
