"use client";

import styled, { css, keyframes } from "styled-components";

export const headerActionIconWiggle = keyframes`
  0% {
    transform: translateZ(0) scale(1) rotate(0deg);
  }

  45% {
    transform: translateZ(0) scale(0.94) rotate(-10deg);
  }

  75% {
    transform: translateZ(0) scale(1.02) rotate(14deg);
  }

  100% {
    transform: translateZ(0) scale(1) rotate(0deg);
  }
`;

export const HeaderActionIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 24px;
  block-size: 24px;
  flex-shrink: 0;
  transform-origin: center;
  will-change: transform;
`;

export const headerActionButtonStyles = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 44px;
  block-size: 44px;
  flex: 0 0 44px;
  padding: 0;
  border-radius: 999px;
  color: var(--color-text);
  line-height: 1;
  vertical-align: middle;
  outline: none;
  outline-offset: 4px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transform: translateY(0);
  transition:
    color 180ms ease,
    background-color 180ms ease,
    transform 180ms ease;

  &:is(:hover, :focus-visible) {
    color: var(--color-highlight);
    background-color: color-mix(
      in oklch,
      var(--color-highlight) 10%,
      transparent
    );
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid color-mix(in oklch, var(--color-highlight), white 24%);
  }
`;
