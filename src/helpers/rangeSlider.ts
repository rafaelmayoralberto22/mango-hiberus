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

export const bulletMoveLeftAction = (
  slider: HTMLElement,
  end: number,
  event: MouseEvent,
  onChange: (item: number) => void
) => {
  const rect = slider.getBoundingClientRect();
  const left = event.clientX - rect.left;
  const rectWidthPermit = rect.width - 20 - end;
  const leftLimit =
    left <= 0 ? 0 : left <= rectWidthPermit ? left : rectWidthPermit;
  onChange(leftLimit);
};

export const bulletMoveRightAction = (
  slider: HTMLElement,
  start: number,
  event: MouseEvent,
  onChange: (item: number) => void
) => {
  const rect = slider.getBoundingClientRect();
  const right = slider.offsetWidth - (event.clientX - rect.left);
  const rectWidthPermit = rect.width - 20 - start;
  const rightLimit =
    right <= 0 ? 0 : right <= rectWidthPermit ? right : rectWidthPermit;
  onChange(rightLimit);
};
