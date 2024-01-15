<<<<<<< HEAD
<<<<<<< HEAD
import Image from "next/image";
import React from "react";
import styles from "./LightHeroImage.module.css";
=======
"use client";

import Image from "next/image";
import React from "react";
=======
"use client";

import Image from "next/image";
import React from "react";
>>>>>>> refs/remotes/origin/sunub
import styled from "styled-components";
import LightBaseImage from "public/assets/hero_image--light-base-scene.avif";
import LightCloudImage from "public/assets/hero_image--light-clouds.avif";
import LightCars from "public/assets/hero_image--light-cars.avif";

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

  background: linear-gradient(
    15deg,
    oklch(97.14% 0.011 31.07 / 71%) 4%,
    oklch(82.9% 0.09573202406959574 31.111262465234525 / 68%) 53%
  );
`;

const Clouds = styled(Image)`
  grid-area: hero-image;

  transform: translateX(20px) translateY(-20px) scale(0.9);
`;

const Cars = styled(Image)`
  grid-area: hero-image;

  display: none;
  z-index: 2;
`;
<<<<<<< HEAD
>>>>>>> dev-v2
=======
>>>>>>> refs/remotes/origin/sunub

function LightHeroImage({
  imageRef,
  cloudsRef,
<<<<<<< HEAD
<<<<<<< HEAD
=======
  carsRef,
>>>>>>> dev-v2
=======
  carsRef,
>>>>>>> refs/remotes/origin/sunub
  theme,
}: {
  imageRef: React.RefObject<HTMLImageElement>;
  cloudsRef: React.RefObject<HTMLImageElement>;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  carsRef: React.RefObject<HTMLImageElement>;
>>>>>>> refs/remotes/origin/sunub
  theme: any;
}): React.ReactNode {
  return (
    <Picture>
      <BaseImage
        ref={imageRef}
        src={LightBaseImage}
        alt="base hero image"
        quality={75}
<<<<<<< HEAD
        width={883}
        height={449}
=======
  carsRef: React.RefObject<HTMLImageElement>;
  theme: any;
}): React.ReactNode {
  return (
    <Picture>
      <BaseImage
        ref={imageRef}
        src={LightBaseImage}
        alt="base hero image"
        quality={75}
>>>>>>> dev-v2
=======
>>>>>>> refs/remotes/origin/sunub
        sizes="100vw"
        style={{
          opacity: theme === "light" ? 1 : 0,
          objectFit: "cover",
        }}
<<<<<<< HEAD
<<<<<<< HEAD
        loading={"lazy"}
=======
        priority={true}
>>>>>>> refs/remotes/origin/sunub
      />
      <Clouds
        ref={cloudsRef}
        src={LightCloudImage}
        alt="light cloud hero image"
        quality={75}
<<<<<<< HEAD
        width={883}
        height={449}
=======
        priority={true}
      />
      <Clouds
        ref={cloudsRef}
        src={LightCloudImage}
        alt="light cloud hero image"
        quality={75}
>>>>>>> dev-v2
=======
>>>>>>> refs/remotes/origin/sunub
        sizes="100vw"
        style={{
          opacity: `${theme === "light" ? 1 : 0}`,
          objectFit: "cover",
        }}
<<<<<<< HEAD
<<<<<<< HEAD
        loading={"lazy"}
      />
    </picture>
=======
        priority={true}
      />
=======
        priority={true}
      />
>>>>>>> refs/remotes/origin/sunub
      <Cars
        ref={carsRef}
        src={LightCars}
        alt="light cars hero image"
        quality={75}
        sizes="100vw"
        style={{
          opacity: `${theme === "light" ? 1 : 0}`,
          objectFit: "cover",
        }}
        priority={true}
      />
    </Picture>
<<<<<<< HEAD
>>>>>>> dev-v2
=======
>>>>>>> refs/remotes/origin/sunub
  );
}

export default LightHeroImage;
