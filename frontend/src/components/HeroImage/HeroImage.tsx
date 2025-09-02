'use client';

import { memo, useContext } from 'react';
import {
  Bridge,
  Cars,
  Clouds,
  DarkShadow,
  DrakHeroImageWapper,
  HeroImageWrapper,
  LightHeroImageWapper,
  LightShadow,
  RootWrapper,
} from './HeroImage.style';
import { ThemeContext } from '../Theme/ThemeProvider';

const LightHeroImage = memo(() => {
  return (
    <LightHeroImageWapper>
      <Clouds $url="/assets/clouds.avif" $opacity="--color-light-heroimage" />
      <Bridge $url="/assets/bridge.avif" $opacity="--color-light-heroimage" />
      <Cars $url="/assets/cars.avif" $opacity="--color-light-heroimage" />
      <LightShadow $opacity="--color-light-heroimage" />
    </LightHeroImageWapper>
  );
});

const DarkHeroImage = memo(() => {
  return (
    <DrakHeroImageWapper>
      <Clouds $url="/assets/dark_clouds.avif" $opacity="--color-dark-heroimage" />
      <Bridge $url="/assets/dark_bridge.avif" $opacity="--color-dark-heroimage" />
      <Cars $url="/assets/dark_cars.avif" $opacity="--color-dark-heroimage" />
      <DarkShadow $opacity="--color-dark-heroimage" />
    </DrakHeroImageWapper>
  );
});

LightHeroImage.displayName = 'LightHeroImage';
DarkHeroImage.displayName = 'DarkHeroImage';

function HeroImage() {
  const { colorTheme } = useContext(ThemeContext);
  const isDarkTheme = colorTheme === 'dark';

  return (
    <RootWrapper suppressHydrationWarning={true}>
      <HeroImageWrapper>{isDarkTheme ? <DarkHeroImage /> : <LightHeroImage />}</HeroImageWrapper>
    </RootWrapper>
  );
}

export default HeroImage;
