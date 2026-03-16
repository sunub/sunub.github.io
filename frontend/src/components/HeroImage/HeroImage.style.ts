import { motion } from "motion/react";
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

export const CloudsFrame = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 200px;
`;

export const Clouds = styled.span`
  position: absolute;
  inset: 0;
  background-repeat: repeat-x;
  background-image: var(--clouds-bg-url);
  opacity: var(--clouds-opacity);

  animation: pan 100s linear infinite;
  animation-play-state: paused;
  will-change: background-position;

  &[data-playing="true"] {
    animation-play-state: running;
  }

  @keyframes pan {
    0% {
      background-position: 0% 0%;
    }

    100% {
      background-position: 1039px 0%;
    }
  }
`;

export const Moon = styled(Image)<{ $opacity: string }>`
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

  transform: translateY(28px);
  animation: pan-cars 50s linear infinite;
  animation-play-state: paused;
  will-change: background-position;

  background-image: var(--cars-bg-url);
  opacity: var(--cars-opacity);

  &[data-playing="true"] {
    animation-play-state: running;
  }

  @keyframes pan-cars {
    0% {
      background-position: 0% 0%;
    }

    100% {
      background-position: 1554px 0%;
    }
  }
`;
export const HeroShadow = styled.span`
  position: relative;
  top: -28px;
  display: inline-block;
  width: 100%;
  height: 7px;
  background-color: var(--hero-shadow-color);
  mix-blend-mode: darken;
  filter: blur(10px);
  opacity: var(--hero-shadow-opacity);
`;

export const HeroImageSurface = styled.div`
  position: relative;
  grid-area: hero-image;
  transform: translateY(45px);
`;

export const HeroOverlayLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`;

export const HeroPosterSurface = styled.div`
  position: relative;
  z-index: 0;
  transform: translateY(45px);
  pointer-events: none;
`;

export const HeroPosterCloudsFrame = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  opacity: 1;
  transition: opacity 220ms ease;
  will-change: opacity;

  &[data-hidden="true"] {
    opacity: 0;
  }
`;

export const HeroPosterBridge = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  overflow: hidden;
`;

export const HeroPosterCars = styled.div`
  position: relative;
  width: 100%;
  height: 14px;
  overflow: hidden;
  transform: translateY(-92px);
  opacity: 1;
  transition: opacity 220ms ease;
  will-change: opacity;

  &[data-hidden="true"] {
    opacity: 0;
  }
`;

export const HeroPosterShadow = styled.span`
  position: relative;
  top: -28px;
  display: inline-block;
  width: 100%;
  height: 7px;
  background-color: var(--hero-shadow-color);
  mix-blend-mode: darken;
  filter: blur(10px);
  opacity: var(--hero-shadow-opacity);
`;

export const HeroPosterTrack = styled.div`
  display: flex;
  align-items: flex-start;
  width: max-content;
  min-width: 100%;
  pointer-events: none;
  user-select: none;
`;

export const HeroPosterTile = styled(Image)`
  display: block;
  flex: none;
  max-width: none;
  pointer-events: none;
  user-select: none;
`;
