"use client";

import styles from "./HeroImage.module.css";
import Canvas from "./Canvas.helper";
import React from "react";
import { ThemeContext } from "@/components/Theme/Provider";
import DarkHeroImage from "./DarkHeroImage";
import LightHeroImage from "./LightHeroImage";

type Theme = {
  colorMode?: string | null;
  setColorMode?: (value: string) => void;
};
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
    <div ref={wrapperRef} className={styles["hero-image__wrapper"]}>
      <LightHeroImage
        styles={styles}
        imageRef={imageRef}
        cloudsRef={lightCloudsRef}
        opacity={theme.colorMode === "light" ? 1 : 0}
      />
      <DarkHeroImage
        styles={styles}
        imageRef={imageRef}
        cloudsRef={darkCloudsRef}
        opacity={theme.colorMode === "dark" ? 1 : 0}
      />
      <canvas ref={canvasRef} className={styles["hero-image__canvas"]} />
    </div>
  );
}
