'use client';

import { useContext } from 'react';
import { Theme } from 'type';
import DarkHeroImage from './DarkHeroImage';
import { HeroImageWrapper, RootWrapper } from './HeroImage.style';
import LightHeroImage from './LightHeroImage';
import { ThemeContext } from '../Theme/ThemeProvider';

interface HeroImageProps {
  initialTheme?: Theme;
}

function HeroImage({ initialTheme }: HeroImageProps) {
  const { colorTheme } = useContext(ThemeContext);
  const currentTheme = colorTheme || initialTheme || 'light';
  const isDarkTheme = currentTheme === 'dark';

  return (
    <RootWrapper suppressHydrationWarning={true}>
      <HeroImageWrapper>
        <DarkHeroImage $isVisible={isDarkTheme} />
        <LightHeroImage $isVisible={isDarkTheme} />
      </HeroImageWrapper>
    </RootWrapper>
  );
}

export default HeroImage;
