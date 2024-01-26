import * as Styled from "../Wave.style";
import WaveBird from "../WaveBird";

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
      <div
        style={{
          position: "absolute",
          bottom: "57px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100dvw",
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
    </Styled.WaveSvgWrapper>
  );
}

export default WaveSvg;
