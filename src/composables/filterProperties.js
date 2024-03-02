export function useFilterProperties(properties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([k, v]) => {
      if (typeof v !== "string" && v) return true;
      if (typeof v === "string") {
        if (v.trim()) return true;
      }
    })
  );
}
