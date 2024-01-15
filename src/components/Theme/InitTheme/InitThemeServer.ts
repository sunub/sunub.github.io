"use server";

import { cookies } from "next/headers";
import process from "process";

function checkHasColorTheme() {
  return cookies().get("color-theme");
}

function setInitColorTheme(preferenceColorTheme: string) {
  const nodeenv = process.env.NODE_ENV;
  let sameSite: "lax" | "none" | "static" = "lax";
  let secure: boolean = true;

  if (nodeenv === "development") {
    [sameSite, secure] = ["none", false];
  }

  cookies().set("color-theme", preferenceColorTheme, {
    path: "/",
    sameSite,
    secure,
  });
}

export { setInitColorTheme, checkHasColorTheme };
