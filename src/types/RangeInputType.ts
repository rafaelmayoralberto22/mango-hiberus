export type RangeInputType = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onlyLabel?: boolean;
  onChange: (value: number) => void;
};
