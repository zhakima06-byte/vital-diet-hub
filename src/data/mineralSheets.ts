import type { MineralRow } from "@/components/MineralTable";

export interface MineralSheetData { key: string; name: string; unit: string; references: number[]; role: string; rows: MineralRow[]; warning: string; limit?: boolean }

export const mineralFoodCategories = [{"key": "fruits", "label": "Fruits"}, {"key": "legumes", "label": "Légumes / algues"}, {"key": "legumineuses", "label": "Légumineuses"}, {"key": "cereales", "label": "Céréales"}, {"key": "viandes-poissons", "label": "Viandes / poissons"}, {"key": "laitiers", "label": "Produits laitiers"}, {"key": "graines", "label": "Fruits à coque / graines"}, {"key": "oeufs", "label": "Œufs"}, {"key": "autres", "label": "Autres / condiments"}];

export const mineralSheets: Record<string, MineralSheetData> = {
  "potassium": {
    "key": "potassium",
    "name": "potassium",
    "unit": "mg",
    "references": [
      3500
    ],
    "role": "Il participe au fonctionnement des muscles et des nerfs et à l’équilibre hydrique.",
    "warning": "En cas de maladie rénale ou de traitement modifiant le potassium sanguin, les apports doivent être individualisés avec un professionnel de santé.",
    "limit": false,
    "rows": [
      {
        "nom": "Poudre de cacao non sucrée",
        "categorie": "autres",
        "valeur": 1524,
        "etat": "Poudre",
        "base": "100 g"
      },
      {
        "nom": "Tomates séchées",
        "categorie": "legumes",
        "valeur": 1165,
        "etat": "Séché",
        "base": "100 g"
      },
      {
        "nom": "Pruneaux",
        "categorie": "fruits",
        "valeur": 732,
        "etat": "Séché",
        "base": "100 g"
      },
      {
        "nom": "Épinards cuits",
        "categorie": "legumes",
        "valeur": 558,
        "etat": "Cuit",
        "base": "100 g"
      },
      {
        "nom": "Haricots blancs cuits",
        "categorie": "legumineuses",
        "valeur": 561,
        "etat": "Cuit",
        "base": "100 g"
      },
      {
        "nom": "Banane",
        "categorie": "fruits",
        "valeur": 358,
        "etat": "Cru",
        "base": "100 g"
      },
      {
        "nom": "Pomme de terre cuite (purée)",
        "categorie": "legumes",
        "valeur": 421,
        "etat": "Cuit",
        "base": "100 g"
      },
      {
        "nom": "Avocat",
        "categorie": "fruits",
        "valeur": 485,
        "etat": "Cru",
        "base": "100 g"
      }
    ]
  },
  "iode": {
    "key": "iode",
    "name": "iode",
    "unit": "µg",
    "references": [
      150
    ],
    "role": "Il est indispensable à la fabrication des hormones thyroïdiennes.",
    "warning": "Les algues contiennent des quantités très variables et parfois excessives d'iode, pouvant provoquer des troubles thyroïdiens. Ne pas consommer quotidiennement.",
    "limit": false,
    "rows": [
      {
        "nom": "Algue kombu / kelp — jusqu’à",
        "categorie": "legumes",
        "valeur": 1500,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Nori",
        "categorie": "legumes",
        "valeur": 130,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Poisson blanc (cabillaud)",
        "categorie": "viandes-poissons",
        "valeur": 99,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Crevettes",
        "categorie": "viandes-poissons",
        "valeur": 35,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Œuf entier",
        "categorie": "oeufs",
        "valeur": 50,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Lait",
        "categorie": "laitiers",
        "valeur": 50,
        "etat": "Liquide",
        "base": "100 ml"
      },
      {
        "nom": "Sel iodé",
        "categorie": "autres",
        "valeur": 2,
        "etat": "Selon étiquetage",
        "base": "1 g"
      }
    ]
  },
  "cuivre": {
    "key": "cuivre",
    "name": "cuivre",
    "unit": "mg",
    "references": [
      0.9
    ],
    "role": "Il intervient dans le métabolisme du fer, le tissu conjonctif et le fonctionnement du système nerveux.",
    "warning": "",
    "limit": false,
    "rows": [
      {
        "nom": "Foie de bœuf",
        "categorie": "viandes-poissons",
        "valeur": 9.8,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Chocolat noir 85 %",
        "categorie": "autres",
        "valeur": 1.8,
        "etat": "Préparé",
        "base": "100 g"
      },
      {
        "nom": "Noix de cajou",
        "categorie": "graines",
        "valeur": 2.2,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Graines de sésame",
        "categorie": "graines",
        "valeur": 1.4,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Huîtres",
        "categorie": "viandes-poissons",
        "valeur": 1.6,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Quinoa cuit",
        "categorie": "cereales",
        "valeur": 0.19,
        "etat": "Cuit",
        "base": "100 g"
      }
    ]
  },
  "manganese": {
    "key": "manganese",
    "name": "manganèse",
    "unit": "mg",
    "references": [
      2.3,
      1.8
    ],
    "role": "Il participe au métabolisme et à l’activité de plusieurs enzymes, notamment antioxydantes.",
    "warning": "Les épices se consomment en très petites quantités : 100 g ne représente pas une portion habituelle.",
    "limit": false,
    "rows": [
      {
        "nom": "Clou de girofle",
        "categorie": "autres",
        "valeur": 60,
        "etat": "Séché",
        "base": "100 g"
      },
      {
        "nom": "Graines de lin",
        "categorie": "graines",
        "valeur": 2.5,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Noix de pécan",
        "categorie": "graines",
        "valeur": 4.5,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Graines de sésame",
        "categorie": "graines",
        "valeur": 1.1,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Épinards",
        "categorie": "legumes",
        "valeur": 0.9,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Flocons d’avoine",
        "categorie": "cereales",
        "valeur": 3.8,
        "etat": "Sec",
        "base": "100 g"
      }
    ]
  },
  "chrome": {
    "key": "chrome",
    "name": "chrome",
    "unit": "µg",
    "references": [
      35,
      25
    ],
    "role": "Il est traditionnellement associé au métabolisme des glucides ; son caractère essentiel chez l’humain reste discuté.",
    "warning": "Les teneurs en chrome sont particulièrement incertaines et dépendent des méthodes de mesure. Le repère fourni correspond à un apport suffisant américain, pas à une référence européenne harmonisée.",
    "limit": false,
    "rows": [
      {
        "nom": "Brocoli",
        "categorie": "legumes",
        "valeur": 16,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Pomme de terre",
        "categorie": "legumes",
        "valeur": 7,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Ail",
        "categorie": "legumes",
        "valeur": 3,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Œuf entier",
        "categorie": "oeufs",
        "valeur": 6,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Avoine",
        "categorie": "cereales",
        "valeur": 7,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Viande de porc",
        "categorie": "viandes-poissons",
        "valeur": 6,
        "etat": "État non précisé",
        "base": "100 g"
      }
    ]
  },
  "molybdene": {
    "key": "molybdene",
    "name": "molybdène",
    "unit": "µg",
    "references": [
      50
    ],
    "role": "Il sert de cofacteur à des enzymes impliquées dans le métabolisme de certaines substances.",
    "warning": "Les haricots secs et les grains secs ne sont pas directement prêts à consommer : leur teneur après cuisson est différente.",
    "limit": false,
    "rows": [
      {
        "nom": "Lentilles cuites",
        "categorie": "legumineuses",
        "valeur": 148,
        "etat": "Cuit",
        "base": "100 g"
      },
      {
        "nom": "Haricots secs",
        "categorie": "legumineuses",
        "valeur": 132,
        "etat": "Sec — non cuit",
        "base": "100 g"
      },
      {
        "nom": "Foie de bœuf",
        "categorie": "viandes-poissons",
        "valeur": 104,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Grains de blé entier",
        "categorie": "cereales",
        "valeur": 64,
        "etat": "Sec",
        "base": "100 g"
      },
      {
        "nom": "Amandes",
        "categorie": "graines",
        "valeur": 31,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Œuf entier",
        "categorie": "oeufs",
        "valeur": 38,
        "etat": "État non précisé",
        "base": "100 g"
      }
    ]
  },
  "phosphore": {
    "key": "phosphore",
    "name": "phosphore",
    "unit": "mg",
    "references": [
      700
    ],
    "role": "Il contribue à la structure des os et des dents et au métabolisme énergétique.",
    "warning": "En cas de maladie rénale, les apports en phosphore doivent être adaptés au bilan et au contexte clinique.",
    "limit": false,
    "rows": [
      {
        "nom": "Parmesan",
        "categorie": "laitiers",
        "valeur": 1180,
        "etat": "Préparé",
        "base": "100 g"
      },
      {
        "nom": "Graines de tournesol",
        "categorie": "graines",
        "valeur": 660,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Poisson (sardines)",
        "categorie": "viandes-poissons",
        "valeur": 490,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Viande de bœuf",
        "categorie": "viandes-poissons",
        "valeur": 240,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Lentilles cuites",
        "categorie": "legumineuses",
        "valeur": 180,
        "etat": "Cuit",
        "base": "100 g"
      },
      {
        "nom": "Œuf entier",
        "categorie": "oeufs",
        "valeur": 198,
        "etat": "État non précisé",
        "base": "100 g"
      }
    ]
  },
  "sodium": {
    "key": "sodium",
    "name": "sodium",
    "unit": "mg",
    "references": [
      2000
    ],
    "role": "Il intervient dans l’équilibre hydrique et la transmission nerveuse. Les apports sont à limiter.",
    "warning": "Objectif : ne pas dépasser 2 g/j (5 g de sel), recommandation OMS.",
    "limit": true,
    "rows": [
      {
        "nom": "Sel de table",
        "categorie": "autres",
        "valeur": 38750,
        "etat": "Sec",
        "base": "100 g"
      },
      {
        "nom": "Feta",
        "categorie": "laitiers",
        "valeur": 1116,
        "etat": "Préparé",
        "base": "100 g"
      },
      {
        "nom": "Jambon cuit",
        "categorie": "viandes-poissons",
        "valeur": 1200,
        "etat": "Cuit",
        "base": "100 g"
      },
      {
        "nom": "Bouillon cube",
        "categorie": "autres",
        "valeur": 16000,
        "etat": "Concentré — non dilué",
        "base": "100 g"
      },
      {
        "nom": "Pain de campagne",
        "categorie": "cereales",
        "valeur": 570,
        "etat": "Préparé",
        "base": "100 g"
      }
    ]
  },
  "zinc": {
    "key": "zinc",
    "name": "zinc",
    "unit": "mg",
    "references": [
      11,
      8
    ],
    "role": "Il participe à l’immunité, à la cicatrisation et à la synthèse des protéines.",
    "warning": "Les teneurs des huîtres varient fortement selon l’espèce et la préparation ; une teneur élevée n’est pas un objectif de consommation.",
    "limit": false,
    "rows": [
      {
        "nom": "Huîtres",
        "categorie": "viandes-poissons",
        "valeur": 78,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Graines de courge",
        "categorie": "graines",
        "valeur": 7.5,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Viande de bœuf (rumsteck)",
        "categorie": "viandes-poissons",
        "valeur": 5.3,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Foie de bœuf",
        "categorie": "viandes-poissons",
        "valeur": 4,
        "etat": "État non précisé",
        "base": "100 g"
      },
      {
        "nom": "Fromage comté",
        "categorie": "laitiers",
        "valeur": 4,
        "etat": "Préparé",
        "base": "100 g"
      },
      {
        "nom": "Lentilles cuites",
        "categorie": "legumineuses",
        "valeur": 1.3,
        "etat": "Cuit",
        "base": "100 g"
      }
    ]
  }
};
