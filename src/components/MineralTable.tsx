import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";

export interface MineralRow { nom: string; categorie: string; valeur: number | null; etat: string; unite?: string; extra?: string }

/** Tableau partagé des fiches Minéraux : filtre par catégorie, tri décroissant par défaut. */
export function MineralTable({ rows, categories, valeurLabel, extraLabel, manquant = "Variable — voir l’étiquette" }: {
  rows: MineralRow[]; categories: { key: string; label: string }[]; valeurLabel: string; extraLabel?: string; manquant?: string;
}) {
  const [filtre, setFiltre] = useState("toutes");
  const [desc, setDesc] = useState(true);
  const label = (k: string) => categories.find((c) => c.key === k)?.label ?? k;
  const liste = useMemo(() => rows.filter((a) => filtre === "toutes" || a.categorie === filtre).sort((a, b) => {
    if (a.valeur === null) return 1;
    if (b.valeur === null) return -1;
    return desc ? b.valeur - a.valeur : a.valeur - b.valeur;
  }), [rows, filtre, desc]);

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        {[{ key: "toutes", label: "Toutes" }, ...categories].map((c) => (
          <button key={c.key} type="button" onClick={() => setFiltre(c.key)}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${filtre === c.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-muted text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3">Aliment</th>
              <th className="p-3">Catégorie</th>
              <th className="p-3"><button type="button" onClick={() => setDesc(!desc)} className="inline-flex items-center gap-1 uppercase hover:text-primary">{valeurLabel}<ArrowUpDown className="size-3" /></button></th>
              <th className="p-3">État</th>
              {extraLabel && <th className="p-3">{extraLabel}</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {liste.map((a) => (
              <tr key={a.nom + a.etat}>
                <td className="p-3 font-medium">{a.nom}</td>
                <td className="p-3 text-muted-foreground">{label(a.categorie)}</td>
                <td className="p-3 font-semibold tabular-nums">{a.valeur === null ? <span className="font-normal text-muted-foreground">{manquant}</span> : <>{a.valeur.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}{a.unite && <span className="ml-1 text-xs font-normal text-muted-foreground">{a.unite}</span>}</>}</td>
                <td className="p-3">{a.etat}</td>
                {extraLabel && <td className="p-3">{a.extra}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
