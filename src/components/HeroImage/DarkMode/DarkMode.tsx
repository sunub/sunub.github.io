import * as Styled from "../HeroImage.style";

import bridge from "@/public/assets/hero-image__dark-bridge.avif";
import clouds from "@/public/assets/hero-image__dark-clouds.avif";
import baseImage from "@/public/assets/hero-image__dark-image.avif";
import softClouds from "@/public/assets/hero-image__soft-dark-clouds.avif";
import { Theme } from "type";

function DarkMode({ colorTheme }: { colorTheme: Theme }) {
  return (
    <Styled.Picture>
      {/* <Styled.DarkHeroImage
        $colorTheme={colorTheme}
        priority
        src={clouds}
        alt={"메인 히어로 이미지중 구름"}
        width={1600}
        height={546}
        style={{
          zIndex: 3,
        }}
      />
      <Styled.DarkHeroImage
        $colorTheme={colorTheme}
        priority
        src={softClouds}
        width={1600}
        height={546}
        alt={"메인 히어로 이미지중 뒷 배경 구름"}
        style={{
          filter: "blur(5px)",
          mixBlendMode: "soft-light",
          zIndex: 1,
        }}
      /> */}
      <Styled.DarkHeroImage
        $colorTheme={colorTheme}
        priority
        src={baseImage}
        width={1600}
        height={546}
        alt={"메인 히어로 이미지중 메인"}
        style={{
          zIndex: 2,
        }}
      />
      <Styled.DarkHeroImage
        $colorTheme={colorTheme}
        width={1600}
        height={546}
        priority
        src={bridge}
        alt={"메인 히어로 이미지중 메인"}
        $mirrored={true}
      />
    </Styled.Picture>
  );
}

export default DarkMode;
