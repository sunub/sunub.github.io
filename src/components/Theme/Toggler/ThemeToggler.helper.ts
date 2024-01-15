function handleChangeTheme() {
  const currTheme = window.localStorage.getItem("color-theme");
  const nextTheme = currTheme === "light" ? "dark" : "light";
  window.localStorage.setItem("color-theme", nextTheme);
  return nextTheme;
}

export default handleChangeTheme;
