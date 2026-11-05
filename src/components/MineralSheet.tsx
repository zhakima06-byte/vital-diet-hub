import { Link } from "@tanstack/react-router";
import { AlertTriangle, ChevronRight, Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MineralTable } from "@/components/MineralTable";
import { mineralFoodCategories, type MineralSheetData } from "@/data/mineralSheets";

export function MineralReferenceTable({ data }: { data: MineralSheetData }) {
  const references = data.references.map((value, index) => ({ value, label: data.references.length > 1 ? index === 0 ? "homme" : "femme" : "" }));
  return <>
    <section className="mt-6 rounded-2xl border border-border bg-tone-blue-soft p-4">
      <h2 className="flex items-center gap-2 font-semibold"><Info aria-hidden="true" className="size-4 text-tone-blue" />{data.limit ? "Limite quotidienne — à ne pas atteindre" : "Repère quotidien adulte (ANC/RDA)"}</h2>
      <p className="mt-2 text-sm font-semibold">{references.map((r) => `${r.label ? `${r.label} : ` : ""}${r.value.toLocaleString("fr-FR")} ${data.unit}/j`).join(" · ")}</p>
      <p className="mt-2 text-sm">{data.role}</p>
      <p className="mt-2 text-xs text-muted-foreground">Repères du document fourni, non personnalisés ; les références varient selon le pays, l’âge et la situation. Le pourcentage concerne la quantité indiquée, pas la quantité absorbée ni une portion recommandée.</p>
    </section>
    {data.warning && <section className="mt-4 flex gap-3 rounded-2xl border border-border bg-tone-pink-soft p-4 text-sm"><AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-tone-pink" /><p>{data.warning}</p></section>}
    {data.key === "sodium" && <p className="mt-3 text-sm text-muted-foreground">38 750 mg de sodium pour 100 g de sel correspondent à 38,75 % de sodium, et non à 97,5 %. Le bouillon est présenté concentré, avant dilution.</p>}
    <MineralTable rows={data.rows} categories={mineralFoodCategories.filter((c) => data.rows.some((r) => r.categorie === c.key))} valeurLabel={`Teneur (${data.unit})`} references={references} limit={data.limit} showBase />
    <p className="mt-3 text-xs text-muted-foreground">Valeurs moyennes pour 100 g d’aliment prêt à consommer — sauf exceptions et états indiqués dans le tableau. Le lait est exprimé pour 100 ml et le sel iodé pour 1 g.</p>
    <p className="mt-2 text-xs text-muted-foreground">Source des chiffres : document fourni. Teneurs indicatives non vérifiées dans ANSES-CIQUAL ou USDA ; l’état de préparation est inconnu lorsqu’il n’était pas précisé. À valider avant utilisation clinique. Pour les algues et les produits iodés, consulter aussi l’étiquette.</p>
  </>;
}
export function MineralSheet({ data }: { data: MineralSheetData }) {
  return <AppShell>
    <nav aria-label="Fil d’Ariane" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"><Link to="/composition-nutritionnelle" className="hover:text-primary">Composition nutritionnelle des aliments</Link><ChevronRight aria-hidden="true" className="size-3 shrink-0" /><Link to="/composition-nutritionnelle/mineraux" className="hover:text-primary">Minéraux</Link><ChevronRight aria-hidden="true" className="size-3 shrink-0" /><span aria-current="page">{data.name}</span></nav>
    <h1 className="text-2xl font-semibold">Les aliments les plus riches en {data.name}</h1>
    <p className="mt-2 text-sm text-muted-foreground">Teneurs indicatives, état de préparation et part du repère quotidien pour la quantité indiquée.</p>
    <MineralReferenceTable data={data} />
  </AppShell>;
}
