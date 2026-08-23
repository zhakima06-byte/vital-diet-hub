import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Flame } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";

export const Route = createFileRoute("/calculateurs/")({
  head: () => ({
    meta: [
      { title: "Calculateurs médicaux — DFG et calories — NutriSanté" },
      {
        name: "description",
        content:
          "Estimez votre débit de filtration glomérulaire (CKD-EPI, MDRD, Cockcroft-Gault) et vos besoins caloriques journaliers, avec répartition des macronutriments.",
      },
      { property: "og:title", content: "Calculateurs médicaux — NutriSanté" },
      {
        property: "og:description",
        content: "DFG et stade d'insuffisance rénale, besoins caloriques et calories d'un repas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CalculateursPage,
});

const cards = [
  {
    to: "/calculateurs/dfg" as const,
    icon: Activity,
    titre: "Débit de filtration glomérulaire (DFG)",
    texte:
      "Trois formules : CKD-EPI 2021, MDRD et Cockcroft-Gault. Classification automatique du stade G1 à G5 et accès direct à la fiche alimentaire IRC.",
  },
  {
    to: "/calculateurs/calories" as const,
    icon: Flame,
    titre: "Calories et macronutriments",
    texte:
      "Besoins journaliers selon Mifflin-St Jeor, ajustés à l'objectif, et composition d'un repas à partir de la base d'aliments.",
  },
];

function CalculateursPage() {
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">Calculateurs médicaux</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Outils d'aide à l'évaluation. Ils ne remplacent ni un dosage biologique interprété par un
        médecin, ni un bilan diététique.
      </p>

      <div className="mt-5">
        <MedicalDisclaimer strong />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.to} to={c.to} className="card-soft block p-5 transition-transform hover:-translate-y-0.5">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <h2 className="mt-3 text-lg font-semibold">{c.titre}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.texte}</p>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
