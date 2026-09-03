import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Trash2, Utensils } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { foods, kcalPer100g } from "@/data/foods";
import { fichesRegimes } from "@/data/fichesRegimes";
import { menus7j } from "@/data/menus";
import {
  activites,
  besoins,
  objectifs,
  statutLabel,
  useProfil,
  type Activite,
  type Objectif,
} from "@/lib/profil";
import {
  dateKey,
  derniers7Jours,
  formatDate,
  repasList,
  totalKcal,
  useJournal,
  type Repas,
} from "@/lib/journal";

export const Route = createFileRoute("/compteur")({
  head: () => ({
    meta: [
      { title: "Compteur de calories personnalisé — NutriSanté" },
      {
        name: "description",
        content:
          "Suivez vos calories du jour à partir de vos données d'IMC : besoins journaliers, ajout d'aliments par repas, historique journalier et hebdomadaire.",
      },
      { property: "og:title", content: "Compteur de calories post-IMC — NutriSanté" },
      {
        property: "og:description",
        content:
          "Besoins caloriques calculés depuis votre IMC et suivi quotidien de vos apports par repas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompteurPage,
});

const field =
  "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40";

function CompteurPage() {
  const { profil, pret, update } = useProfil();
  const { journal, ajouter, supprimer, viderJour } = useJournal();

  const jour = dateKey();
  const entrees = journal[jour] ?? [];

  const [recherche, setRecherche] = useState("");
  const [repas, setRepas] = useState<Repas>("petit-dejeuner");
  const [grammes, setGrammes] = useState("100");
  const [regimeSuivi, setRegimeSuivi] = useState("");

  const resultats = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    if (!q) return [];
    return foods.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 6);
  }, [recherche]);

  const cible = profil ? besoins(profil).cible : 0;
  const consomme = totalKcal(entrees);
  const pct = cible ? Math.min(100, Math.round((consomme / cible) * 100)) : 0;
  const ecart = consomme - cible;

  const semaine = derniers7Jours();
  const maxSemaine = Math.max(cible, ...semaine.map((d) => totalKcal(journal[d] ?? [])), 1);

  const fiche = fichesRegimes.find((f) => f.slug === regimeSuivi);
  const menu = fiche ? menus7j.find((m) => m.slug === fiche.menuSlug) : undefined;
  const menuDuJour = menu?.jours[(new Date().getDay() + 6) % 7];

  if (pret && !profil) {
    return (
      <AppShell>
        <h1 className="text-2xl font-semibold">Compteur de calories</h1>
        <div className="card-soft mt-4 p-6">
          <p className="text-sm text-muted-foreground">
            Le compteur réutilise automatiquement les données de votre calcul d'IMC (poids, taille,
            âge, sexe, activité). Calculez d'abord votre IMC pour l'activer.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-xl bg-tone-blue px-4 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Calculer mon IMC →
          </Link>
        </div>
      </AppShell>
    );
  }

  if (!profil) {
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">Chargement de votre profil…</p>
      </AppShell>
    );
  }

  const b = besoins(profil);

  const ajouterAliment = (foodId: string) => {
    const food = foods.find((f) => f.id === foodId);
    const g = Number(grammes);
    if (!food || !g || g <= 0) return;
    ajouter(jour, {
      id: `${Date.now()}-${food.id}`,
      foodId: food.id,
      nom: food.name,
      grammes: g,
      kcal: Math.round((kcalPer100g(food) * g) / 100),
      repas,
    });
    setRecherche("");
  };

  const message =
    consomme === 0
      ? "Ajoutez votre premier aliment pour démarrer la journée."
      : ecart > 250
        ? "Vous êtes au-dessus de votre objectif aujourd'hui. Ce n'est pas grave : une journée ne définit pas votre équilibre, ajustez simplement le prochain repas."
        : ecart < -250
          ? "Vos apports sont en dessous de votre objectif. Pensez à compléter avec une collation nourrissante pour couvrir vos besoins."
          : "Vous êtes dans votre zone d'objectif. Continuez ainsi, en écoutant votre faim et votre satiété.";

  return (
    <AppShell>
      <header>
        <h1 className="text-2xl font-semibold">Compteur de calories</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Données reprises de votre calcul d'IMC : {profil.poids} kg · {profil.taille} cm ·{" "}
          {profil.age} ans · {profil.sexe === "homme" ? "homme" : "femme"} · IMC{" "}
          {profil.imc.toFixed(1)} ({statutLabel[profil.statut]}).
        </p>
      </header>

      <section className="card-soft mt-5 border-tone-blue/40 p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Objectif du jour</p>
            <p className="font-display text-3xl font-semibold text-tone-blue">{cible} kcal</p>
            <p className="text-xs text-muted-foreground">
              Métabolisme de base {b.mb} kcal · maintien {b.maintien} kcal
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Consommé</p>
            <p className="font-display text-3xl font-semibold">{consomme} kcal</p>
            <p className="text-xs text-muted-foreground">
              {ecart >= 0 ? `+${ecart}` : ecart} kcal vs objectif
            </p>
          </div>
        </div>

        <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-4 rounded-full transition-all ${
              ecart > 250 ? "bg-tone-pink" : ecart < -250 ? "bg-tone-violet" : "bg-tone-green"
            }`}
            style={{ width: `${Math.max(2, pct)}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-medium">Niveau d'activité</span>
            <select
              className={field}
              value={profil.activite}
              onChange={(e) => update({ activite: e.target.value as Activite })}
            >
              {activites.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Objectif (ajusté à votre IMC)</span>
            <select
              className={field}
              value={profil.objectif}
              onChange={(e) => update({ objectif: e.target.value as Objectif })}
            >
              {objectifs.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="card-soft mt-4 p-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Utensils className="size-5 text-tone-blue" /> Ajouter un aliment
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_130px_110px]">
          <label className="text-sm">
            <span className="mb-1 block font-medium">Rechercher</span>
            <input
              className={field}
              placeholder="Ex. pain complet, yaourt…"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Repas</span>
            <select className={field} value={repas} onChange={(e) => setRepas(e.target.value as Repas)}>
              {repasList.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Quantité (g)</span>
            <input
              className={field}
              inputMode="numeric"
              value={grammes}
              onChange={(e) => setGrammes(e.target.value)}
            />
          </label>
        </div>

        {resultats.length > 0 && (
          <ul className="mt-3 divide-y divide-border rounded-xl border border-border">
            {resultats.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {kcalPer100g(f)} kcal / 100 g · {f.category}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => ajouterAliment(f.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-tone-blue px-3 py-1.5 text-xs font-medium text-primary-foreground"
                >
                  <Plus className="size-3.5" /> Ajouter
                </button>
              </li>
            ))}
          </ul>
        )}
        {recherche && resultats.length === 0 && (
          <p className="mt-3 text-sm text-muted-foreground">Aucun aliment trouvé pour « {recherche} ».</p>
        )}
      </section>

      <section className="card-soft mt-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Journée du {formatDate(jour)}</h2>
          {entrees.length > 0 && (
            <button
              type="button"
              onClick={() => viderJour(jour)}
              className="text-xs text-muted-foreground underline"
            >
              Tout effacer
            </button>
          )}
        </div>

        {entrees.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Aucun aliment enregistré aujourd'hui.</p>
        ) : (
          <div className="mt-3 space-y-4">
            {repasList.map((r) => {
              const list = entrees.filter((e) => e.repas === r.key);
              if (!list.length) return null;
              return (
                <div key={r.key}>
                  <p className="text-sm font-medium">
                    {r.label} · {totalKcal(list)} kcal
                  </p>
                  <ul className="mt-1.5 divide-y divide-border rounded-xl border border-border">
                    {list.map((e) => (
                      <li key={e.id} className="flex items-center justify-between px-3 py-2 text-sm">
                        <span>
                          {e.nom}{" "}
                          <span className="text-muted-foreground">({e.grammes} g)</span>
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="font-medium">{e.kcal} kcal</span>
                          <button
                            type="button"
                            aria-label={`Supprimer ${e.nom}`}
                            onClick={() => supprimer(jour, e.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="card-soft mt-4 p-5">
        <h2 className="text-lg font-semibold">Historique des 7 derniers jours</h2>
        <ul className="mt-3 space-y-2">
          {semaine.map((d) => {
            const total = totalKcal(journal[d] ?? []);
            return (
              <li key={d} className="text-sm">
                <div className="flex justify-between">
                  <span className={d === jour ? "font-medium" : "text-muted-foreground"}>
                    {formatDate(d)}
                  </span>
                  <span className="text-muted-foreground">{total} kcal</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-tone-blue"
                    style={{ width: `${Math.round((total / maxSemaine) * 100)}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Moyenne hebdomadaire :{" "}
          {Math.round(semaine.reduce((s, d) => s + totalKcal(journal[d] ?? []), 0) / 7)} kcal / jour
          (objectif {cible} kcal).
        </p>
      </section>

      <section className="card-soft mt-4 p-5">
        <h2 className="text-lg font-semibold">Repère régime (optionnel)</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Si vous suivez l'une des fiches régimes, affichez le menu type du jour pour comparer.
        </p>
        <select
          className={`${field} mt-3`}
          value={regimeSuivi}
          onChange={(e) => setRegimeSuivi(e.target.value)}
        >
          <option value="">Aucun régime suivi</option>
          {fichesRegimes.map((f) => (
            <option key={f.slug} value={f.slug}>
              {f.nom}
            </option>
          ))}
        </select>

        {fiche && (
          <div className="mt-3 rounded-xl border border-border bg-muted p-4 text-sm">
            <p className="text-xs text-muted-foreground">{fiche.reperesCalories}</p>
            {menuDuJour && (
              <ul className="mt-2 space-y-1">
                <li>
                  <strong>Petit-déjeuner :</strong> {menuDuJour.petitDejeuner}
                </li>
                <li>
                  <strong>Déjeuner :</strong> {menuDuJour.dejeuner}
                </li>
                <li>
                  <strong>Collation :</strong> {menuDuJour.collation}
                </li>
                <li>
                  <strong>Dîner :</strong> {menuDuJour.diner}
                </li>
              </ul>
            )}
            <Link
              to="/fiches-regimes/$slug"
              params={{ slug: fiche.slug }}
              className="mt-3 inline-block text-sm font-medium text-tone-blue"
            >
              Voir la fiche complète →
            </Link>
          </div>
        )}
      </section>

      <div className="mt-6">
        <MedicalDisclaimer />
      </div>
    </AppShell>
  );
}
