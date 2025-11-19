import { memo, useMemo } from "react";
import { getComputedStyles } from "@/utils/getComputedStyles";
import { LightHeroImageWapper, Clouds, Bridge, Cars, LightShadow } from "./HeroImage.style";

interface LightHeroImageProps {
  $isVisible: boolean;
}

const LightHeroImage = memo(({ $isVisible }: LightHeroImageProps) => {
  const cloudStyles = useMemo(() => 
    getComputedStyles({
      cloudsUrl: 'url(/assets/clouds.avif)',
      cloudsOpacity: 'var(--color-light-heroimage)'
    }), []
  );
  
  const bridgeStyles = useMemo(() =>
    getComputedStyles({
      bridgeUrl: 'url(/assets/bridge.avif)',
      bridgeOpacity: 'var(--color-light-heroimage)'
    }), []
  );
  
  const carsStyles = useMemo(() =>
    getComputedStyles({
      carsUrl: 'url(/assets/cars.avif)',
      carsOpacity: 'var(--color-light-heroimage)'
    }), []
  );
  
  const shadowStyles = useMemo(() =>
    getComputedStyles({
      shadowOpacity: 'var(--color-light-heroimage)'
    }), []
  );
  
  return (
    <LightHeroImageWapper $isVisible={$isVisible}>
      <Clouds style={cloudStyles} />
      <Bridge style={bridgeStyles} />
      <Cars style={carsStyles} />
      <LightShadow style={shadowStyles} />
    </LightHeroImageWapper>
  );
});

LightHeroImage.displayName = "LightHeroImage";

export default LightHeroImage;