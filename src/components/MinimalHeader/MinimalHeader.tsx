"use client";

import React from "react";
import { ThemeContext } from "../Theme/ThemeProvider";
import * as Styled from "./MinimalHeader.style";
import Header from "../Header";
import Wave from "../HeaderContents/Wave";

function MinimalHeader() {
  return (
    <Styled.Header>
      <Header />
<<<<<<< HEAD
=======
      <Wave />
>>>>>>> sunub
    </Styled.Header>
  );
}

export default MinimalHeader;
