import type { RecipeTone } from "@/data/recettes";
import chou from "@/assets/recettes/chou.asset.json";
import carottes from "@/assets/recettes/carottes.asset.json";
import betteraves from "@/assets/recettes/betteraves.asset.json";
import concombres from "@/assets/recettes/concombres.asset.json";
import oignons from "@/assets/recettes/oignons.asset.json";
import melange from "@/assets/recettes/melange.asset.json";

export const recipeImages: Record<string, string> = { chou: chou.url, carottes: carottes.url, betteraves: betteraves.url, concombres: concombres.url, oignons: oignons.url, melange: melange.url };
export const recipeTones: Record<RecipeTone, { bg: string; text: string; border: string }> = {
  cabbage: { bg: "bg-tone-cabbage-soft", text: "text-tone-cabbage", border: "border-tone-cabbage/40" },
  carrot: { bg: "bg-tone-carrot-soft", text: "text-tone-carrot", border: "border-tone-carrot/40" },
  beet: { bg: "bg-tone-beet-soft", text: "text-tone-beet", border: "border-tone-beet/40" },
  cucumber: { bg: "bg-tone-green-soft", text: "text-tone-green", border: "border-tone-green/40" },
  onion: { bg: "bg-tone-onion-soft", text: "text-tone-onion", border: "border-tone-onion/40" },
  mixed: { bg: "bg-tone-violet-soft", text: "text-tone-violet", border: "border-tone-violet/40" },
};
