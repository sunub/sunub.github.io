import styled from "styled-components";

export const HeroImageSectionWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const HeroImageDesktopOnly = styled.div`
  width: 100%;
  position: relative;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
