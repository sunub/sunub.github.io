"use client";

import styled from "styled-components";
import { Theme } from "type";

export const Header = styled.header<{ $theme: Theme }>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ $theme }) =>
    $theme === "dark"
      ? "linear-gradient(1deg, oklch(76.95% 0.12588555394033804 289.2710106250223) 24.47%, oklch(43.6% 0.073 290.15) 55.11%)"
      : "linear-gradient(1deg, oklch(97.14% 0.011 31.07 / 71%) 21.41%, oklch(82.9% 0.09573202406959574 31.111262465234525 / 68%) 55.11%)"};
  transition: background 350ms ease 0s;
`;
