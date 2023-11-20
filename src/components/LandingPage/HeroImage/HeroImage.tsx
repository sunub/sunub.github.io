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
      wrapperRef.current
    );
    canvas.draw(cloudsRef.current);
  });

  return (
    <div ref={wrapperRef} className={styles["hero-image__wrapper"]}>
      {BACKGROUNDS.map((background) => (
        <Image
          ref={background.ref ? REF_KEYS[`${background.ref}`] : null}
          className={styles[`${background.className}`]}
          key={background.key}
          src={background.src}
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
      <CanvasCompo ref={canvasRef} className={styles["hero-image__canvas"]} />
    </div>
  );
}
