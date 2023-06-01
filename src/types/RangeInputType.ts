export type RangeInputType = {
  label: string;
  value: number;
  title?: string;
  min?: number;
  max?: number;
  onlyLabel?: boolean;
  onChange: (value: number) => void;
};
