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
    else if (val.length < 6) return "Password necesita mas de 5 caracteres";
  };

  return {
    vEmail,
    vPassword,
  };
};
