import React from 'react';
import * as Styled from './HeroImage.style';
import LightMode from './LightMode';
import DarkMode from './DarkMode';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/all';

function HeroImage() {
  return (
    <Styled.RootWrapper suppressHydrationWarning={true}>
      <Styled.HeroImageWrapper id="blog-main__heroimage-wrapper">
        <LightMode />
        <DarkMode />
      </Styled.HeroImageWrapper>
    </Styled.RootWrapper>
  );
}

export default HeroImage;
