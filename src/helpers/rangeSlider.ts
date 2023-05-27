import { CurrentValuePixelType } from "../types/CurrentValuePixelType";
import {
  calculatePixelFromValue,
  getCurrentValuePixel,
  getValuePixelLeft,
  getValuePixelRight,
} from "./utils";

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

const getPosValue = (value: number, pixelPoint: CurrentValuePixelType[]) => {
  const pixelStart = pixelPoint.findIndex(({ valueL }) => valueL === value);
  return pixelStart === -1 ? 0 : pixelStart;
};

export const bulletMoveLeftAction = (
  slider: HTMLElement,
  valueEnd: number,
  event: MouseEvent,
  pixelPoint: CurrentValuePixelType[],
  onChange: (item: number) => void
) => {
  const rect = slider.getBoundingClientRect();
  const left = event.clientX - rect.left;
  const pos = getPosValue(valueEnd, pixelPoint);
  const end = pixelPoint[pos ? pos - 1 : pos].x;
  const leftLimit = left <= 0 ? 0 : left < end ? left : end;
  onChange(leftLimit);
};

export const bulletMoveRightAction = (
  slider: HTMLElement,
  valueStart: number,
  event: MouseEvent,
  pixelPoint: CurrentValuePixelType[],
  onChange: (item: number) => void
) => {
  const rect = slider.getBoundingClientRect();
  const right = slider.offsetWidth - (event.clientX - rect.left);
  const pos = getPosValue(valueStart, pixelPoint);
  const start = pixelPoint[pos !== pixelPoint.length ? pos + 1 : pos].y;
  const rectWidthPermit = rect.width - 40 - start;
  const rightLimit =
    right <= 0 ? 0 : right <= rectWidthPermit ? right : rectWidthPermit;
  onChange(rightLimit);
};
