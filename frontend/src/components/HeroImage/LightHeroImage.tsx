import { memo } from "react";
import { LightHeroImageWapper, LightShadow } from "./HeroImage.style";
import { LightCloudHeroImage } from "./LightHeroImage/LightHeroCloudImage";
import { LightCarHeroImage } from "./LightHeroImage/LightCarsImage";
import { LightBridgeHeroImage } from "./LightHeroImage/LightBridgeImage";

interface LightHeroImageProps {
  $isVisible: boolean;
}

const LightHeroImage = memo(({ $isVisible }: LightHeroImageProps) => {
  const shadowStyle = { opacity: 'var(--color-light-heroimage)' } as React.CSSProperties;

  return (
    <LightHeroImageWapper $isVisible={$isVisible}>
      <LightCloudHeroImage />
      <LightCarHeroImage />
      <LightBridgeHeroImage />
      <LightShadow style={shadowStyle} />
    </LightHeroImageWapper>
  );
});

LightHeroImage.displayName = "LightHeroImage";

export default LightHeroImage;