"use server";

import { cookies } from "next/headers";

export async function toggleSearchCookie() {
  const cookieStore = await cookies();
  const currentCookie = cookieStore.get("search");
  const isSearchOpen = currentCookie
    ? JSON.parse(currentCookie.value).isSearchOpen
    : false;
  const cookieValue = JSON.stringify({ isSearchOpen: !isSearchOpen });
  cookieStore.set("search", cookieValue, {
    sameSite: "strict",
    path: "/",
  });
}
