import { FC } from "react";
import { useRangeSlider } from "../../hooks/useRangeSlider";
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
        value={valueStart}
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
