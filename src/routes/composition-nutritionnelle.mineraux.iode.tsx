import { createFileRoute } from "@tanstack/react-router";
import { MineralSheet } from "@/components/MineralSheet";
import { mineralSheets } from "@/data/mineralSheets";
export const Route = createFileRoute("/composition-nutritionnelle/mineraux/iode")({
  head: () => ({ meta: [
    { title: "Teneur en iode des aliments | NutriSanté" },
    { name: "description", content: "Aliments riches en iode, teneurs, repères adultes et pourcentages : tableau filtrable et précautions." },
    { property: "og:title", content: "Teneur en iode — NutriSanté" },
    { property: "og:description", content: "Comparez les sources de iode, les quantités et les repères nutritionnels." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <MineralSheet data={mineralSheets.iode} />,
});
