import styled, { keyframes } from "styled-components";

const scaleInOut = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const pendulumAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-40deg);
  }

  80% {
    transform: rotate(20deg);
  }

  100% {
    transform: rotate(0deg);
  }
`;

export const Moon = styled.mask<{ $primary: boolean }>`
  transform-origin: center center;

  & > circle {
    transition: transform 0.4s ease-in-out;
    transform: ${(props) => (props.$primary ? "translate(-7px, -16px)" : "translate(0px, 0px)")};
  }
`;

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
    transform 0.3s ease-in,
    opacity 0.1s ease-in,
    scale 0.2s ease-in;

  opacity: ${(props) => (props.$primary ? "0" : "1")};
  transform: ${(props) => (props.$primary ? "rotate(-70deg)" : "rotate(70deg)")};
  transform: ${(props) => (props.$primary ? "scale(0)" : "scale(1)")};
`;

export const SunAndMoon = styled.svg<{ $primary: boolean }>`
  transform-origin: center center;
  transition: fill 0.3s ease-in-out;
  --icon-fill: ${(props) => (props.$primary ? "var(--color-navlink)" : "oklch(45.88% 0.029 30.71)")};
  --icon-hover-fill: ${(props) => (props.$primary ? "var(--color-navlink)" : "oklch(21.08% 0.055 34.69)")};

  &:hover,
  :focus-visible {
    ${SunAndBeams} {
      animation: ${scaleInOut} 0.4s ease-in-out;
    }

    animation: ${pendulumAnimation} 0.4s ease-in-out;
  }
`;
