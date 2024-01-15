import * as Styled from "../Wave.style";
<<<<<<< HEAD
import WaveBird from "../WaveBird";
=======
>>>>>>> refs/remotes/origin/sunub

function WaveSvg({ ...delegated }) {
  return (
    <Styled.WaveSvgWrapper key={"light-wave-svg"} {...delegated}>
      <Styled.WaveSvg
        preserveAspectRatio="none"
        width="938"
        height="208"
        viewBox="0 0 938 197"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1252.27 19.4939C1338.33 -14.5752 1425.94 42.9589 1440 42.9589L1440 196H0V31.3242C73.125 31.3242 177.891 19.4939 302.344 2.45937C426.797 -14.5752 506.25 62.0803 662.344 72.839C818.437 83.5976 847.266 1.11453 952.735 31.5974C1058.2 62.0803 1144.69 62.0803 1252.27 19.4939Z"
          fill="url(#paint0_linear_103_748)"
          fillOpacity="0.85"
        />
        <path
          d="M187.734 57.6924C101.672 19.8565 14.0625 105.983 0 105.983V196H1440V119.425C1366.88 119.425 1359.87 46 1232.58 46C1156.64 46 1008.98 92.7971 968.203 67.905C914.194 34.939 966.094 137.105 777.656 116.936C622.417 100.319 547.031 116.936 487.266 71.1341C408.682 10.9117 295.312 104.987 187.734 57.6924Z"
          fill="url(#paint1_linear_103_748)"
        />
        <path
          d="M187.734 89.438C96.5 89.438 37.5 144 0 126.5V197H1440V161.974C1366.88 161.974 1262.11 116.729 1137.66 94.5C1013.2 72.2712 933.75 145.01 777.656 159.049C621.562 173.088 593 87.5 491 118.5C383.15 151.278 308.818 89.438 187.734 89.438Z"
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
      </Styled.WaveSvg>
    </Styled.WaveSvgWrapper>
  );
}

export default WaveSvg;
