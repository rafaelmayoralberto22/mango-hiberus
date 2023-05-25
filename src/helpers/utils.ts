export const generateRangeNumber = (min: number, max: number): number[] => {
  if (min === max) return [min];
  return [min, ...generateRangeNumber(min + 1, max)];
};

export const sortRangeNumbers = (rangeValues: number[]) =>
  rangeValues.sort((a, b) => a - b);

export const mapLabelEuro = (value: number) =>
  Intl.NumberFormat("es-EN", {
    style: "currency",
    minimumFractionDigits: 2,
    currency: "EUR",
  }).format(value);
