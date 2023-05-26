import { RangeType } from "./RangeType";

export type RangeSliderType = Pick<RangeType, "onChange"> & {
  min: number;
  max: number;
  points: number[];
  mapLabel?: (item: number) => string;
};
