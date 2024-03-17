"use client";

import styled from "styled-components";
import gsap, { Linear } from "gsap";
import React from "react";

function WaveBird() {
  const waveBirdRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (waveBirdRef.current == null) return;

    const birdTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
      yoyo: true,
    });

    birdTimeline.set(waveBirdRef.current, {
      rotation: 0,
      y: 0,
    });

    birdTimeline.to(waveBirdRef.current, {
      rotation: 6,
      duration: 4,
      y: 15,
      ease: Linear.easeIn,
    });
    birdTimeline.to(waveBirdRef.current, {
      rotation: -4,
      duration: 4,
      y: 3,
      ease: Linear.easeIn,
    });

    birdTimeline.play();
  }, []);

  return (
    <div
      ref={waveBirdRef}
      style={{
        position: "absolute",
        bottom: "38px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
      }}
    >
      <WaveBirdSvg
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
      </WaveBirdSvg>
      <WaveBirdMirroredSvg
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
      </WaveBirdMirroredSvg>
    </div>
  );
}

export const WaveBirdSvg = styled.svg`
  grid-area: wave-image;
  min-width: 600px;
  max-width: unset;
  width: 106%;
  z-index: 2;
`;

export const WaveBirdMirroredSvg = styled.svg`
  position: absolute;
  bottom: 0.75em;
  min-width: 600px;
  max-width: unset;
  opacity: 0.4;
  filter: blur(3.75px);
  transform: scaleY(-1) translateY(-80%) scaleY(0.3);
  z-index: 1;
`;

export default WaveBird;
