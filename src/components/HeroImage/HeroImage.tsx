"use client";

import {
  Cars,
  Clouds,
  LightHeroImageWapper,
  DrakHeroImageWapper,
  Moon,
  DarkShadow,
  Bridge,
  LightShadow,
  RootWrapper,
  HeroImageWrapper,
} from "./HeroImage.style";
import { useContext } from "react";
import { ThemeContext } from "../Theme/ThemeProvider";

function LightHeroImage() {
  return (
    <LightHeroImageWapper>
      <Clouds $url="/assets/clouds.avif" $opacity="--color-light-heroimage" />
      <Bridge $url="/assets/bridge.avif" $opacity="--color-light-heroimage" />
      <Cars $url="/assets/cars.avif" $opacity="--color-light-heroimage" />
      <Moon
        src={"/assets/hero-image__light-moon.avif"}
        width={2000}
        height={966}
        alt={"clouds"}
        sizes="100vw"
        quality={70}
        priority
        fetchPriority="high"
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
        $url="/assets/dark_clouds.avif"
        $opacity="--color-dark-heroimage"
      />
      <Bridge
        $url="/assets/dark_bridge.avif"
        $opacity="--color-dark-heroimage"
      />
      <Cars $url="/assets/dark_cars.avif" $opacity="--color-dark-heroimage" />
      <Moon
        src={"/assets/dark_moon.avif"}
        width={2000}
        height={966}
        alt={"clouds"}
        sizes="100vw"
        quality={70}
        priority
        fetchPriority="high"
        $opacity="--color-dark-heroimage"
      />
      <DarkShadow $opacity="--color-dark-heroimage" />
    </DrakHeroImageWapper>
  );
}

function HeroImage() {
  const { colorTheme } = useContext(ThemeContext);
  const isDarkTheme = colorTheme === "dark";

  return (
    <RootWrapper suppressHydrationWarning={true}>
      <HeroImageWrapper>
        {isDarkTheme ? <DarkHeroImage /> : <LightHeroImage />}
      </HeroImageWrapper>
    </RootWrapper>
  );
}

export default HeroImage;
