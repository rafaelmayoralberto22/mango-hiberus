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

  /**
   * Este effect es el encargado de poner el focus al input o de cambiar el value inicial
   */
  useEffect(() => {
    if (mode === "input" && inputRef.current) {
      inputRef.current.focus();
    } else {
      setNum(`${value}`);
    }
  }, [mode, value, setNum]);

  /**
   * Aqui se cambia el mode de input a label y viceversa
   */
  const toggleMode = () => {
    setMode(mode === "label" ? "input" : "label");
  };

  /**
   * Este evento es en encargado de cuando se preciona la tecla enter hacer el onChange y cambiar el modo
   *
   *
   *  @param {KeyboardEvent} event
   */
  const onKeyUp = (event: KeyboardEvent) => {
    const isValid = (event.target as HTMLInputElement).checkValidity();
    if (event.key === "Enter" && isValid) {
      onChange(+num);
      toggleMode();
    }
  };

  /**
   * Este evento es el encargado de cuando se pierda el focus del input cambie automáticamente al modo label
   */
  const onBlur = () => {
    toggleMode();
  };

  /**
   * Este evento es el encargado de cambiar el value del input
   */
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
