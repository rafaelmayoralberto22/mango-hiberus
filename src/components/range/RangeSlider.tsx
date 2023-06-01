import { FC } from "react";
import { RangePosition } from "../../helpers/constants";
import { useRangeSlider } from "../../hooks/useRangeSlider";
import { RangeSliderType } from "../../types/RangeSliderType";
import RangeInput from "../input/RangeInput";

/**
 * Este componente es un slider con dos extremos simulando el comportamiento de un input html 5
 *
 * @param {RangeSliderType} props
 *  min: número minimo del slider
 *  max: número máximo del slider
 *  value: valor actual del slider
 *  points: valores permitidos en el slider
 *  onlyLabel: "opcional" -> permite dejar el label fijo y no permitir que el mismo pueda convertirse en input
 *  mapLabel: "opcional" -> permite cambiar lo que se va a mostrar en los label de los extremos
 *  validation: "opcional" -> valida la entrada en los inputs
 *       {maxInputStart} valor máximo que puede introducir el usuario
 *       {minInputEnd} valor mínimo que puede introducir el usuario
 *  onChange: función encargada de ejecutar el cambio del slider.
 */
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
  const {
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
  } = useRangeSlider({
    min,
    max,
    value,
    points,
    onlyLabel,
    mapLabel,
    onChange,
  });

  return (
    <div
      className="range-slider"
      role="slider"
      aria-label="Range"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={(valueStart * 100) / valueEnd}
      aria-valuetext={`Start value: ${valueStart}, End value: ${valueEnd}`}
    >
      <RangeInput
        label={minText}
        title={`The minimum selected is ${minText}`}
        value={valueStart}
        onChange={onChangeManualValue(RangePosition.START)}
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
          title="Bullet Left"
        />

        <div className="slider-bar" title="Slider bar" />

        <button
          className="bullet bullet-right"
          aria-label="Bullet Right"
          ref={bulletRightRef}
          onMouseDown={onMouseDownRight}
          tabIndex={0}
          data-testid="bullet_2"
          title="Bullet Right"
        />
      </div>

      <RangeInput
        label={maxText}
        title={`The maximum selected is ${maxText}`}
        value={valueEnd}
        onChange={onChangeManualValue(RangePosition.END)}
        min={validation?.minInputEnd}
        max={max}
        onlyLabel={onlyLabel}
      />
    </div>
  );
};
export default RangeSlider;
