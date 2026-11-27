import { AlertTriangle, Carrot, Clock, Droplets, Hand, Refrigerator, Scale, SprayCan } from "lucide-react";

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

export function FermentationMethod() {
  return (
    <section className="card-soft p-5 sm:p-6">
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
  );
}
