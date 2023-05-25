import { RangeType } from "./RangeType";

export type RangeFixedType = Pick<RangeType, "value" | "onChange"> & {
  rangeValues: number[];
};
