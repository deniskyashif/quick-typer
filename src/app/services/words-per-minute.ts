export function calculateGrossWpm(typedEntries: number, minutes: number) {
  if(minutes === 0) {
    return 0;
  }

  return Math.round((typedEntries / 5) / minutes);
}
