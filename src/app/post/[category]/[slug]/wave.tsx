"use client";

import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid: [wave-image] 1fr / [wave-image] 1fr;
  position: relative;
  overflow: hidden;
  left: 0px;
  right: 0px;
  width: 100%;
  max-width: 100cqw;
  z-index: 3;
  user-select: none;
  pointer-events: none;
`;

const SvgWrapper = styled.div`
  grid-area: wave-image;

  position: sticky;
  display: grid;
  align-items: flex-end;
`;

const Svg = styled.svg`
  position: relative;
  left: -3%;
  right: -3%;
  bottom: 0em;
  min-width: 600px;
  max-width: unset;
  width: 106%;
`;

const WaveBirdSvg = styled.svg`
  grid-area: wave-image;
  min-width: 600px;
  max-width: unset;
  width: 106%;
`;

const WaveBirdMirroredSvg = styled.svg`
  position: absolute;
  bottom: 0.75em;
  min-width: 600px;
  max-width: unset;
  opacity: 0.4;
  filter: blur(3.75px);
  transform: scaleY(-1) translateY(-80%) scaleY(0.3);
`;

function WaveSvg() {
  return (
    <SvgWrapper key={"light-wave-svg"} id="blog-main__wave-svg-img">
      <Svg
        preserveAspectRatio="none"
        width="938"
        height="208"
        viewBox="0 0 938 197"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 32.5 V 208 H 938 L 937.5 30 C 933.833 28.1667 922.7 24.5 907.5 24.5 C 822 24.5 847.5 79 700 79 C 552.5 79 418 3.9998 353.5 4 C 306.746 4.0001 215.533 36.74 188.5 25.5002 Q 90.502 -0.459 30.914 21.241 Z"
          fill="url(#paint0_linear_103_748)"
          fillOpacity="0.85"
        />
        <path
          d="M 0 112 V 208 H 938 V 73 C 925.833 90.6667 892.1 126 854.5 126 C 816.9 126 756.833 120.667 731.5 118 C 685.833 113.667 585.2 105 548 105 C 501.5 105 481.5 52.5 428 52.5 C 374.5 52.5 284.5 76 243 76 C 201.5 76 190.5 50 133 50 C 87 50 25.1667 91.3333 0 82 Z"
          fill="url(#paint1_linear_103_748)"
        />
        <path
          d="M0 134V208.5H938V130.5C907.833 144 803 171 746.5 171C651.5 171 583 116.5 531 116.5C498 116.5 473.5 135.5 416 135.5C358.5 135.5 268.5 93 195.5 93C122.5 93 32.5 138 19 138C8.2 138 1.83333 135.333 0 134Z"
          fill="var(--color-frontWave)"
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
      </Svg>
    </SvgWrapper>
  );
}

export default function Wave() {
  return (
    <Wrapper>
      <WaveSvg />
    </Wrapper>
  );
}
