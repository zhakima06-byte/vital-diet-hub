import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftRight, Download, Leaf, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuWeekSheet } from "@/components/MenuWeekSheet";
import { exportElementToPdf } from "@/lib/pdf";
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
  remplacerAliment,
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
          "Programmes personnalisés et végétariens sur 7 jours avec quantités, calories et macronutriments, téléchargeables en PDF.",
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
  validateSearch: (s: Record<string, unknown>): { regime?: string } =>
    typeof s['regime'] === "string" ? { regime: s['regime'] } : {},
  component: MenusPage,
});

type ProfilVeg = "lacto-ovo" | "lacto" | "ovo" | "vegetalien";
const profilsVeg: { key: ProfilVeg; label: string }[] = [
  { key: "lacto-ovo", label: "Lacto-ovo (œufs + laitages)" },
  { key: "lacto", label: "Lacto (laitages, sans œufs)" },
  { key: "ovo", label: "Ovo (œufs, sans laitages)" },
  { key: "vegetalien", label: "Végétalien (100 % végétal)" },
];

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
  const search = Route.useSearch();
  const [objectif, setObjectif] = useState<ObjectifMenu>("maintien");
  const [contexte, setContexte] = useState<ProfilNutritionnel>("adulte");
  const [shares, setShares] = useState<Record<MealKey, number>>(DEFAULT_SHARES);
  const [prefs, setPrefs] = useState<Preferences>({ vegetarien: search.regime === "vegetarien", sansPoisson: false, sansLactose: false, sansGluten: false });
  const [dayIndex, setDayIndex] = useState(() => (new Date().getDay() + 6) % 7);
  const [menu, setMenu] = useState<DayMenu | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const profilVeg: ProfilVeg = prefs.sansLactose && prefs.sansOeufs ? "vegetalien" : prefs.sansOeufs ? "lacto" : prefs.sansLactose ? "ovo" : "lacto-ovo";
  const setProfilVeg = (v: ProfilVeg) =>
    setPrefs((p) => ({ ...p, vegetarien: true, sansOeufs: v === "lacto" || v === "vegetalien", sansLactose: v === "ovo" || v === "vegetalien" }));
  const sheetRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [downloadError, setDownloadError] = useState("");
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
  const remplacer = (meal: MealKey, uid: string) => reglages && setMenu((d) => d && remplacerAliment(d, meal, uid, reglages));
  const semaine = reglages ? JOURS.map((_, i) => (i === dayIndex && menu ? menu : genererJour(i, reglages))) : [];
  const corriger = () => {
    if (!menu || !reglages) return;
    const res = corrigerJour(menu, reglages);
    setMenu(res.jour);
    setMessages(res.messages);
  };

  const telecharger = async () => {
    if (!sheetRef.current || busy) return;
    setBusy(true);
    setDownloadError("");
    try {
      await exportElementToPdf(sheetRef.current, prefs.vegetarien ? "menu-vegetarien-7-jours.pdf" : "menu-personnalise-7-jours.pdf");
    } catch {
      setDownloadError("Le téléchargement a échoué. Veuillez réessayer.");
    } finally {
      setBusy(false);
    }
  };

  // Calories / macros restantes au fil des repas
  let cumul = { kcal: 0, proteines: 0, glucides: 0, lipides: 0 };

  return (
    <AppShell>
      <header>
        <h1 className="text-2xl font-semibold">Menus personnalisés</h1>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2" role="group" aria-label="Programme alimentaire">
          <Button variant={!prefs.vegetarien ? "default" : "outline"} className="h-12 whitespace-normal" aria-pressed={!prefs.vegetarien} onClick={() => setPrefs((p) => ({ ...p, vegetarien: false, sansOeufs: false, sansLactose: false }))}>
            <Utensils /> Menu personnalisé sur 7 jours
          </Button>
          <Button variant={prefs.vegetarien ? "default" : "outline"} className="h-12 whitespace-normal" aria-pressed={prefs.vegetarien} onClick={() => setPrefs((p) => ({ ...p, vegetarien: true }))}>
            <Leaf /> Régime végétarien
          </Button>
        </div>
      </header>
      <section className="mt-5 border-b border-border pb-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{prefs.vegetarien ? "Programme végétarien" : "Mon programme sur 7 jours"}</h2>
            <p className="mt-1 font-medium text-tone-blue">{besoins.caloriesCibles} kcal / jour · {objectifsMenu.find((o) => o.key === objectif)?.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">IMC {profil.imc.toFixed(1)} · {statutLabel[profil.statut]} · {profil.poids} kg · {profil.taille} cm · {profil.age} ans</p>
          </div>
          <Button variant="outline" onClick={telecharger} disabled={busy || !menu || !besoins.valide}>
            <Download /> {busy ? "Génération du PDF…" : "Télécharger les 7 jours"}
          </Button>
        </div>
        {downloadError && <p role="alert" className="mt-2 text-sm text-destructive">{downloadError}</p>}
        {prefs.vegetarien && (
          <label className="mt-4 block max-w-sm text-sm font-medium">
            Profil végétarien
            <select className={`${field} mt-2`} value={profilVeg} onChange={(e) => setProfilVeg(e.target.value as ProfilVeg)}>
              {profilsVeg.map((v) => <option key={v.key} value={v.key}>{v.label}</option>)}
            </select>
          </label>
        )}
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
          <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-7">
            {JOURS.map((j, i) => (
              <Button key={j} onClick={() => setDayIndex(i)} variant={i === dayIndex ? "default" : "secondary"} aria-pressed={i === dayIndex} className="px-2">
                {prefs.vegetarien ? `Jour ${i + 1}` : j}
              </Button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold">
              {prefs.vegetarien ? `Jour ${dayIndex + 1} — Menu végétarien` : `MON MENU — ${besoins.caloriesCibles} kcal`} <span className="text-sm font-normal text-muted-foreground">({menu.jour})</span>
            </h2>
          </div>

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
                          <span className="shrink-0 font-medium">{it.grammes} g</span>
                          <span className="hidden w-16 text-right text-xs text-muted-foreground sm:inline">{r0(ti.kcal)} kcal</span>
                          {prefs.vegetarien && <Button variant="ghost" size="icon" onClick={() => remplacer(meal.key, it.uid)} title="Remplacer cet aliment" aria-label="Remplacer cet aliment"><ArrowLeftRight /></Button>}
                        </li>
                      );
                    })}
                  </ul>
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
                    <div className="flex flex-wrap justify-between gap-1 text-sm">
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

          <div className="pointer-events-none fixed left-[-10000px] top-0" aria-hidden="true">
            <div ref={sheetRef}><MenuWeekSheet days={semaine} vegetarien={prefs.vegetarien} calories={besoins.caloriesCibles} /></div>
          </div>
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Suggestion nutritionnelle, pas une prescription médicale.
      </p>
      <MedicalDisclaimer />
    </AppShell>
  );
}
