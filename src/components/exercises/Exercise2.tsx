import { FC, useState } from "react";
import { Exercise2Type } from "../../types/ExercisesType";
import { RangeMode } from "../../types/RangeType";
import Range from "../range/Range";

const Exercise2: FC<Exercise2Type> = ({ rangeValues }) => {
  const [value, onChange] = useState<number>(rangeValues[0]);

  return (
    <section className="content-center">
      <span>{value}</span>
      <Range
        mode={RangeMode.RANGE}
        {...{ value, onChange }}
        config={{ rangeValues }}
      />
    </section>
  );
};

export default Exercise2;
