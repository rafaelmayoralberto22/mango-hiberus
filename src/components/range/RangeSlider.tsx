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
  const bulletLeftRef = useRef<HTMLDivElement | null>(null);
  const bulletRightRef = useRef<HTMLDivElement | null>(null);

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
    <div className="range-slider">
      <span className="text-extremes">{mapLabel?.(min) ?? min}</span>

      <div className="slider" ref={sliderRef}>
        <div
          className="bullet bullet-left"
          ref={bulletLeftRef}
          onMouseDown={onMouseDownLeft}
        />
        <div className="slider-bar"></div>
        <div
          className="bullet bullet-right"
          ref={bulletRightRef}
          onMouseDown={onMouseDownRight}
        />
      </div>

      <span className="text-extremes">{mapLabel?.(max) ?? max}</span>
    </div>
  );
};
export default RangeSlider;
