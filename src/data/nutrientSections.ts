/** Empty groups are reserved for future content and are not shown in navigation. */
export const nutrientSections = [
  { key: "mineraux", label: "Minéraux", entries: [
    { key: "zinc", label: "Zinc — aliments les plus riches en zinc", to: "/composition-nutritionnelle/mineraux/zinc" },
    { key: "fer", label: "Les aliments les plus riches en fer", to: "/composition-nutritionnelle/mineraux/fer" },
    { key: "magnesium", label: "Les aliments les plus riches en magnésium", to: "/composition-nutritionnelle/mineraux/magnesium" },
    { key: "selenium", label: "Les aliments les plus riches en sélénium", to: "/composition-nutritionnelle/mineraux/selenium" },
  ] },
  { key: "proteines", label: "Protéines", entries: [] },
  { key: "glucides", label: "Glucides", entries: [] },
  { key: "lipides", label: "Lipides", entries: [] },
  { key: "fibres", label: "Fibres", entries: [] },
  { key: "vitamines", label: "Vitamines", entries: [] },
] as const;