import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex justify-center">
      <div className="h-screen w-full border-x border-slate-600 md:max-w-2xl">
        {props.children}
      </div>
    </div>
  );
};
