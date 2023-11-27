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

  React.useEffect(() => {
    if (
      !imageRef.current ||
      !canvasRef.current ||
      !lightCloudsRef.current ||
      !darkCloudsRef.current
    )
      return;
    const canvas = new Canvas(canvasRef.current, imageRef.current);

    if (theme.colorMode) {
      theme.colorMode === "light"
        ? canvas.draw(lightCloudsRef.current)
        : canvas.draw(darkCloudsRef.current);
    }
  }, [theme.colorMode]);

  return (
    <div
      className={styles["hero-image__wrapper"]}
      style={{ animationDuration: "600ms", animationDelay: "200ms" }}
    >
      <LightHeroImage
        imageRef={imageRef}
        cloudsRef={lightCloudsRef}
        theme={theme.colorMode}
      />
      <DarkHeroImage cloudsRef={darkCloudsRef} theme={theme.colorMode} />
      <canvas className={styles["hero-image__canvas"]} ref={canvasRef} />
    </div>
  );
}
