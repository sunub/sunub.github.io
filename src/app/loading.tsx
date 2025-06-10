"use client";

import styled from "styled-components";
import { HeroImage } from "@/components/HeroImage";
import Wave from "@/components/HeaderContents/Wave";
import { ContentListLoading } from "@/components/Skeletons/ui/ContentLoading";

export default function Loading() {
  return (
    <>
      <HeaderContentsWrapper>
        <HeroImage />
        <Wave />
      </HeaderContentsWrapper>
      <BodyWrapper id="blog-main__recently-post-list">
        <TitleRootWrapper>
          <ContentListLoading />
        </TitleRootWrapper>
        <MainWrapper>
          <RightSideWrapper></RightSideWrapper>
        </MainWrapper>
      </BodyWrapper>
    </>
  );
}

const BodyWrapper = styled.div`
  padding-left: 64px;
`;

const TitleRootWrapper = styled.div`
  grid-area: newest;
`;

const HeaderContentsWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const MainWrapper = styled.main`
  display: grid;
  position: relative;
  grid-template:
    "newest categories"
    "newest tags" 1fr / 2fr 1fr;

  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;

  gap: 64px 96px;
  padding-left: 48px;
  padding-right: 48px;

  @container root (width <= 786px) {
    grid-template:
      "newest"
      "newset" 1fr / 1fr;

    padding-left: 32px;
    padding-right: 32px;
  }
`;

const RightSideWrapper = styled.div`
  position: sticky;
  top: 4rem;
  left: 0;

  @media screen and (max-width: 786px) {
    display: none;
  }
`;
