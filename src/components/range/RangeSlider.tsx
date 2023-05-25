import { DragEvent, FC, useMemo } from "react";
import { RangeSliderType } from "../../types/RangeSliderType";

const RangeSlider: FC<RangeSliderType> = ({
  max,
  min,
  points,
  onChange,
  mapLabel,
}) => {
  const onDragOver = (event: DragEvent<HTMLSpanElement>) => {
    event.preventDefault();
  };

  const onDragStart = (event: DragEvent<HTMLSpanElement>) => {
    const id = (event.target as HTMLSpanElement).id;
    event.dataTransfer.setData("text/plain", id);
    //(event.target as HTMLSpanElement).classList.add("hide2");
  };

  const onDrop = (event: DragEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);
    if (draggable) {
      (event.target as HTMLSpanElement).appendChild(draggable);
    }
  };

  const sliders = useMemo(
    () =>
      points.map((it, index) => (
        <div
          data-slot={it}
          key={`key-slider-${it}`}
          className="slider-item"
          {...{ onDrop, onDragOver }}
        >
          {index === 0 ? (
            <span
              id="bullet_1"
              className="bullet"
              {...{ onDragStart }}
              draggable
            />
          ) : index === points.length - 1 ? (
            <span
              id="bullet_2"
              className="bullet"
              {...{ onDragStart }}
              draggable
            />
          ) : null}
          <span className="slider-bar" />
        </div>
      )),
    [points]
  );

  return (
    <div className="range-slider">
      <span className="start">{mapLabel?.(min) ?? min}</span>

      <div className="range">
        <div className="slider">{sliders}</div>
      </div>

      <span className="end">{mapLabel?.(max) ?? max}</span>
    </div>
  );
};

export default RangeSlider;
