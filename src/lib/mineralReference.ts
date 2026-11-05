/** Percentage for the row's stated serving; not the absorbed amount. */
export function mineralReferencePercent(value: number, reference: number): number | null {
  if (!Number.isFinite(value) || value < 0 || !Number.isFinite(reference) || reference <= 0) return null;
  return value / reference * 100;
}
