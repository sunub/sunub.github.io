"use client";

import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Picture = styled.picture`
  display: contents;
  max-width: 100%;
`;

const BaseImage = styled(Image)`
  grid-area: hero-image;
  position: relative;
  z-index: 2;
  transition: opacity 350ms ease 0s;

  display: block;
  top: 0px;
  left: 0px;
  pointer-events: none;

  height: auto;

  background: linear-gradient(
    15deg,
    oklch(97.14% 0.011 31.07 / 71%) 4%,
    oklch(82.9% 0.09573202406959574 31.111262465234525 / 68%) 53%
  );
`;

const Clouds = styled(Image)`
  grid-area: hero-image;

  height: auto;

  transform: translateX(20px) translateY(-20px) scale(0.9);
`;

function LightHeroImage({
  imageRef,
  cloudsRef,
  theme,
}: {
  imageRef: React.RefObject<HTMLImageElement>;
  cloudsRef: React.RefObject<HTMLImageElement>;
  theme: any;
}): React.ReactNode {
  return (
    <Picture>
      <BaseImage
        ref={imageRef}
        src={"/assets/hero_image--light-base-scene.avif?format=avif"}
        alt="base hero image"
        quality={75}
        width={883}
        height={449}
        sizes="100vw"
        style={{
          opacity: theme === "light" ? 1 : 0,
          objectFit: "cover",
        }}
        priority={true}
      />
      <Clouds
        ref={cloudsRef}
        src={"/assets/hero_image--light-clouds.avif?format=avif"}
        alt="light cloud hero image"
        quality={75}
        width={883}
        height={449}
        sizes="100vw"
        style={{
          opacity: `${theme === "light" ? 1 : 0}`,
          objectFit: "cover",
        }}
        priority={true}
      />
    </Picture>
  );
}

export default LightHeroImage;
