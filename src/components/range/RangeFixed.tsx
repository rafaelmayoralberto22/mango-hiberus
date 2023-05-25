import { FC } from "react";
import { mapLabelEuro } from "../../helpers/utils";
import { RangeFixedType } from "../../types/RangeFixedType";
import RangeSlider from "./RangeSlider";

const RangeFixed: FC<RangeFixedType> = ({ value, rangeValues, onChange }) => {
  return (
    <RangeSlider
      {...{ value, onChange }}
      min={rangeValues[0]}
      max={rangeValues[rangeValues.length - 1]}
      points={rangeValues}
      mapLabel={mapLabelEuro}
    />
  );
};

export default RangeFixed;
