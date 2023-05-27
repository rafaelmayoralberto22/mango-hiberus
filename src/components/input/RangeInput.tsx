import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { RangeInputType } from "../../types/RangeInputType";

const RangeInput: FC<RangeInputType> = ({
  label,
  value,
  min,
  max,
  onlyLabel,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [mode, setMode] = useState<"label" | "input">("label");
  const [num, setNum] = useState<string>(`${value}`);

  useEffect(() => {
    setNum(`${value}`);
  }, [value, setNum]);

  useEffect(() => {
    if (mode === "input" && inputRef.current) {
      inputRef.current.focus();
    } else {
      setNum(`${value}`);
    }
  }, [mode]);

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
      ref={inputRef}
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
};

export default RangeInput;
