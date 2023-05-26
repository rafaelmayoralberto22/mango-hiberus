import { FC, memo } from "react";
import { mapLabelEuro } from "../../helpers/utils";
import { RangeFixedType } from "../../types/RangeFixedType";
import RangeSlider from "./RangeSlider";

const RangeFixed: FC<RangeFixedType> = memo(({ rangeValues, onChange }) => {
  return (
    <RangeSlider
      {...{ onChange }}
      min={rangeValues[0]}
      max={rangeValues[rangeValues.length - 1]}
      points={rangeValues}
      mapLabel={mapLabelEuro}
    />
  );
});

RangeFixed.displayName = "RangeFixed";
export default RangeFixed;
