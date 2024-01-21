import React from "react";
import lightWaveBird from "@/public/assets/hero-image__light-wave-bird.avif";
import darkWaveBird from "@/public/assets/hero-image__dark-wave-bird.avif";
import * as Styled from "./Wave.style";
import WaveSvg from "./WaveSvg";
import { Theme } from "type";

function Wave({ colorTheme }: { colorTheme: Theme }) {
  return (
    <Styled.WaveWrapper>
      <Styled.BackgroundColor />
      <WaveSvg
        style={{
          transition: "all 350ms ease 0s",
          zIndex: 3,
        }}
      />
      {/* <WaveBird /> */}
      {/* <React.Fragment>
        <Styled.WaveImage
          src={lightWaveBird}
          alt={"메인 히어로 이미지중 중간 새 아이콘"}
          fill
          priority
          style={{
            opacity: `${colorTheme === "light" ? 1 : 0}`,
            zIndex: 3,
            filter: "brightness(1.2)",
          }}
        />
        <Styled.WaveImage
          src={darkWaveBird}
          alt={"메인 히어로 이미지중 중간 새 아이콘"}
          fill
          priority
          style={{
            opacity: `${colorTheme === "dark" ? 1 : 0}`,
            zIndex: 3,
            filter: "brightness(1.2)",
          }}
        />
      </React.Fragment> */}
    </Styled.WaveWrapper>
  );
}

function WaveBird() {
  return (
    <Styled.WaveBirdSvg
      width="201"
      height="216"
      viewBox="0 0 201 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_136_769)">
        <path
          d="M43.1835 0H148.341C160.965 0 171.201 10.2956 171.201 22.9958V183.967C171.201 194.127 163.012 202.364 152.913 202.364H79.7598C69.6595 202.364 61.4716 194.127 61.4716 183.967V56.7141C49.9682 40.7889 43.1835 21.1915 43.1835 0Z"
          fill="#15282D"
        />
        <path
          d="M93.4759 188.566C93.4759 147.926 115.048 114.98 155.449 114.98C164.593 114.98 171.201 128.537 171.201 131.077V185.538C171.201 193.828 162.497 202.364 154.009 202.364H93.4759V188.566Z"
          fill="#8BACBF"
        />
        <path
          d="M15.7513 96.5826H75.1877C87.813 96.5826 98.0479 106.878 98.0479 119.579V170.17H61.4716C36.221 170.17 15.7513 149.578 15.7513 124.178V96.5826Z"
          fill="#8BACBF"
        />
        <path
          d="M0 113.171L69.2057 111.886C81.8288 111.652 92.2507 121.755 92.4836 134.454L93.4771 188.636L47.1278 189.496C21.8814 189.964 1.03766 169.756 0.571952 144.361L0 113.171Z"
          fill="#8BACBF"
        />
        <path
          d="M6.6072 101.182H88.9039C101.529 101.182 111.764 111.477 111.764 124.178V202.364H52.3276C27.0769 202.364 6.6072 181.772 6.6072 156.372V101.182Z"
          fill="#264C5F"
        />
        <path
          d="M110.916 56.3371C110.916 78.7621 101.059 96.9412 88.8992 96.9412C76.7394 96.9412 66.8821 78.7621 66.8821 56.3371C66.8821 33.912 76.7394 15.7329 88.8992 15.7329C101.059 15.7329 110.916 33.912 110.916 56.3371Z"
          fill="white"
        />
        <path
          d="M103.577 56.3371C103.577 74.6848 97.0056 89.5586 88.8992 89.5586C80.7926 89.5586 74.2211 74.6848 74.2211 56.3371C74.2211 37.9893 80.7926 23.1155 88.8992 23.1155C97.0056 23.1155 103.577 37.9893 103.577 56.3371Z"
          fill="#15282D"
        />
        <path
          d="M119.396 46.094C119.396 23.6092 140.032 16.489 150.349 15.7395H165.826C193.684 15.7395 200.28 38.9739 200.095 50.591V74.7622H119.396V46.094Z"
          fill="#F2F2F2"
        />
        <path
          d="M141.503 97.8091C123.376 97.8091 119.396 83.7561 119.396 73.0758H185.719C185.719 93.8743 170.981 97.8091 163.612 97.8091H141.503Z"
          fill="#8BACBF"
        />
        <path
          d="M132.062 197C42.0618 189.4 17.8951 129.833 17.0618 101H6.56175V158C10.9618 193.2 37.7284 202.333 50.5618 202.5H153.562C166.362 202.5 170.562 191.833 171.062 186.5C169.062 190.5 146.062 198.182 132.062 197Z"
          fill="#002D43"
        />
      </g>
      <defs>
        <clipPath id="clip0_136_769">
          <rect width="200.09" height="215.855" fill="white" />
        </clipPath>
      </defs>
    </Styled.WaveBirdSvg>
  );
}

export default Wave;
