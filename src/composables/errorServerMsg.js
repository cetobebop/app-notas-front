const msgList = [
  { eng: "already exist", esp: "El correo ya existe" },
  { eng: "not exist", esp: "El correo no existe" },
  { eng: "not found", esp: "No encontrado" },
];

export function useServerMsg(msg, code) {
  const msgFound = msgList.filter((m) => msg === m.eng);
  if (msgFound.length) return msgFound[0].esp;

  return "Ha ocurrido un error";
}
