"use client";

import React from "react";
import { ThemeContext } from "../Theme/ThemeProvider";
import * as Styled from "./MinimalHeader.style";
import Header from "../v2/Header";
import Wave from "../v2/HeaderContents/Wave";

function MinimalHeader() {
  const { colorTheme } = React.useContext(ThemeContext);

  return (
    <Styled.Header>
      <Header />
      <Wave colorTheme={colorTheme} />
    </Styled.Header>
  );
}

export default MinimalHeader;
