"use client";

import Image from "next/image";
import React from "react";
import styled from "styled-components";

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

  opacity: ${({ $theme }) => ($theme === "dark" ? 1 : 0)};
  background: linear-gradient(
    1deg,
    oklch(65.58% 0.064 263.98) 11%,
    oklch(34.74% 0.071 244.49 / 77%) 55%
  );
`;

const Clouds = styled(Image)<{ $theme: any }>`
  grid-area: hero-image;

  opacity: ${({ $theme }) => ($theme === "dark" ? 1 : 0)};
  transform: translateX(18px) translateY(-20px) scale(0.9);
`;

function DarkHeroImage({
  cloudsRef,
  theme,
}: {
  cloudsRef: React.RefObject<HTMLImageElement>;
  theme: any;
}): React.ReactNode {
  return (
    <Picture>
      <BaseImage
        src={"/assets/hero_image--dark-base-scene.avif?format=avif"}
        alt="dark base hero image"
        width={883}
        height={449}
        quality={75}
        sizes="100vw"
        style={{
          opacity: theme === "dark" ? 1 : 0,
          objectFit: "cover",
        }}
        $theme={theme}
        loading="lazy"
      />
      <Clouds
        ref={cloudsRef}
        src={"/assets/hero_image--dark-clouds.avif?format=avif"}
        alt="dark clouds hero image"
        width={883}
        height={449}
        quality={75}
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        $theme={theme}
        loading="lazy"
      />
    </Picture>
  );
}

export default DarkHeroImage;
