import { RangeMode } from "../helpers/constants";

export type RangeType = {
  value: [number, number];
  mode?: RangeMode;
  config: RangeConfig;
  onChange: (value: [number, number]) => void;
};

export type RangeConfig = {
  min?: number;
  max?: number;
  rangeValues?: number[];
};
