import * as Styled from "../HeroImage.style";

import bridge from "@/public/image/hero-image__dark-bridge.avif";
import clouds from "@/public/image/hero-image__dark-clouds.avif";
import softClouds from "@/public/image/hero-image__dark-clouds-soft.avif";
import baseImage from "@/public/image/hero-image__dark-base-scene.avif";
import { Theme } from "type";

function DarkMode({ colorTheme }: { colorTheme: Theme }) {
  return (
    <picture style={{ display: "contents" }}>
      <Styled.HeroImage
        src={clouds}
        alt={"메인 히어로 이미지중 구름"}
        style={{
          opacity: `${colorTheme === "dark" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
          zIndex: 3,
        }}
      />
      <Styled.HeroImage
        src={softClouds}
        alt={"메인 히어로 이미지중 뒷 배경 구름"}
        style={{
          opacity: `${colorTheme === "dark" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
          filter: "blur(5px)",
          mixBlendMode: "soft-light",
          zIndex: 1,
        }}
      />
      <Styled.HeroImage
        src={baseImage}
        alt={"메인 히어로 이미지중 메인"}
        style={{
          opacity: `${colorTheme === "dark" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
        }}
      />
      <Styled.HeroImage
        src={bridge}
        alt={"메인 히어로 이미지중 메인"}
        $mirrored={true}
        style={{
          opacity: `${colorTheme === "dark" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
        }}
      />
    </picture>
  );
}

export default DarkMode;
