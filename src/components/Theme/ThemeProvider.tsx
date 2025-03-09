"use client";

import React from "react";
import { Theme } from "type";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/constants";
import Cookies from "js-cookie";

interface ThemeContextProps {
  colorTheme: Theme;
  setColorTheme: (nextValue: Theme) => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  colorTheme: "light",
  setColorTheme: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, rawSetColorTheme] = React.useState<
    "light" | "dark" | null
  >(null);

  React.useEffect(() => {
    const root = document.documentElement;
    const initColorTheme = root.getAttribute("data-color-theme") as Theme;
    rawSetColorTheme(() => initColorTheme);
  }, []);

  React.useEffect(() => {
    function matchMediaHandler({ matches: isDark }: { matches: boolean }) {
      const nextColorTheme = isDark ? "dark" : "light";
      Cookies.set("color-theme", nextColorTheme, {
        expires: 1000,
      });

      const root = document.documentElement;
      const nextColor = nextColorTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

      root.setAttribute("data-color-theme", nextColorTheme);
      Object.entries(nextColor).forEach(([key, value]) => {
        root.style.setProperty(key, value as any);
      });
      rawSetColorTheme(nextColorTheme);
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches: isDark }) =>
        matchMediaHandler({ matches: isDark })
      );

    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", ({ matches: isDark }) =>
          matchMediaHandler({ matches: isDark })
        );
  }, []);

  const contextValue = React.useMemo(() => {
    const setColorTheme = (nextValue: Theme) => {
      const root = document.documentElement;
      root.setAttribute("data-color-theme", nextValue);

      const nextColor = nextValue === "light" ? LIGHT_COLORS : DARK_COLORS;
      Object.entries(nextColor).forEach(([key, value]) => {
        root.style.setProperty(key, value as any);
      });

      Cookies.set("color-theme", nextValue, {
        expires: 1000,
      });
      rawSetColorTheme(nextValue);
    };

    return {
      colorTheme,
      setColorTheme,
    };
  }, [colorTheme, rawSetColorTheme]);

  return (
    <ThemeContext.Provider value={contextValue as ThemeContextProps}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useColorTheme = () => React.useContext(ThemeContext);

export default ThemeProvider;
