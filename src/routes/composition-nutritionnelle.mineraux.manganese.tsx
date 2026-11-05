import { createFileRoute } from "@tanstack/react-router";
import { MineralSheet } from "@/components/MineralSheet";
import { mineralSheets } from "@/data/mineralSheets";
export const Route = createFileRoute("/composition-nutritionnelle/mineraux/manganese")({
  head: () => ({ meta: [
    { title: "Teneur en manganèse des aliments | NutriSanté" },
    { name: "description", content: "Aliments riches en manganèse, teneurs, repères adultes et pourcentages : tableau filtrable et précautions." },
    { property: "og:title", content: "Teneur en manganèse — NutriSanté" },
    { property: "og:description", content: "Comparez les sources de manganèse, les quantités et les repères nutritionnels." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <MineralSheet data={mineralSheets.manganese} />,
});
