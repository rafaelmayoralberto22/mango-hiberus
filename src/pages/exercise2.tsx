import Head from "next/head";
import { FC } from "react";
import Exercise2 from "../components/exercises/Exercise2";
import Nav from "../components/nav/Nav";
import { getMinMaxRange } from "../services/rangeService";
import { Exercise2Type } from "../types/ExercisesType";

const PageExecise2: FC<Exercise2Type> = (props) => {
  return (
    <>
      <Head>
        <title>Exercise 2</title>
      </Head>
      <Nav />
      <Exercise2 {...props} />
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const { range } = await getMinMaxRange();
    return {
      props: { rangeValues: range },
    };
  } catch {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};

export default PageExecise2;
