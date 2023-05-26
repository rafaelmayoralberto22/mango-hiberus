import { FC } from "react";
import Exercise2 from "../components/exercises/Exercise2";
import { Exercise2Type } from "../types/ExercisesType";
import RangeService from "../services/RangeService";

const PageExecise2: FC<Exercise2Type> = (props) => {
  return <Exercise2 {...props} />;
};

export const getServerSideProps = async () => {
  const { range } = await RangeService.getMinMaxRange();
  return {
    props: { rangeValues: range },
  };
};

export default PageExecise2;
