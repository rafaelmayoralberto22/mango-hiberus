export type RangeType = {
  mode?: RangeMode;
  config: RangeConfig;
  onChange: (value: [number, number]) => void;
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
