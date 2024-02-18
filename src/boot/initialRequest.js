import { boot } from "quasar/wrappers";
import { useTagStore } from "src/stores/tagStore";

export default boot(async (/* { app, router, ... } */) => {
  const tagStore = useTagStore();
  tagStore.getTags();
});
