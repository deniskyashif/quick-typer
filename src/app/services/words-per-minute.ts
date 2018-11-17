export function calculateGrossWpm(typedEntries: number, minutes: number) {
  return Math.round((typedEntries / 5) / minutes);
}
