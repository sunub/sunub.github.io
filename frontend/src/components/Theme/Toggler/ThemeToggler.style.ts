import styled from "styled-components";
import {
	HeaderActionIconWrapper,
	headerActionButtonStyles,
	headerActionIconWiggle,
} from "@/shared/style/HeaderActionButton";

export const Moon = styled.mask<{ $primary: boolean }>`
  transform-origin: center center;

  & > circle {
    transition: transform 250ms ease-in-out;
    transform: ${(props) => (props.$primary ? "translate(-7px, -16px)" : "translate(0px, 0px)")};
  }
`;

export const ToggleIconWrapper = styled(HeaderActionIconWrapper)``;

export const ToggleBtn = styled.button`
  ${headerActionButtonStyles}

  &:is(:hover, :focus-visible) ${ToggleIconWrapper} {
    animation: ${headerActionIconWiggle} 420ms cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

export const Sun = styled.circle<{ $primary: boolean }>`
  transform-origin: center center;
  fill: var(--icon-fill);
  transition: transform 250ms ease-in-out;

  transform: ${(props) => (props.$primary ? "scale(1.75)" : "scale(1)")};
`;

export const SunAndBeams = styled.g<{ $primary: boolean }>`
  transform-origin: center center;
  stroke: var(--icon-fill);
  transition:
    transform 250ms ease-in-out,
    opacity 180ms ease-in-out;

  opacity: ${(props) => (props.$primary ? "0" : "1")};
  transform: ${(props) =>
		props.$primary ? "scale(0.6) rotate(-70deg)" : "scale(1) rotate(0deg)"};
`;

export const SunAndMoon = styled.svg<{ $primary: boolean }>`
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
