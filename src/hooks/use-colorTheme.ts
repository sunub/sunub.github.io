<<<<<<< HEAD
"use client";

import Cookies from "js-cookie";

function useColorTheme() {
  const colorTheme = Cookies.get("color-theme");
  return colorTheme;
=======
"use server";

import { cookies } from "next/headers";
import { Theme } from "type";

async function useColorTheme() {
  const colorTheme = cookies().get("color-theme");

  if (colorTheme == null) {
    return "light";
  }

  return colorTheme.value as Theme;
>>>>>>> refs/remotes/origin/sunub
}

export default useColorTheme;
