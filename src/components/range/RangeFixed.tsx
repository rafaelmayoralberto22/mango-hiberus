import { FC } from "react";
import { RangeFixedType } from "../../types/RangeFixedType";

const RangeFixed: FC<RangeFixedType> = ({ value, rangeValues, onChange }) => {
  return (
    <div className="range">
      <span className="bullet1"></span>
      <div className="slider"></div>
      <span className="bullet2"></span>
    </div>
  );
};

export default RangeFixed;
