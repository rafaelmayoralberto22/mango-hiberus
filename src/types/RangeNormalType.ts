import { RangeType } from "./RangeType";

export type RangeNormalType = Pick<RangeType, "value" | "onChange"> & {
  min: number;
  max: number;
};
