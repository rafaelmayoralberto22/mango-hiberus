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
  const reverse = JSON.parse(JSON.stringify(points)).reverse();
  const sliderPercent = slider / points.length;
  let before: Coordinates | null = null;
  return points.map((item, index: number) => {
    const coor: Coordinates = before
      ? {
          x: before.y,
          y: before.y + sliderPercent,
        }
      : {
          x: 0,
          y: sliderPercent,
        };

    if (index === points.length - 1) {
      coor.y = slider;
    }

    const value = { ...coor, valueL: item, valueR: reverse[index] };
    before = value;

    return value;
  });
};

export const findPoint = (bullet: number, points: CurrentValuePixelType[]) =>
  points.findLast(({ x, y }) => bullet >= x && bullet <= y);

export const getValuePixelLeft = (
  bullet: number,
  points: CurrentValuePixelType[]
) => {
  const item = findPoint(bullet, points);
  return item?.valueL ?? 0;
};

export const getValuePixelRight = (
  bullet: number,
  points: CurrentValuePixelType[]
) => {
  const item = findPoint(bullet, points);
  return item?.valueR ?? 0;
};

export const calculatePixelFromValue = (
  valueStart: number,
  valueEnd: number,
  coordinates: [number, number],
  pixelPoint: CurrentValuePixelType[]
) => {
  const pixelStart = pixelPoint.find(({ valueL }) => valueL === valueStart);
  const pixelEnd = pixelPoint.find(({ valueR }) => valueR === valueEnd);

  if (pixelStart && pixelEnd) {
    return [pixelStart.x, pixelEnd.x];
  }

  return coordinates;
};
