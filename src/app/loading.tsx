"use client";

import { Wave } from "@/widgets/Wave";
import {
  ArticleHeader,
  PostTitle,
  ArticleWrapper,
  Article,
} from "./loading.style";
import styled from "styled-components";

const Dot = styled.span<{ $delay?: number }>`
  font-size: 4rem;
  animation: fadeIn 1s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const Dash = styled.span<{ $delay?: number }>`
  font-size: 2rem;
  animation: fadeIn 1s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const Bar = styled.div`
  width: 100%;
  height: 70px;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export default function Loading() {
  return (
    <>
      <Wave />
      <main className="bg-base">
        <ArticleHeader>
          <PostTitle>
            <Dot $delay={0.1}>.</Dot>
            <Dot $delay={0.2}>.</Dot>
            <Dot $delay={0.3}>.</Dot>
            <Dot $delay={0.4}>.</Dot>
            <Dot $delay={0.5}>.</Dot>
            <Dot $delay={0.6}>.</Dot>
            <Dot $delay={0.7}>.</Dot>
            <Dot $delay={0.8}>.</Dot>
          </PostTitle>
          <div>
            <Dash $delay={0.6}>.</Dash>
            <Dash $delay={0.5}>.</Dash>
            <Dash $delay={0.4}>.</Dash>
            <Dash $delay={0.3}>.</Dash>
            <Dash $delay={0.2}>.</Dash>
            <Dash $delay={0.1}>.</Dash>
          </div>
        </ArticleHeader>
        <ArticleWrapper>
          <Article>
            <Bar />
          </Article>
        </ArticleWrapper>
      </main>
    </>
  );
}
