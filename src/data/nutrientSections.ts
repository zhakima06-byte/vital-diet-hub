/** Empty groups are reserved for future content and are not shown in navigation. */
export const nutrientSections = [
  { key: "mineraux", label: "Minéraux", entries: [{ key: "zinc", label: "Zinc — aliments les plus riches en zinc" }] },
  { key: "proteines", label: "Protéines", entries: [] },
  { key: "glucides", label: "Glucides", entries: [] },
  { key: "lipides", label: "Lipides", entries: [] },
  { key: "fibres", label: "Fibres", entries: [] },
  { key: "vitamines", label: "Vitamines", entries: [] },
] as const;