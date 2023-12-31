"use server";

import { cookies } from "next/headers";

async function handleChangeTheme() {
  const savedTheme = cookies().get("color-theme");
  const nextTheme = savedTheme?.value === "light" ? "dark" : "light";

  cookies().set({
    name: "color-theme",
    value: nextTheme,
    path: "/",
  });

  return nextTheme;
}

export default handleChangeTheme;
