'use client';

import { useContext } from 'react';
import DarkHeroImage from './DarkHeroImage';
import { HeroImageWrapper, RootWrapper } from './HeroImage.style';
import LightHeroImage from './LightHeroImage';
import { ThemeContext } from '../Theme/ThemeProvider';
import { Theme } from 'type';

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
        {isDarkTheme ? (
          <DarkHeroImage $isVisible={true} />
        ) : (
          <LightHeroImage $isVisible={true} />
        )}
      </HeroImageWrapper>
    </RootWrapper>
  );
}

export default HeroImage;
