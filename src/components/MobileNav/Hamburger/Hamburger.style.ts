'use client';

import styled from 'styled-components';

export const Open = styled.g`
  transform-origin: center;
  transform: scale(1);
  transition: all opacity 500ms ease;

  & > #center {
    transition: all 500ms ease;
    transform-origin: center;
    transform: scaleX(1);
  }
  & > #bottom {
    transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    stroke-width: 3px;
  }
  & > #top {
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

export const Circle = styled.rect`
  stroke-width: 3px;
  transform-origin: center;

  @keyframes circle-pop {
    0% {
      stroke: none;
      transform: scale(0);
    }

    100% {
      stroke: var(--color-text);
      transform: scale(1);
    }
  }
`;

export const Btn = styled.button.attrs({
  className: 'hamburger-btn',
})`
  position: absolute;
  z-index: 10001;
  top: 60px;
  right: 32px;

  width: 40px;
  height: 40px;

  padding: 0;
  cursor: pointer;
  &[aria-label='Open menu'] ${Open} {
    #center {
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
    #center {
      transform: scaleX(0.5);
    }

    #top {
      transform: translateY(6.75px);
    }

    #bottom {
      transform: translateY(-6.75px);
    }
  }
  &[aria-label='Close menu'] ${Close} {
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
  justify-content: center;
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;

  & > g {
    & > path,
    rect {
      stroke: var(--color-text);
    }
  }

  @media (max-width: 320px) {
    & {
      width: 32px;
      height: 32px;
    }
  }
`;

export const FloodSVG = styled.svg`
  z-index: 1000;
  position: absolute;
  top: 0px;
  left: 0px;
  transform: translateX(-100%);
  & > path {
    transition: all 300ms ease;
  }
`;

export const RootWrapper = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
