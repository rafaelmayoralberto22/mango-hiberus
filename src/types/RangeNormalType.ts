import { RangeType } from "./RangeType";

export type RangeNormalType = Pick<RangeType, "onChange"> & {
  min: number;
  max: number;
};
