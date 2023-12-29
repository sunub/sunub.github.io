import React from "react";
import * as Styled from "./HeroImage.style";
import { LightMode } from "./LightMode";
import { DarkMode, DarkModeWave } from "./DarkMode";

function HeaderImage() {
  return (
    <Styled.RootWrapper>
      <Styled.HeroImageWrapper>
        <LightMode />
        {/* <DarkMode /> */}
      </Styled.HeroImageWrapper>
    </Styled.RootWrapper>
  );
}
// <Styled.WaveWrapper>
//   <LightModeWave />
//   {/* <DarkModeWave /> */}
// </Styled.WaveWrapper>

export default HeaderImage;

// return (
//   <Styled.RootWrapper>
//     <Styled.HeroIamgeWrapper>
//       <LightMode />
//       {/* <DarkMode /> */}
//     </Styled.HeroIamgeWrapper>
//     <Styled.WaveWrapper>
//       <LightModeWave />
//       {/* <DarkModeWave /> */}
//     </Styled.WaveWrapper>
//   </Styled.RootWrapper>
// );
