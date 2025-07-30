"use client";

import { Wave } from "@/widgets/Wave";
import {
  ArticleHeader,
  PostTitle,
  ArticleWrapper,
  Article,
  ContentBlink,
} from "./loading.style";
import styled from "styled-components";

export default function Loading() {
  return (
    <>
      <Wave />
      <Main>
        <ArticleHeader>
          <PostTitle>
            <ContentBlink $width={"30rem"} />
          </PostTitle>
          <div>
            <ContentBlink $width={"7rem"} />
          </div>
        </ArticleHeader>
        <ArticleWrapper>
          <Article>
            <ContentBlink $width={"80%"} />
            <ContentBlink $width={"82%"} />
            <ContentBlink $width={"85%"} />
            <ContentBlink $width={"85%"} />
            <ContentBlink $width={"85%"} />
            <ContentBlink $width={"90%"} />
            <ContentBlink $width={"90%"} />
          </Article>
        </ArticleWrapper>
      </Main>
    </>
  );
}

const Main = styled.main`
  background-color: var(--color-background);
`;
