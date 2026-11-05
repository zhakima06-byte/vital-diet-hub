/** Teneurs indicatives en calcium : USDA FoodData Central (SR Legacy), mg/100 g ; eaux minérales : étiquettes fabricants, mg/L. */
export const calciumCategories = [
  { key: "fromages", label: "Fromages" },
  { key: "laitiers", label: "Laits / yaourts" },
  { key: "poissons", label: "Poissons" },
  { key: "graines", label: "Graines" },
  { key: "fruits-coque", label: "Fruits à coque" },
  { key: "legumineuses", label: "Légumineuses / soja" },
  { key: "legumes", label: "Légumes verts" },
];

export const alimentsCalcium = [
  { nom: "Parmesan", categorie: "fromages", valeur: 1184, etat: "Préparé" },
  { nom: "Graines de sésame entières", categorie: "graines", valeur: 975, etat: "Séché" },
  { nom: "Emmental", categorie: "fromages", valeur: 791, etat: "Préparé" },
  { nom: "Cheddar", categorie: "fromages", valeur: 711, etat: "Préparé" },
  { nom: "Graines de chia", categorie: "graines", valeur: 631, etat: "Séché" },
  { nom: "Tahini (purée de sésame)", categorie: "graines", valeur: 426, etat: "Préparé" },
  { nom: "Sardines à l’huile, avec arêtes", categorie: "poissons", valeur: 382, etat: "Égoutté" },
  { nom: "Tofu au sulfate de calcium*", categorie: "legumineuses", valeur: 350, etat: "Cru" },
  { nom: "Amandes", categorie: "fruits-coque", valeur: 269, etat: "Cru" },
  { nom: "Chou kale", categorie: "legumes", valeur: 150, etat: "Cru" },
  { nom: "Épinards (calcium peu absorbé)", categorie: "legumes", valeur: 136, etat: "Cuit" },
  { nom: "Yaourt nature au lait entier", categorie: "laitiers", valeur: 121, etat: "Préparé" },
  { nom: "Lait entier", categorie: "laitiers", valeur: 113, etat: "Cru" },
  { nom: "Soja, graines", categorie: "legumineuses", valeur: 102, etat: "Cuit" },
  { nom: "Haricots blancs", categorie: "legumineuses", valeur: 90, etat: "Cuit" },
  { nom: "Brocoli", categorie: "legumes", valeur: 47, etat: "Cru" },
];

export const eauxCalcium = [
  { nom: "Hépar", categorie: "eaux", valeur: 549, etat: "Eau minérale", unite: "mg/L" },
  { nom: "Courmayeur", categorie: "eaux", valeur: 517, etat: "Eau minérale", unite: "mg/L" },
  { nom: "Contrex", categorie: "eaux", valeur: 468, etat: "Eau minérale", unite: "mg/L" },
  { nom: "San Pellegrino", categorie: "eaux", valeur: 174, etat: "Eau gazeuse", unite: "mg/L" },
];

export const sourceCalcium = "USDA FoodData Central (SR Legacy) pour les aliments ; étiquettes des fabricants pour les eaux. Valeurs indicatives arrondies, à confronter à la table CIQUAL (ANSES). *La teneur du tofu dépend de sa fabrication (sel de calcium ou non).";
