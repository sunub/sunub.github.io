import { memo } from "react";
import { 
  DrakHeroImageWapper, 
  DarkShadow, 
} from "./HeroImage.style";

import { DarkCloudHeroImage } from "./DarkHeroImage/DarkHeroCloudImage";
import { DarkCarHeroImage } from "./DarkHeroImage/DarkCarsImage";
import { DarkBridgeHeroImage } from "./DarkHeroImage/DarkBridgeImage";

interface DarkHeroImageProps {
  $isVisible: boolean;
}

const DarkHeroImage = memo(({ $isVisible }: DarkHeroImageProps) => {
  const shadowStyle = { opacity: 'var(--color-dark-heroimage)' } as React.CSSProperties;

  return (
    <DrakHeroImageWapper $isVisible={$isVisible}>
      <DarkCloudHeroImage />
      <DarkCarHeroImage />
      <DarkBridgeHeroImage />
      <DarkShadow style={shadowStyle} />
    </DrakHeroImageWapper>
  );
});

DarkHeroImage.displayName = 'DarkHeroImage';

export default DarkHeroImage;