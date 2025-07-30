"use server";

import { cookies } from "next/headers";

export async function initializeSearchCookie() {
  const cookieStore = await cookies();
  const cookieValue = JSON.stringify({ isSearchOpen: false });
  cookieStore.set("search", cookieValue, {
    sameSite: "strict",
    path: "/",
  });
}
