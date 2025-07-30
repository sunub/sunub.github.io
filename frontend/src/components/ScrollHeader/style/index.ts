"use client";

import styled from "styled-components";

export const HeaderWrapper = styled.div<{
  $isDarkTheme: boolean;
}>`
  position: sticky;
  top: 0;
  z-index: 1000;
  overflow: hidden;
  margin-top: calc(60px - 1rem);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(10px);
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    pointer-events: none;
  }

  background-color: color-mix(
    in oklch,
    var(--color-landscape),
    transparent ${({ $isDarkTheme }) => ($isDarkTheme ? "100%" : "75%")}
  );

  &[data-is-scrolled="true"]::before {
    opacity: 1;
  }
`;
