"use client";

import React from "react";
import * as Styled from "./HeroImage.style";

import styled from "styled-components";
import Image from "next/image";

const Bridge = styled.span<{ $url: string; $opacity: string }>`
  display: inline-block;
  width: 100dvw;
  height: 120px;
  background-image: url(${(props) => props.$url});
  background-size: contain;
  background-repeat: repeat-x;
  opacity: var(${(props) => props.$opacity});
`;

const Clouds = styled.span<{ $url: string; $opacity: string }>`
  display: inline-block;
  width: 100%;
  height: 262px;
  background-image: url(${(props) => props.$url});
  background-repeat: repeat-x;
  opacity: var(${(props) => props.$opacity});

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

const Moon = styled(Image)<{ $opacity: string }>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: var(${(props) => props.$opacity});
`;

const Cars = styled.span<{ $url: string; $opacity: string }>`
  background-image: url(${(props) => props.$url});
  background-repeat: repeat-x;
  position: absolute;
  z-index: -1;
  top: 304px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: var(${(props) => props.$opacity});

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

const LightShadow = styled.span<{ $opacity: string }>`
  position: relative;
  top: -28px;
  display: inline-block;
  width: 100%;
  height: 7px;
  background-color: oklch(50.81% 0.191 29.05);
  mix-blend-mode: darken;
  filter: blur(10px);
  opacity: var(${(props) => props.$opacity});
`;

const DarkShadow = styled.span<{ $opacity: string }>`
  position: relative;
  top: -28px;
  display: inline-block;
  width: 100%;
  height: 7px;
  background-color: oklch(15.29% 0.034 262.59 / 85%);
  mix-blend-mode: darken;
  filter: blur(10px);
  opacity: var(${(props) => props.$opacity});
`;

const DrakHeroImageWapper = styled.div`
  grid-area: hero-image;
`;

const LightHeroImageWapper = styled.div`
  grid-area: hero-image;
`;

function LightHeroImage() {
  return (
    <LightHeroImageWapper>
      <Clouds $url="/assets/clouds.png" $opacity="--color-light-heroimage" />
      <Bridge $url="/assets/bridge.png" $opacity="--color-light-heroimage" />
      <Cars $url="/assets/cars.png" $opacity="--color-light-heroimage" />
      <Moon
        src={"/assets/hero-image__light-moon.png"}
        width={2000}
        height={966}
        alt={"clouds"}
        sizes="100vw"
        quality={70}
        priority={true}
        $opacity="--color-light-heroimage"
      />
      <LightShadow $opacity="--color-light-heroimage" />
    </LightHeroImageWapper>
  );
}

function DarkHeroImage() {
  return (
    <DrakHeroImageWapper>
      <Clouds
        $url="/assets/dark_clouds.png"
        $opacity="--color-dark-heroimage"
      />
      <Bridge
        $url="/assets/dark_bridge.png"
        $opacity="--color-dark-heroimage"
      />
      <Cars $url="/assets/dark_cars.png" $opacity="--color-dark-heroimage" />
      <Moon
        src={"/assets/dark_moon.png"}
        width={2000}
        height={966}
        alt={"clouds"}
        sizes="100vw"
        quality={70}
        priority={true}
        $opacity="--color-dark-heroimage"
      />
      <DarkShadow $opacity="--color-dark-heroimage" />
    </DrakHeroImageWapper>
  );
}

function HeroImage() {
  return (
    <Styled.RootWrapper suppressHydrationWarning={true}>
      <Styled.HeroImageWrapper>
        <LightHeroImage />
        <DarkHeroImage />
      </Styled.HeroImageWrapper>
    </Styled.RootWrapper>
  );
}

export default HeroImage;
