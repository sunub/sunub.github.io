'use client';

import React from 'react';
import * as Styled from '../Wave.style';
import gsap from 'gsap';
import { CustomEase, Linear } from 'gsap/all';

const path = {
  step1: {
    end: 'M 0 32.5 V 208 H 938 L 937.5 30 C 933.833 28.1667 922.7 24.5 907.5 24.5 C 822 24.5 847.5 79 700 79 C 552.5 79 418 3.9998 353.5 4 C 306.746 4.0001 215.533 36.74 188.5 25.5002 Q 90.502 -0.459 30.914 21.241 Z',
    mid: 'M 0 112 V 208 H 938 V 73 C 925.833 90.6667 892.1 126 854.5 126 C 816.9 126 756.833 120.667 731.5 118 C 685.833 113.667 585.2 105 548 105 C 501.5 105 481.5 52.5 428 52.5 C 374.5 52.5 284.5 76 243 76 C 201.5 76 190.5 50 133 50 C 87 50 25.1667 91.3333 0 82 Z',
    front:
      'M0 134V208.5H938V130.5C907.833 144 803 171 746.5 171C651.5 171 583 116.5 531 116.5C498 116.5 473.5 135.5 416 135.5C358.5 135.5 268.5 93 195.5 93C122.5 93 32.5 138 19 138C8.2 138 1.83333 135.333 0 134Z',
  },
  step2: {
    end: 'M 0 32.5 V 208 H 938 L 937.5 30 C 933.833 28.1667 927.454 15.151 901.131 15.648 C 822 24.5 819.185 52.401 706.942 62.83 C 573.84 71.273 400.01 19.126 354.318 12.173 C 306.746 4.0001 220.53 6.355 187.742 16.571 Q 92.913 47.073 33.782 37.48 Z',
    mid: 'M 0 112 V 208 H 938 V 91.111 C 906.925 65.584 898.763 91.236 851.844 85.278 C 801.985 74.912 769.893 113.321 727.908 126.15 C 689.505 137.466 585.2 105 546.603 80.789 C 505.82 62.086 480.168 83.074 425.404 80.789 C 381.057 83.074 297.105 52.758 254.829 47.871 C 209.655 46.928 177.007 73.746 127.645 74.804 C 88.39 76.078 37.086 113.39 1.468 92.011 Z',
    front:
      'M 0 134 V 208.5 H 938 V 130.5 C 907.833 144 784 93 747 114 C 651 173 583 116.5 533 135 C 500 151 458 95 414 95 C 347 99 235 160 197 137 C 122.5 93 38 126 20 126 C 7 128 1.8333 135.333 0 134 Z',
  },
  step3: {
    end: 'M 0 32.5 V 208 H 938 L 937.5 30 C 933.833 28.1667 927.454 15.151 904.618 28.511 C 886.507 39.949 794.997 -5.806 711.113 18.978 C 628.183 45.668 412.753 11.351 353.653 26.603 C 302.179 40.901 224.015 45.667 192.559 32.322 Q 96.283 -10.574 38.136 14.21 Z',
    mid: 'M 0 112 V 208 H 938 V 73 C 925.833 90.6667 892.401 129.8 852.695 136.466 C 816.538 139.841 756.833 120.667 731.5 118 C 685.833 113.667 591.736 114.18 562.298 111.973 C 501.5 105 486.308 40.549 441.008 31.502 C 394.827 28.835 305.572 76.963 260.237 78.258 C 220.083 76.963 191.223 28.278 133.117 30.336 C 94.631 32.668 25.1667 91.3333 0 152 Z',
    front:
      'M 0 134 V 208.5 H 938 V 130.5 C 907.833 144 813 154 751 154 C 676 158 586 102 542 100 C 495 103 478 149 422 150 C 359 148 271 76 207 76 C 122 78 36 142 21 142 C 8 143 1.8333 135.333 0 134 Z',
  },
};

function WaveSvg({ ...delegated }) {
  const frontWaveRef = React.useRef(null);
  const midWaveRef = React.useRef(null);
  const endWaveRef = React.useRef(null);

  React.useEffect(() => {
    if (frontWaveRef.current == null) return;
    gsap.registerPlugin(CustomEase);

    const waveTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });
    const midTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });
    midTimeline.timeScale(1.25);

    const endWaveTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
      yoyo: true,
    });
    endWaveTimeline.timeScale(1.25);

    waveTimeline.set(frontWaveRef.current, {
      attr: { d: path.step1.front },
      ease: 'sine.inOut',
    });
    waveTimeline.to(frontWaveRef.current, {
      duration: 3,
      attr: { d: path.step2.front },
      ease: CustomEase.create('custom', 'M0,0 C0,0 1,0.4 1,0.4 '),
    });
    waveTimeline.to(frontWaveRef.current, {
      duration: 3,
      attr: { d: path.step3.front },
      ease: 'none',
    });

    midTimeline.set(midWaveRef.current, {
      attr: { d: path.step1.mid },
    });
    midTimeline.to(midWaveRef.current, {
      duration: 5,
      attr: { d: path.step3.mid },
      ease: 'none',
    });
    midTimeline.to(midWaveRef.current, {
      duration: 3,
      attr: { d: path.step2.mid },
      ease: CustomEase.create('custom', 'M0,0 C0,0 1,0.4 1,0.4 '),
    });

    endWaveTimeline.set(endWaveRef.current, {
      attr: { d: path.step1.end },
    });
    endWaveTimeline.to(endWaveRef.current, {
      duration: 6,
      attr: { d: path.step3.end },
      ease: 'none',
    });
    endWaveTimeline.to(endWaveRef.current, {
      duration: 3,
      attr: { d: path.step1.end },
      ease: CustomEase.create('custom', 'M0,0 C0,0 1,0.4 1,0.4 '),
    });
  }, []);

  return (
    <Styled.WaveSvgWrapper key={'light-wave-svg'} {...delegated}>
      <Styled.WaveSvg
        preserveAspectRatio="none"
        width="938"
        height="208"
        viewBox="0 0 938 197"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={path.step1.end}
          fill="url(#paint0_linear_103_748)"
          fillOpacity="0.85"
          ref={endWaveRef}
        />
        <path
          d={path.step1.mid}
          fill="url(#paint1_linear_103_748)"
          ref={midWaveRef}
        />
        <path
          d={path.step1.front}
          fill="var(--color-frontWave)"
          ref={frontWaveRef}
        />
        <defs>
          <linearGradient
            id="paint0_linear_103_748"
            x1="250.5"
            y1="-140"
            x2="236.5"
            y2="196"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.457674" stopColor="var(--color-midStart)" />
            <stop offset="0.590708" stopColor="var(--color-midStop)" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_103_748"
            x1="720"
            y1="46"
            x2="720"
            y2="196"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.133996" stopColor="var(--color-endStart)" />
            <stop offset="0.690268" stopColor="var(--color-endStop)" />
          </linearGradient>
        </defs>
      </Styled.WaveSvg>
    </Styled.WaveSvgWrapper>
  );
}

export default WaveSvg;
