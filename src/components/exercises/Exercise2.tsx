import { FC, useState } from "react";
import { Exercise2Type } from "../../types/ExercisesType";
import { RangeMode } from "../../types/RangeType";
import Range from "../range/Range";

const Exercise2: FC<Exercise2Type> = ({ rangeValues }) => {
  const [value, onChange] = useState<[number, number]>([0, 0]);

  return (
    <section className="content-center">
      <Range
        mode={RangeMode.RANGE}
        config={{ rangeValues }}
        {...{ value, onChange }}
      />
    </section>
  );
};

export default Exercise2;
