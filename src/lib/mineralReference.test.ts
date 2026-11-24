import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { mineralReferencePercent } from "./mineralReference";
import { mineralSheets } from "../data/mineralSheets";

describe("Daily mineral references from the supplied brief", () => {
  for (const [key, values] of Object.entries({ potassium: [3500], zinc: [11, 8], iode: [150], cuivre: [0.9], manganese: [2.3, 1.8], chrome: [35, 25], molybdene: [50], phosphore: [700], sodium: [2000] })) {
    test(`${key} adult references`, () => assert.deepEqual(Object.values(mineralSheets).find((sheet) => sheet.key === key)?.references, values));
  }
  test("potassium 1524 mg covers 43.54 percent of 3500 mg", () => assert.ok(Math.abs((mineralReferencePercent(1524, 3500) ?? NaN) - 43.542857) < 0.001));
  test("zinc 78 mg compared to 11 mg for men", () => assert.ok(Math.abs((mineralReferencePercent(78, 11) ?? NaN) - 709.0909) < 0.001));
  test("zinc 78 mg compared to 8 mg for women", () => assert.equal(mineralReferencePercent(78, 8), 975));
  test("iodized salt keeps its 1 g basis and 2 µg content", () => {
    const salt = mineralSheets.iode.rows.find((r) => r.nom === "Sel iodé");
    assert.equal(salt?.base, "1 g"); assert.equal(salt?.valeur, 2);
    assert.ok(Math.abs((mineralReferencePercent(2, 150) ?? NaN) - 1.333333) < 0.001);
  });
  test("milk keeps 50 µg per 100 ml", () => {
    const milk = mineralSheets.iode.rows.find((r) => r.nom === "Lait");
    assert.equal(milk?.base, "100 ml"); assert.equal(milk?.valeur, 50);
  });
  test("sodium is a limit, not an intake target", () => assert.equal(mineralSheets.sodium.limit, true));
  test("38750 mg sodium per 100 g salt equals 38.75 percent by mass", () => assert.equal(mineralReferencePercent(38750, 100000), 38.75));
  test("invalid reference cannot produce a percentage", () => assert.equal(mineralReferencePercent(1, 0), null));
});