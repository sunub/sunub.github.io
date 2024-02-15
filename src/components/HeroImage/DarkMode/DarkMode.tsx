import * as Styled from "../HeroImage.style";
import DarkBridge from "@/public/assets/hero-image__dark-bridge.avif";
import DarkHeroImage from "@/public/assets/hero-image__dark-image.avif";

async function DarkMode() {
  return (
    <Styled.Picture>
      <Styled.DarkHeroImage
        src={DarkHeroImage}
        alt={"메인 히어로 이미지중 메인"}
        style={{
          zIndex: 2,
          width: "100%",
          height: "auto",
        }}
      />
      <Styled.Shadow />
    </Styled.Picture>
  );
}

export default DarkMode;
