"use client";

import styled from "styled-components";
import { FeatherIcon } from "@/components/Main/NewestPost";
import Spacer from "@/components/Spacer";

function LoadingAnimation() {
  return (
    <BlogPostListItem>
      <BlogPostWrapper>
        <BlogPostTitle>
          <Title>
            <ContentBlink $width={30} />
          </Title>
        </BlogPostTitle>
        <BlogPostContent>
          <ContentBlink $width={40} />
        </BlogPostContent>
      </BlogPostWrapper>
      <Footer>
        <Date>
          <ContentBlink $width={7} />
        </Date>
      </Footer>
    </BlogPostListItem>
  );
}

function ContentListLoading() {
  return (
    <RootWrapper>
      <TitleWrapper>
        <FeatherIcon />
        <RecentTitle>최신 포스트들</RecentTitle>
      </TitleWrapper>
      <Spacer axis={"vertical"} size={32} />
      {Array.from({ length: 5 }, (_, index) => (
        <LoadingAnimation key={`${index}-content-loading-animation`} />
      ))}
    </RootWrapper>
  );
}

function FrontMatterLoading({ length }: { length: number }) {
  return (
    <RootWrapper>
      {Array.from({ length }, (_, index) => (
        <LoadingAnimation key={`${index}-content-loading-animation`} />
      ))}
    </RootWrapper>
  );
}

export { ContentListLoading, FrontMatterLoading };

const ContentBlink = styled.div<{ $width: number }>`
  display: inline-block;
  width: ${(props) => props.$width}rem;
  height: 1.5rem;
  background-color: color-mix(in oklch, var(--color-text) 20%, transparent);
  border-radius: 0.25rem;
  animation: blink 1.75s ease-in-out infinite;
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
  }
`;

const RootWrapper = styled.div`
  grid-area: newest;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

const RecentTitle = styled.h1`
  font-size: 1.75rem;
`;

const ScrollTrigger = styled.div`
  position: sticky;
  bottom: 326px;

  height: 1px;
  width: 100cqw;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Date = styled.time`
  color: var(--color-text);
`;

const BlogPostTitle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
`;

const BlogPostContent = styled.div`
  margin-top: 16px;
`;

const BlogPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform 250ms cubic-bezier(0.5, 1.25, 0.75, 1.25);
`;

const BlogPostListItem = styled.li`
  &:not(:first-of-type) {
    margin-top: 2rem;
  }
`;

const Footer = styled.footer`
  padding-top: 1rem;
`;
