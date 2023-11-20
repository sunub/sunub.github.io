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
  const wrapperRef = React.useRef<HTMLImageElement>(null);

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
      wrapperRef.current
    );
    canvas.draw(cloudsRef.current);
  });

  return (
    <div ref={wrapperRef} className={styles["hero-image__wrapper"]}>
      {BACKGROUNDS.map((background) => (
        <Image
          ref={imageRef}
          className={styles["hero-image__image"]}
          key={background.alt}
          src={`${background.src}?format=webp`}
          alt={background.alt}
          width={883}
          height={325}
          priority={true}
          quality={100}
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
      ))}
      <Image
        className={styles["hero-image__image-frame"]}
        key={"background sky clouds frame"}
        src={`/assets/hero_image-frame.png?format=png`}
        alt={"background sky clouds frame"}
        width={883}
        height={325}
        priority={true}
        quality={100}
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
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
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: "40",
        }}
      />
      <CanvasCompo ref={canvasRef} className={styles["hero-image__canvas"]} />
    </div>
  );
}
