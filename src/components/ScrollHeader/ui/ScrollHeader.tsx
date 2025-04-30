"use client";

import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "@/components/Theme/ThemeProvider";

export function ScrollHeader({ children }: { children: React.ReactNode }) {
  const { colorTheme } = useContext(ThemeContext);
  const isDarkTheme = colorTheme === "dark";

  return <HeaderWrapper $isDarkTheme={isDarkTheme}>{children}</HeaderWrapper>;
}

const HeaderWrapper = styled.div<{ $isDarkTheme: boolean }>`
  position: sticky;
  top: 0px;
  z-index: 10000;

  margin-top: calc(60px - 1rem);
  transition: padding-top 300ms ease-in-out;
  background-color: color-mix(
    in oklch,
    var(--color-background),
    transparent ${({ $isDarkTheme }) => ($isDarkTheme ? "100%" : "75%")}
  );
  backdrop-filter: blur(16px);
`;
