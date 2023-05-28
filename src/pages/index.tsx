import Head from "next/head";
import Home from "../components/home/Home";

const Page = () => {
  return (
    <>
      <Head>
        <title>Home | Page</title>
      </Head>
      <Home title="Mango - Hiberus Test" />
    </>
  );
};

export default Page;
