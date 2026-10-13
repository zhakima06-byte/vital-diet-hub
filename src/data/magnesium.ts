/** Teneurs indicatives en magnésium : USDA FoodData Central (SR Legacy), mg/100 g ; eaux minérales : étiquettes fabricants, mg/L. */
export const magnesiumCategories = [
  { key: "graines", label: "Graines" },
  { key: "fruits-coque", label: "Fruits à coque" },
  { key: "cacao", label: "Cacao / chocolat" },
  { key: "cereales", label: "Céréales" },
  { key: "legumineuses", label: "Légumineuses" },
  { key: "legumes", label: "Légumes verts" },
  { key: "eaux", label: "Eaux minérales" },
];

export const alimentsMagnesium = [
  { nom: "Son de blé", categorie: "cereales", valeur: 611, etat: "Cru" },
  { nom: "Graines de courge", categorie: "graines", valeur: 592, etat: "Séché" },
  { nom: "Cacao en poudre non sucré", categorie: "cacao", valeur: 499, etat: "Poudre" },
  { nom: "Noix du Brésil", categorie: "fruits-coque", valeur: 376, etat: "Séché" },
  { nom: "Graines de sésame", categorie: "graines", valeur: 351, etat: "Séché" },
  { nom: "Graines de chia", categorie: "graines", valeur: 335, etat: "Séché" },
  { nom: "Noix de cajou", categorie: "fruits-coque", valeur: 292, etat: "Cru" },
  { nom: "Amandes", categorie: "fruits-coque", valeur: 270, etat: "Cru" },
  { nom: "Chocolat noir 70–85 %", categorie: "cacao", valeur: 228, etat: "Prêt à consommer" },
  { nom: "Flocons d’avoine", categorie: "cereales", valeur: 177, etat: "Cru" },
  { nom: "Farine de blé complète", categorie: "cereales", valeur: 137, etat: "Cru" },
  { nom: "Épinards", categorie: "legumes", valeur: 87, etat: "Cuit" },
  { nom: "Épinards", categorie: "legumes", valeur: 79, etat: "Cru" },
  { nom: "Haricots noirs", categorie: "legumineuses", valeur: 70, etat: "Cuit" },
  { nom: "Pois chiches", categorie: "legumineuses", valeur: 48, etat: "Cuit" },
  { nom: "Lentilles", categorie: "legumineuses", valeur: 36, etat: "Cuit" },
];

/** Eaux : affichées à part, en mg/L (non comparables aux mg/100 g). */
export const eauxMagnesium = [
  { nom: "Rozana", categorie: "eaux", valeur: 160, etat: "Eau minérale", unite: "mg/L" },
  { nom: "Hépar", categorie: "eaux", valeur: 119, etat: "Eau minérale", unite: "mg/L" },
  { nom: "Quézac", categorie: "eaux", valeur: 95, etat: "Eau gazeuse", unite: "mg/L" },
  { nom: "Badoit", categorie: "eaux", valeur: 85, etat: "Eau gazeuse", unite: "mg/L" },
];

export const sourceMagnesium = "USDA FoodData Central (SR Legacy) pour les aliments ; étiquettes des fabricants pour les eaux. Valeurs indicatives arrondies, à confronter à la table CIQUAL (ANSES).";
