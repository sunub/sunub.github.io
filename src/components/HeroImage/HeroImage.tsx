"use client";

import {
  DarkShadow,
  Bridge,
  LightShadow,
  RootWrapper,
  HeroImageWrapper,
  AnimatedImage,
  AnimatedCarImage,
  CloudWrapper,
  HeroImageWapper,
} from "./HeroImage.style";
import { memo, useContext } from "react";
import { ThemeContext } from "../Theme/ThemeProvider";
import LightCloudImage from "@/public/assets/clouds.avif";
import LightCarImage from "@/public/assets/cars.avif";
import DarkCloudImage from "@/public/assets/dark_clouds.avif";
import DarkCarImage from "@/public/assets/dark_cars.avif";

const LIGHT_CLOUD_WIDTH = 1039;
const LIGHT_CAR_WIDTH = 1554;

const LightHeroImage = memo(() => {
  return (
    <HeroImageWapper>
      <CloudWrapper>
        <AnimatedImage
          src={LightCloudImage}
          alt="Animated light clouds"
          $opacity="--color-light-heroimage"
          $imageWidth={LIGHT_CLOUD_WIDTH}
          priority
          style={{ left: "0px" }}
        />
      </CloudWrapper>

      <AnimatedCarImage
        src={LightCarImage}
        alt="Animated light car"
        $opacity="--color-light-heroimage"
        $imageWidth={LIGHT_CAR_WIDTH}
        priority
        style={{ left: "0px" }}
      />
      <Bridge $url="/assets/bridge.avif" $opacity="--color-light-heroimage" />
      <LightShadow $opacity="--color-light-heroimage" />
    </HeroImageWapper>
  );
});

const DarkHeroImage = memo(() => {
  return (
    <HeroImageWapper>
      <CloudWrapper>
        <AnimatedImage
          src={DarkCloudImage}
          alt="Animated dark clouds"
          $opacity="--color-dark-heroimage"
          $imageWidth={LIGHT_CLOUD_WIDTH}
          priority
          style={{ left: "0px" }}
        />
      </CloudWrapper>

      <AnimatedCarImage
        src={DarkCarImage}
        alt="Animated dark car"
        $opacity="--color-dark-heroimage"
        $imageWidth={LIGHT_CAR_WIDTH}
        priority
        style={{ left: "0px" }}
      />
      <Bridge
        $url="/assets/dark_bridge.avif"
        $opacity="--color-dark-heroimage"
      />
      <DarkShadow $opacity="--color-dark-heroimage" />
    </HeroImageWapper>
  );
});

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
