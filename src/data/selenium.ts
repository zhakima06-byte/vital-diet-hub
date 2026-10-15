/** Teneurs indicatives en sélénium (µg/100 g), USDA FoodData Central (SR Legacy). Fortement variables selon les sols, l'alimentation animale et l'origine. */
export const seleniumCategories = [
  { key: "fruits-coque", label: "Fruits à coque" },
  { key: "poissons", label: "Poissons" },
  { key: "fruits-mer", label: "Fruits de mer" },
  { key: "abats", label: "Abats" },
  { key: "viandes", label: "Viandes / volailles" },
  { key: "oeufs", label: "Œufs" },
  { key: "laitiers", label: "Produits laitiers" },
  { key: "cereales", label: "Céréales / pain" },
  { key: "legumineuses", label: "Légumineuses" },
];

export const alimentsSelenium = [
  { nom: "Noix du Brésil", categorie: "fruits-coque", valeur: 1917, etat: "Séché" },
  { nom: "Thon albacore", categorie: "poissons", valeur: 108, etat: "Cuit" },
  { nom: "Thon en conserve au naturel", categorie: "poissons", valeur: 80, etat: "Égoutté" },
  { nom: "Huîtres", categorie: "fruits-mer", valeur: 64, etat: "Cru" },
  { nom: "Farine de blé complète", categorie: "cereales", valeur: 62, etat: "Cru" },
  { nom: "Foie de volaille", categorie: "abats", valeur: 55, etat: "Cru" },
  { nom: "Sardines à l’huile", categorie: "poissons", valeur: 53, etat: "Égoutté" },
  { nom: "Crevettes", categorie: "fruits-mer", valeur: 50, etat: "Cuit" },
  { nom: "Saumon d’élevage", categorie: "poissons", valeur: 41, etat: "Cuit" },
  { nom: "Foie de bœuf", categorie: "abats", valeur: 40, etat: "Cru" },
  { nom: "Blanc de poulet", categorie: "viandes", valeur: 32, etat: "Cuit" },
  { nom: "Œuf entier", categorie: "oeufs", valeur: 31, etat: "Cru" },
  { nom: "Cheddar", categorie: "laitiers", valeur: 29, etat: "Préparé" },
  { nom: "Bœuf haché", categorie: "viandes", valeur: 21, etat: "Cuit" },
  { nom: "Lait entier", categorie: "laitiers", valeur: 3.7, etat: "Cru" },
  { nom: "Pois chiches", categorie: "legumineuses", valeur: 3.7, etat: "Cuit" },
  { nom: "Lentilles", categorie: "legumineuses", valeur: 2.8, etat: "Cuit" },
];

export const sourceSelenium = "USDA FoodData Central (SR Legacy). Valeurs indicatives arrondies, non universelles : à confronter à la table CIQUAL (ANSES).";
