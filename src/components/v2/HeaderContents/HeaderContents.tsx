import React from "react";
import Header from "../Header/Header";
import HeroImage from "../HeroImage";
import Spacer from "@/components/Spacer";
import * as Styled from "./HeaderContents.style";
import { Theme } from "type";
import Wave from "../Main/Wave";

function HeaderContents({
  initColorTheme,
}: {
  initColorTheme: Theme | string;
}) {
  return (
    <Styled.Wrapper $theme={"light"}>
      <Spacer size={60} axis={"vertical"} />
      <Header initColorTheme={initColorTheme} />
      <HeroImage />
      <Wave />
    </Styled.Wrapper>
  );
}

export default HeaderContents;
