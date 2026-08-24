import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { calculDfg, formules, stadeDe, type Formule, type Sexe, type UniteCreat } from "@/lib/dfg";
import { useHistorique } from "@/lib/favoris";

export const Route = createFileRoute("/calculateurs/dfg")({
  head: () => ({
    meta: [
      { title: "Calculateur de DFG — CKD-EPI, MDRD, Cockcroft — NutriSanté" },
      {
        name: "description",
        content:
          "Estimez le débit de filtration glomérulaire à partir de la créatinine, de l'âge et du sexe, et obtenez le stade d'insuffisance rénale G1 à G5.",
      },
      { property: "og:title", content: "Calculateur de DFG — NutriSanté" },
      { property: "og:description", content: "CKD-EPI 2021, MDRD et Cockcroft-Gault avec classification du stade rénal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DfgPage,
});

type Entry = { date: string; formule: string; dfg: number; stade: string };

const toneClass = {
  low: "border-level-low/40 bg-level-low-soft",
  mid: "border-level-mid/40 bg-level-mid-soft",
  high: "border-level-high/40 bg-level-high-soft",
} as const;

const field = "mt-1 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring";

function DfgPage() {
  const [formule, setFormule] = useState<Formule>("ckd-epi");
  const [age, setAge] = useState("");
  const [sexe, setSexe] = useState<Sexe>("F");
  const [creat, setCreat] = useState("");
  const [unite, setUnite] = useState<UniteCreat>("umol");
  const [poids, setPoids] = useState("");
  const { items, add, clear } = useHistorique<Entry>("dfg");

  const resultat = useMemo(() => {
    const a = Number(age.replace(",", "."));
    const c = Number(creat.replace(",", "."));
    const p = Number(poids.replace(",", "."));
    if (!a || !c) return null;
    const dfg = calculDfg(formule, { age: a, sexe, creatinine: c, unite, ...(p ? { poids: p } : {}) });
    if (dfg === null) return null;
    return { dfg, stade: stadeDe(dfg) };
  }, [formule, age, sexe, creat, unite, poids]);

  const infoFormule = formules.find((f) => f.key === formule)!;

  return (
    <AppShell>
      <Link to="/calculateurs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Calculateurs
      </Link>

      <h1 className="mt-3 text-2xl font-semibold">Calculateur de DFG</h1>
      <p className="mt-1 text-sm text-muted-foreground">{infoFormule.note}</p>

      <div className="card-soft mt-5 p-5">
        <fieldset>
          <legend className="text-sm font-medium">Formule</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {formules.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFormule(f.key)}
                aria-pressed={formule === f.key}
                className={`rounded-xl border px-3 py-2 text-sm font-medium ${
                  formule === f.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Âge (années)
            <input inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} className={field} placeholder="65" />
          </label>

          <label className="block text-sm">
            Sexe
            <select value={sexe} onChange={(e) => setSexe(e.target.value as Sexe)} className={field}>
              <option value="F">Femme</option>
              <option value="H">Homme</option>
            </select>
          </label>

          <label className="block text-sm">
            Créatinine sérique
            <input inputMode="decimal" value={creat} onChange={(e) => setCreat(e.target.value)} className={field} placeholder="95" />
          </label>

          <label className="block text-sm">
            Unité
            <select value={unite} onChange={(e) => setUnite(e.target.value as UniteCreat)} className={field}>
              <option value="umol">µmol/L</option>
              <option value="mgdl">mg/dL</option>
            </select>
          </label>

          {formule === "cockcroft" && (
            <label className="block text-sm">
              Poids (kg)
              <input inputMode="decimal" value={poids} onChange={(e) => setPoids(e.target.value)} className={field} placeholder="70" />
            </label>
          )}
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Conversion automatique : 1 mg/dL = 88,4 µmol/L. La version 2021 de CKD-EPI n'utilise plus de
          facteur d'origine ethnique.
        </p>
      </div>

      {resultat ? (
        <section className={`mt-4 rounded-2xl border p-5 ${toneClass[resultat.stade.tone]}`}>
          <p className="text-sm text-muted-foreground">
            {formule === "cockcroft" ? "Clairance estimée" : "DFG estimé"}
          </p>
          <p className="mt-1 text-3xl font-semibold">
            {resultat.dfg}{" "}
            <span className="text-base font-normal text-muted-foreground">
              {formule === "cockcroft" ? "mL/min" : "mL/min/1,73m²"}
            </span>
          </p>
          <p className="mt-2 text-lg font-semibold">
            Stade {resultat.stade.code} — {resultat.stade.libelle}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{resultat.stade.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/maladies/$slug"
              params={{ slug: "insuffisance-renale" }}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Voir la fiche alimentaire adaptée
            </Link>
            <button
              type="button"
              onClick={() =>
                add({
                  date: new Date().toLocaleString("fr-FR"),
                  formule: infoFormule.label,
                  dfg: resultat.dfg,
                  stade: resultat.stade.code,
                })
              }
              className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium"
            >
              Enregistrer ce calcul
            </button>
          </div>
        </section>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          Renseignez l'âge et la créatinine{formule === "cockcroft" ? " ainsi que le poids" : ""} pour
          afficher le résultat.
        </p>
      )}

      {items.length > 0 && (
        <section className="card-soft mt-4 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Historique des calculs</h2>
            <button type="button" onClick={clear} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <Trash2 className="size-4" /> Effacer
            </button>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {items.map((e, i) => (
              <li key={`${e.date}-${i}`} className="flex justify-between gap-3 border-b border-border/60 pb-2">
                <span className="text-muted-foreground">{e.date} · {e.formule}</span>
                <span className="font-medium">{e.dfg} — {e.stade}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Historique conservé uniquement sur cet appareil, aucune donnée de santé n'est transmise.
          </p>
        </section>
      )}

      <div className="mt-4">
        <MedicalDisclaimer strong />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Ce calculateur est un outil d'aide : le DFG estimé n'est valable que sur une créatinine stable
        et doit être interprété par un médecin, avec le contexte clinique et l'albuminurie.
      </p>
    </AppShell>
  );
}
