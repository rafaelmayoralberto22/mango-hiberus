import { FC, memo, useMemo } from "react";
import { generateRangeNumber, mapLabelEuro } from "../../helpers/utils";
import { RangeNormalType } from "../../types/RangeNormalType";
import RangeSlider from "./RangeSlider";

/**
 * Este componente es un slider con dos extremos simulando el comportamiento de un input html 5
 * en un rango consecutivo y entero.
 *
 * @param {RangeNormalType} props
 *  min: número minimo del slider
 *  max: número máximo del slider
 *  value: valor actual del slider
 *  onChange: función encargada de ejecutar el cambio del slider.
 */
const RangeNormal: FC<RangeNormalType> = memo((props) => {
  const { min, max, value } = props;
  const [valuesStart, valueEnd] = value;
  const points = useMemo(() => generateRangeNumber(min, max), [min, max]);

  return (
    <RangeSlider
      {...props}
      points={points}
      mapLabel={mapLabelEuro}
      validation={{
        maxInputStart: valueEnd - 1,
        minInputEnd: valuesStart + 1,
      }}
    />
  );
});

RangeNormal.displayName = "RangeNormal";
export default RangeNormal;
