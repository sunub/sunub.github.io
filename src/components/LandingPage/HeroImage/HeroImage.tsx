"use client";

import styles from "./HeroImage.module.css";
import { BACKGROUNDS } from "./HeroImage.constant";
import Image from "next/image";
import styled from "styled-components";
import React from "react";

const CanvasCompo = styled.canvas``;

export default function HeroImage() {
  const imageRef = React.useRef<HTMLImageElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

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
            height: "auto",
            zIndex: `${background.zIndex}`,
          }}
        />
      ))}
      <CanvasCompo ref={canvasRef} className={styles["hero-image__image"]} />
    </div>
  );
}
