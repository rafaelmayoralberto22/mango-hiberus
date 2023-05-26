import { FC, useDeferredValue, useEffect, useRef, useState } from "react";
import {
  getCurrentValuePixel,
  getValuePixelLeft,
  getValuePixelRight,
} from "../../helpers/utils";
import { CurrentValuePixelType } from "../../types/CurrentValuePixelType";
import { RangeSliderType } from "../../types/RangeSliderType";

const RangeSlider: FC<RangeSliderType> = ({
  max,
  min,
  points,
  onChange,
  mapLabel,
}) => {
  const [current, setCurrent] = useState([0, 0]);
  const [start, end] = useDeferredValue(current);
  const [pixelPoint, setPixelPoint] = useState<CurrentValuePixelType[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const bulletLeftRef = useRef<HTMLButtonElement | null>(null);
  const bulletRightRef = useRef<HTMLButtonElement | null>(null);
  const minText = String(mapLabel?.(min) ?? min);
  const maxText = String(mapLabel?.(max) ?? max);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const rect = slider.getBoundingClientRect();
      setPixelPoint(getCurrentValuePixel(points, rect.width - 40));
    }
  }, [points]);

  useEffect(() => {
    if (pixelPoint.length) {
      const startP = getValuePixelLeft(start, pixelPoint);
      const endP = getValuePixelRight(end, pixelPoint);
      onChange([startP, endP]);
    }
  }, [start, end, pixelPoint, onChange]);

  const bulletMoveLeft = (event: MouseEvent) => {
    const slider = sliderRef.current;
    const bulletLeft = bulletLeftRef.current;
    if (slider && bulletLeft) {
      const rect = slider.getBoundingClientRect();
      const left = event.clientX - rect.left;
      const rectWidthPermit = rect.width - 40 - end;
      const leftLimit =
        left <= 0 ? 0 : left <= rectWidthPermit ? left : rectWidthPermit;
      bulletLeft.style.left = `${leftLimit}px`;
      setCurrent(([_, end]) => [leftLimit, end]);
    }
  };

  const bulletMoveRight = (event: MouseEvent) => {
    const slider = sliderRef.current;
    const bulletRight = bulletRightRef.current;
    if (slider && bulletRight) {
      const rect = slider.getBoundingClientRect();
      const right = slider.offsetWidth - (event.clientX - rect.left);
      const rectWidthPermit = rect.width - 40 - start;
      const rightLimit =
        right <= 0 ? 0 : right <= rectWidthPermit ? right : rectWidthPermit;
      bulletRight.style.right = `${rightLimit}px`;
      setCurrent(([start]) => [start, rightLimit]);
    }
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", bulletMoveLeft);
    document.removeEventListener("mousemove", bulletMoveRight);
    document.removeEventListener("mouseup", mouseUp);
    bulletLeftRef.current?.blur();
    bulletRightRef.current?.blur();
  };

  const onMouseDownLeft = () => {
    document.addEventListener("mousemove", bulletMoveLeft);
    document.addEventListener("mouseup", mouseUp);
  };

  const onMouseDownRight = () => {
    document.addEventListener("mousemove", bulletMoveRight);
    document.addEventListener("mouseup", mouseUp);
  };

  return (
    <div
      className="range-slider"
      aria-label="Range"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-describedby={`This control allows you to select a value between ${min} and ${max}.`}
    >
      <span
        className="text-extremes"
        aria-readonly="true"
        aria-label={minText}
        title={maxText}
      >
        {minText}
      </span>

      <div className="slider" ref={sliderRef}>
        <button
          className="bullet bullet-left"
          aria-label="Bullet Left"
          ref={bulletLeftRef}
          onMouseDown={onMouseDownLeft}
          tabIndex={0}
        />

        <div className="slider-bar" />

        <button
          className="bullet bullet-right"
          aria-label="Bullet Right"
          ref={bulletRightRef}
          onMouseDown={onMouseDownRight}
          tabIndex={0}
        />
      </div>

      <span
        className="text-extremes"
        aria-readonly="true"
        aria-label={maxText}
        title={maxText}
      >
        {maxText}
      </span>
    </div>
  );
};
export default RangeSlider;
