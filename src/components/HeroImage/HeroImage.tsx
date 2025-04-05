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
import LightCloudImage from "@/public/assets/clouds.avif";
import DarckCloudImage from "@/public/assets/dark_clouds.avif";
import LightBridgeImage from "@/public/assets/bridge.avif";
import DarkBridgeImage from "@/public/assets/dark_bridge.avif";
import LightCarsImage from "@/public/assets/cars.avif";
import DarkCarsImage from "@/public/assets/dark_cars.avif";

function LightHeroImage() {
  return (
    <LightHeroImageWapper>
      <Clouds $url={LightCloudImage} $opacity="--color-light-heroimage" />
      <Bridge $url={LightBridgeImage} $opacity="--color-light-heroimage" />
      <Cars $url={LightCarsImage} $opacity="--color-light-heroimage" />
      <Moon
        src={"/assets/hero-image__light-moon.avif"}
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
      <Clouds $url={DarckCloudImage} $opacity="--color-dark-heroimage" />
      <Bridge $url={DarkBridgeImage} $opacity="--color-dark-heroimage" />
      <Cars $url={DarkCarsImage} $opacity="--color-dark-heroimage" />
      <Moon
        src={"/assets/dark_moon.avif"}
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
