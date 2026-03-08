import { memo } from "react";
import {
  Bridge,
  Cars,
  Clouds,
  CloudsFrame,
  LightHeroImageWapper,
  LightShadow,
} from "./HeroImage.style";

const LightHeroImage = memo(() => {
  return (
    <LightHeroImageWapper>
      <CloudsFrame>
        <Clouds />
      </CloudsFrame>
      <Bridge />
      <Cars />
      <LightShadow />
    </LightHeroImageWapper>
  );
});

LightHeroImage.displayName = "LightHeroImage";

export default LightHeroImage;
