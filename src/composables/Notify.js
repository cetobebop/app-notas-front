import { Notify } from "quasar";
import { useServerMsg } from "./errorServerMsg";

export const useNotify = (msg) => {
  const serverMsg = useServerMsg(msg);
  Notify.create({ message: serverMsg, color: "red" });
};
