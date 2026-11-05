/** Empty groups are reserved for future content and are not shown in navigation. */
export const nutrientSections = [
  { key: "mineraux", label: "Minéraux", entries: [
    { key: "zinc", label: "Zinc — aliments les plus riches en zinc", to: "/composition-nutritionnelle/mineraux/zinc" },
    { key: "fer", label: "Les aliments les plus riches en fer", to: "/composition-nutritionnelle/mineraux/fer" },
    { key: "magnesium", label: "Les aliments les plus riches en magnésium", to: "/composition-nutritionnelle/mineraux/magnesium" },
    { key: "selenium", label: "Les aliments les plus riches en sélénium", to: "/composition-nutritionnelle/mineraux/selenium" },
    { key: "calcium", label: "Les aliments les plus riches en calcium", to: "/composition-nutritionnelle/mineraux/calcium" },
    { key: "potassium", label: "Les aliments les plus riches en potassium", to: "/composition-nutritionnelle/mineraux/potassium" },
    { key: "iode", label: "Les aliments les plus riches en iode", to: "/composition-nutritionnelle/mineraux/iode" },
    { key: "cuivre", label: "Les aliments les plus riches en cuivre", to: "/composition-nutritionnelle/mineraux/cuivre" },
    { key: "manganese", label: "Les aliments les plus riches en manganèse", to: "/composition-nutritionnelle/mineraux/manganese" },
    { key: "chrome", label: "Les aliments les plus riches en chrome", to: "/composition-nutritionnelle/mineraux/chrome" },
    { key: "molybdene", label: "Les aliments les plus riches en molybdène", to: "/composition-nutritionnelle/mineraux/molybdene" },
    { key: "phosphore", label: "Les aliments les plus riches en phosphore", to: "/composition-nutritionnelle/mineraux/phosphore" },
    { key: "sodium", label: "Teneur en sodium — aliments à limiter", to: "/composition-nutritionnelle/mineraux/sodium" },
  ] },
  { key: "proteines", label: "Protéines", entries: [] },
  { key: "glucides", label: "Glucides", entries: [] },
  { key: "lipides", label: "Lipides", entries: [] },
  { key: "fibres", label: "Fibres", entries: [] },
  { key: "vitamines", label: "Vitamines", entries: [] },
] as const;