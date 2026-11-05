import { createFileRoute } from "@tanstack/react-router";
import { MineralSheet } from "@/components/MineralSheet";
import { mineralSheets } from "@/data/mineralSheets";
export const Route = createFileRoute("/composition-nutritionnelle/mineraux/sodium")({
  head: () => ({ meta: [
    { title: "Teneur en sodium des aliments | NutriSanté" },
    { name: "description", content: "Aliments riches en sodium, teneurs, repères adultes et pourcentages : tableau filtrable et précautions." },
    { property: "og:title", content: "Teneur en sodium — NutriSanté" },
    { property: "og:description", content: "Comparez les sources de sodium, les quantités et les repères nutritionnels." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <MineralSheet data={mineralSheets.sodium} />,
});
