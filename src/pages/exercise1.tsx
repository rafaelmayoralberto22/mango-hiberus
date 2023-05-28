import Head from "next/head";
import { FC } from "react";
import Exercise1 from "../components/exercises/Exercise1";
import Nav from "../components/nav/Nav";
import RangeService from "../services/RangeService";
import { Exercise1Type } from "../types/ExercisesType";

const PageExecise1: FC<Exercise1Type> = (props) => {
  return (
    <>
      <Head>
        <title>Exercise 1</title>
      </Head>
      <Nav />
      <Exercise1 {...props} />
    </>
  );
};

export const getServerSideProps = async () => {
  const { min, max } = await RangeService.getMinMax();
  return {
    props: { min, max },
  };
};

export default PageExecise1;
