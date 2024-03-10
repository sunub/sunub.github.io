'use client';

import React from 'react';
import * as Styled from '../HeroImage.style';
import LightHeroImage from '@/public/assets/hero-image__light-image.avif';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

function LightMode() {
  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('#blog-main__hero-image', {
      scrollTrigger: {
        trigger: '#blog-main__wave-svg-img',
        toggleActions: 'restart none reverse pause',
        start: 'top 50%',
        end: 'bottom 50%',
        scrub: true,
        markers: true,
      },
      y: 100,
      duration: 1,
    });
  }, []);
  return (
    <React.Fragment>
      <Styled.Picture>
        <Styled.LightHeroImage
          id="blog-main__hero-image"
          src={LightHeroImage}
          alt={'메인 히어로 이미지중 메인'}
          style={{
            zIndex: 2,
            width: '100%',
            height: 'auto',
          }}
        />
        <Styled.Shadow />
      </Styled.Picture>
    </React.Fragment>
  );
}

export default LightMode;
