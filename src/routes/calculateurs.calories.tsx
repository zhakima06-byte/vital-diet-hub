import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { foods, kcalPer100g } from "@/data/foods";

export const Route = createFileRoute("/calculateurs/calories")({
  head: () => ({
    meta: [
      { title: "Calculateur de calories et macronutriments — NutriSanté" },
      {
        name: "description",
        content:
          "Estimez vos besoins caloriques journaliers (Mifflin-St Jeor) et calculez les calories et macronutriments d'un aliment ou d'un repas complet.",
      },
      { property: "og:title", content: "Calculateur de calories — NutriSanté" },
      { property: "og:description", content: "Métabolisme de base, dépense totale, objectif et composition d'un repas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CaloriesPage,
});

const activites = [
  { key: "sedentaire", label: "Sédentaire", factor: 1.2 },
  { key: "leger", label: "Léger (1-3 j/sem.)", factor: 1.375 },
  { key: "modere", label: "Modéré (3-5 j/sem.)", factor: 1.55 },
  { key: "actif", label: "Actif (6-7 j/sem.)", factor: 1.725 },
  { key: "tres-actif", label: "Très actif", factor: 1.9 },
] as const;

const objectifs = [
  { key: "perte", label: "Perte de poids", delta: -0.2 },
  { key: "maintien", label: "Maintien", delta: 0 },
  { key: "prise", label: "Prise de poids", delta: 0.15 },
] as const;

const field = "mt-1 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring";

type Ligne = { id: string; foodId: string; grammes: number };

function CaloriesPage() {
  const [onglet, setOnglet] = useState<"besoins" | "repas">("besoins");

  // Besoins journaliers
  const [age, setAge] = useState("35");
  const [sexe, setSexe] = useState<"H" | "F">("F");
  const [poids, setPoids] = useState("65");
  const [taille, setTaille] = useState("168");
  const [activite, setActivite] = useState<(typeof activites)[number]["key"]>("modere");
  const [objectif, setObjectif] = useState<(typeof objectifs)[number]["key"]>("maintien");

  const besoins = useMemo(() => {
    const a = Number(age), p = Number(poids), t = Number(taille);
    if (!a || !p || !t) return null;
    const mb = 10 * p + 6.25 * t - 5 * a + (sexe === "H" ? 5 : -161);
    const det = mb * activites.find((x) => x.key === activite)!.factor;
    const cible = det * (1 + objectifs.find((x) => x.key === objectif)!.delta);
    return { mb: Math.round(mb), det: Math.round(det), cible: Math.round(cible) };
  }, [age, poids, taille, sexe, activite, objectif]);

  // Repas
  const [lignes, setLignes] = useState<Ligne[]>([]);
  const [selection, setSelection] = useState(foods[0]!.id);
  const [grammes, setGrammes] = useState("100");

  const totaux = useMemo(() => {
    return lignes.reduce(
      (acc, l) => {
        const f = foods.find((x) => x.id === l.foodId);
        if (!f) return acc;
        const r = l.grammes / 100;
        acc.kcal += kcalPer100g(f) * r;
        acc.prot += f.values.proteines * r;
        acc.gluc += f.values.glucides * r;
        acc.lip += f.values.lipides * r;
        return acc;
      },
      { kcal: 0, prot: 0, gluc: 0, lip: 0 },
    );
  }, [lignes]);

  const cible = besoins?.cible ?? 0;
  const pct = cible ? Math.min(100, Math.round((totaux.kcal / cible) * 100)) : 0;
  const macroKcal = totaux.prot * 4 + totaux.gluc * 4 + totaux.lip * 9 || 1;
  const parts = {
    gluc: Math.round(((totaux.gluc * 4) / macroKcal) * 100),
    prot: Math.round(((totaux.prot * 4) / macroKcal) * 100),
    lip: Math.round(((totaux.lip * 9) / macroKcal) * 100),
  };

  const ajouter = () => {
    const g = Number(grammes.replace(",", "."));
    if (!g || g <= 0) return;
    setLignes((prev) => [...prev, { id: `${selection}-${Date.now()}`, foodId: selection, grammes: g }]);
  };

  return (
    <AppShell>
      <Link to="/calculateurs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Calculateurs
      </Link>

      <h1 className="mt-3 text-2xl font-semibold">Calculateur de calories</h1>

      <div role="tablist" aria-label="Type de calcul" className="mt-4 flex gap-2">
        {([
          ["besoins", "Besoins journaliers"],
          ["repas", "Aliment / repas"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={onglet === key}
            onClick={() => setOnglet(key)}
            className={`rounded-xl border px-4 py-2 text-sm font-medium ${
              onglet === key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {onglet === "besoins" ? (
        <>
          <div className="card-soft mt-4 grid gap-4 p-5 sm:grid-cols-2">
            <label className="block text-sm">
              Âge
              <input inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} className={field} />
            </label>
            <label className="block text-sm">
              Sexe
              <select value={sexe} onChange={(e) => setSexe(e.target.value as "H" | "F")} className={field}>
                <option value="F">Femme</option>
                <option value="H">Homme</option>
              </select>
            </label>
            <label className="block text-sm">
              Poids (kg)
              <input inputMode="decimal" value={poids} onChange={(e) => setPoids(e.target.value)} className={field} />
            </label>
            <label className="block text-sm">
              Taille (cm)
              <input inputMode="numeric" value={taille} onChange={(e) => setTaille(e.target.value)} className={field} />
            </label>
            <label className="block text-sm">
              Niveau d'activité
              <select value={activite} onChange={(e) => setActivite(e.target.value as typeof activite)} className={field}>
                {activites.map((a) => (
                  <option key={a.key} value={a.key}>{a.label}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Objectif
              <select value={objectif} onChange={(e) => setObjectif(e.target.value as typeof objectif)} className={field}>
                {objectifs.map((o) => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </select>
            </label>
          </div>

          {besoins && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="card-soft p-5">
                <p className="text-sm text-muted-foreground">Métabolisme de base</p>
                <p className="mt-1 text-2xl font-semibold">{besoins.mb} kcal</p>
              </div>
              <div className="card-soft p-5">
                <p className="text-sm text-muted-foreground">Dépense totale (DET)</p>
                <p className="mt-1 text-2xl font-semibold">{besoins.det} kcal</p>
              </div>
              <div className="rounded-2xl border border-primary/40 bg-primary/5 p-5">
                <p className="text-sm text-muted-foreground">Objectif journalier</p>
                <p className="mt-1 text-2xl font-semibold">{besoins.cible} kcal</p>
              </div>
            </div>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            Formule de Mifflin-St Jeor. Un déficit correspond à environ −20 % de la dépense totale, un
            surplus à +15 %.
          </p>
        </>
      ) : (
        <>
          <div className="card-soft mt-4 p-5">
            <div className="grid gap-3 sm:grid-cols-[1fr_140px_auto] sm:items-end">
              <label className="block text-sm">
                Aliment
                <select value={selection} onChange={(e) => setSelection(e.target.value)} className={field}>
                  {foods.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} — {kcalPer100g(f)} kcal/100 g
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                Quantité (g)
                <input inputMode="decimal" value={grammes} onChange={(e) => setGrammes(e.target.value)} className={field} />
              </label>
              <button
                type="button"
                onClick={ajouter}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                <Plus className="size-4" /> Ajouter
              </button>
            </div>

            {lignes.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm">
                {lignes.map((l) => {
                  const f = foods.find((x) => x.id === l.foodId)!;
                  return (
                    <li key={l.id} className="flex items-center justify-between gap-3 border-b border-border/60 pb-2">
                      <span>
                        {f.name} · {l.grammes} g
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="font-medium">{Math.round((kcalPer100g(f) * l.grammes) / 100)} kcal</span>
                        <button
                          type="button"
                          aria-label={`Retirer ${f.name}`}
                          onClick={() => setLignes((prev) => prev.filter((x) => x.id !== l.id))}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="card-soft mt-4 p-5">
            <h2 className="text-base font-semibold">Total du repas</h2>
            <p className="mt-1 text-3xl font-semibold">{Math.round(totaux.kcal)} kcal</p>

            {cible > 0 && (
              <>
                <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {pct} % de l'objectif journalier estimé ({cible} kcal).
                </p>
              </>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["Glucides", totaux.gluc, parts.gluc],
                ["Protéines", totaux.prot, parts.prot],
                ["Lipides", totaux.lip, parts.lip],
              ].map(([label, val, part]) => (
                <div key={label as string} className="rounded-xl border border-border p-3">
                  <p className="text-sm text-muted-foreground">{label as string}</p>
                  <p className="text-lg font-semibold">{Math.round(val as number)} g</p>
                  <p className="text-xs text-muted-foreground">{part as number} % de l'énergie</p>
                </div>
              ))}
            </div>
          </div>

          <section className="mt-4 rounded-2xl border border-level-mid/40 bg-level-mid-soft p-5 text-sm">
            <h2 className="text-base font-semibold">Alertes selon la pathologie</h2>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong>Diabète :</strong> une part de glucides supérieure à 55 % de l'énergie ou une
                charge glucidique concentrée sur un seul repas nécessite un avis diététique.{" "}
                <Link to="/maladies/$slug" params={{ slug: "diabete" }} className="underline">Voir la fiche</Link>
              </li>
              <li>
                <strong>IRC :</strong> l'apport protéique doit rester autour de 0,8 g/kg/jour hors
                dialyse.{" "}
                <Link to="/maladies/$slug" params={{ slug: "insuffisance-renale" }} className="underline">Voir la fiche</Link>
              </li>
              <li>
                <strong>Cancer / dénutrition :</strong> viser 30 à 35 kcal/kg/jour et 1,2 à 1,5 g de
                protéines/kg/jour.{" "}
                <Link to="/maladies/$slug" params={{ slug: "cancer" }} className="underline">Voir la fiche</Link>
              </li>
            </ul>
          </section>
        </>
      )}

      <div className="mt-4">
        <MedicalDisclaimer strong />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Les besoins caloriques affichés sont des estimations. Toute restriction ou objectif calorique
        doit être validé par un médecin ou un diététicien, en particulier en cas de pathologie.
      </p>
    </AppShell>
  );
}
