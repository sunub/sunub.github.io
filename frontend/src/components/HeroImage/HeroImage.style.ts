'use client';

import Image from 'next/image';
import styled from 'styled-components';

export const RootWrapper = styled.div`
  position: relative;
  top: 65px;

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

export const Picture = styled.picture`
  display: contents;
  margin-left: auto;
  margin-right: auto;
`;

export const HeroImageWrapper = styled.div`
  display: grid;
  grid-template: [hero-image] 1fr / [hero-image] 1fr;
  justify-items: center;
`;

export const Bridge = styled.span<{ $url: string; $opacity: string }>`
  display: inline-block;
  width: 100dvw;
  height: 120px;
  background-image: url(${props => props.$url});
  background-size: contain;
  background-repeat: repeat-x;
  opacity: var(${props => props.$opacity});
`;

export const Clouds = styled.span<{ $url: string; $opacity: string }>`
  display: inline-block;
  width: 100%;
  height: 200px;
  background-image: url(${props => props.$url});
  background-repeat: repeat-x;
  opacity: var(${props => props.$opacity});

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

export const Moon = styled(Image)<{ $opacity: string }>`
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: var(${props => props.$opacity});
`;

export const Cars = styled.span<{ $url: string; $opacity: string }>`
  background-image: url(${props => props.$url});
  background-repeat: repeat-x;
  position: absolute;
  z-index: -1;
  top: 240px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: var(${props => props.$opacity});

  animation: pan-cars 50s linear infinite;
  will-change: background-position;
  @keyframes pan-cars {
    0% {
      background-position: 0% 0%;
    }

    100% {
      background-position: 1554px 0%;
    }
  }
`;

export const LightShadow = styled.span<{ $opacity: string }>`
  position: relative;
  top: -28px;
  display: inline-block;
  width: 100%;
  height: 7px;
  background-color: oklch(50.81% 0.191 29.05);
  mix-blend-mode: darken;
  filter: blur(10px);
  opacity: var(${props => props.$opacity});
`;

export const DarkShadow = styled.span<{ $opacity: string }>`
  position: relative;
  top: -28px;
  display: inline-block;
  width: 100%;
  height: 7px;
  background-color: oklch(15.29% 0.034 262.59 / 85%);
  mix-blend-mode: darken;
  filter: blur(10px);
  opacity: var(${props => props.$opacity});
`;

export const DrakHeroImageWapper = styled.div`
  grid-area: hero-image;
`;

export const LightHeroImageWapper = styled.div`
  grid-area: hero-image;
`;
