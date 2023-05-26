import { RangeType } from "./RangeType";

export type RangeFixedType = Pick<RangeType, "onChange"> & {
  rangeValues: number[];
};
