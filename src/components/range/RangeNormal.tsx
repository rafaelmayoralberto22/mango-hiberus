import { FC, memo } from "react";
import { generateRangeNumber, mapLabelEuro } from "../../helpers/utils";
import { RangeNormalType } from "../../types/RangeNormalType";
import RangeSlider from "./RangeSlider";

const RangeNormal: FC<RangeNormalType> = memo((props) => {
  const { min, max } = props;
  return (
    <RangeSlider
      {...props}
      points={generateRangeNumber(min, max)}
      mapLabel={mapLabelEuro}
    />
  );
});

RangeNormal.displayName = "RangeNormal";
export default RangeNormal;
