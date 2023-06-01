import Head from "next/head";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <Head>
        <title>Error | Page</title>
      </Head>

      <div className="content-center">
        <h1>
          Hey, we&apos;re so sorry, but the server is down right now, please try
          again later.
        </h1>
        <Link href="/">Go to Home</Link>
      </div>
    </>
  );
};

export default Page;
