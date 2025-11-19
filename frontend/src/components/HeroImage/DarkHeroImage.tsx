import { memo, useMemo } from "react";
import { getComputedStyles } from "@/utils/getComputedStyles";
import { DrakHeroImageWapper, Clouds, Bridge, Cars, DarkShadow } from "./HeroImage.style";

interface DarkHeroImageProps {
  $isVisible: boolean;
}

const DarkHeroImage = memo(({ $isVisible }: DarkHeroImageProps) => {
  const cloudStyles = useMemo(() =>
    getComputedStyles({
      cloudsUrl: 'url(/assets/dark_clouds.avif)',
      cloudsOpacity: 'var(--color-dark-heroimage)'
    }), []
  );

  const bridgeStyles = useMemo(() =>
    getComputedStyles({
      bridgeUrl: 'url(/assets/dark_bridge.avif)',
      bridgeOpacity: 'var(--color-dark-heroimage)'
    }), []
  );

  const carsStyles = useMemo(() =>
    getComputedStyles({
      carsUrl: 'url(/assets/dark_cars.avif)',
      carsOpacity: 'var(--color-dark-heroimage)'
    }), []
  );

  const shadowStyles = useMemo(() =>
    getComputedStyles({
      shadowOpacity: 'var(--color-dark-heroimage)'
    }), []
  );

  return (
    <DrakHeroImageWapper $isVisible={$isVisible}>
      <Clouds style={cloudStyles} />
      <Bridge style={bridgeStyles} />
      <Cars style={carsStyles} />
      <DarkShadow style={shadowStyles} />
    </DrakHeroImageWapper>
  );
});

DarkHeroImage.displayName = 'DarkHeroImage';

export default DarkHeroImage;