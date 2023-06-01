import { FC } from "react";
import { RangeMode } from "../../helpers/constants";
import { RangeType } from "../../types/RangeType";
import RangeFixed from "./RangeFixed";
import RangeNormal from "./RangeNormal";

/**
 * Este componente es un slider con dos extremos simulando el comportamiento de un input html 5.
 * Los valores del rango son introducidos desde la api externa. Puede tener dos modos "NORMAL" o "RANGE"
 * segun la configuración introducida
 *
 *
 * @param {RangeType} props
 *  rangeValues: números seleccionables del slider
 *  mode: RangeMode.NORMAL | RangeMode.RANGE
 *  onChange: función encargada de ejecutar el cambio del slider.
 *  config:
 *     {number} min:  "opcional" -> necesario para el RangeMode.NORMAL sino toma un valor por defecto de 1
 *     {number} max:   "opcional" -> necesario para el RangeMode.NORMAL sino toma un valor por defecto de 100
 *     {number[]} rangeValues: "opcional" -> necesario para el RangeMode.RANGE sino toma un valor por defecto de [1, 50 , 100]
 */
const Range: FC<RangeType> = ({
  value,
  config,
  onChange,
  mode = RangeMode.NORMAL,
}) => {
  if (mode === RangeMode.RANGE) {
    return (
      <RangeFixed
        {...{ value, onChange }}
        rangeValues={config?.rangeValues ?? [1, 50, 100]}
      />
    );
  }

  return (
    <RangeNormal
      {...{ value, onChange }}
      min={config?.min ?? 1}
      max={config?.max ?? 100}
    />
  );
};

export default Range;
