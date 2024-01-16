import * as Styled from "../HeroImage.style";

import bridge from "@/public/assets/hero-image__dark-bridge.avif";
import clouds from "@/public/assets/hero-image__dark-clouds.avif";
import baseImage from "@/public/assets/hero-image__dark-base-scene.avif";
import softClouds from "@/public/assets/hero-image__dark-soft-clouds.avif";
import { Theme } from "type";

function DarkMode({ colorTheme }: { colorTheme: Theme }) {
  return (
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
          filter: "blur(5px)",
          mixBlendMode: "soft-light",
          zIndex: 1,
        }}
      />
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
  );
}

export default DarkMode;
