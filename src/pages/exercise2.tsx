import { FC } from "react";
import Exercise2 from "../components/exercises/Exercise2";
import Nav from "../components/nav/Nav";
import RangeService from "../services/RangeService";
import { Exercise2Type } from "../types/ExercisesType";

const PageExecise2: FC<Exercise2Type> = (props) => {
  return (
    <>
      <Nav />
      <Exercise2 {...props} />
    </>
  );
};

export const getServerSideProps = async () => {
  const { range } = await RangeService.getMinMaxRange();
  return {
    props: { rangeValues: range },
  };
};

export default PageExecise2;
