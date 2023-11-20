"use client";

import styled from "styled-components";
import HeroImage from "../LandingPage/HeroImage/index";
import Spacer from "../Spacer";
import Footer from "../Footer";

const Wrapper = styled.main`
  grid-area: main-content;

  padding-left: 32px;
  padding-right: 32px;

  @media (max-width: 425px) {
    padding-right: 16px;
    padding-left: 16px;
  }
`;

function Main({ children }) {
  return (
    <Wrapper>
      <Spacer axis={"vertical"} size={32} />
      <HeroImage />
      {children}
      <Footer />
    </Wrapper>
  );
}

export default Main;
