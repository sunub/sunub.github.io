"use client";

import Image from "next/image";
import styled from "styled-components";

export const RootWrapper = styled.div`
  position: relative;
  transform: translateY(28px);

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const BackgroundWrapper = styled.div`
  display: grid;
  grid: [hero-background] 1fr / [hero-background] 1fr;
  place-items: center;
  height: 550px;
`;

export const HeroImageWrapper = styled.div`
  display: grid;
  grid-template: [hero-image] 1fr / [hero-image] 1fr;
  justify-items: center;
  overflow: hidden;
`;

export const Bridge = styled.span`
  display: inline-block;
  position: relative;
  width: 100dvw;
  height: 120px;
  z-index: 2;
  background-size: contain;
  background-repeat: repeat-x;
  background-image: var(--bridge-bg-url);
  opacity: var(--bridge-opacity);
`;

export const CloudsFrame = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 200px;
  background: var(--clouds-fallback-bg);
`;

export const Clouds = styled.span`
  position: absolute;
  inset: 0;
  background-repeat: repeat-x;
  background-image: var(--clouds-bg-url);
  opacity: var(--clouds-opacity);

  animation: pan 100s linear infinite;
  will-change: background-position;
  @keyframes pan {
    0% {
      background-position: 0% 0%;
    }

    100% {
      background-position: 1039px 0%;
    }
  }
`;

export const Moon = styled(Image) <{ $opacity: string }>`
  position: absolute;
  top: 0px;
  left: 50%;
  z-index: 2;
  width: 100dvw;
  height: auto;
  max-width: none;
  pointer-events: none;
  user-select: none;
  transform: translateX(-50%);
  opacity: var(${(props) => props.$opacity});
`;

export const Cars = styled.span`
  background-repeat: repeat-x;
  position: absolute;
  z-index: -1;

  width: 100%;
  height: 100%;

  transform: translateY(-100px);
  animation: pan-cars 50s linear infinite;
  will-change: background-position;

  background-image: var(--cars-bg-url);
  opacity: var(--cars-opacity);
  @keyframes pan-cars {
    0% {
      background-position: 0% 0%;
    }

    100% {
      background-position: 1554px 0%;
    }
  }
`;
export const LightShadow = styled.span`
  position: relative;
  top: -28px;
  display: inline-block;
  width: 100%;
  height: 7px;
  background-color: oklch(50.81% 0.191 29.05);
  mix-blend-mode: darken;
  filter: blur(10px);
  opacity: var(--hero-shadow-opacity);
`;

export const DarkShadow = styled.span`
  position: relative;
  top: -28px;
  display: inline-block;
  width: 100%;
  height: 7px;
  background-color: oklch(15.29% 0.034 262.59 / 85%);
  mix-blend-mode: darken;
  filter: blur(10px);
  opacity: var(--hero-shadow-opacity);
`;

export const DrakHeroImageWapper = styled.div`
  position: relative;
  grid-area: hero-image;
  transform: translateY(45px);
`;

export const LightHeroImageWapper = styled.div`
  position: relative;
  grid-area: hero-image;
  transform: translateY(45px);
`;
