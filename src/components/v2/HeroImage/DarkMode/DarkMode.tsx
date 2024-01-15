import * as Styled from "../HeroImage.style";

import bridge from "@/public/image/hero-image__dark-bridge.avif";
import clouds from "@/public/image/hero-image__dark-clouds.avif";
import softClouds from "@/public/image/hero-image__dark-clouds-soft.avif";
import baseImage from "@/public/image/hero-image__dark-base-scene.avif";
import { Theme } from "type";

function DarkMode({ colorTheme }: { colorTheme: Theme }) {
  return (
<<<<<<< HEAD
    <Styled.Picture>
      <Styled.DarkHeroImage
        $colorTheme={colorTheme}
        src={clouds}
        alt={"메인 히어로 이미지중 구름"}
        style={{
          zIndex: 3,
        }}
      />
      <Styled.DarkHeroImage
        $colorTheme={colorTheme}
        src={softClouds}
        alt={"메인 히어로 이미지중 뒷 배경 구름"}
        style={{
=======
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
>>>>>>> refs/remotes/origin/sunub
          filter: "blur(5px)",
          mixBlendMode: "soft-light",
          zIndex: 1,
        }}
      />
<<<<<<< HEAD
      <Styled.DarkHeroImage
        $colorTheme={colorTheme}
        src={baseImage}
        alt={"메인 히어로 이미지중 메인"}
      />
      <Styled.DarkHeroImage
        $colorTheme={colorTheme}
        src={bridge}
        alt={"메인 히어로 이미지중 메인"}
        $mirrored={true}
      />
    </Styled.Picture>
=======
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
>>>>>>> refs/remotes/origin/sunub
  );
}

export default DarkMode;
