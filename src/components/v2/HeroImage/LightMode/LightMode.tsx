import * as Styled from "../HeroImage.style";

import React from "react";
import bridge from "@/public/image/hero-image__light-bridge.avif";
import clouds from "@/public/image/hero-image__light-clouds.avif";
import baseImage from "@/public/image/hero-image__light-base-scene.avif";
import softClouds from "@/public/image/hero-image__light-clouds-soft.avif";

function LightMode() {
  const theme = {
    colorMode: "light",
  };
  return (
    <React.Fragment>
      <Styled.HeroImage
        src={clouds}
        alt={"메인 히어로 이미지중 구름"}
        style={{
          opacity: `${theme.colorMode === "light" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
          zIndex: 3,
        }}
      />
      <Styled.HeroImage
        src={softClouds}
        alt={"메인 히어로 이미지중 투명한 구름"}
        style={{
          opacity: `${theme.colorMode === "light" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
          filter: "blur(5px)",
          mixBlendMode: "soft-light",
          zIndex: 1,
        }}
      />
      <Styled.HeroImage
        src={baseImage}
        alt={"메인 히어로 이미지중 메인"}
        style={{
          opacity: `${theme.colorMode === "light" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
          zIndex: 2,
        }}
      />
      <Styled.HeroImage
        src={bridge}
        alt={"메인 히어로 이미지중 물에 비친 다리"}
        $mirrored={true}
        style={{
          opacity: `${theme.colorMode === "light" ? 1 : 0}`,
          transition: "opacity 350ms ease 0s",
          zIndex: 2,
        }}
      />
    </React.Fragment>
  );
}

// function LightModeWave() {
//   const theme: Theme = React.useContext(ThemeContext);

//   return (
//     <React.Fragment>
//       <Wave
//         style={{
//           opacity: `${theme.colorMode === "light" ? 1 : 0}`,
//           zIndex: 3,
//           transition: "opacity 350ms ease 0s",
//         }}
//       />
//       <Styled.WaveImage
//         src={waveBird}
//         alt={"메인 히어로 이미지중 중간 새 아이콘"}
//         style={{
//           opacity: `${theme.colorMode === "light" ? 1 : 0}`,
//           zIndex: 3,
//           transition: "opacity 350ms ease 0s",
//         }}
//       />
//     </React.Fragment>
//   );
// }

export { LightMode };
