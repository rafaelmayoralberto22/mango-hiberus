import { FC } from "react";
import { RangeNormalType } from "../../types/RangeNormalType";

const RangeNormal: FC<RangeNormalType> = ({ value, max, min, onChange }) => {
  return (
    <div className="range">
      <span className="bullet1"></span>
      <div className="slider"></div>
      <span className="bullet2"></span>
    </div>
  );
};

export default RangeNormal;
