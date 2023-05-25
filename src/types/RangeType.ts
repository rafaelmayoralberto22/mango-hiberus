export type RangeType = {
  mode?: RangeMode;
  config: RangeConfig;
  value: number;
  onChange: (value: number) => void;
};

export type RangeConfig = {
  min?: number;
  max?: number;
  rangeValues?: number[];
};

export enum RangeMode {
  NORMAL = "normal",
  RANGE = "range",
}
