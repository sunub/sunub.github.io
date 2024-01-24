import * as Styled from "../HeroImage.style";

import bridge from "@/public/assets/hero-image__dark-bridge.avif";
import baseImage from "@/public/assets/hero-image__dark-image.avif";
import { Theme } from "type";

function DarkMode({ colorTheme }: { colorTheme: Theme }) {
  return (
    <Styled.Picture>
      <Styled.DarkHeroImage
        $colorTheme={colorTheme}
        loading="lazy"
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
        loading="lazy"
        src={bridge}
        alt={"메인 히어로 이미지중 메인"}
        $mirrored={true}
      />
    </Styled.Picture>
  );
}

export default DarkMode;
