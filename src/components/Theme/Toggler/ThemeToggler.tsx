"use client";

import * as Styled from "./ThemeToggler.style";
import React from "react";
import { Theme } from "type";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/constants";
import { ThemeContext } from "@/components/Theme/ThemeProvider";

export default function ThemeToggler({
  maskId,
  ...delegated
}: {
  maskId: string;
}) {
  const [colorTheme, rawSetColorTheme] = React.useState<
    "light" | "dark" | null
  >(null);
  const { setColorTheme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    const root = window.document.documentElement;
    const initColorTheme = root.getAttribute("data-color-theme") as Theme;
    rawSetColorTheme(initColorTheme);
  }, []);

  function handleClick() {
    const root = document.documentElement;
    const nextTheme = colorTheme === "light" ? "dark" : "light";
    window.localStorage.setItem("color-theme", nextTheme);
    const nextColor = nextTheme === "dark" ? DARK_COLORS : LIGHT_COLORS;

    rawSetColorTheme(nextTheme);
    root.setAttribute("data-color-theme", nextTheme);
    Object.entries(nextColor).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    setColorTheme(nextTheme);
  }

  return (
    colorTheme && (
      <Styled.ToggleBtn
        {...delegated}
        title="Toggles light & dark"
        aria-label="auto"
        onClick={handleClick}
      >
        <ThemeIcon colorTheme={colorTheme} maskId={maskId} />
      </Styled.ToggleBtn>
    )
  );
}
function ThemeIcon({
  colorTheme,
  maskId,
  ...delegated
}: {
  colorTheme: string;
  maskId: string;
}) {
  return (
    <Styled.SunAndMoon
      {...delegated}
      $colorTheme={colorTheme}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Styled.Sun
        $colorTheme={colorTheme}
        cx="12"
        cy="12"
        r="5"
        fill="#2D0D06"
        mask={`url(#${maskId})`}
      />
      <Styled.SunAndBeams $colorTheme={colorTheme}>
        <path d="M12 3V3.52941" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M5.63604 5.63604L6.01039 6.01039"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M3 12L3.52941 12" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M5.63604 18.364L6.01039 17.9896"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M12 20.4706V21" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M17.9896 17.9896L18.364 18.364"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M20.4706 12L21 12" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M17.9896 6.01039L18.364 5.63604"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </Styled.SunAndBeams>
      <Styled.Moon $colorTheme={colorTheme} id={maskId}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx="24" cy="24" r="6" fill="black" />
      </Styled.Moon>
    </Styled.SunAndMoon>
  );
}
