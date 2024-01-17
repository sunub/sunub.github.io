"use client";

import React from "react";
import { ThemeContext } from "../Theme/ThemeProvider";
import * as Styled from "./MinimalHeader.style";
import Header from "../Header";
import Wave from "../HeaderContents/Wave";

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
