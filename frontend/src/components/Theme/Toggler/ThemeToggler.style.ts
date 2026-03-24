import styled from "styled-components";
import {
	HeaderActionIconWrapper,
	headerActionButtonStyles,
	headerActionIconWiggle,
} from "@/shared/style/HeaderActionButton";

export const Moon = styled.mask`
  transform-origin: center center;

  & > circle {
    transition: transform 250ms ease-in-out;
    transform: translate(0px, 0px);
  }

  html[data-color-theme="dark"] & > circle {
    transform: translate(-7px, -16px);
  }
`;

export const ToggleIconWrapper = styled(HeaderActionIconWrapper)``;

export const ToggleBtn = styled.button`
  ${headerActionButtonStyles}

  &:is(:hover, :focus-visible) ${ToggleIconWrapper} {
    animation: ${headerActionIconWiggle} 420ms cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

export const Sun = styled.circle`
  transform-origin: center center;
  fill: var(--icon-fill);
  transition: transform 250ms ease-in-out;
  transform: scale(1);

  html[data-color-theme="dark"] & {
    transform: scale(1.75);
  }
`;

export const SunAndBeams = styled.g`
  transform-origin: center center;
  stroke: var(--icon-fill);
  transition:
    transform 250ms ease-in-out,
    opacity 180ms ease-in-out;
  opacity: 1;
  transform: scale(1) rotate(0deg);

  html[data-color-theme="dark"] & {
    opacity: 0;
    transform: scale(0.6) rotate(-70deg);
  }
`;

export const SunAndMoon = styled.svg`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  overflow: visible;
  pointer-events: none;
  transform-origin: center center;
  stroke-linecap: round;
  transition: color 180ms ease-in-out;
  --icon-fill: currentColor;
`;
