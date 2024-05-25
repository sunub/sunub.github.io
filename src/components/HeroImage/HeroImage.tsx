"use client";

import React from "react";
import * as Styled from "./HeroImage.style";
import LightMode from "./LightMode";
import DarkMode from "./DarkMode";
import styled from "styled-components";
import Image from "next/image";

const ImageBlock = styled.span`
  display: inline-block;
  width: 100dvw;
  height: 120px;
  background-image: url("/assets/bridge.png");
  background-size: contain;
  background-repeat: repeat-x;
`;

const ImageCloud = styled.span`
  display: inline-block;
  width: 100%;
  height: 262px;
  background-image: url("/assets/clouds.png");
  background-repeat: repeat-x;

  transform: translate(-50% 0%);
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

const ImageSun = styled(Image)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

const ImageCars = styled.span`
  background-image: url("/assets/cars.png");
  background-repeat: repeat-x;
  position: absolute;
  z-index: -1;
  top: 293px;
  left: 0px;
  width: 100%;
  height: 100%;

  transform: translate(-50% 0%);
  animation: pan 50s linear infinite;
  will-change: background-position;
`;

function HeroImage() {
  return (
    <Styled.RootWrapper suppressHydrationWarning={true}>
      <Styled.HeroImageWrapper>
        <ImageCloud />
        <ImageBlock />
        <ImageCars />
        <ImageSun
          src={"/assets/hero-image__light-moon.png"}
          width={2000}
          height={966}
          alt={"clouds"}
          sizes="100vw"
          quality={70}
          priority={true}
        />
        {/* <LightMode />
        <DarkMode /> */}
      </Styled.HeroImageWrapper>
    </Styled.RootWrapper>
  );
}

export default HeroImage;
