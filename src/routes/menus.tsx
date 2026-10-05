import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Lock, Plus, RefreshCw, Trash2, Unlock, Wand2 } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { foods, getFood } from "@/data/foods";
import { calculateNutritionNeeds, activiteLabels, type ProfilNutritionnel } from "@/lib/nutrition";
import { statutLabel, useProfil, type Objectif } from "@/lib/profil";
import {
  cibleRepas,
  corrigerJour,
  DEFAULT_SHARES,
  genererJour,
  itemTotaux,
  JOURS,
  makeItem,
  mealMeta,
  mealOrder,
  roleFromFood,
  somme,
  statutObjectif,
  totalJour,
  exclusions,
  type DayMenu,
  type MealKey,
  type Preferences,
  type ReglagesMenu,
} from "@/lib/menuGenerator";

export const Route = createFileRoute("/menus")({
  head: () => ({
    meta: [
      { title: "Générateur de menus personnalisés — NutriSanté" },
      {
        name: "description",
        content:
          "Menus d'une journée calculés à partir de vos besoins : calories, protéines, glucides et lipides, avec quantités en grammes et répartition par repas.",
      },
      { property: "og:title", content: "Menus personnalisés avec quantités — NutriSanté" },
      {
        property: "og:description",
        content: "Quels aliments, en quelle quantité, à quel repas : un menu équilibré calculé pour vous.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MenusPage,
});

type ObjectifMenu = Objectif | "reequilibrage";
const objectifsMenu: { key: ObjectifMenu; label: string; aide: string }[] = [
  { key: "perte", label: "Perte de poids", aide: "Déficit modéré, sans restriction excessive." },
  { key: "maintien", label: "Maintien", aide: "Respect de la cible quotidienne." },
  { key: "prise", label: "Prise de poids", aide: "Surplus progressif." },
  { key: "reequilibrage", label: "Rééquilibrage", aide: "Équilibre sans objectif de poids marqué." },
];

const contextes: { key: ProfilNutritionnel; label: string }[] = [
  { key: "adulte", label: "Adulte sans pathologie" },
  { key: "sportif", label: "Sportif" },
  { key: "diabete", label: "Diabète" },
  { key: "hypertension", label: "Hypertension" },
  { key: "goutte", label: "Hyperuricémie / goutte" },
  { key: "renale", label: "Maladie rénale chronique" },
];

const r0 = (n: number) => Math.round(n);
const field =
  "w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

function MenusPage() {
  const { profil, pret } = useProfil();
  const [objectif, setObjectif] = useState<ObjectifMenu>("maintien");
  const [contexte, setContexte] = useState<ProfilNutritionnel>("adulte");
  const [shares, setShares] = useState<Record<MealKey, number>>(DEFAULT_SHARES);
  const [prefs, setPrefs] = useState<Preferences>({ vegetarien: false, sansPoisson: false, sansLactose: false, sansGluten: false });
  const [dayIndex, setDayIndex] = useState(() => (new Date().getDay() + 6) % 7);
  const [menu, setMenu] = useState<DayMenu | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [ajout, setAjout] = useState<{ meal: MealKey; q: string } | null>(null);

  useEffect(() => {
    if (profil) setObjectif(profil.objectif);
  }, [profil]);

  const besoins = useMemo(
    () =>
      profil
        ? calculateNutritionNeeds({
            sexe: profil.sexe,
            age: profil.age,
            poids: profil.poids,
            taille: profil.taille,
            activite: profil.activite,
            objectif: objectif === "reequilibrage" ? "maintien" : objectif,
            profil: contexte,
          })
        : null,
    [profil, objectif, contexte],
  );

  const reglages: ReglagesMenu | null = useMemo(
    () => (besoins && besoins.valide ? { besoins, shares, prefs, profil: contexte } : null),
    [besoins, shares, prefs, contexte],
  );

  useEffect(() => {
    if (reglages) {
      setMenu(genererJour(dayIndex, reglages));
      setMessages([]);
    }
  }, [reglages, dayIndex]);

  if (pret && !profil) {
    return (
      <AppShell>
        <h1 className="text-2xl font-semibold">Mon menu personnalisé</h1>
        <div className="card-soft mt-4 p-6">
          <p className="text-sm text-muted-foreground">
            Le générateur utilise vos données (poids, taille, âge, sexe, activité). Calculez d'abord votre IMC.
          </p>
          <Link to="/" className="mt-4 inline-block rounded-xl bg-tone-blue px-4 py-2.5 text-sm font-medium text-primary-foreground">
            Calculer mon IMC →
          </Link>
        </div>
      </AppShell>
    );
  }
  if (!profil || !besoins) {
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">Chargement de votre profil…</p>
      </AppShell>
    );
  }

  const m = besoins.macros;
  const total = menu ? totalJour(menu) : null;
  const pathologie = contexte !== "adulte" && contexte !== "sportif";
  const excl = exclusions(prefs, contexte);

  const setItem = (meal: MealKey, uid: string, patch: Partial<{ grammes: number; verrouille: boolean }>) =>
    setMenu((d) =>
      d && {
        ...d,
        meals: d.meals.map((ml) =>
          ml.key !== meal ? ml : { ...ml, items: ml.items.map((it) => (it.uid === uid ? { ...it, ...patch } : it)) },
        ),
      },
    );
  const removeItem = (meal: MealKey, uid: string) =>
    setMenu((d) => d && { ...d, meals: d.meals.map((ml) => (ml.key !== meal ? ml : { ...ml, items: ml.items.filter((it) => it.uid !== uid) })) });
  const addItem = (meal: MealKey, foodId: string) => {
    const f = getFood(foodId);
    if (!f) return;
    setMenu((d) => d && { ...d, meals: d.meals.map((ml) => (ml.key !== meal ? ml : { ...ml, items: [...ml.items, makeItem(foodId, roleFromFood(f), 100)] })) });
    setAjout(null);
  };
  const corriger = () => {
    if (!menu || !reglages) return;
    const res = corrigerJour(menu, reglages);
    setMenu(res.jour);
    setMessages(res.messages);
  };

  // Calories / macros restantes au fil des repas
  let cumul = { kcal: 0, proteines: 0, glucides: 0, lipides: 0 };

  return (
    <AppShell>
      <header>
        <h1 className="text-2xl font-semibold">Mon menu personnalisé</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Calories → macronutriments → aliments et quantités → répartition sur la journée.
        </p>
      </header>

      {/* Profil & orientation */}
      <section className="card-soft mt-5 p-5">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-tone-blue-soft px-3 py-1 font-medium text-tone-blue">
            IMC {profil.imc.toFixed(1)} · {statutLabel[profil.statut]}
          </span>
          <span className="rounded-full bg-muted px-3 py-1">{profil.sexe === "femme" ? "Femme" : "Homme"}, {profil.age} ans</span>
          <span className="rounded-full bg-muted px-3 py-1">{profil.poids} kg · {profil.taille} cm</span>
          <span className="rounded-full bg-muted px-3 py-1">Activité : {activiteLabels[profil.activite]}</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          L'IMC oriente seulement : vos besoins combinent âge, sexe, poids, taille, activité, objectif et contexte de santé.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium">Objectif</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {objectifsMenu.map((o) => (
                <button
                  key={o.key}
                  onClick={() => setObjectif(o.key)}
                  className={`rounded-xl border px-3 py-2 text-left text-sm ${objectif === o.key ? "border-primary bg-primary/10 font-medium" : "border-border"}`}
                >
                  {o.label}
                  <span className="block text-[11px] text-muted-foreground">{o.aide}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium">
              Contexte de santé
              <select className={`${field} mt-2`} value={contexte} onChange={(e) => setContexte(e.target.value as ProfilNutritionnel)}>
                {contextes.map((c) => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </label>
            <div>
              <p className="text-sm font-medium">Préférences</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {([
                  ["vegetarien", "Végétarien"],
                  ["sansPoisson", "Sans poisson"],
                  ["sansLactose", "Sans lactose"],
                  ["sansGluten", "Sans gluten"],
                ] as [keyof Preferences, string][]).map(([k, l]) => (
                  <button
                    key={k}
                    onClick={() => setPrefs((p) => ({ ...p, [k]: !p[k] }))}
                    className={`rounded-full border px-3 py-1 text-xs ${prefs[k] ? "border-tone-green bg-tone-green-soft text-tone-green" : "border-border"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium">Répartition des calories entre les repas</summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {mealOrder.map((k) => (
              <label key={k} className="text-sm">
                {mealMeta[k].emoji} {mealMeta[k].label} : <b>{shares[k]} %</b>
                <input type="range" min={5} max={50} value={shares[k]} onChange={(e) => setShares((s) => ({ ...s, [k]: Number(e.target.value) }))} className="mt-1 w-full accent-[var(--primary)]" />
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Total : {mealOrder.reduce((s, k) => s + shares[k], 0)} % (les parts sont automatiquement ramenées à 100 %).
            <button className="ml-2 underline" onClick={() => setShares(DEFAULT_SHARES)}>Réinitialiser</button>
          </p>
        </details>
      </section>

      {pathologie && (
        <div className="mt-4 rounded-xl border border-tone-pink/40 bg-tone-pink-soft p-4 text-sm text-tone-pink">
          Cette suggestion doit être adaptée au contexte médical individuel.
          {contexte === "renale" && " Protéines, potassium, phosphore, sodium et liquides doivent être fixés selon le stade et le bilan par votre néphrologue ou diététicien."}
          {excl.size > 2 && " Certains aliments ont été écartés ou remplacés pour ce contexte."}
        </div>
      )}

      {!besoins.valide && (
        <div className="card-soft mt-4 p-4 text-sm text-destructive">{besoins.erreurs.join(" ")}</div>
      )}

      {menu && total && (
        <>
          {/* Jours */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {JOURS.map((j, i) => (
              <button key={j} onClick={() => setDayIndex(i)} className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${i === dayIndex ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {j}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold">
              MON MENU — {besoins.caloriesCibles} kcal <span className="text-sm font-normal text-muted-foreground">({menu.jour})</span>
            </h2>
            <div className="flex gap-2">
              <button onClick={corriger} className="inline-flex items-center gap-1.5 rounded-xl bg-tone-green px-3 py-2 text-sm font-medium text-primary-foreground">
                <Wand2 className="size-4" /> Ajuster automatiquement
              </button>
              <button onClick={() => reglages && setMenu(genererJour(dayIndex + 7 * (1 + Math.floor(Math.random() * 3)) + 1, reglages))} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm">
                <RefreshCw className="size-4" /> Autre menu
              </button>
            </div>
          </div>
          {messages.length > 0 && (
            <ul className="mt-3 space-y-1 rounded-xl bg-tone-green-soft p-3 text-sm text-tone-green">
              {messages.map((x) => <li key={x}>• {x}</li>)}
            </ul>
          )}

          <div className="mt-4 space-y-4">
            {menu.meals.map((meal) => {
              const t = somme(meal.items);
              const c = cibleRepas(besoins, shares, meal.key);
              cumul = { kcal: cumul.kcal + t.kcal, proteines: cumul.proteines + t.proteines, glucides: cumul.glucides + t.glucides, lipides: cumul.lipides + t.lipides };
              const q = ajout?.meal === meal.key ? ajout.q.trim().toLowerCase() : "";
              const resultats = q ? foods.filter((f) => f.name.toLowerCase().includes(q) && !excl.has(f.id)).slice(0, 6) : [];
              return (
                <article key={meal.key} className="card-soft p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold">{mealMeta[meal.key].emoji} {mealMeta[meal.key].label}</h3>
                    <span className="text-xs text-muted-foreground">{meal.titre} · cible ≈ {r0(c.kcal)} kcal</span>
                  </div>
                  <ul className="mt-3 divide-y divide-border/60">
                    {meal.items.map((it) => {
                      const f = getFood(it.foodId);
                      const ti = itemTotaux(it.foodId, it.grammes);
                      return (
                        <li key={it.uid} className="flex items-center gap-2 py-2 text-sm">
                          <span className="flex-1">{f?.name}{it.foodId === "oeuf" && <span className="text-xs text-muted-foreground"> (≈ {Math.max(1, Math.round(it.grammes / 55))} œuf{it.grammes >= 83 ? "s" : ""})</span>}</span>
                          <input type="number" min={0} value={it.grammes} onChange={(e) => setItem(meal.key, it.uid, { grammes: Math.max(0, Number(e.target.value) || 0) })} className="w-20 rounded-lg border border-input bg-background px-2 py-1 text-right" aria-label={`Quantité ${f?.name}`} />
                          <span className="w-4 text-xs text-muted-foreground">g</span>
                          <span className="hidden w-16 text-right text-xs text-muted-foreground sm:inline">{r0(ti.kcal)} kcal</span>
                          <button onClick={() => setItem(meal.key, it.uid, { verrouille: !it.verrouille })} title={it.verrouille ? "Quantité verrouillée" : "Verrouiller la quantité"} className="text-muted-foreground">
                            {it.verrouille ? <Lock className="size-4 text-primary" /> : <Unlock className="size-4" />}
                          </button>
                          <button onClick={() => removeItem(meal.key, it.uid)} aria-label="Supprimer" className="text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button>
                        </li>
                      );
                    })}
                  </ul>
                  {ajout?.meal === meal.key ? (
                    <div className="mt-2">
                      <input autoFocus className={field} placeholder="Rechercher un aliment…" value={ajout.q} onChange={(e) => setAjout({ meal: meal.key, q: e.target.value })} />
                      {resultats.map((f) => (
                        <button key={f.id} onClick={() => addItem(meal.key, f.id)} className="block w-full px-2 py-1.5 text-left text-sm hover:bg-muted">{f.name}</button>
                      ))}
                    </div>
                  ) : (
                    <button onClick={() => setAjout({ meal: meal.key, q: "" })} className="mt-2 inline-flex items-center gap-1 text-xs text-primary"><Plus className="size-3.5" /> Ajouter un aliment</button>
                  )}
                  <p className="mt-3 rounded-lg bg-muted/60 px-3 py-2 text-xs font-medium">
                    {r0(t.kcal)} kcal | {r0(t.proteines)} g protéines | {r0(t.glucides)} g glucides | {r0(t.lipides)} g lipides
                    {t.fibres > 0 && <> | {r0(t.fibres)} g fibres</>}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Restant après ce repas : {r0(besoins.caloriesCibles - cumul.kcal)} kcal · {r0(m.proteines.grammes - cumul.proteines)} g P · {r0(m.glucides.grammes - cumul.glucides)} g G · {r0(m.lipides.grammes - cumul.lipides)} g L
                  </p>
                </article>
              );
            })}
          </div>

          {/* Total */}
          <section className="card-soft mt-5 p-5">
            <h3 className="font-semibold">TOTAL JOURNÉE</h3>
            <div className="mt-3 space-y-3">
              {([
                ["Calories", total.kcal, besoins.caloriesCibles, "kcal"],
                ["Protéines", total.proteines, m.proteines.grammes, "g"],
                ["Glucides", total.glucides, m.glucides.grammes, "g"],
                ["Lipides", total.lipides, m.lipides.grammes, "g"],
              ] as [string, number, number, string][]).map(([l, v, c, u]) => {
                const s = statutObjectif(v, c);
                return (
                  <div key={l}>
                    <div className="flex justify-between text-sm">
                      <span>{l} : <b>{r0(v)}</b> / {r0(c)} {u}</span>
                      <span className={s === "ok" ? "text-tone-green" : "text-tone-pink"}>
                        {s === "ok" ? "✓ Objectif atteint" : s === "bas" ? "En dessous" : "Au-dessus"}
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full ${s === "ok" ? "bg-tone-green" : "bg-tone-pink"}`} style={{ width: `${Math.min(100, (v / (c || 1)) * 100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Énergie des macronutriments : {r0(total.proteines)}×4 + {r0(total.glucides)}×4 + {r0(total.lipides)}×9 = {r0(total.kcal)} kcal
              {total.fibres > 0 && ` · Fibres ≈ ${r0(total.fibres)} g`}
            </p>
            {(contexte === "renale" || contexte === "hypertension") && (
              <p className="mt-2 text-xs text-muted-foreground">
                Repères indicatifs : sodium ≈ {r0(total.sodium)} mg · potassium ≈ {r0(total.potassium)} mg · phosphore ≈ {r0(total.phosphore)} mg (hors sel ajouté).
              </p>
            )}
          </section>
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Suggestion d'aide nutritionnelle, pas une prescription médicale. Teneurs : ordres de grandeur de la base NutriSanté (type CIQUAL), architecture prête pour Open Food Facts, USDA, Edamam et Nutritionix.
      </p>
      <MedicalDisclaimer />
    </AppShell>
  );
}
