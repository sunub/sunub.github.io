'use client';

import React from 'react';
import * as Styled from './Wave.style';
import WaveSvg from './WaveSvg';
import WaveBird from './WaveBird';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

function Wave() {
  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // gsap.to('#blog-main__header-wrapper', {
    //   scrollTrigger: {
    //     trigger: '#blog-main__wave-svg-img',
    //     toggleActions: 'restart none reverse pause',
    //     start: 'top 40%',
    //     end: 'bottom 50%',
    //     scrub: true,
    //     markers: true,
    //   },
    //   backdropFilter: 'blur(10px)',
    //   background: 'oklch(93.91% 0.026 32.24 / 80%)',
    //   ease: 'circ',
    //   duration: 1,
    // });
  }, []);

  return (
    <Styled.WaveWrapper>
      <WaveSvg id={'blog-main__wave-svg-img'} />
      <WaveBird />
    </Styled.WaveWrapper>
  );
}

export default Wave;
