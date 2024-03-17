'use client';

import React from 'react';
import * as Styled from '../HeroImage.style';
import LightHeroImage from '@/public/assets/hero-image__light-image.avif';

function LightMode() {
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
