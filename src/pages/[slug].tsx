import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) return <div>Not found</div>;
  return (
    <>
      <Head>
        <title>{username}</title>
        <meta name="Profile Page" content="" />
      </Head>
      <main className="flex justify-center">
        <div className="h-screen w-full border-x border-slate-600 md:max-w-2xl">
          <div className="w-full border-y border-slate-600 p-4"></div>
          {username}
        </div>
      </main>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });
  const slug = context.params?.slug;

  if (typeof slug !== "string") {
    return {
      props: {},
    };
  }
  const username = slug.replace("@", "");

  await helpers.profile.getUserByUsername.prefetch({ username });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      username,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProfilePage;
