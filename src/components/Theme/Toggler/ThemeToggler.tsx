"use client";

import { HTMLAttributes, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../Provider/ThemeProvider";

type Theme = {
  colorMode?: string | null;
  setColorMode?: (value: string) => void;
};

const ToggleBtn = styled.button`
  --toggle-size: var(--size-6);
  position: relative;

  background: none;
  border: none;
  padding: 0;

  inline-size: var(--toggle-size);
  block-size: var(--toggle-size);
  aspect-ratio: 1;
  border-radius: 50%;

  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  outline-offset: 5px;

  & > svg {
    inline-size: 100%;
    block-size: 100%;
    stroke-linecap: round;
  }

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

function ThemeIcon({
  colorTheme,
  maskId,
  ...delegated
}: {
  colorTheme: string;
  maskId: string;
}) {
  return (
    <SunAndMoon
      {...delegated}
      $colorTheme={colorTheme}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Sun
        $colorTheme={colorTheme}
        cx="12"
        cy="12"
        r="5"
        fill="#2D0D06"
        mask={`url(#${maskId})`}
      />
      <SunAndBeams $colorTheme={colorTheme}>
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
  );
}
