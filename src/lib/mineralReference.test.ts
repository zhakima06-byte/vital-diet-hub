import { describe, expect, test } from "bun:test";
import { mineralReferencePercent } from "./mineralReference";
import { mineralSheets } from "../data/mineralSheets";

describe("Daily mineral references from the supplied brief", () => {
  for (const [key, values] of Object.entries({ potassium: [3500], zinc: [11, 8], iode: [150], cuivre: [0.9], manganese: [2.3, 1.8], chrome: [35, 25], molybdene: [50], phosphore: [700], sodium: [2000] })) {
    test(`${key} adult references`, () => expect(mineralSheets[key].references).toEqual(values));
  }
  test("potassium 1524 mg covers 43.54 percent of 3500 mg", () => expect(mineralReferencePercent(1524, 3500)).toBeCloseTo(43.542857));
  test("zinc 78 mg compared to 11 mg for men", () => expect(mineralReferencePercent(78, 11)).toBeCloseTo(709.0909));
  test("zinc 78 mg compared to 8 mg for women", () => expect(mineralReferencePercent(78, 8)).toBe(975));
  test("iodized salt keeps its 1 g basis and 2 µg content", () => {
    const salt = mineralSheets.iode.rows.find((r) => r.nom === "Sel iodé");
    expect(salt?.base).toBe("1 g"); expect(salt?.valeur).toBe(2);
    expect(mineralReferencePercent(2, 150)).toBeCloseTo(1.333333);
  });
  test("milk keeps 50 µg per 100 ml", () => {
    const milk = mineralSheets.iode.rows.find((r) => r.nom === "Lait");
    expect(milk?.base).toBe("100 ml"); expect(milk?.valeur).toBe(50);
  });
  test("sodium is a limit, not an intake target", () => expect(mineralSheets.sodium.limit).toBe(true));
  test("38750 mg sodium per 100 g salt equals 38.75 percent by mass", () => expect(mineralReferencePercent(38750, 100000)).toBe(38.75));
  test("invalid reference cannot produce a percentage", () => expect(mineralReferencePercent(1, 0)).toBeNull());
});