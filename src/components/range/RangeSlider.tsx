import { FC, useEffect, useRef, useState } from "react";
import {
  bulletMoveLeftAction,
  bulletMoveRightAction,
  calculatePixelFromValuePoint,
  calculatePixelPoint,
  changeValue,
} from "../../helpers/rangeSlider";
import { CurrentValuePixelType } from "../../types/CurrentValuePixelType";
import { RangeSliderType } from "../../types/RangeSliderType";
import RangeInput from "../input/RangeInput";

const RangeSlider: FC<RangeSliderType> = ({
  value,
  max,
  min,
  points,
  onlyLabel,
  validation,
  onChange,
  mapLabel,
}) => {
  const [valuesStart, valueEnd] = value;
  const currentValue = useRef<[number, number]>([0, 0]);
  const [pixelPoint, setPixelPoint] = useState<CurrentValuePixelType[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const bulletLeftRef = useRef<HTMLButtonElement | null>(null);
  const bulletRightRef = useRef<HTMLButtonElement | null>(null);
  const minText = String(mapLabel?.(valuesStart) ?? valuesStart);
  const maxText = String(mapLabel?.(valueEnd) ?? valueEnd);

  /**
   * este effecto ejecuta el onChange siempre que cambie los valosres de min o max
   */
  useEffect(() => {
    onChange([min, max]);
  }, [min, max, onChange]);

  /**
   * Se calcula el espacio disponible para cada numero en el slider . ver mas información
   *  en los comentarios de la función calculatePixelPoint
   */
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      calculatePixelPoint(slider, points, (item) => {
        setPixelPoint(item);
      });
    }
  }, [points]);

  /**
   * Se calcula las coordenadas que corresponden a un value (Se utiliza lanza
   *  cuando el usuario escribe en el input). ver mas información
   *  en los comentarios de la función calculatePixelFromValuePoint
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
   *  en los comentarios de la función bulletMoveLeftAction
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
   *  en los comentarios de la función bulletMoveRightAction
   *
   *  @param {MouseEvent} event
   */
  const bulletMoveRight = (event: MouseEvent) => {
    const slider = sliderRef.current;
    const bulletRight = bulletRightRef.current;
    const [start] = currentValue.current;

    if (slider && bulletRight) {
      bulletMoveRightAction(slider, valuesStart, event, pixelPoint, (item) => {
        bulletRight.style.right = `${item}px`;
        currentValue.current = [start, item];
      });
    }
  };

  /**
   * Se eliminan todos los listener, ayudando al performance de la aplicación y se ejecuta el onChange
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
   * Ejecuta el onchange luego que el usuario entre el valor requerido.
   *
   * @param {"START"|"END"} type
   *
   *  START si es el para el botón izquierdo
   *  END si es para el botón derecho
   *
   * @param {"number"} valueRef
   *
   *  valor introducido por el usuario
   */
  const onChangeManualValue = (type: "START" | "END") => (valueRef: number) => {
    onChange(type === "START" ? [valueRef, valueEnd] : [valuesStart, valueRef]);
  };

  return (
    <div
      className="range-slider"
      aria-label="Range"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-describedby={`This control allows you to select a value between ${min} and ${max}.`}
    >
      <RangeInput
        label={minText}
        value={valuesStart}
        onChange={onChangeManualValue("START")}
        min={min}
        max={validation?.maxInputStart}
        onlyLabel={onlyLabel}
      />

      <div className="slider" ref={sliderRef}>
        <button
          className="bullet bullet-left"
          aria-label="Bullet Left"
          ref={bulletLeftRef}
          onMouseDown={onMouseDownLeft}
          tabIndex={0}
          data-testid="bullet_1"
        />

        <div className="slider-bar" />

        <button
          className="bullet bullet-right"
          aria-label="Bullet Right"
          ref={bulletRightRef}
          onMouseDown={onMouseDownRight}
          tabIndex={0}
          data-testid="bullet_2"
        />
      </div>

      <RangeInput
        label={maxText}
        value={valueEnd}
        onChange={onChangeManualValue("END")}
        min={validation?.minInputEnd}
        max={max}
        onlyLabel={onlyLabel}
      />
    </div>
  );
};
export default RangeSlider;
