"use server";

import { cookies } from "next/headers";
import { Theme } from "type";

function useColorTheme(): Theme {
  const colorTheme = cookies().get("color-theme");

  if (colorTheme == null) {
    return "light";
  }

  return colorTheme.value as Theme;
}

export default useColorTheme;