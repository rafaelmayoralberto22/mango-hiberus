import { FC, memo } from "react";
import { generateRangeNumber, mapLabelEuro } from "../../helpers/utils";
import { RangeNormalType } from "../../types/RangeNormalType";
import RangeSlider from "./RangeSlider";

const RangeNormal: FC<RangeNormalType> = memo((props) => {
  const { min, max, value } = props;
  const [valuesStart, valueEnd] = value;
  return (
    <RangeSlider
      {...props}
      points={generateRangeNumber(min, max)}
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
