import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  bulletMoveLeftAction,
  bulletMoveRightAction,
  calculatePixelFromValuePoint,
  changeValue,
  onKeyDownDocumentLeftBullet,
  onKeyDownDocumentRightBullet,
} from "../helpers/rangeSlider";
import { useCalculatePixelPoint } from "./useCalculatePixelPoint";

export const useRangeSlider = ({
  min,
  max,
  value,
  points,
  onlyLabel,
  mapLabel,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  points: number[];
  onlyLabel?: boolean;
  onChange: (value: [number, number]) => void;
  mapLabel?: (item: number) => string;
}) => {
  const [valueStart, valueEnd] = value;
  const currentValue = useRef<[number, number]>([0, 0]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const bulletLeftRef = useRef<HTMLButtonElement | null>(null);
  const bulletRightRef = useRef<HTMLButtonElement | null>(null);
  const { pixelPoint } = useCalculatePixelPoint(sliderRef, points);

  /**
   *Texto del valor mínimo del extremo.
   */
  const minText = useMemo(
    () => String(mapLabel?.(valueStart) ?? valueStart),
    [mapLabel, valueStart]
  );

  /**
   *Texto del valor máximo del extremo.
   */
  const maxText = useMemo(
    () => String(mapLabel?.(valueEnd) ?? valueEnd),
    [mapLabel, valueEnd]
  );

  /**
   * Esta función es la encargada de ejecutar el movimiento de los valores al
   * presionar las teclas ArrowLeft y ArrowRight. Solo aplica este movimiento si
   * el activeElement (Componente con el focus ) del document es uno de los dos extremos
   * disponibles en el range
   *
   * @param {KeyboardEvent} event
   */
  const onKeyDownDocument = useCallback(
    (event: KeyboardEvent): void => {
      if (document.activeElement === bulletLeftRef.current) {
        onKeyDownDocumentLeftBullet(
          event,
          pixelPoint,
          valueStart,
          valueEnd,
          (item) => {
            onChange([item, valueEnd]);
          }
        );
      } else if (document.activeElement === bulletRightRef.current) {
        onKeyDownDocumentRightBullet(
          event,
          pixelPoint,
          valueStart,
          valueEnd,
          (item) => {
            onChange([valueStart, item]);
          }
        );
      }
    },
    [pixelPoint, valueStart, valueEnd, onChange]
  );

  /**
   * Este effecto permite el uso de las teclas ArrowLeft y ArrowRight para
   * mover los extremos del rango
   */
  useEffect(() => {
    document.addEventListener("keydown", onKeyDownDocument);

    return () => {
      document.removeEventListener("keydown", onKeyDownDocument);
    };
  }, [onKeyDownDocument]);

  /**
   * Este effecto ejecuta el onChange siempre que cambie los valosres de min o max
   */
  useEffect(() => {
    onChange([min, max]);
  }, [min, max, onChange]);

  /**
   * Se calcula las coordenadas que corresponden a un value (Se utiliza lanza
   * cuando el usuario escribe en el input). ver mas información
   * en los comentarios de la función calculatePixelFromValuePoint
   */
  useEffect(() => {
    const bulletLeft = bulletLeftRef.current;
    const bulletRight = bulletRightRef.current;
    calculatePixelFromValuePoint(
      value,
      currentValue.current,
      pixelPoint,
      ([xStart, xEnd]) => {
        if (bulletRight && bulletLeft) {
          currentValue.current = [xStart, xEnd];
          bulletLeft.style.left = `${xStart}px`;
          bulletRight.style.right = `${xEnd}px`;
        }
      }
    );
  }, [value, onlyLabel, pixelPoint]);

  /**
   * Se realiza la acción mover el extremo izquierdo del range. ver mas información
   * en los comentarios de la función bulletMoveLeftAction
   *
   *  @param {MouseEvent} event
   */
  const bulletMoveLeft = (event: MouseEvent) => {
    const slider = sliderRef.current;
    const bulletLeft = bulletLeftRef.current;
    const end = currentValue.current[1];

    if (slider && bulletLeft) {
      bulletMoveLeftAction(slider, valueEnd, event, pixelPoint, (item) => {
        bulletLeft.style.left = `${item}px`;
        currentValue.current = [item, end];
      });
    }
  };

  /**
   * Se realiza la acción mover el extremo derecho del range. ver mas información
   * en los comentarios de la función bulletMoveRightAction
   *
   *  @param {MouseEvent} event
   */
  const bulletMoveRight = (event: MouseEvent) => {
    const slider = sliderRef.current;
    const bulletRight = bulletRightRef.current;
    const [start] = currentValue.current;

    if (slider && bulletRight) {
      bulletMoveRightAction(slider, valueStart, event, pixelPoint, (item) => {
        bulletRight.style.right = `${item}px`;
        currentValue.current = [start, item];
      });
    }
  };

  /**
   *Se eliminan todos los listener, ayudando al performance de la aplicación y se ejecuta el onChange
   */
  const mouseUp = () => {
    const [start, end] = currentValue.current;
    document.removeEventListener("mousemove", bulletMoveLeft);
    document.removeEventListener("mousemove", bulletMoveRight);
    document.removeEventListener("mouseup", mouseUp);
    bulletLeftRef.current?.blur();
    bulletRightRef.current?.blur();
    changeValue(start, end, pixelPoint, onChange);
  };

  /**
   * Se adicionan los listener al document, para un ves presionado con el mouse en button del extremo izquierdo del rango
   * se pueda arrastra hasta el lugar requerido.
   */
  const onMouseDownLeft = () => {
    document.addEventListener("mousemove", bulletMoveLeft);
    document.addEventListener("mouseup", mouseUp);
  };

  /**
   * Se adicionan los listener al document, para un ves presionado con el mouse en button del extremo derecho del rango
   * se pueda arrastra hasta el lugar requerido.
   */
  const onMouseDownRight = () => {
    document.addEventListener("mousemove", bulletMoveRight);
    document.addEventListener("mouseup", mouseUp);
  };

  /**
   *Ejecuta el onchange luego que el usuario entre el valor requerido.
   *
   * @param {"START"|"END"} type
   *
   *  START si es el para el botón izquierdo
   *  END si es para el botón derecho
   *
   * @param {number} valueRef
   *
   *  valor introducido por el usuario
   */
  const onChangeManualValue = (type: "START" | "END") => (valueRef: number) => {
    onChange(type === "START" ? [valueRef, valueEnd] : [valueStart, valueRef]);
  };

  return {
    minText,
    maxText,
    valueStart,
    valueEnd,
    sliderRef,
    bulletLeftRef,
    bulletRightRef,
    onMouseDownLeft,
    onMouseDownRight,
    onChangeManualValue,
  };
};
