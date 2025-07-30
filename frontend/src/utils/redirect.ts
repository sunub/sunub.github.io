"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export const goToUsername = async () => {
  revalidateTag("/start/username");
  redirect("/start/username");
};

export const goToHome = async () => {
  revalidateTag("/");
  redirect("/");
};
