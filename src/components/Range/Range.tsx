import { FC } from "react";
import { RangeMode, RangeType } from "../../types/RangeType";
import RangeFixed from "./RangeFixed";
import RangeNormal from "./RangeNormal";

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
        rangeValues={config?.rangeValues ?? [1, 100]}
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
