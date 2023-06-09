import Head from "next/head";
import { FC } from "react";
import Exercise1 from "../components/exercises/Exercise1";
import Nav from "../components/nav/Nav";
import { getMinMax } from "../services/rangeService";
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
  try {
    const { min, max } = await getMinMax();
    return {
      props: { min, max },
    };
  } catch(e) {
    console.log(e);

    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};

export default PageExecise1;
