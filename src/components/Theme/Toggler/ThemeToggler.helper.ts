<<<<<<< HEAD
function handleChangeTheme() {
  const currTheme = window.localStorage.getItem("color-theme");
  const nextTheme = currTheme === "light" ? "dark" : "light";
  window.localStorage.setItem("color-theme", nextTheme);
=======
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

>>>>>>> refs/remotes/origin/sunub
  return nextTheme;
}

export default handleChangeTheme;
