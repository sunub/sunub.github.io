"use client";

import { SearchResult } from "../types";
import { ListIndicator } from "@/shared/style/List";
import { VisuallyHidden } from "@/components/VisuallyHidden";
import {
  ResultsList,
  ResultItem,
  ResultLink,
  ResultTitle,
  ResultDescription,
} from "../styles/index";

interface SearchResultsListProps {
  results: SearchResult[];
  onResultClick: () => void;
}

export function SearchResultsList({
  results,
  onResultClick,
}: SearchResultsListProps) {
  if (results.length === 0) {
    return (
      <ResultsList>
        <ResultItem key="no-results">
          <VisuallyHidden>
            {"어떠한 결과도 발견 되지 않았습니다."}
          </VisuallyHidden>
          {"어떠한 결과도 발견 되지 않았습니다."}
        </ResultItem>
      </ResultsList>
    );
  }

  return (
    <>
      {results.map(({ postKey, post }: SearchResult, index) => {
        const { frontmatter } = post;
        const url = `/post/${frontmatter.category}/${frontmatter.slug}`;

        return (
          <ResultItem key={`${postKey}-${index}`}>
            <VisuallyHidden>{`${frontmatter.title}로 이동하는 링크`}</VisuallyHidden>
            <ListIndicator />
            <ResultLink href={url} onClick={onResultClick}>
              <ResultTitle>{frontmatter.title}</ResultTitle>
              <ResultDescription>{frontmatter.summary}</ResultDescription>
            </ResultLink>
          </ResultItem>
        );
      })}
    </>
  );
}
