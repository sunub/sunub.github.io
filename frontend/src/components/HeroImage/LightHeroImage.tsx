import { memo } from "react";
import { LightHeroImageWapper, Clouds, Bridge, Cars, LightShadow } from "./HeroImage.style";

interface LightHeroImageProps {
  $isVisible: boolean;
}

const LightHeroImage = memo(({ $isVisible }: LightHeroImageProps) => {
  const cloudStyle = { '--clouds-opacity': 'var(--color-light-heroimage)' } as React.CSSProperties;
  const bridgeStyle = { '--bridge-opacity': 'var(--color-light-heroimage)' } as React.CSSProperties;
  const carsStyle = { '--cars-opacity': 'var(--color-light-heroimage)' } as React.CSSProperties;
  const shadowStyle = { opacity: 'var(--color-light-heroimage)' } as React.CSSProperties;

  return (
    <LightHeroImageWapper $isVisible={$isVisible}>
      <Clouds $bgUrl="/assets/clouds.avif" style={cloudStyle} />
      <Bridge $bgUrl="/assets/bridge.avif" style={bridgeStyle} />
      <Cars $bgUrl="/assets/cars.avif" style={carsStyle} />
      <LightShadow style={shadowStyle} />
    </LightHeroImageWapper>
  );
});

LightHeroImage.displayName = "LightHeroImage";

export default LightHeroImage;