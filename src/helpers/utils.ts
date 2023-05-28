import {
  Coordinates,
  CurrentValuePixelType,
} from "../types/CurrentValuePixelType";

/**
 * esta función genera un rango de números consecutivos partiendo del valor ´min´ hast el ´max´
 *
 * @param {number} min
 * @param {number}  max
 * @returns {number[]}
 *
 */
export const generateRangeNumber = (min: number, max: number): number[] => {
  const result = [];
  for (let i = min; i <= max; i++) {
    result.push(i);
  }
  return result;
};

/**
 * esta función ordena un arreglo numerico de menor a mayor
 * @param {number[]} rangeValues
 * @returns {number[]}
 *  regres aun arreglo ordenado.
 */
export const sortRangeNumbers = (rangeValues: number[]) =>
  rangeValues.sort((a, b) => a - b);

/**
 * convierte un numero a moneda especialmente a euros.
 * @param {number} value
 * @returns {string}
 *   ejemplo mapLabelEuro(3) devuelve ´3,00 €´
 */
export const mapLabelEuro = (value: number) =>
  Intl.NumberFormat("es-EN", {
    style: "currency",
    minimumFractionDigits: 2,
    currency: "EUR",
  }).format(value);

/**
 * Esta función es la encargada de calcular teniendo en cuenta el espacio disponible del slider
 * @param {number[]} points
 * @param {number} slider
 * @returns {CurrentValuePixelType[]}
 *    los valosres 'x' y 'y' corresponden a la coordenada inicial y final en el eje X que corresponde a un valor determinado.
 *    valorR y valorF corresponden a los valores de dichas coordenadas , teniendo en cuanta que cada extremo parte de 0 hasta el valor
 *    ocupado por slider.
 *
 *   Nota: El extremo izquierdo crece hacia la derecha y el extremo derecho crece hacia la izquierda (por esto es que se calcula tambien el arreglo reverse).
 */
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

/**
 * Dado una posicion x del extremo obtiene el valor real del mismo en el rango seleccionable.
 *
 * @param {number} bullet
 * @param {CurrentValuePixelType[]} points
 * @returns {CurrentValuePixelType | undefinded}
 */
export const findPoint = (bullet: number, points: CurrentValuePixelType[]) =>
  points.findLast(({ x, y }) => bullet >= x && bullet <= y);

/**
 * Dado una posicion x del extremo izquierdo obtiene el valor real del mismo en el rango seleccionable.
 *
 * @param {number} bullet
 * @param {CurrentValuePixelType[]} points
 * @returns {number}
 */

export const getValuePixelLeft = (
  bullet: number,
  points: CurrentValuePixelType[]
) => {
  const item = findPoint(bullet, points);
  return item?.valueL ?? 0;
};

/**
 * Dado una posicion x del extremo derecho obtiene el valor real del mismo en el rango seleccionable.
 *
 * @param {number} bullet
 * @param {CurrentValuePixelType[]} points
 * @returns {number}
 */
export const getValuePixelRight = (
  bullet: number,
  points: CurrentValuePixelType[]
) => {
  const item = findPoint(bullet, points);
  return item?.valueR ?? 0;
};

/**
 * Dado el valor que presenta actualmente seleccionado el slider  ´valueStart´ y ´valueEnd´; obtiene la posicion que corresponde
 * a cada valor para poner cada extremo en el lugar que le corresponda.
 *
 * @param {number} valueStart
 * @param {number} valueEnd
 * @param {[number,number]}coordinates
 * @param {CurrentValuePixelType[]} pixelPoint
 * @returns {[number, number]}
 */
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

/**
 * Obtiene la pocisión que ocupa un determinado valor seleccionado en el arreglo de puntos seleccionables.
 *
 * @param {"LEFT"|"RIGHT"} pos
 * @param {number} value
 * @param {CurrentValuePixelType[]} pixelPoint
 * @returns
 */
export const getPosValue = (
  pos: "LEFT" | "RIGHT",
  value: number,
  pixelPoint: CurrentValuePixelType[]
) => {
  const pixelStart = pixelPoint.findIndex(
    ({ valueL, valueR }) => (pos === "LEFT" ? valueL : valueR) === value
  );
  return pixelStart;
};
