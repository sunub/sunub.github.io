"use client";

import styled from "styled-components";

export const ToggleBtn = styled.button`
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

export const SunAndMoon = styled.svg<{ $colorTheme: string }>`
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

export const Sun = styled.circle<{ $colorTheme: string }>`
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

export const SunAndBeams = styled.g<{ $colorTheme: string }>`
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

export const Moon = styled.mask<{ $colorTheme: string }>`
  transform-origin: center center;

  & > circle {
    transition: transform 0.4s ease-in-out;
    transform: ${(props) =>
      props.$colorTheme === "dark"
        ? "translate(-7px, -16px)"
        : "translate(0px, 0px)"};
  }
`;
