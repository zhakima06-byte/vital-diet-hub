import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Apple, FileDown, Flame, LineChart, Salad, Stethoscope } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { diets } from "@/data/diets";
import { diseases } from "@/data/diseases";
import { fichesRegimes, tonClasses } from "@/data/fichesRegimes";
import {
  objectifFromStatut,
  saveProfil,
  statutFromImc,
  statutLabel,
  type Activite as ActiviteProfil,
  type Objectif as ObjectifProfil,
  type Sexe as SexeProfil,
} from "@/lib/profil";
import { calculateNutritionNeeds } from "@/lib/nutrition";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutriSanté — IMC, régimes et nutrithérapie" },
      {
        name: "description",
        content:
          "Calculez votre IMC et vos besoins caloriques, explorez les régimes alimentaires, les fiches par pathologie et les teneurs en nutriments.",
      },
      { property: "og:title", content: "NutriSanté — nutrition et nutrithérapie" },
      {
        property: "og:description",
        content:
          "IMC, besoins caloriques, régimes généraux, régimes thérapeutiques par pathologie et base de teneurs alimentaires.",
      },
    ],
  }),
  component: Index,
});

type Sexe = "femme" | "homme";
type Activite = "sedentaire" | "leger" | "modere" | "intense";
type Objectif = "perte" | "maintien" | "prise";

const activites: { key: Activite; label: string; factor: number }[] = [
  { key: "sedentaire", label: "Sédentaire", factor: 1.2 },
  { key: "leger", label: "Léger", factor: 1.375 },
  { key: "modere", label: "Modéré", factor: 1.55 },
  { key: "intense", label: "Intense", factor: 1.725 },
];

const objectifs: { key: Objectif; label: string; delta: number }[] = [
  { key: "perte", label: "Perte de poids", delta: -400 },
  { key: "maintien", label: "Maintien", delta: 0 },
  { key: "prise", label: "Prise de poids", delta: 400 },
];

const categories = [
  { max: 18.5, label: "Maigreur", tone: "mid" },
  { max: 25, label: "Corpulence normale", tone: "low" },
  { max: 30, label: "Surpoids", tone: "mid" },
  { max: 35, label: "Obésité modérée (classe I)", tone: "high" },
  { max: 40, label: "Obésité sévère (classe II)", tone: "high" },
  { max: Infinity, label: "Obésité massive (classe III)", tone: "high" },
] as const;

const toneClass = {
  low: "bg-level-low-soft text-level-low border-level-low/40",
  mid: "bg-level-mid-soft text-level-mid border-level-mid/40",
  high: "bg-level-high-soft text-level-high border-level-high/40",
} as const;

function fieldClass() {
  return "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40";
}

function Index() {
  const [poids, setPoids] = useState("70");
  const [taille, setTaille] = useState("170");
  const [age, setAge] = useState("35");
  const [sexe, setSexe] = useState<Sexe>("femme");
  const [activite, setActivite] = useState<Activite>("modere");
  const [objectif, setObjectif] = useState<Objectif>("maintien");
  const [pathologie, setPathologie] = useState("");

  const result = useMemo(() => {
    const p = Number(poids);
    const t = Number(taille) / 100;
    const a = Number(age);
    if (!p || !t || !a || p <= 0 || t <= 0) return null;

    const imc = p / (t * t);
    const cat = categories.find((c) => imc < c.max)!;
    const besoins = calculateNutritionNeeds({
      sexe,
      age: a,
      poids: p,
      taille: Number(taille),
      activite,
      objectif,
    });
    if (!besoins.valide) return { imc, cat, calories: 0, besoins, macros: { proteines: 0, glucides: 0, lipides: 0 } };

    return {
      imc,
      cat,
      calories: besoins.caloriesCibles,
      besoins,
      macros: {
        proteines: besoins.macros.proteines.grammes,
        glucides: besoins.macros.glucides.grammes,
        lipides: besoins.macros.lipides.grammes,
      },
    };
  }, [poids, taille, age, sexe, activite, objectif]);


  const gaugePct = result ? Math.min(100, Math.max(2, ((result.imc - 14) / 28) * 100)) : 0;
  const sheet = diseases.find((d) => d.slug === pathologie);
  const statut = result ? statutFromImc(result.imc) : null;

  useEffect(() => {
    if (!result || !statut) return;
    saveProfil({
      poids: Number(poids),
      taille: Number(taille),
      age: Number(age),
      sexe: sexe as SexeProfil,
      activite: activite as ActiviteProfil,
      objectif: (objectif === "maintien" ? objectifFromStatut(statut) : objectif) as ObjectifProfil,
      imc: result.imc,
      statut,
      majAt: new Date().toISOString(),
    });
  }, [result, statut, poids, taille, age, sexe, activite, objectif]);

  return (
    <AppShell>
      <section className="rounded-3xl bg-gradient-brand px-6 py-8 text-primary-foreground shadow-soft">
        <p className="text-xs font-medium uppercase tracking-widest opacity-80">
          Nutrition &amp; nutrithérapie
        </p>
        <h1 className="mt-2 max-w-lg text-3xl font-semibold leading-tight">
          Votre IMC, vos besoins, et l'alimentation adaptée à votre santé
        </h1>
        <p className="mt-3 max-w-xl text-sm opacity-90">
          Calculez votre indice de masse corporelle et vos besoins caloriques, puis accédez aux
          fiches de régimes généraux, aux régimes thérapeutiques par pathologie et aux teneurs
          alimentaires en nutriments clés.
        </p>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="card-soft p-5">
          <h2 className="text-lg font-semibold">Calculateur d'IMC</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-sm">
              <span className="mb-1 block font-medium">Poids (kg)</span>
              <input
                className={fieldClass()}
                inputMode="decimal"
                value={poids}
                onChange={(e) => setPoids(e.target.value)}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Taille (cm)</span>
              <input
                className={fieldClass()}
                inputMode="decimal"
                value={taille}
                onChange={(e) => setTaille(e.target.value)}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Âge</span>
              <input
                className={fieldClass()}
                inputMode="numeric"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Sexe</span>
              <select
                className={fieldClass()}
                value={sexe}
                onChange={(e) => setSexe(e.target.value as Sexe)}
              >
                <option value="femme">Femme</option>
                <option value="homme">Homme</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Activité physique</span>
              <select
                className={fieldClass()}
                value={activite}
                onChange={(e) => setActivite(e.target.value as Activite)}
              >
                {activites.map((a) => (
                  <option key={a.key} value={a.key}>
                    {a.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Objectif</span>
              <select
                className={fieldClass()}
                value={objectif}
                onChange={(e) => setObjectif(e.target.value as Objectif)}
              >
                {objectifs.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="col-span-2 text-sm">
              <span className="mb-1 block font-medium">Pathologie déclarée (optionnel)</span>
              <select
                className={fieldClass()}
                value={pathologie}
                onChange={(e) => setPathologie(e.target.value)}
              >
                <option value="">Aucune</option>
                {diseases.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="card-soft flex flex-col p-5">
          <h2 className="text-lg font-semibold">Vos résultats</h2>
          {!result ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Renseignez vos données pour afficher votre IMC.
            </p>
          ) : (
            <>
              <div className="mt-4 flex items-end gap-3">
                <span className="font-display text-5xl font-semibold">
                  {result.imc.toFixed(1)}
                </span>
                <span
                  className={`mb-2 rounded-full border px-2.5 py-1 text-xs font-medium ${toneClass[result.cat.tone]}`}
                >
                  {result.cat.label}
                </span>
              </div>

              <div className="mt-4">
                <div
                  className="h-3 w-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--level-mid) 0%, var(--level-low) 22%, var(--level-low) 38%, var(--level-mid) 52%, var(--level-high) 75%, var(--level-high) 100%)",
                  }}
                >
                  <div className="relative h-3" style={{ width: `${gaugePct}%` }}>
                    <span className="absolute -top-0.5 right-0 size-4 rounded-full border-2 border-background bg-foreground" />
                  </div>
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                  <span>14</span>
                  <span>18,5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40+</span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-muted p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Flame className="size-4 text-primary" /> Besoin calorique estimé
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  {result.calories} kcal / jour
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Mifflin-St Jeor ajusté à votre niveau d'activité et à votre objectif.
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-background py-2">
                    <p className="font-semibold">{result.macros.proteines} g</p>
                    <p className="text-muted-foreground">Protéines</p>
                  </div>
                  <div className="rounded-lg bg-background py-2">
                    <p className="font-semibold">{result.macros.glucides} g</p>
                    <p className="text-muted-foreground">Glucides</p>
                  </div>
                  <div className="rounded-lg bg-background py-2">
                    <p className="font-semibold">{result.macros.lipides} g</p>
                    <p className="text-muted-foreground">Lipides</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Link
                  to="/regimes/$slug"
                  params={{ slug: "mediterraneen" }}
                  className="block rounded-xl border border-primary/30 bg-accent px-4 py-3 text-sm font-medium text-accent-foreground"
                >
                  Régime suggéré : {diets[0]?.name} →
                </Link>
                {sheet && (
                  <Link
                    to="/maladies/$slug"
                    params={{ slug: sheet.slug }}
                    className="block rounded-xl border border-level-high/40 bg-level-high-soft px-4 py-3 text-sm font-medium"
                  >
                    Fiche adaptée : {sheet.name} →
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {result && statut && (
        <section className="card-soft mt-6 border-tone-blue/40 p-5">
          <h2 className="text-lg font-semibold">
            Et maintenant ? Votre statut : {statutLabel[statut]}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Vos données (poids, taille, âge, sexe, activité) sont enregistrées : aucun besoin de les
            ressaisir dans les modules ci-dessous.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              to="/fiches-regimes"
              className="flex items-start gap-3 rounded-2xl border border-tone-green/40 bg-tone-green-soft p-4"
            >
              <FileDown className="size-5 shrink-0 text-tone-green" />
              <span>
                <span className="block text-sm font-semibold text-tone-green">
                  Télécharger une fiche régime
                </span>
                <span className="block text-xs text-muted-foreground">
                  Méditerranéen, Keto ou intermittent — PDF A4 prêt à imprimer.
                </span>
              </span>
            </Link>
            <Link
              to="/compteur"
              className="flex items-start gap-3 rounded-2xl border border-tone-blue/40 bg-tone-blue-soft p-4"
            >
              <LineChart className="size-5 shrink-0 text-tone-blue" />
              <span>
                <span className="block text-sm font-semibold text-tone-blue">
                  Suivre mes calories
                </span>
                <span className="block text-xs text-muted-foreground">
                  Objectif du jour calculé depuis votre IMC et suivi par repas.
                </span>
              </span>
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {fichesRegimes.map((f) => {
              const t = tonClasses[f.ton];
              return (
                <Link
                  key={f.slug}
                  to="/fiches-regimes/$slug"
                  params={{ slug: f.slug }}
                  className={`rounded-2xl border p-3 text-sm font-medium ${t.border} ${t.soft} ${t.text}`}
                >
                  {f.emoji} {f.nom}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link to="/regimes" className="card-soft p-5">
          <Salad className="size-6 text-primary" />
          <h2 className="mt-2 text-base font-semibold">Régimes alimentaires</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {diets.length} fiches : principe, aliments, journée type, précautions.
          </p>
        </Link>
        <Link to="/maladies" className="card-soft p-5">
          <Stethoscope className="size-6 text-primary" />
          <h2 className="mt-2 text-base font-semibold">Fiches pathologies</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {diseases.length} régimes thérapeutiques : DASH, goutte, IRC, SOPK…
          </p>
        </Link>
        <Link to="/aliments" className="card-soft p-5">
          <Apple className="size-6 text-primary" />
          <h2 className="mt-2 text-base font-semibold">Teneurs alimentaires</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Phosphore, potassium, sodium, citrate… recherche et classement.
          </p>
        </Link>
      </section>

      <div className="mt-6">
        <MedicalDisclaimer />
      </div>
    </AppShell>
  );
}
