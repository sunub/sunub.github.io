import styled from "styled-components";

export const RootContainer = styled.div<{ $isOpen?: boolean }>`
  z-index: ${({ $isOpen }) => ($isOpen ? 99999 : 10000)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Open = styled.g`
  transform-origin: center;
  transform: scale(1);
  transition: all 500ms ease;

  & > #hambuer-btn-svg-center {
    transition: all 500ms ease;
    transform-origin: center;
    transform: scaleX(1);
  }
  & > #hambuer-btn-svg-bottom {
    transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    stroke-width: 3px;
  }
  & > #hambuer-btn-svg-top {
    transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    stroke-width: 3px;
  }
`;

export const Close = styled.g`
  transform: translate(0);
  transition: all 500ms ease;
`;
export const Cross1 = styled.path`
  transform-origin: center center;

  @keyframes cross1-open {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(45deg);
    }
  }

  @keyframes cross1-close {
    0% {
      transform: rotate(45deg);
      opacity: 1;
    }

    100% {
      transform: rotate(0deg);
      opacity: 0;
    }
  }
`;
export const Cross2 = styled.path`
  transform-origin: center center;

  @keyframes cross2-open {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-45deg);
    }
  }

  @keyframes cross2-close {
    0% {
      transform: rotate(-45deg);
      opacity: 1;
    }

    100% {
      transform: rotate(0deg);
      opacity: 0;
    }
  }
`;

const Circle = styled.rect`
  stroke-width: 3px;
  transform-origin: center;

  @keyframes circle-pop {
    0% {
      stroke: none;
      transform: scale(0);
    }

    100% {
      stroke: var(--color-background);
      transform: scale(1);
    }
  }
`;

export const Btn = styled.button<{ $isOpen: boolean; $isAnimating: boolean }>`
  z-index: 99999;
  position: ${({ $isOpen }) => ($isOpen ? "absolute" : "relative")};
  right: ${({ $isOpen }) => ($isOpen ? "3dvw" : "0")};
  top: ${({ $isOpen }) => ($isOpen ? "3dvh" : "0")};
  width: 40px;
  height: 40px;

  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $isAnimating }) => ($isAnimating ? "default" : "pointer")};
  pointer-events: ${({ $isAnimating }) => ($isAnimating ? "none" : "auto")};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 32px;
    height: 32px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: var(--color-text);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition: opacity 0.6s ease;
    z-index: -1;
    pointer-events: none;
  }

  &[aria-label='Open menu'] ${Open} {
    #hambuer-btn-svg-center {
      transform: scaleX(1);
    }
  }
  &[aria-label='Open menu'] ${Close} {
    & > ${Circle} {
      stroke: none;
    }

    & > ${Cross1} {
      animation: cross1-close 200ms;
      animation-iteration-count: 1;
      animation-timing-function: ease-out;
      transform: rotate(0deg);
    }
    & > ${Cross2} {
      animation: cross2-close 200ms;
      animation-iteration-count: 1;
      animation-timing-function: ease-out;
      transform: rotate(0deg);
    }
  }

  &[aria-label='Close menu'] ${Open} {
    transform: scale(0.1);
    #hambuer-btn-svg-center {
      transform: scaleX(0.5);
    }

    #hambuer-btn-svg-top {
      transform: translateY(6.75px);
    }

    #hambuer-btn-svg-bottom {
      transform: translateY(-6.75px);
    }
  }
  &[aria-label='Close menu'] ${Close} {
    & > path, & > rect {
      stroke: var(--color-background);
      transition: stroke 0.3s ease;
    }

    & > ${Circle} {
      animation: circle-pop 600ms;
      animation-iteration-count: 1;
      animation-timing-function: ease;
    }

    & > ${Cross1} {
      animation: cross1-open 500ms;
      animation-iteration-count: 1;
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform: rotate(45deg);
    }

    & > ${Cross2} {
      animation: cross2-open 500ms;
      animation-iteration-count: 1;
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform: rotate(-45deg);
    }
  }

  @media (max-width: 768px) {
    & {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const Svg = styled.svg`
  width: 8dvw;
  height: 100%;
  max-width: 40px;
  display: block;

  & > g {
    & > path,
    rect {
      stroke: var(--color-text);
    }
  }
`;

export const FloodWrapper = styled.div`
  z-index: 99991;
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  transform: translateX(-100%);
  will-change: transform;
`;

export const FloodSVG = styled.svg`
  display: block;
  height: 100%;
`;
