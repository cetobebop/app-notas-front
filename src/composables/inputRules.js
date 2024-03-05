export const useRules = () => {
  const vEmail = (val) => {
    if (!val) return "Requerido";
    else if (/\s/.test(val)) return "Sin espacios en blanco";
    else if (val.length < 5) return "Email necesita mas de 5 caracteres";
    else if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val))
      return "Email formato incorrecto";
  };

  const vPassword = (val) => {
    if (!val) return "Requerido";
    else if (/\s/.test(val)) return "Sin espacios en blanco";
    else if (val.length < 7) return "Password necesita mas de 6 caracteres";
  };

  const vTitleNote = (val) => {
    if (!val) return "Requerido";
    else if (val.length > 50)
      return "Titulo no puede sobrepasar los 50 caracteres";
  };

  const vMessageNote = (val) => {
    if (!val) return "Requerido";
    else if (val.length > 100)
      return "Titulo no puede sobrepasar los 100 caracteres";
  };

  return {
    vEmail,
    vPassword,
    vTitleNote,
    vMessageNote,
  };
};
