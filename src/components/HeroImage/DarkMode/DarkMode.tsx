import * as Styled from "../HeroImage.style";
import { getDarkHeroImageURL } from "@/db/firebase.mjs";

async function DarkMode() {
  const { darkHeroImage, darkBridge } = await getDarkHeroImageURL();

  return (
    <Styled.Picture>
      <Styled.DarkHeroImage
        src={`${darkHeroImage}?format=image/avif&width=1600&height=546&quality=70`}
        width={1600}
        height={546}
        alt={"메인 히어로 이미지중 메인"}
        style={{
          zIndex: 2,
          width: "100%",
          height: "auto",
        }}
      />
      <Styled.DarkHeroImage
        src={`${darkBridge}?format=image/avif&width=1600&height=546&quality=70`}
        width={1600}
        height={546}
        alt={"메인 히어로 이미지중 메인"}
        $mirrored={true}
        style={{
          zIndex: 2,
          width: "100%",
          height: "auto",
        }}
      />
    </Styled.Picture>
  );
}

export default DarkMode;
