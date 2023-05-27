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

  useEffect(() => {
    onChange([min, max]);
  }, [min, max, onChange]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      calculatePixelPoint(slider, points, (item) => {
        setPixelPoint(item);
      });
    }
  }, [points]);

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

  const bulletMoveLeft = (event: MouseEvent) => {
    const slider = sliderRef.current;
    const bulletLeft = bulletLeftRef.current;
    const end = currentValue.current[1];

    if (slider && bulletLeft) {
      bulletMoveLeftAction(slider, end, event, (item) => {
        bulletLeft.style.left = `${item}px`;
        currentValue.current = [item, end];
      });
    }
  };

  const bulletMoveRight = (event: MouseEvent) => {
    const slider = sliderRef.current;
    const bulletRight = bulletRightRef.current;
    const [start] = currentValue.current;

    if (slider && bulletRight) {
      bulletMoveRightAction(slider, start, event, (item) => {
        bulletRight.style.right = `${item}px`;
        currentValue.current = [start, item];
      });
    }
  };

  const mouseUp = () => {
    const [start, end] = currentValue.current;
    document.removeEventListener("mousemove", bulletMoveLeft);
    document.removeEventListener("mousemove", bulletMoveRight);
    document.removeEventListener("mouseup", mouseUp);
    bulletLeftRef.current?.blur();
    bulletRightRef.current?.blur();
    changeValue(start, end, pixelPoint, onChange);
  };

  const onMouseDownLeft = () => {
    document.addEventListener("mousemove", bulletMoveLeft);
    document.addEventListener("mouseup", mouseUp);
  };

  const onMouseDownRight = () => {
    document.addEventListener("mousemove", bulletMoveRight);
    document.addEventListener("mouseup", mouseUp);
  };

  const onChangeManualValue = (type: "START" | "END") => (valueRef: number) => {
    onChange(type === "START" ? [valueRef, valueEnd] : [valuesStart, valueRef]);
  };

  const onMouseUpLeft = () => {};

  const onMouseUpRight = () => {};

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
        max={valueEnd}
        onlyLabel={onlyLabel}
      />

      <div className="slider" ref={sliderRef}>
        <button
          className="bullet bullet-left"
          aria-label="Bullet Left"
          ref={bulletLeftRef}
          onMouseDown={onMouseDownLeft}
          onMouseUp={onMouseUpLeft}
          tabIndex={0}
          data-testid="bullet_1"
        />

        <div className="slider-bar" />

        <button
          className="bullet bullet-right"
          aria-label="Bullet Right"
          ref={bulletRightRef}
          onMouseDown={onMouseDownRight}
          onMouseUp={onMouseUpRight}
          tabIndex={0}
          data-testid="bullet_2"
        />
      </div>

      <RangeInput
        label={maxText}
        value={valueEnd}
        onChange={onChangeManualValue("END")}
        min={valuesStart}
        max={max}
        onlyLabel={onlyLabel}
      />
    </div>
  );
};
export default RangeSlider;
