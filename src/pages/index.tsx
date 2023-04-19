import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { PageLayout } from "~/components/layout";

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      setBodyInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.title;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed for a strange reason, try again later");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <Image
        className="h-14 w-14 rounded-full"
        src={user.profileImageUrl}
        alt="User Profile Image"
        width={56}
        height={56}
      ></Image>
      <form className="flex grow flex-col">
        <input
          type="text"
          placeholder="Ask a question"
          className="grow bg-transparent outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPosting}
        />
        <textarea
          placeholder="More detail please"
          className="grow bg-transparent outline-none"
          value={bodyInput}
          onChange={(e) => setBodyInput(e.target.value)}
          disabled={isPosting}
        ></textarea>
      </form>
      {input !== "" && !isPosting && (
        <button onClick={() => mutate({ title: input, body: bodyInput })}>
          Post
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={30} />
        </div>
      )}
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  dayjs.extend(relativeTime);
  const { post, author } = props;
  if (!author || !post) {
    return <div></div>;
  }
  const authorName = author.username ? `@${author.username}` : "";
  return (
    <div className="flex flex-col border-slate-600 p-4">
      <div className="flex flex-row ">
        <Image
          className="h-14 w-14 rounded-full"
          src={author.profileImageUrl}
          alt="User Profile Image"
          width={56}
          height={56}
        ></Image>
        <div className="flex flex-col p-2">
          <div className="flex">
            <Link href={`/${authorName}`}>
              <span className="text-slate-300">{`${authorName}`}</span>
            </Link>
            <Link href={`/post/${post.id}`}>
              <span className=" font-thin text-slate-400">{` -  ${dayjs(
                post.createdAt
              ).fromNow()}`}</span>
            </Link>
          </div>
          <div className="border-b-slate-700 p-1 pb-0">{post.title}</div>
          <div className="border-b-slate-600 p-2 pl-8">{post.body}</div>
        </div>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;
  return (
    <div className="flex flex-col">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id}></PostView>
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  const { data, isLoading: postsLoaded } = api.posts.getAll.useQuery();

  if (!userLoaded && !postsLoaded) return <LoadingPage />;
  if (!data) return <div>No Posts</div>;

  return (
    <>
      <Head>
        <title>No Dumb Questions</title>
        <meta name="description" content="❓" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div className="w-full border-y border-slate-600 p-4">
          {!isSignedIn && <SignInButton />}
          {isSignedIn && <CreatePostWizard />}
        </div>
        <Feed />
      </PageLayout>
    </>
  );
};

export default Home;
