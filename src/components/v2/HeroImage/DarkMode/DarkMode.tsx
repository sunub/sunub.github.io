import * as Styled from "../HeroImage.style";

import React from "react";
import { Theme } from "type";
import { ThemeContext } from "@/components/Theme/Provider";
import bridge from "@/public/v2_assets/hero-image-dark__bridge.avif";
import clouds from "@/public/v2_assets/hero-image-dark__clouds.avif";
import cars from "@/public/v2_assets/hero-image-dark__cars.avif";
import baseImage from "@/public/v2_assets/hero-image-dark__base-scene.avif";
import frontWave from "@/public/v2_assets/hero-image-dark__front_wave.avif";
import midWave from "@/public/v2_assets/hero-image-dark__mid_wave.avif";
import backWave from "@/public/v2_assets/hero-image-dark__back_wave.avif";
import waveBird from "@/public/v2_assets/hero-image-dark__wave_bird.avif";
import Wave from "./Wave";

function DarkMode() {
  const theme = {
    colorMode: "light",
  };

  return (
    <React.Fragment>
      <Styled.HeroImage
        src={clouds}
        alt={"메인 히어로 이미지중 구름"}
        style={{
          opacity: `${theme.colorMode === "dark" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
        }}
      />
      <Styled.HeroImage
        src={cars}
        alt={"메인 히어로 이미지중 자동차"}
        style={{
          opacity: `${theme.colorMode === "dark" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
        }}
      />
      <Styled.HeroImage
        src={baseImage}
        alt={"메인 히어로 이미지중 메인"}
        style={{
          opacity: `${theme.colorMode === "dark" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
        }}
      />
      <Styled.HeroImage
        src={bridge}
        alt={"메인 히어로 이미지중 메인"}
        $mirrored={true}
        style={{
          opacity: `${theme.colorMode === "dark" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
        }}
      />
    </React.Fragment>
  );
}

function DarkModeWave() {
  const theme: Theme = React.useContext(ThemeContext);

  return (
    <React.Fragment>
      <Styled.WaveImage
        src={waveBird}
        alt={"메인 히어로 이미지중 중간 새 아이콘"}
        style={{
          opacity: `${theme.colorMode === "dark" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
          zIndex: 4,
        }}
      />
      <Wave
        style={{
          opacity: `${theme.colorMode === "dark" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
          zIndex: 3,
        }}
      />
    </React.Fragment>
  );
}

export { DarkMode, DarkModeWave };
