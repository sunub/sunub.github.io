"use client";

import styled from "styled-components";
import HeroImage from "@/components/HeroImage";
import Wave from "@/components/HeaderContents/Wave";
import { UnderLineWaveIcon } from "@/components/UnderLineWaveIcon";

export default function Loading() {
  return (
    <>
      <HeaderContentsWrapper>
        <HeroImage />
        <Wave />
      </HeaderContentsWrapper>
      <BodyWrapper id="blog-main__recently-post-list">
        <TitleRootWrapper>
          <TitleWrapper>
            <UnderLineWaveIcon scale="3.25, 1" />
          </TitleWrapper>
          <BlogPostList>
            <UnderLineWaveIcon
              key={"underline-loading-animation-1"}
              scale="4.25, 1"
              delay={0.25}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-2"}
              width={4}
              scale="7.25, 1"
              delay={0.5}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-3"}
              scale="7.25, 1"
              delay={0.75}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-4"}
              width={4}
              scale="7.25, 1"
              delay={1}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-5"}
              scale="7.25, 1"
              delay={0.25}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-6"}
              width={4}
              scale="7.25, 1"
              delay={0.5}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-7"}
              scale="7.25, 1"
              delay={1}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-8"}
              width={4}
              scale="7.25, 1"
              delay={0.25}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-9"}
              scale="7.25, 1"
              delay={0.5}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-10"}
              width={4}
              scale="7.25, 1"
              delay={0.75}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-11"}
              scale="7.25, 1"
              delay={1}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-12"}
              width={4}
              scale="7.25, 1"
              delay={0.25}
            />
            <UnderLineWaveIcon
              key={"underline-loading-animation-13"}
              scale="7.25, 1"
              delay={0.5}
            />
          </BlogPostList>
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

const TitleDot = styled.span`
  content: "";
  display: inline-block;
  position: absolute;
  left: calc(-1rem - 8px);
  top: calc(1rem - 5px);
  background: var(--color-text);
  width: 2px;
  height: 16px;
  border-radius: 4px;

  transition: all 250ms cubic-bezier(0.19, -0.49, 0.64, 1.48);
`;

const BlogPostList = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  padding-top: 1rem;
  padding-bottom: 1rem;
  flex-direction: column;
  padding-left: 1rem;
`;

const TitleRootWrapper = styled.div`
  grid-area: newest;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  flex-direction: column;
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
