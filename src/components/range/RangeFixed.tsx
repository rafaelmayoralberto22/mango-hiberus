import { FC, memo, useMemo } from "react";
import { mapLabelEuro, sortRangeNumbers } from "../../helpers/utils";
import { RangeFixedType } from "../../types/RangeFixedType";
import RangeSlider from "./RangeSlider";

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
