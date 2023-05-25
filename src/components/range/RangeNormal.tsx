import { FC } from "react";
import { generateRangeNumber, mapLabelEuro } from "../../helpers/utils";
import { RangeNormalType } from "../../types/RangeNormalType";
import RangeSlider from "./RangeSlider";

const RangeNormal: FC<RangeNormalType> = (props) => {
  const { min, max } = props;
  return (
    <RangeSlider
      {...props}
      points={generateRangeNumber(min, max)}
      mapLabel={mapLabelEuro}
    />
  );
};

export default RangeNormal;
