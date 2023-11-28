"use client";

import Image from "next/image";
import React from "react";
import styled from "styled-components";
import DarkBaseImage from "public/assets/hero_image--dark-base-scene.avif";
import DarkCloudImage from "public/assets/hero_image--dark-clouds.avif";
import DarkCars from "public/assets/hero_image--dark-cars.avif";

const Picture = styled.picture`
  display: contents;
  max-width: 100%;
`;

const BaseImage = styled(Image)<{ $theme: any }>`
  grid-area: hero-image;
  position: relative;
  z-index: 2;
  transition: opacity 350ms ease 0s;

  display: block;
  top: 0px;
  left: 0px;
  pointer-events: none;

  height: auto;

  opacity: ${({ $theme }) => ($theme === "dark" ? 1 : 0)};
  background: linear-gradient(
    1deg,
    oklch(65.58% 0.064 263.98) 11%,
    oklch(34.74% 0.071 244.49 / 77%) 55%
  );
`;

const Clouds = styled(Image)<{ $theme: any }>`
  grid-area: hero-image;

  height: auto;

  opacity: ${({ $theme }) => ($theme === "dark" ? 1 : 0)};
  transform: translateX(18px) translateY(-20px) scale(0.9);
`;

const Cars = styled(Image)`
  grid-area: hero-image;

  display: none;
  z-index: 2;
`;

function DarkHeroImage({
  cloudsRef,
  carsRef,
  theme,
}: {
  cloudsRef: React.RefObject<HTMLImageElement>;
  carsRef: React.RefObject<HTMLImageElement>;
  theme: any;
}): React.ReactNode {
  return (
    <Picture>
      <BaseImage
        src={DarkBaseImage}
        alt="dark base hero image"
        quality={75}
        sizes="100vw"
        style={{
          opacity: theme === "dark" ? 1 : 0,
          objectFit: "cover",
        }}
        $theme={theme}
        priority={true}
      />
      <Clouds
        ref={cloudsRef}
        src={DarkCloudImage}
        alt="dark clouds hero image"
        quality={75}
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        $theme={theme}
        priority={true}
      />
      <Cars
        ref={carsRef}
        src={DarkCars}
        alt="dark cars hero image"
        quality={75}
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        priority={true}
      />
    </Picture>
  );
}

export default DarkHeroImage;
