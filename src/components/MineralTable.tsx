import { useMemo, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mineralReferencePercent } from "@/lib/mineralReference";

export interface MineralRow { nom: string; categorie: string; valeur: number | null; etat: string; unite?: string; extra?: string; base?: string }
const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");

export function MineralTable({ rows, categories, valeurLabel, extraLabel, references = [], limit = false, showBase = false, manquant = "Variable — voir l’étiquette" }: {
  rows: MineralRow[]; categories: { key: string; label: string }[]; valeurLabel: string; extraLabel?: string; references?: { label: string; value: number }[]; limit?: boolean; showBase?: boolean; manquant?: string;
}) {
  const [filtre, setFiltre] = useState("toutes");
  const [desc, setDesc] = useState(true);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("teneur");
  const label = (k: string) => categories.find((c) => c.key === k)?.label ?? k;
  const liste = useMemo(() => rows.filter((a) => (filtre === "toutes" || a.categorie === filtre) && normalize(a.nom).includes(normalize(query.trim()))).sort((a, b) => {
    if (a.valeur === null && b.valeur === null) return 0;
    if (a.valeur === null) return 1;
    if (b.valeur === null) return -1;
    return desc ? b.valeur - a.valeur : a.valeur - b.valeur;
  }), [rows, filtre, desc, query]);
  const sort = (key: string) => { setDesc(sortKey === key ? !desc : true); setSortKey(key); };
  const sortHeader = (key: string, text: string) => <th className="p-3" aria-sort={sortKey === key ? desc ? "descending" : "ascending" : "none"}><Button type="button" variant="ghost" size="sm" onClick={() => sort(key)} className="h-auto whitespace-normal p-0 text-left uppercase">{text}<ArrowUpDown aria-hidden="true" className="size-3" /></Button></th>;
  return <>
    <div className="relative mt-6"><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label={`Rechercher un aliment — ${valeurLabel}`} placeholder="Rechercher un aliment…" value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" /></div>
    <div className="mt-4 flex flex-wrap gap-2">
      {[{ key: "toutes", label: "Toutes" }, ...categories].map((c) => <Button key={c.key} type="button" size="sm" variant="outline" aria-pressed={filtre === c.key} onClick={() => setFiltre(c.key)} className={`h-auto min-h-8 whitespace-normal rounded-full px-3 py-1 text-xs ${filtre === c.key ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>{c.label}</Button>)}
    </div>
    <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card" role="region" aria-label={`Tableau ${valeurLabel}`} tabIndex={0}>
      <table className="w-full min-w-[560px] text-sm">
        <thead className="bg-muted text-left text-xs uppercase text-muted-foreground"><tr>
          <th className="p-3">Aliment</th><th className="p-3">Catégorie</th>{sortHeader("teneur", valeurLabel)}
          {showBase && <th className="p-3">Quantité</th>}
          {references.map((r) => <ReferenceHeader key={r.label} header={sortHeader(r.label, `% ${limit ? "limite" : "ANC"}${r.label ? ` (${r.label})` : ""}`)} />)}
          <th className="p-3">État</th>{extraLabel && <th className="p-3">{extraLabel}</th>}
        </tr></thead>
        <tbody className="divide-y divide-border">
          {liste.map((a) => <tr key={a.nom + a.etat}>
            <td className="p-3 font-medium">{a.nom}</td><td className="p-3 text-muted-foreground">{label(a.categorie)}</td>
            <td className="p-3 font-semibold tabular-nums">{a.valeur === null ? <span className="font-normal text-muted-foreground">{manquant}</span> : <>{a.valeur.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}{a.unite && <span className="ml-1 text-xs font-normal text-muted-foreground">{a.unite}</span>}</>}</td>
            {showBase && <td className="p-3 whitespace-nowrap">{a.base ?? "100 g"}</td>}
            {references.map((r) => { const percent = a.valeur === null ? null : mineralReferencePercent(a.valeur, r.value); return <td key={r.label} className="p-3 font-semibold tabular-nums">{percent === null ? "—" : `${percent.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`}</td>; })}
            <td className="p-3">{a.etat}</td>{extraLabel && <td className="p-3">{a.extra}</td>}
          </tr>)}
          {liste.length === 0 && <tr><td colSpan={4 + Number(showBase) + references.length + Number(Boolean(extraLabel))} className="p-6 text-center text-muted-foreground">Aucun aliment trouvé.</td></tr>}
        </tbody>
      </table>
    </div>
  </>;
}
function ReferenceHeader({ header }: { header: React.ReactNode }) { return header; }
