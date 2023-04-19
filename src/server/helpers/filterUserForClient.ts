import type { User } from "@clerk/nextjs/dist/api";
import { TRPCError } from "@trpc/server";

export const filterUserForClient = (user: User) => {
  if (!user.username || user.username === "" || user.username === null)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Username not found",
    });

  if (!user.profileImageUrl)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Profile Image not found",
    });
  if (!user.id)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "User ID not found",
    });

  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};
