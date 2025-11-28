"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const goToHome = async () => {
	revalidateTag("/", "default");
	redirect("/");
};
