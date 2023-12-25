"use client";

import Image from "next/image";
import bridge from "@/public/v2_assets/hero-image__bridge.avif";
import wave from "@/public/v2_assets/wave.avif";
import moon from "@/public/v2_assets/moon.avif";
import clouds from "@/public/v2_assets/hero-image__clouds.avif";
import cars from "@/public/v2_assets/hero-image__cars.avif";
import baseImage from "@/public/v2_assets/hero-image__base-scene.avif";
import frontWave from "@/public/v2_assets/hero-image__front_wave.avif";
import midWave from "@/public/v2_assets/hero-image__mid_wave.avif";
import backWave from "@/public/v2_assets/hero-image__back_wave.avif";
import waveBird from "@/public/v2_assets/hero-image__wave_bird.avif";
import styled from "styled-components";

const MirroredImage = styled(Image)`
  grid-area: "hero-image";
  width: 100%;
  object-fit: cover;
  transform: scaleY(-1) translateY(-75%) scaleY(0.5);
  filter: blur(10px);
`;

function HeaderImage() {
  return (
    <>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          grid: "[hero-image] 1fr / [hero-image] 1fr",
        }}
      >
        <Image
          src={clouds}
          alt={"메인 히어로 이미지중 구름"}
          priority={true}
          width={1024}
          height={429}
          quality={100}
          sizes="100vw"
          style={{
            width: "100%",
            objectFit: "cover",
            gridArea: "hero-image",
          }}
        />
        <Image
          src={cars}
          alt={"메인 히어로 이미지중 자동차"}
          priority={true}
          width={1024}
          height={429}
          quality={100}
          sizes="100vw"
          style={{
            width: "100%",
            objectFit: "cover",
            gridArea: "hero-image",
          }}
        />
        <Image
          src={baseImage}
          alt={"메인 히어로 이미지중 메인"}
          priority={true}
          width={1024}
          height={429}
          quality={100}
          sizes="100vw"
          style={{
            width: "100%",
            objectFit: "cover",
            gridArea: "hero-image",
          }}
        />
        <MirroredImage
          src={bridge}
          alt={"메인 히어로 이미지중 메인"}
          priority={true}
          width={1024}
          height={429}
          quality={100}
          sizes="100vw"
          style={{
            width: "100%",
            objectFit: "cover",
            gridArea: "hero-image",
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          grid: "[hero-wave] 1fr / [hero-wave] 1fr",
          position: "relative",
        }}
      >
        <Image
          src={backWave}
          alt={"메인 히어로 이미지중 뒷 배경 웨이브"}
          priority={true}
          width={1024}
          height={219}
          quality={100}
          sizes="100vw"
          style={{
            width: "100%",
            objectFit: "cover",
            gridArea: "hero-wave",
            zIndex: 1,
          }}
        />
        <Image
          src={midWave}
          alt={"메인 히어로 이미지중 중간 배경 웨이브"}
          priority={true}
          width={1024}
          height={219}
          quality={100}
          sizes="100vw"
          style={{
            width: "100%",
            objectFit: "cover",
            gridArea: "hero-wave",
            zIndex: 2,
          }}
        />
        <Image
          src={waveBird}
          alt={"메인 히어로 이미지중 중간 새 아이콘"}
          priority={true}
          width={1024}
          height={219}
          quality={100}
          sizes="100vw"
          style={{
            width: "100%",
            objectFit: "cover",
            gridArea: "hero-wave",
            zIndex: 3,
          }}
        />
        <Image
          src={frontWave}
          alt={"메인 히어로 이미지중 앞 배경 웨이브"}
          priority={true}
          width={1024}
          height={219}
          quality={100}
          sizes="100vw"
          style={{
            width: "100%",
            objectFit: "cover",
            gridArea: "hero-wave",
            zIndex: 3,
          }}
        />
      </div>
    </>
  );
}

export default HeaderImage;
