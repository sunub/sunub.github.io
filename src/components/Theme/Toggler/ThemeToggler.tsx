"use client";

import * as Styled from "./ThemeToggler.style";
import React, { HTMLAttributes, useContext } from "react";
import { LIGHT_COLORS, DARK_COLORS } from "@/constants/constants";
import { Theme } from "type";
import handleChangeTheme from "./ThemeToggler.helper";

export default function ThemeToggler({
  initColorTheme,
  maskId,
  ...delegated
}: {
  initColorTheme: Theme | string;
  maskId: string;
}) {
  const [theme, setTheme] = React.useState<Theme | string>(initColorTheme);

  async function handleClick() {
    const nextTheme = await handleChangeTheme();
    const nextColors = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;
    setTheme(() => nextTheme);

    const root = document.documentElement;
    root.setAttribute("data-color-theme", nextTheme);
    Object.entries(nextColors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <Styled.ToggleBtn
      {...delegated}
      title="Toggles light & dark"
      aria-label="auto"
      onClick={async () => handleClick()}
    >
      <ThemeIcon colorTheme={theme} maskId={maskId} />
    </Styled.ToggleBtn>
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
