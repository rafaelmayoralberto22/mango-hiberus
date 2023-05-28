import { FC, memo, useMemo } from "react";
import { generateRangeNumber, mapLabelEuro } from "../../helpers/utils";
import { RangeNormalType } from "../../types/RangeNormalType";
import RangeSlider from "./RangeSlider";

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
