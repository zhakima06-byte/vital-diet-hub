import { test } from "node:test";
import assert from "node:assert/strict";
import { basicMethod, recipes } from "./recettes";

test("basic method uses 2 percent salt: 1000 g vegetables require 20 g", () => {
  assert.equal(basicMethod.saltPercent, 2);
  assert.equal(1000 * basicMethod.saltPercent / 100, 20);
});
test("massage lasts 5 to 10 minutes", () => assert.deepEqual(basicMethod.massageMinutes, [5, 10]));
test("headspace is 3 to 5 cm", () => assert.deepEqual(basicMethod.headspaceCm, [3, 5]));
test("ambient temperature is 18 to 22 degrees C", () => assert.deepEqual(basicMethod.temperatureC, [18, 22]));
test("basic fermentation window is 1 to 4 weeks", () => assert.deepEqual(basicMethod.weeks, [1, 4]));
test("whole vegetables do not reuse the dry salting base", () => {
  const whole = recipes.filter((recipe) => recipe.category === "Légumes entiers");
  assert.equal(whole.length, 2);
  for (const recipe of whole) assert.equal(recipe.saltBasis, "légumes + eau");
});test("every recipe has a preparation time and a collection with precautions", async () => {
  const { collectionInfo } = await import("./recettes");
  for (const r of recipes) { assert.ok(r.prepTime); assert.ok(collectionInfo[r.collection]?.precautions.length); }
});
