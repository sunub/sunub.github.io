"use client";

import Cookies from "js-cookie";

function useColorTheme() {
  const colorTheme = Cookies.get("color-theme");
  return colorTheme;
}

export default useColorTheme;
