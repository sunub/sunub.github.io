"use client";

import styled from "styled-components";
import Canvas from "./Canvas.helper";
import React from "react";
import { ThemeContext } from "@/components/Theme/Provider";
import DarkHeroImage from "./DarkHeroImage";
import LightHeroImage from "./LightHeroImage";

type Theme = {
  colorMode?: string | null;
  setColorMode?: (value: string) => void;
};

const Wrapper = styled.div`
  animation-name: showUp;
  animation-fill-mode: backwards;

  display: grid;
  grid: [hero-image] 1fr / [hero-image] 1fr;
  position: relative;

  justify-items: center;
  align-items: center;
  object-fit: contain;

  @keyframes showUp {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const StyledCanvas = styled.canvas`
  grid-area: hero-image;
  z-index: 60;

  width: 90%;
  height: 100%;

  max-width: 883px;
`;

export default function HeroImage() {
  const theme: Theme = React.useContext(ThemeContext);

  const imageRef = React.useRef<HTMLImageElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const lightCloudsRef = React.useRef<HTMLImageElement>(null);
  const darkCloudsRef = React.useRef<HTMLImageElement>(null);
  const wrapperRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (
      !imageRef.current ||
      !canvasRef.current ||
      !lightCloudsRef.current ||
      !darkCloudsRef.current ||
      !wrapperRef.current
    )
      return;
    const canvas = new Canvas(
      canvasRef.current,
      imageRef.current,
      wrapperRef.current,
    );

    theme.colorMode === "light"
      ? canvas.draw(lightCloudsRef.current)
      : canvas.draw(darkCloudsRef.current);
  }, [theme.colorMode]);

  return (
    <Wrapper
      style={{ animationDuration: "600ms", animationDelay: "200ms" }}
      ref={wrapperRef}
    >
      <LightHeroImage
        imageRef={imageRef}
        cloudsRef={lightCloudsRef}
        theme={theme.colorMode}
      />
      <DarkHeroImage
        imageRef={imageRef}
        cloudsRef={darkCloudsRef}
        theme={theme.colorMode}
      />
      <StyledCanvas ref={canvasRef} />
    </Wrapper>
  );
}
