"use client";

import styles from "./HeroImage.module.css";
import { BACKGROUNDS_LIGHT, BACKGROUNDS_DARK } from "./HeroImage.constant";
import Canvas from "./Canvas.helper";
import Image from "next/image";
import React from "react";
import { ThemeContext } from "@/components/Theme/Provider";

type Theme = {
  colorMode?: string | null;
  setColorMode?: (value: string) => void;
};
export default function HeroImage() {
  const theme: Theme = React.useContext(ThemeContext);

  const imageRef = React.useRef<HTMLImageElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const cloudsRef = React.useRef<HTMLImageElement>(null);
  const wrapperRef = React.useRef<HTMLImageElement>(null);

  const REF_KEYS: any = {
    image: imageRef,
    clouds: cloudsRef,
  };

  React.useEffect(() => {
    if (
      !imageRef.current ||
      !canvasRef.current ||
      !cloudsRef.current ||
      !wrapperRef.current
    )
      return;
    const canvas = new Canvas(
      canvasRef.current,
      imageRef.current,
      wrapperRef.current,
    );

    canvas.draw(cloudsRef.current);
  }, [theme.colorMode]);

  return (
    <div ref={wrapperRef} className={styles["hero-image__wrapper"]}>
      {theme.colorMode === "light"
        ? BACKGROUNDS_LIGHT.map((background) => {
            return (
              <Image
                ref={background.ref ? REF_KEYS[`${background.ref}`] : null}
                className={styles[`${background.className}`]}
                key={background.key}
                src={background.src}
                alt={background.alt}
                width={883}
                height={325}
                priority={true}
                quality={75}
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
            );
          })
        : BACKGROUNDS_DARK.map((background) => {
            return (
              <Image
                ref={background.ref ? REF_KEYS[`${background.ref}`] : null}
                className={styles[`${background.className}`]}
                key={background.key}
                src={background.src}
                alt={background.alt}
                width={883}
                height={325}
                priority={true}
                quality={75}
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
            );
          })}
      <canvas ref={canvasRef} className={styles["hero-image__canvas"]} />
    </div>
  );
}
