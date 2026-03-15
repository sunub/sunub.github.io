import { memo } from "react";
import {
  Bridge,
  Cars,
  Clouds,
  CloudsFrame,
  HeroImageSurface,
  HeroShadow,
} from "./HeroImage.style";

const HeroImage = memo(() => {
  return (
    <HeroImageSurface>
      <CloudsFrame>
        <Clouds />
      </CloudsFrame>
      <Bridge />
      <Cars />
      <HeroShadow />
    </HeroImageSurface>
  );
});

HeroImage.displayName = "HeroImage";

export default HeroImage;
