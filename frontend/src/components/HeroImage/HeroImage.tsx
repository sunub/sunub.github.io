'use client';

import { useContext } from 'react';
import DarkHeroImage from './DarkHeroImage';
import { HeroImageWrapper, RootWrapper } from './HeroImage.style';
import LightHeroImage from './LightHeroImage';
import { ThemeContext } from '../Theme/ThemeProvider';

function HeroImage() {
  const { colorTheme } = useContext(ThemeContext);
  const isDarkTheme = colorTheme === 'dark';

  return (
    <RootWrapper suppressHydrationWarning={true}>
      <HeroImageWrapper>
        <LightHeroImage $isVisible={!isDarkTheme} />
        <DarkHeroImage $isVisible={isDarkTheme} />
      </HeroImageWrapper>
    </RootWrapper>
  );
}

export default HeroImage;
