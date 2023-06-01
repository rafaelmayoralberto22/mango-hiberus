import { FC, memo, useMemo } from "react";
import { mapLabelEuro, sortRangeNumbers } from "../../helpers/utils";
import { RangeFixedType } from "../../types/RangeFixedType";
import RangeSlider from "./RangeSlider";

/**
 * Este componente es un slider con dos extremos simulando el comportamiento de un input html 5.
 * Los valores del rango son introducidos desde la api externa.
 *
 *
 * @param {RangeFixedType} props
 *  rangeValues: números seleccionables del slider
 *  value: valor actual del slider
 *  onChange: función encargada de ejecutar el cambio del slider.
 */
const RangeFixed: FC<RangeFixedType> = memo(
  ({ value, rangeValues, onChange }) => {
    const points = useMemo(() => sortRangeNumbers(rangeValues), [rangeValues]);

    return (
      <RangeSlider
        {...{ points, value, onChange }}
        min={points[0]}
        max={points[points.length - 1]}
        points={rangeValues}
        mapLabel={mapLabelEuro}
        onlyLabel
      />
    );
  }
);

RangeFixed.displayName = "RangeFixed";
export default RangeFixed;
