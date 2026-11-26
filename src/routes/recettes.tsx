import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, Droplets, Hand, Lock, Refrigerator, Scale, SprayCan, Carrot } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { recipeCategories, recipes, type FermentationRecipe, type RecipeCategory, type RecipeTone } from "@/data/recettes";
import chou from "@/assets/recettes/chou.asset.json";
import carottes from "@/assets/recettes/carottes.asset.json";
import betteraves from "@/assets/recettes/betteraves.asset.json";
import concombres from "@/assets/recettes/concombres.asset.json";
import oignons from "@/assets/recettes/oignons.asset.json";
import melange from "@/assets/recettes/melange.asset.json";

export const Route = createFileRoute("/recettes")({
  head: () => ({
    meta: [
      { title: "Recettes de légumes lacto-fermentés | NutriSanté" },
      { name: "description", content: "Chou, carottes, betteraves, concombres et oignons lacto-fermentés : durée, sel et méthode de base étape par étape." },
      { property: "og:title", content: "Recettes de légumes lacto-fermentés — NutriSanté" },
      { property: "og:description", content: "La méthode de base et des recettes illustrées de légumes lacto-fermentés." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RecettesPage,
});

const images: Record<string, string> = { chou: chou.url, carottes: carottes.url, betteraves: betteraves.url, concombres: concombres.url, oignons: oignons.url, melange: melange.url };
const tones: Record<RecipeTone, { bg: string; text: string; border: string }> = {
  cabbage: { bg: "bg-tone-cabbage-soft", text: "text-tone-cabbage", border: "border-tone-cabbage/40" },
  carrot: { bg: "bg-tone-carrot-soft", text: "text-tone-carrot", border: "border-tone-carrot/40" },
  beet: { bg: "bg-tone-beet-soft", text: "text-tone-beet", border: "border-tone-beet/40" },
  cucumber: { bg: "bg-tone-green-soft", text: "text-tone-green", border: "border-tone-green/40" },
  onion: { bg: "bg-tone-onion-soft", text: "text-tone-onion", border: "border-tone-onion/40" },
  mixed: { bg: "bg-tone-violet-soft", text: "text-tone-violet", border: "border-tone-violet/40" },
};

const steps = [
  { icon: SprayCan, title: "Préparer le matériel", text: "Lavez soigneusement les mains, le plan de travail, le bocal en verre et son couvercle à l’eau chaude savonneuse. Rincez bien et séchez." },
  { icon: Droplets, title: "Préparer les légumes", text: "Lavez les légumes à l’eau claire. Épluchez-les ou non selon la recette, puis râpez-les, tranchez-les ou laissez-les entiers." },
  { icon: Scale, title: "Calculer le sel", text: "Pesez les légumes, puis le sel à 2 % de leur poids : 1 kg de légumes → 20 g de sel. Utilisez uniquement du sel non iodé (gros sel ou sel de mer)." },
  { icon: Hand, title: "Saler et malaxer", text: "Saupoudrez le sel et malaxez fermement 5 à 10 minutes, jusqu’à ce que les légumes rendent leur jus." },
  { icon: Carrot, title: "Remplir le bocal", text: "Tassez très fortement pour chasser l’air. Le jus doit toujours recouvrir complètement les légumes. Laissez 3 à 5 cm d’espace libre en haut." },
  { icon: Clock, title: "Fermer et fermenter", text: "Fermez sans serrer trop hermétiquement, ou utilisez un couvercle à soupape. Laissez fermenter à 18–22 °C, à l’abri de la lumière directe, 1 à 4 semaines selon le goût." },
  { icon: Refrigerator, title: "Goûter et conserver", text: "Goûtez dès la première semaine. Quand le goût aigre-doux vous plaît, fermez hermétiquement et placez au réfrigérateur : plusieurs mois de conservation." },
];
const stepTones = ["bg-tone-blue", "bg-tone-green", "bg-tone-carrot", "bg-tone-pink", "bg-tone-violet", "bg-tone-beet", "bg-tone-cabbage"];

function RecettesPage() {
  const [cat, setCat] = useState<RecipeCategory>("Toutes");
  const [open, setOpen] = useState<FermentationRecipe | null>(null);
  const list = recipes.filter((r) => cat === "Toutes" || r.category === cat);
  return (
    <AppShell>
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Recettes</h1>
        <p className="mt-2 text-muted-foreground">Légumes lacto-fermentés : choisissez une recette pour voir les ingrédients et la préparation.</p>
      </header>

      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
        {recipeCategories.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"}`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => {
          const t = tones[r.tone];
          return (
            <button key={r.id} onClick={() => setOpen(r)} className={`overflow-hidden rounded-2xl border-2 ${t.border} ${t.bg} text-left shadow-soft transition-transform hover:-translate-y-0.5`}>
              <img src={images[r.id]} alt={r.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-4">
                <span className={`text-xs font-semibold uppercase ${t.text}`}>{r.category}</span>
                <h2 className="mt-1 text-lg font-semibold">{r.name}</h2>
                <div className="mt-3 flex gap-4 text-sm"><span>⏱ {r.days}</span><span>🧂 {r.saltPercent} % de sel</span></div>
              </div>
            </button>
          );
        })}
      </div>

      <section className="mt-10 card-soft p-5 sm:p-6">
        <h2 className="text-2xl font-semibold">La méthode de base</h2>
        <p className="mt-1 text-sm text-muted-foreground">Pour préparer vos premiers légumes lacto-fermentés.</p>
        <ol className="mt-5 space-y-4">
          {steps.map((s, i) => { const Icon = s.icon; return (
            <li key={s.title} className="flex gap-3">
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-full font-bold text-primary-foreground ${stepTones[i]}`}>{i + 1}</span>
              <div><h3 className="flex items-center gap-2 font-semibold"><Icon className="size-4 text-muted-foreground" />{s.title}</h3><p className="mt-1 text-sm text-muted-foreground">{s.text}</p></div>
            </li>); })}
        </ol>
        <div className="mt-6 rounded-xl border border-level-high/40 bg-level-high-soft p-4">
          <h3 className="flex items-center gap-2 font-semibold"><AlertTriangle className="size-4 text-level-high" />Erreurs à éviter</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            <li>Légumes non immergés dans leur jus</li><li>Sel iodé</li><li>Eau du robinet non bouillie</li><li>Pot ouvert longtemps</li>
            <li>Moisissures colorées, odeur putride ou texture visqueuse : jetez le bocal sans goûter.</li>
          </ul>
        </div>
      </section>

      <div className="mt-6"><MedicalDisclaimer /></div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        {open && (
          <DialogContent className={`max-h-[90vh] overflow-y-auto border-2 ${tones[open.tone].border} ${tones[open.tone].bg}`}>
            <img src={images[open.id]} alt="" className="h-40 w-full rounded-xl object-cover" />
            <DialogHeader>
              <DialogTitle className={`text-xl ${tones[open.tone].text}`}>{open.name}</DialogTitle>
              <DialogDescription>⏱ {open.days} · 🧂 {open.saltPercent} % du poids des {open.saltBasis}</DialogDescription>
            </DialogHeader>
            <div><h3 className="font-semibold">Ingrédients</h3>
              <ul className="mt-1 space-y-1 text-sm">{open.ingredients.map((i) => <li key={i} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0" />{i}</li>)}</ul></div>
            <div><h3 className="flex items-center gap-2 font-semibold"><Lock className="size-4" />Préparation</h3><p className="mt-1 text-sm">{open.preparation}</p></div>
          </DialogContent>
        )}
      </Dialog>
    </AppShell>
  );
}