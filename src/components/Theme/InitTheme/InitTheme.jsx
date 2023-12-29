import React from "react";

function setColorsByTheme() {
  const LIGHT_COLORS = {
    "--color-navlink": `oklch(42.14% 0.08 29.36)`,
    "--color-text": `oklch(21.08% 0.055 34.69)`,
    "--color-background": `oklch(97.14% 0.011 31.07)`,
    "--color-primary": `oklch(100% 0 0 / 0.8)`,
    "--color-highlight": `oklch(70.8% 0.165 32.85)`,
    "--color-header": `oklch(90.8% 0.046 29.64)`,
    "--color-icon": `oklch(61.8% 0.027 30.58)`,
    "--color-elevation": `oklch(100% 0 0)`,
    "--color-bird": `oklch(73.44% 0.152 21.47)`,
    "--color-thumb": `oklch(92.54% 0.01 32.52)`,
    "--color-thumb-background": `oklch(53.74% 0.029 30.1)`,
  };

  const DARK_COLORS = {
    "--color-navlink": `oklch(90.21% 0.055771670330652126 300.11937740281473)`,
    "--color-text": `oklch(100% 0 31.08)`,
    "--color-background": `oklch(23.93% 0 0)`,
    "--color-primary": `oklch(34% 0.019 229.64)`,
    "--color-highlight": `oklch(64.86% 0.181 249.54)`,
    "--color-header": `oklch(30.4% 0.005 247.98)`,
    "--color-icon": `oklch(97.14% 0.011 31.07)`,
    "--color-elevation": `oklch(45.42% 0.007 239.95)`,
    "--color-bird": `oklch(90.21% 0.055771670330652126 300.11937740281473)`,
    "--color-thumb": `oklch(92.17% 0.039 291.94)`,
    "--color-thumb-background": `oklch(45.42% 0.007 239.95)`,
  };

  function getInitialColorMode() {
    const persistedCookies = document.cookie.match(/color-theme=([^;]+)/)?.[1];
    const hasPersistedPreference = typeof persistedCookies === "string";

    if (hasPersistedPreference) {
      return persistedCookies;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mql.matches === "boolean";
    if (hasMediaQueryPreference) {
      if (mql.matches) {
        setCookies("dark");
        return "dark";
      }
      setCookies("light");
      return "light";
    }

    return "light";
  }

  function setCookies(data) {
    document.cookie = `color-theme=${data};path=/`;
  }

  const colorMode = getInitialColorMode();

  const root = document.documentElement;
  const COLORS = colorMode === "light" ? LIGHT_COLORS : DARK_COLORS;

  root.setAttribute("data-color-theme", colorMode);
  Object.entries(COLORS).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches: isDark }) => {
      const currColorMode = isDark === true ? "dark" : "light";
      const currPreference = document.cookie.match(/color-theme=([^;]+)/)?.[1];
      if (currColorMode !== currPreference) {
        document.cookie = `color-theme=${currColorMode};path=/`;
      }
      const COLORS = currColorMode === "light" ? LIGHT_COLORS : DARK_COLORS;
      Object.entries(COLORS).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    });
}

export default function InitTheme() {
  const boundFn = String(setColorsByTheme);

  const calledFunction = `(${boundFn})()`;

  return <script dangerouslySetInnerHTML={{ __html: calledFunction }}></script>;
}
