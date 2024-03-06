'use client';

import React from 'react';
import * as Styled from '../Wave.style';
import WaveBird from '../WaveBird';
import gsap from 'gsap';

const path = {
  step1: {
    end: 'M0 32.5V208H938L937.5 30C933.833 28.1667 922.7 24.5 907.5 24.5C822 24.5 847.5 79 700 79C552.5 79 418 3.99984 353.5 4C306.746 4.00011 245 25.5002 188.5 25.5002C132 25.5002 37 -4.5 0 32.5Z',
    mid: 'M0 112V208H938V73C925.833 90.6667 892.1 126 854.5 126C816.9 126 756.833 120.667 731.5 118C685.833 113.667 585.2 105 548 105C501.5 105 481.5 52.5 428 52.5C374.5 52.5 284.5 76 243 76C201.5 76 190.5 50 133 50C87 50 25.1667 91.3333 0 112Z',
    front:
      'M0 134V208.5H938V130.5C907.833 144 803 171 746.5 171C651.5 171 583 116.5 531 116.5C498 116.5 473.5 135.5 416 135.5C358.5 135.5 268.5 93 195.5 93C122.5 93 32.5 138 19 138C8.2 138 1.83333 135.333 0 134Z',
  },
  step2: {
    end: 'M0 33.0731V206.944H938V29.5155C846.5 72.5 810.916 10.812 662.344 -2.08616e-05C506.25 -11.3595 426.797 33.0143 302.344 51C177.891 68.9857 73.125 33.0731 0 33.0731Z',
    mid: 'M749.5 98C835.562 58.0514 923.938 111.901 938 111.901V206.944H-502V126.093C-428.88 126.093 -421.87 48.5684 -294.58 48.5684C-218.64 48.5684 -70.98 97.9785 -30.203 71.6965C23.806 36.8897 -28.094 92.9917 160.344 71.6965C315.583 54.1516 390.969 189.859 450.734 141.5C529.318 77.9149 641.922 147.935 749.5 98Z',
    front:
      'M0 134V208.5H938V130.5C907.833 144 803 116.5 746.5 116.5C651.5 116.5 583 134 531 134C498 134 473.5 93 416 93C358.5 93 268.5 155 195.5 155C122.5 155 32.5 138 19 138C8.2 138 1.83333 135.333 0 134Z',
  },
  step3: {
    end: 'M0 33.0733V206.944H938V29.5157C844.192 9.34089 810.916 87.7181 662.344 76.9062C506.25 65.5467 426.797 -15.389 302.344 2.59669C177.891 20.5824 73.125 33.0733 0 33.0733Z',
    mid: 'M187.734 157.5C96.5 157.5 37.5 152.041 0 133.563V208H1440V171.018C1366.88 171.018 1262.11 123.247 1137.66 99.7766C1013.2 76.3066 933.75 153.107 777.656 167.93C621.562 182.753 593 41.2688 491 73.9998C383.15 108.608 308.818 157.5 187.734 157.5Z',
    front:
      'M0 134V208.5H938V130.5C907.833 144 803 171 746.5 171C651.5 171 583 93 531 93C498 93 473.5 134 416 134C358.5 134 268.5 93 195.5 93C122.5 93 32.5 138 19 138C8.2 138 1.83333 135.333 0 134Z',
  },
};

const frontWavePath = `
'M0 134V208.5H938V130.5C907.833 144 803 ${116 - 171} 746.5 ${116 - 171}C651.5 171 583 93 531 93C498 93 473.5 134 416 134C358.5 134 268.5 93 195.5 93C122.5 93 32.5 138 19 138C8.2 138 1.83333 135.333 0 134Z'
`;

function WaveSvg({ ...delegated }) {
  const frontWaveRef = React.useRef(null);
  const midWaveRef = React.useRef(null);
  const endWaveRef = React.useRef(null);

  // React.useEffect(() => {
  //   if (
  //     frontWaveRef.current === null ||
  //     midWaveRef.current === null ||
  //     endWaveRef.current === null
  //   )
  //     return;

  //   const tl = gsap
  //     .timeline({
  //       paused: true,
  //       repeat: -1,
  //       ease: 'linear',
  //       yoyo: true,
  //     })
  //     .set(frontWaveRef.current, {
  //       attr: { d: path.step1.front },
  //     })
  //     .set(midWaveRef.current, {
  //       attr: { d: path.step1.mid },
  //     })
  //     .set(endWaveRef.current, {
  //       attr: { d: path.step1.end },
  //     });

  //   tl.to(frontWaveRef.current, {
  //     attr: { d: path.step2.front },
  //     duration: 3,
  //   })
  //     .to(midWaveRef.current, {
  //       attr: { d: path.step2.mid },
  //       duration: 1.5,
  //     })
  //     .to(endWaveRef.current, {
  //       attr: { d: path.step2.end },
  //       duration: 3,
  //     });

  //   tl.to(frontWaveRef.current, {
  //     attr: { d: path.step3.front },
  //     duration: 3,
  //   })
  //     .to(midWaveRef.current, {
  //       attr: { d: path.step3.mid },
  //       duration: 1.5,
  //       delay: 0.5,
  //     })
  //     .to(endWaveRef.current, {
  //       attr: { d: path.step3.end },
  //       duration: 3,
  //       delay: 0.5,
  //     });

  //   tl.play();
  // }, []);

  React.useEffect(() => {
    if (frontWaveRef.current === null) return;

    const tl = gsap.timeline({
      paused: true,
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.15,
    });

    tl.to(frontWaveRef.current, {
      attr: { d: path.step2.front },
      ease: 'linear',
      duration: 3,
    }).to(frontWaveRef.current, {
      attr: { d: path.step3.front },
      ease: 'linear',
      duration: 3,
    });

    tl.play();
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
          d="M0 32.5V208H938L937.5 30C933.833 28.1667 922.7 24.5 907.5 24.5C822 24.5 847.5 79 700 79C552.5 79 418 3.99984 353.5 4C306.746 4.00011 245 25.5002 188.5 25.5002C132 25.5002 37 -4.5 0 32.5Z"
          fill="url(#paint0_linear_103_748)"
          fillOpacity="0.85"
          ref={endWaveRef}
        />
        <path
          d="M0 112V208H938V73C925.833 90.6667 892.1 126 854.5 126C816.9 126 756.833 120.667 731.5 118C685.833 113.667 585.2 105 548 105C501.5 105 481.5 52.5 428 52.5C374.5 52.5 284.5 76 243 76C201.5 76 190.5 50 133 50C87 50 25.1667 91.3333 0 112Z"
          fill="url(#paint1_linear_103_748)"
          ref={midWaveRef}
        />
        <path
          d="M0 134V208.5H938V130.5C907.833 144 803 171 746.5 171C651.5 171 583 116.5 531 116.5C498 116.5 473.5 135.5 416 135.5C358.5 135.5 268.5 93 195.5 93C122.5 93 32.5 138 19 138C8.2 138 1.83333 135.333 0 134Z"
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
      <WaveBirdIcon />
    </Styled.WaveSvgWrapper>
  );
}

function WaveBirdIcon() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '57px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
      }}
    >
      <Styled.WaveBirdSvg
        width="48"
        height="52"
        viewBox="0 0 48 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_136_769)">
          <path
            d="M10.3594 0H35.5858C38.6143 0 41.0697 2.48024 41.0697 5.53976V44.3181C41.0697 46.7659 39.1054 48.75 36.6826 48.75H19.1338C16.7108 48.75 14.7465 46.7659 14.7465 44.3181V13.6626C11.987 9.82616 10.3594 5.1051 10.3594 0Z"
            fill="var(--color-birdBody)"
          />
          <path
            d="M22.4241 45.4261C22.4241 35.6357 27.5992 27.699 37.291 27.699C39.4846 27.699 41.0697 30.965 41.0697 31.5768V44.6967C41.0697 46.6939 38.9818 48.75 36.9455 48.75H22.4241V45.4261Z"
            fill="var(--color-birdBeak)"
          />
          <path
            d="M3.77861 23.2671H18.0369C21.0657 23.2671 23.5209 25.7473 23.5209 28.807V40.9945H14.7466C8.68914 40.9945 3.77861 36.0339 3.77861 29.9149V23.2671Z"
            fill="var(--color-birdBeak)"
          />
          <path
            d="M1.58502 24.375H21.3274C24.3561 24.375 26.8113 26.8552 26.8113 29.9149V48.75H12.553C6.49555 48.75 1.58502 43.7894 1.58502 37.6705V24.375Z"
            fill="var(--color-birdWing)"
          />
          <path
            d="M26.6079 13.5718C26.6079 18.9741 24.2432 23.3535 21.3262 23.3535C18.4092 23.3535 16.0445 18.9741 16.0445 13.5718C16.0445 8.16956 18.4092 3.79016 21.3262 3.79016C24.2432 3.79016 26.6079 8.16956 26.6079 13.5718Z"
            fill="var(--color-birdEyeball)"
          />
          <path
            d="M24.8473 13.5718C24.8473 17.9918 23.2709 21.575 21.3262 21.575C19.3815 21.575 17.8051 17.9918 17.8051 13.5718C17.8051 9.15176 19.3815 5.5686 21.3262 5.5686C23.2709 5.5686 24.8473 9.15176 24.8473 13.5718Z"
            fill="var(--color-birdBody)"
          />
          <path
            d="M28.6422 11.1041C28.6422 5.68746 33.5926 3.97219 36.0676 3.79163H39.7803C46.4632 3.79163 48.0456 9.38886 48.0013 12.1875V18.0104H28.6422V11.1041Z"
            fill="var(--color-birdEyeball)"
          />
          <path
            d="M33.9456 23.5625C29.5969 23.5625 28.6422 20.177 28.6422 17.6041H44.5525C44.5525 22.6145 41.0169 23.5625 39.2492 23.5625H33.9456Z"
            fill="var(--color-birdBeak)"
          />
          <path
            d="M31.6806 47.4579C10.0903 45.627 4.29289 31.2772 4.09298 24.3312H1.57411V38.0626C2.62964 46.5424 9.05075 48.7427 12.1294 48.7828H36.8383C39.9089 48.7828 40.9164 46.2132 41.0364 44.9284C40.5566 45.892 35.0391 47.7427 31.6806 47.4579Z"
            fill="var(--color-birdShadow)"
          />
        </g>
        <defs>
          <clipPath id="clip0_136_769">
            <rect width="48" height="52" fill="var(--color-birdEyeball)" />
          </clipPath>
        </defs>
      </Styled.WaveBirdSvg>
      <Styled.WaveBirdMirroredSvg
        width="48"
        height="52"
        viewBox="0 0 48 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_136_769)">
          <path
            d="M10.3594 0H35.5858C38.6143 0 41.0697 2.48024 41.0697 5.53976V44.3181C41.0697 46.7659 39.1054 48.75 36.6826 48.75H19.1338C16.7108 48.75 14.7465 46.7659 14.7465 44.3181V13.6626C11.987 9.82616 10.3594 5.1051 10.3594 0Z"
            fill="var(--color-birdBody)"
          />
          <path
            d="M22.4241 45.4261C22.4241 35.6357 27.5992 27.699 37.291 27.699C39.4846 27.699 41.0697 30.965 41.0697 31.5768V44.6967C41.0697 46.6939 38.9818 48.75 36.9455 48.75H22.4241V45.4261Z"
            fill="var(--color-birdBeak)"
          />
          <path
            d="M3.77861 23.2671H18.0369C21.0657 23.2671 23.5209 25.7473 23.5209 28.807V40.9945H14.7466C8.68914 40.9945 3.77861 36.0339 3.77861 29.9149V23.2671Z"
            fill="var(--color-birdBeak)"
          />
          <path
            d="M0 27.2632L16.6019 26.9537C19.6301 26.8973 22.1302 29.3313 22.1861 32.3903L22.4244 45.4429L11.3056 45.65C5.24919 45.763 0.248927 40.8948 0.137207 34.7769L0 27.2632Z"
            fill="var(--color-birdBeak)"
          />
          <path
            d="M1.58502 24.375H21.3274C24.3561 24.375 26.8113 26.8552 26.8113 29.9149V48.75H12.553C6.49555 48.75 1.58502 43.7894 1.58502 37.6705V24.375Z"
            fill="var(--color-birdWing)"
          />
          <path
            d="M26.6079 13.5718C26.6079 18.9741 24.2432 23.3535 21.3262 23.3535C18.4092 23.3535 16.0445 18.9741 16.0445 13.5718C16.0445 8.16956 18.4092 3.79016 21.3262 3.79016C24.2432 3.79016 26.6079 8.16956 26.6079 13.5718Z"
            fill="var(--color-birdEyeball)"
          />
          <path
            d="M24.8473 13.5718C24.8473 17.9918 23.2709 21.575 21.3262 21.575C19.3815 21.575 17.8051 17.9918 17.8051 13.5718C17.8051 9.15176 19.3815 5.5686 21.3262 5.5686C23.2709 5.5686 24.8473 9.15176 24.8473 13.5718Z"
            fill="var(--color-birdBody)"
          />
          <path
            d="M28.6422 11.1041C28.6422 5.68746 33.5926 3.97219 36.0676 3.79163H39.7803C46.4632 3.79163 48.0456 9.38886 48.0013 12.1875V18.0104H28.6422V11.1041Z"
            fill="var(--color-birdEyeball)"
          />
          <path
            d="M33.9456 23.5625C29.5969 23.5625 28.6422 20.177 28.6422 17.6041H44.5525C44.5525 22.6145 41.0169 23.5625 39.2492 23.5625H33.9456Z"
            fill="var(--color-birdBeak)"
          />
          <path
            d="M31.6806 47.4579C10.0903 45.627 4.29289 31.2772 4.09298 24.3312H1.57411V38.0626C2.62964 46.5424 9.05075 48.7427 12.1294 48.7828H36.8383C39.9089 48.7828 40.9164 46.2132 41.0364 44.9284C40.5566 45.892 35.0391 47.7427 31.6806 47.4579Z"
            fill="var(--color-birdShadow)"
          />
        </g>
        <defs>
          <clipPath id="clip0_136_769">
            <rect width="48" height="52" fill="var(--color-birdEyeball)" />
          </clipPath>
        </defs>
      </Styled.WaveBirdMirroredSvg>
    </div>
  );
}

export default WaveSvg;
