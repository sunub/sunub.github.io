"use client";

<<<<<<< HEAD
<<<<<<< HEAD
import { HTMLAttributes, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../Provider/ThemeProvider";
=======
import * as Styled from "./ThemeToggler.style";
import React, { HTMLAttributes, useContext } from "react";
import { LIGHT_COLORS, DARK_COLORS } from "@/constants/constants";
import { Theme } from "type";
import handleChangeTheme from "./ThemeToggler.helper";
>>>>>>> refs/remotes/origin/sunub

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

<<<<<<< HEAD
  @media (hover: none) {
    --toggle-size: 48px;
  }
`;

const SunAndMoon = styled.svg<{ $colorTheme: string }>`
  transform-origin: center center;
  transition: fill 0.3s ease-in-out;
  --icon-fill: ${(props) =>
    props.$colorTheme === "light"
      ? "oklch(45.88% 0.029 30.71)"
      : "var(--color-bird)"};
  --icon-hover-fill: ${(props) =>
    props.$colorTheme === "light"
      ? "oklch(21.08% 0.055 34.69)"
      : "oklch(100% 0 31.08)"};
`;

const Sun = styled.circle<{ $colorTheme: string }>`
  transform-origin: center center;
  fill: var(--icon-fill);
  transition: transform 0.5s ease-in-out;

  transform: ${(props) =>
    props.$colorTheme === "dark" ? "scale(1.75)" : "scale(1)"};

  &:hover,
  :focus-visible {
    fill: var(--icon-hover-fill);
  }
`;

const SunAndBeams = styled.g<{ $colorTheme: string }>`
  transform-origin: center center;
  stroke: var(--icon-fill);
  transition:
    transform 0.5s ease-in,
    opacity 0.3s ease-in,
    scale 0.4s ease-in;

  opacity: ${(props) => (props.$colorTheme === "dark" ? "0" : "1")};
  transform: ${(props) =>
    props.$colorTheme === "dark" ? "rotate(-70deg)" : "rotate(70deg)"};
  transform: ${(props) =>
    props.$colorTheme === "dark" ? "scale(0)" : "scale(1)"};

  &:hover,
  :focus-visible {
    fill: var(--icon-hover-fill);
  }
`;

const Moon = styled.mask<{ $colorTheme: string }>`
  transform-origin: center center;

  & > circle {
    transition: transform 0.4s ease-in-out;
    transform: ${(props) =>
      props.$colorTheme === "dark"
        ? "translate(-7px, -16px)"
        : "translate(0px, 0px)"};
  }
`;

=======
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
>>>>>>> dev-v2
=======
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
>>>>>>> refs/remotes/origin/sunub
function ThemeIcon({
  colorTheme,
  maskId,
  ...delegated
}: {
  colorTheme: string;
  maskId: string;
}) {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <SunAndMoon
=======
    <Styled.SunAndMoon
>>>>>>> dev-v2
=======
    <Styled.SunAndMoon
>>>>>>> refs/remotes/origin/sunub
      {...delegated}
      $colorTheme={colorTheme}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
<<<<<<< HEAD
<<<<<<< HEAD
      <Sun
=======
      <Styled.Sun
>>>>>>> dev-v2
=======
      <Styled.Sun
>>>>>>> refs/remotes/origin/sunub
        $colorTheme={colorTheme}
        cx="12"
        cy="12"
        r="5"
        fill="#2D0D06"
        mask={`url(#${maskId})`}
      />
<<<<<<< HEAD
<<<<<<< HEAD
      <SunAndBeams $colorTheme={colorTheme}>
=======
      <Styled.SunAndBeams $colorTheme={colorTheme}>
>>>>>>> dev-v2
=======
      <Styled.SunAndBeams $colorTheme={colorTheme}>
>>>>>>> refs/remotes/origin/sunub
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
<<<<<<< HEAD
<<<<<<< HEAD
      </SunAndBeams>
      <Moon $colorTheme={colorTheme} id={maskId}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx="24" cy="24" r="6" fill="black" />
      </Moon>
    </SunAndMoon>
  );
}

export default function ThemeToggler({
  maskId,
  ...delegated
}: {
  maskId: string;
  delegated: HTMLAttributes<HTMLButtonElement>;
}) {
  const theme: Theme = useContext(ThemeContext);

  return (
    <ToggleBtn
      {...delegated}
      title="Toggles light & dark"
      aria-label="auto"
      onClick={() => {
        if (theme.setColorMode) {
          const curTheme: string =
            theme.colorMode === "light" ? "dark" : "light";
          theme.setColorMode(curTheme);
        }
      }}
    >
      <ThemeIcon colorTheme={theme.colorMode ?? "light"} maskId={maskId} />
    </ToggleBtn>
=======
      </Styled.SunAndBeams>
      <Styled.Moon $colorTheme={colorTheme} id={maskId}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx="24" cy="24" r="6" fill="black" />
      </Styled.Moon>
    </Styled.SunAndMoon>
>>>>>>> dev-v2
=======
      </Styled.SunAndBeams>
      <Styled.Moon $colorTheme={colorTheme} id={maskId}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx="24" cy="24" r="6" fill="black" />
      </Styled.Moon>
    </Styled.SunAndMoon>
>>>>>>> refs/remotes/origin/sunub
  );
}
