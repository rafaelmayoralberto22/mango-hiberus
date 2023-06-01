import { MutableRefObject, useEffect, useState } from "react";
import { calculatePixelPoint } from "../helpers/rangeSlider";
import { CurrentValuePixelType } from "../types/CurrentValuePixelType";

/**
 * Calcula el espacio disponible para cada punto dentro slider 
 * 
 * @param {MutableRefObject<HTMLDivElement | null>} ref 
 * referencia al div que contiene le slider.
 * 
 * @param {number[]} points 
 * valores posibles del slider
 * @returns 
 */
export const useCalculatePixelPoint = (
  ref: MutableRefObject<HTMLDivElement | null>,
  points: number[]
) => {
  const [pixelPoint, setPixelPoint] = useState<CurrentValuePixelType[]>([]);
  /**
   * Se calcula el espacio disponible para cada numero en el slider. Ver más información
   * en los comentarios de la función calculatePixelPoint
   */
  useEffect(() => {
    const slider = ref.current;
    if (slider) {
      setPixelPoint(calculatePixelPoint(slider, points));
    }
  }, [points, ref]);

  return { pixelPoint };
};
