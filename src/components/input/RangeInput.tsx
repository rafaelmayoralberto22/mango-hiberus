import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { RangeInputMode } from "../../helpers/constants";
import { RangeInputType } from "../../types/RangeInputType";

/**
 * Este componente es un span que muestra el label del extremo y por defecto si presiona click o cuando el span
 * tenga el focus presiona la tecla space se cambiará a mostrar un input para introducir el valor deseado.
 *
 * @param {RangeInputType} props
 *  label: texto para mostrar
 *  value: valor actual del slider en el extremo dado
 *  title: "opcional" -> texto para introducir en el title del span
 *  min: número mínimo permitido para introducir en el input (menor que este número el 
 *       input toma un color de borde rojo y no permite guardar la información, si el 
 *       input pierde el focus y no se ha guardado presionando enter o existe un error , se coloca 
 *        el valor anterior de comenzar a editar)
 *  max: número máximo permitido para introducir en el input (mayor que este número el 
 *       input toma un color de borde rojo y no permite guardar la información, si el 
 *       input pierde el focus y no se ha guardado presionando enter o existe un error , se coloca 
 *       el valor anterior de comenzar a editar)
 * onlyLabel: permite convertir el componente a solo label (no se le introduce al span que muestra el label
 *       los valores de accesibilidad ni el evento onClick, ni el onKeyDown )
 * onChange: función encargada de ejecutar el cambio del slider.
 */
const RangeInput: FC<RangeInputType> = ({
  label,
  title,
  value,
  min,
  max,
  onlyLabel,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [mode, setMode] = useState<RangeInputMode>(RangeInputMode.LABEL);
  const [num, setNum] = useState<string>(`${value}`);

  /**
   * Este effect es el encargado de poner el focus al input o de cambiar el value inicial
   */
  useEffect(() => {
    if (mode === RangeInputMode.INPUT && inputRef.current) {
      inputRef.current.focus();
    } else {
      setNum(`${value}`);
    }
  }, [mode, value, setNum]);

  /**
   * Aqui se cambia el mode de input a label y viceversa
   */
  const toggleMode = () => {
    setMode(
      mode === RangeInputMode.LABEL
        ? RangeInputMode.INPUT
        : RangeInputMode.LABEL
    );
  };

  /**
   * Este evento es en encargado de cuando se preciona la tecla enter hacer el onChange y cambiar el modo
   *
   *
   *  @param {KeyboardEvent} event
   */
  const onKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    const isValid = (event.target as HTMLInputElement).checkValidity();
    if (event.key === "Enter" && isValid) {
      onChange(+num);
      toggleMode();
    }
  };

  /**
   * Este evento es en encargado de cuando se preciona la tecla space y el componente
   * no sea de solo label, cambie el modo a input
   *
   *
   *  @param {KeyboardEvent} event
   */
  const onKeyDownLabel = (event: KeyboardEvent) => {
    if (event.code === "Space" && !onlyLabel) {
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

  if (mode === RangeInputMode.LABEL || onlyLabel) {
    return (
      <span
        className="text-extremes"
        aria-label={label}
        title={title ?? label}
        {...(!onlyLabel
          ? {
              onClick: toggleMode,
              onKeyDown: onKeyDownLabel,
              role: "button",
              tabIndex: 0,
            }
          : {})}
      >
        {label}
      </span>
    );
  }

  return (
    <input
      ref={inputRef}
      type="number"
      value={num}
      className="input-extremes"
      onChange={onChangeInternal}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      min={min}
      max={max}
    />
  );
};

export default RangeInput;
