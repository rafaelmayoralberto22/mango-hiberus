import { RangeType } from "./RangeType";

export type RangeSliderType = Pick<RangeType, "value" | "onChange"> & {
  min: number;
  max: number;
  points: number[];
  mapLabel?: (item: number) => string;
  onlyLabel?: boolean;
  validation?: ValidationInputs;
};

export type ValidationInputs = {
  maxInputStart: number;
  minInputEnd: number;
};
