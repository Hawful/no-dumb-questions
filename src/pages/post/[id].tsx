import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center">
        <div className="h-screen w-full border-x border-slate-600 md:max-w-2xl">
          <div className="w-full border-y border-slate-600 p-4"></div>
          Post View
        </div>
      </main>
    </>
  );
};

export default SinglePostPage;
