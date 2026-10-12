import { getFood } from "@/data/foods";
import { mealMeta, somme, totalJour, type DayMenu } from "@/lib/menuGenerator";

export function MenuWeekSheet({ days, vegetarien, calories }: { days: DayMenu[]; vegetarien: boolean; calories: number }) {
  return (
    <div className="w-[760px] bg-background p-8 text-foreground">
      <h1 className="text-2xl font-semibold">NutriSanté · Dr ZALEGH</h1>
      <h2 className="mt-2 text-xl font-semibold">{vegetarien ? "Programme végétarien" : "Menu personnalisé"} sur 7 jours</h2>
      <p className="mt-2 text-sm">Objectif énergétique : {calories} kcal / jour</p>
      {days.map((day, index) => {
        const total = totalJour(day);
        return (
          <section key={index} className="mt-6 border-t border-border pt-4">
            <h3 className="text-lg font-semibold">Jour {index + 1} · {day.jour}</h3>
            <div className="mt-3 grid grid-cols-2 gap-4">
              {day.meals.map((meal) => {
                const t = somme(meal.items);
                return (
                  <div key={meal.key}>
                    <h4 className="font-semibold">{mealMeta[meal.key].label}</h4>
                    <p className="text-sm text-muted-foreground">{meal.titre}</p>
                    <ul className="mt-1 text-sm">
                      {meal.items.map((item) => <li key={item.uid}>{getFood(item.foodId)?.name} : {item.grammes} g</li>)}
                    </ul>
                    <p className="mt-1 text-xs">{Math.round(t.kcal)} kcal · P {Math.round(t.proteines)} g · G {Math.round(t.glucides)} g · L {Math.round(t.lipides)} g</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-sm font-semibold">Total : {Math.round(total.kcal)} kcal · Protéines {Math.round(total.proteines)} g · Glucides {Math.round(total.glucides)} g · Lipides {Math.round(total.lipides)} g</p>
          </section>
        );
      })}
      <p className="mt-6 text-xs text-muted-foreground">Suggestion nutritionnelle, pas une prescription médicale. Cette suggestion doit être adaptée au contexte médical individuel. Les informations ne remplacent pas une consultation médicale ou un suivi diététique individualisé.</p>
    </div>
  );
}