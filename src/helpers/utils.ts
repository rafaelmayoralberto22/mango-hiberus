import {
  Coordinates,
  CurrentValuePixelType,
} from "../types/CurrentValuePixelType";

export const generateRangeNumber = (min: number, max: number): number[] => {
  const result = [];
  for (let i = min; i <= max; i++) {
    result.push(i);
  }
  return result;
};

export const sortRangeNumbers = (rangeValues: number[]) =>
  rangeValues.sort((a, b) => a - b);

export const mapLabelEuro = (value: number) =>
  Intl.NumberFormat("es-EN", {
    style: "currency",
    minimumFractionDigits: 2,
    currency: "EUR",
  }).format(value);

export const getCurrentValuePixel = (
  points: number[],
  slider: number
): CurrentValuePixelType[] => {
  const sliderPercent = slider / points.length;
  let before: Coordinates | null = null;
  const right = points.map((item) => {
    const coor: Coordinates = before
      ? {
          x: before.y + 0.000000001,
          y: before.y + sliderPercent,
        }
      : {
          x: 0,
          y: sliderPercent,
        };

    const value = { ...coor, valueL: item };
    before = value;

    return value;
  });

  return JSON.parse(JSON.stringify(points))
    .reverse()
    .map((item: Partial<CurrentValuePixelType>, index: number) => {
      return { ...right[index], valueR: item };
    });
};

export const getValuePixelLeft = (
  bullet: number,
  points: CurrentValuePixelType[]
) => {
  const item = points.findLast(({ x }) => x <= bullet);
  return item?.valueL ?? 0;
};

export const getValuePixelRight = (
  bullet: number,
  points: CurrentValuePixelType[]
) => {
  const item = points.findLast(({ x }) => x <= bullet);
  return item?.valueR ?? 0;
};
