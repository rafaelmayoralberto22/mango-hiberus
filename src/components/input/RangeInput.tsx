import { ChangeEvent, FC, KeyboardEvent, memo, useState } from "react";
import { RangeInputType } from "../../types/RangeInputType";

const RangeInput: FC<RangeInputType> = memo(
  ({ label, value, min, max, onlyLabel, onChange }) => {
    const [mode, setMode] = useState<"label" | "input">("label");
    const [num, setNum] = useState<string>(`${value}`);

    const toggleMode = () => {
      setMode(mode === "label" ? "input" : "label");
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const isValid = (event.target as HTMLInputElement).checkValidity();
      if (event.key === "Enter" && isValid) {
        onChange(+num);
        toggleMode();
      }
    };

    const onBlur = () => {
      setNum(`${value}`);
      toggleMode();
    };

    const onChangeInternal = (event: ChangeEvent) => {
      const valueNum = (event.target as HTMLInputElement).value;
      setNum(valueNum);
    };

    if (mode === "label" || onlyLabel) {
      return (
        <button
          className="text-extremes"
          aria-label={label}
          title={label}
          onClick={toggleMode}
        >
          {label}
        </button>
      );
    }

    return (
      <input
        type="number"
        value={num}
        className="input-extremes"
        onChange={onChangeInternal}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        min={min}
        max={max}
      />
    );
  }
);

RangeInput.displayName = "RangeInput";
export default RangeInput;
