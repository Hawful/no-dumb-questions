import type { PropsWithChildren } from "react";

export interface CardProps extends PropsWithChildren {
  className?: string;
}

export const Card = (props: CardProps) => {
  if (!props.className) props.className = "shadow-hard-m hover:shadow-hard-xl";
  return (
    <div className="flex justify-center">
      <div
        className={`${props.className} m-8 w-full border border-slate-600 p-4 shadow-hard-m-magenta transition-all hover:shadow-hard-xl-magenta`}
      >
        {props.children}
      </div>
    </div>
  );
};
