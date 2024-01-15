"use client";

import Canvas from "./Canvas.helper";
import React from "react";
import LightHeroImage from "./LightHeroImage";
import DarkHeroImage from "./DarkHeroImage";
import styled from "styled-components";

type Theme = {
  colorMode?: string | null;
  setColorMode?: (value: string) => void;
};

const Wrapper = styled.div`
  grid-area: main-hero-image;

  display: grid;
  grid: [hero-image] 1fr / [hero-image] 1fr;
  position: relative;

  justify-items: center;
  align-items: center;
  object-fit: contain;

  & > img {
    transition: opacity 350ms ease 0s;
  }
`;

const StyledCanvas = styled.canvas`
  grid-area: hero-image;
  z-index: 2;

  width: 100%;
  height: 100%;
  padding-left: 25px;
  padding-right: 25px;

  max-width: 883px;
`;

export default function HeroImage() {
  const imageRef = React.useRef<HTMLImageElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const lightCloudsRef = React.useRef<HTMLImageElement>(null);
  const darkCloudsRef = React.useRef<HTMLImageElement>(null);
  const lightCarsRef = React.useRef<HTMLImageElement>(null);
  const darkCarsRef = React.useRef<HTMLImageElement>(null);

  // React.useEffect(() => {
  //   if (
  //     !imageRef.current ||
  //     !canvasRef.current ||
  //     !lightCloudsRef.current ||
  //     !darkCloudsRef.current ||
  //     !lightCarsRef.current ||
  //     !darkCarsRef.current
  //   )
  //     return;
  //   const canvas = new Canvas(canvasRef.current, imageRef.current);

  //   if (theme.colorMode) {
  //     theme.colorMode === "light"
  //       ? canvas.draw(lightCloudsRef.current, lightCarsRef.current)
  //       : canvas.draw(darkCloudsRef.current, darkCarsRef.current);
  //   }
  // }, [theme.colorMode]);

  return (
    <Wrapper style={{ animationDuration: "600ms", animationDelay: "200ms" }}>
      {/* <LightHeroImage
        imageRef={imageRef}
        cloudsRef={lightCloudsRef}
        carsRef={lightCarsRef}
        theme={theme.colorMode}
      />
      <DarkHeroImage
        cloudsRef={darkCloudsRef}
        carsRef={darkCarsRef}
        theme={theme.colorMode}
      /> */}
      <StyledCanvas ref={canvasRef} />
    </Wrapper>
  );
}
