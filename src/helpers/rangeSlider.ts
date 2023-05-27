import { CurrentValuePixelType } from "../types/CurrentValuePixelType";
import {
  calculatePixelFromValue,
  getCurrentValuePixel,
  getPosValue,
  getValuePixelLeft,
  getValuePixelRight,
} from "./utils";

/**
 * Esta función es la encargada de calcular teniendo en cuenta el espacio disponible del slider , el valor que ocupará cada punto
 * dentro del mismo. Se le resta 40 pixel al tamaño originnal teniendo en cuenta que cada extremo tiene un ancho de 20 px. Ejecutara el onChange
 * con un resultado de tipo @type {CurrentValuePixelType}
 *
 * @param {HTMLElement} slider
 * @param {number[]}points
 * @param {(item: CurrentValuePixelType[]) => void} onChange
 */
export const calculatePixelPoint = (
  slider: HTMLElement,
  points: number[],
  onChange: (item: CurrentValuePixelType[]) => void
) => {
  if (slider) {
    const rect = slider.getBoundingClientRect();
    const value = getCurrentValuePixel(points, rect.width - 40);
    onChange(value);
  }
};

/**
 * Esta función se encarga de da el valor de cada extremo seleccioado calcule
 * la posicion que ocupara el extremo en el slider
 *
 * @param {[number, number]} value
 * @param {[number, number]}coordinates
 * @param {CurrentValuePixelType[]} pixelPoint
 * @param {(item: [number, number]) => void} onChange
 */
export const calculatePixelFromValuePoint = (
  value: [number, number],
  coordinates: [number, number],
  pixelPoint: CurrentValuePixelType[],
  onChange: (item: [number, number]) => void
) => {
  const [valuesStart, valueEnd] = value;
  const [start, end] = coordinates;
  const [xStart, xEnd] = calculatePixelFromValue(
    valuesStart,
    valueEnd,
    [start, end],
    pixelPoint
  );

  if (start !== xStart || end != xEnd) {
    onChange([xStart, xEnd]);
  }
};

/**
 * este función es la encargada de dado un posición ´start´ y ´end´
 * calcule el valor real que corresponde en el slider.
 * @param {number} start
 * @param {number} end
 * @param {CurrentValuePixelType[]} pixelPoint
 * @param {(item: [number, number]) => void} onChange
 */
export const changeValue = (
  start: number,
  end: number,
  pixelPoint: CurrentValuePixelType[],
  onChange: (item: [number, number]) => void
) => {
  if (pixelPoint.length) {
    const startP = getValuePixelLeft(start, pixelPoint);
    const endP = getValuePixelRight(end, pixelPoint);
    onChange([startP, endP]);
  }
};

/**
 * esta función realiza el movimiento del extremo izquierdo
 *
 * @param {HTMLElement} slider
 * @param {number} valueEnd
 * @param {MouseEvent} event
 * @param {CurrentValuePixelType[]} pixelPoint
 * @param {(item: number) => void} onChange
 */
export const bulletMoveLeftAction = (
  slider: HTMLElement,
  valueEnd: number,
  event: MouseEvent,
  pixelPoint: CurrentValuePixelType[],
  onChange: (item: number) => void
) => {
  const rect = slider.getBoundingClientRect(); // método devuelve un DOMRect objeto que proporciona información sobre el tamaño de un elemento y su posición relativa a la ventana gráfica .
  const left = event.clientX - rect.left; // se calcula el movimiento del mouse
  const pos = getPosValue(valueEnd, pixelPoint); // calculamos la posición de otro extremo
  const end = pixelPoint[pos ? pos - 1 : pos].x; // obtenemos el valor de la posición anterior al otro extremo. Ejemplo si el otro extremo es 300 podria ser 299 en un conjunto de puntos consecutivos
  const leftLimit = left <= 0 ? 0 : left < end ? left : end; // evitamos la colisión siempre
  onChange(leftLimit);
};

/**
 * esta función realiza el movimiento del extremo izquierdo
 *
 * @param {HTMLElement} slider
 * @param {number} valueStart
 * @param {MouseEvent} event
 * @param {CurrentValuePixelType[]} pixelPoint
 * @param {(item: number) => void} onChange
 */

export const bulletMoveRightAction = (
  slider: HTMLElement,
  valueStart: number,
  event: MouseEvent,
  pixelPoint: CurrentValuePixelType[],
  onChange: (item: number) => void
) => {
  const rect = slider.getBoundingClientRect(); // método devuelve un DOMRect objeto que proporciona información sobre el tamaño de un elemento y su posición relativa a la ventana gráfica .
  const right = slider.offsetWidth - (event.clientX - rect.left); // se calcula el movimiento del mouse
  const pos = getPosValue(valueStart, pixelPoint); // calculamos la posición de otro extremo
  const start = pixelPoint[pos !== pixelPoint.length ? pos + 1 : pos].y; // obtenemos el valor de la posición anterior al otro extremo. Ejemplo si el otro extremo es 1 podria ser 2 en un conjunto de puntos consecutivos
  const rectWidthPermit = rect.width - 40 - start; // se le resta al ancho del conteneder del slider 40px (tamaño de los dos extremos), ademas se resta el tamaño de la posición que le sigue al extremo izquierdo 
  const rightLimit =
    right <= 0 ? 0 : right <= rectWidthPermit ? right : rectWidthPermit; // cons esta condición evitamos la colisión siempre
  onChange(rightLimit);
};
