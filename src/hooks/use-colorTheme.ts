"use server";

import { cookies } from "next/headers";
import { Theme } from "type";

function useColorTheme(): Theme {
  const colorTheme = cookies().get("color-theme");

  if (colorTheme == null) {
    console.error("선호하는 색상 테마를 찾을 수 없습니다.");
    return "light";
  }

  return colorTheme.value as Theme;
}

export default useColorTheme;
