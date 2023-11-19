"use client";

import styles from "./HeroImage.module.css";
import { BACKGROUNDS } from "./HeroImage.constant";
import Canvas from "./Canvas.helper";
import Image from "next/image";
import styled from "styled-components";
import React from "react";

const CanvasCompo = styled.canvas``;

export default function HeroImage() {
  const imageRef = React.useRef<HTMLImageElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const cloudsRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (!imageRef.current || !canvasRef.current || !cloudsRef.current) return;
    const canvas = new Canvas(
      canvasRef.current,
      imageRef.current,
      cloudsRef.current
    );
    canvas.draw(cloudsRef.current);
  });

  return (
    <div className={styles["hero-image__wrapper"]}>
      {BACKGROUNDS.map((background) => (
        <Image
          ref={imageRef}
          className={styles["hero-image__image"]}
          key={background.alt}
          src={`${background.src}?format=webp`}
          alt={background.alt}
          width={884}
          height={325}
          priority={true}
          quality={100}
          style={{
            width: "auto",
            height: "auto",
            zIndex: `${background.zIndex}`,
          }}
        />
      ))}
      <Image
        ref={cloudsRef}
        className={styles["hero-image__image-clouds"]}
        key={"background sky clouds scene"}
        src={`/assets/background_clouds.png?format=png`}
        alt={"background sky clouds scene"}
        width={890}
        height={325}
        priority={true}
        quality={100}
        style={{
          width: "auto",
          height: "auto",
          zIndex: "40",
        }}
      />
      <CanvasCompo ref={canvasRef} className={styles["hero-image__image"]} />
    </div>
  );
}
