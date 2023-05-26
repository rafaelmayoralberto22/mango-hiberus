import { FC, useMemo, useState } from "react";
import { sortRangeNumbers } from "../../helpers/utils";
import { Exercise2Type } from "../../types/ExercisesType";
import { RangeMode } from "../../types/RangeType";
import Range from "../range/Range";

const Exercise2: FC<Exercise2Type> = ({ rangeValues }) => {
  const points = useMemo(() => sortRangeNumbers(rangeValues), [rangeValues]);
  const [value, onChange] = useState<number[]>([
    points[0],
    points[points.length - 1],
  ]);
  const [start, end] = value;

  return (
    <section className="content-center">
      <span className="value-text">
        [{start} - {end}]
      </span>
      <Range
        mode={RangeMode.RANGE}
        {...{ onChange }}
        config={{ rangeValues }}
      />
    </section>
  );
};

export default Exercise2;
