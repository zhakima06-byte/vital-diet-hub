import { createFileRoute } from "@tanstack/react-router";
import { MineralSheet } from "@/components/MineralSheet";
import { mineralSheets } from "@/data/mineralSheets";
export const Route = createFileRoute("/composition-nutritionnelle/mineraux/chrome")({
  head: () => ({ meta: [
    { title: "Teneur en chrome des aliments | NutriSanté" },
    { name: "description", content: "Aliments riches en chrome, teneurs, repères adultes et pourcentages : tableau filtrable et précautions." },
    { property: "og:title", content: "Teneur en chrome — NutriSanté" },
    { property: "og:description", content: "Comparez les sources de chrome, les quantités et les repères nutritionnels." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <MineralSheet data={mineralSheets.chrome} />,
});
