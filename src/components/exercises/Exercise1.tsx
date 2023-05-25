import { FC, useState } from "react";
import { Exercise1Type } from "../../types/ExercisesType";
import Range from "../range/Range";

const Exercise1: FC<Exercise1Type> = ({ min, max }) => {
  const [value, onChange] = useState<number>(min);

  return (
    <section className="content-center">
      <span>{value}</span>
      <Range {...{ value, onChange }} config={{ min, max }} />
    </section>
  );
};

export default Exercise1;
