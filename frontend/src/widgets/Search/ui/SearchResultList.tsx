'use client';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { VisuallyHidden } from '@/components/VisuallyHidden';
import { ListIndicator } from '@/shared/style/List';
import { useKeyPress } from '../hook/useKeyPress';
import { searchResultsAtom } from '../store/search.atom';
import { ResultDescription, ResultItem, ResultLink, ResultTitle } from '../styles/index';
import { SearchResult } from '../types';
import { handleKeyArrowDown } from '../utils/handleKeyArrowDown';
import { handleKeyUp } from '../utils/handleKeyArrowUp';
import { handleKeyEnter } from '../utils/handleKeyEnter';

interface SearchResultsListProps {
  onResultClick: () => Promise<void>;
}

export function SearchResultsList({ onResultClick }: SearchResultsListProps) {
  const indexRef = useRef(-1);
  const results = useAtomValue(searchResultsAtom);
  const router = useRouter();

  useKeyPress('ArrowDown', handleKeyArrowDown, indexRef, router);
  useKeyPress('ArrowUp', handleKeyUp, indexRef, router);
  useKeyPress('Enter', handleKeyEnter, indexRef, router, onResultClick)

  return (
    <>
      {results.map(({ postKey, post }: SearchResult, index) => {
        const { frontmatter } = post;
        const url = `/post/${frontmatter.category}/${frontmatter.slug}`;

        return (
          <ResultItem role="option" key={`${postKey}-${index}`}>
            <VisuallyHidden>{`${frontmatter.title}로 이동하는 링크`}</VisuallyHidden>
            <ListIndicator />
            <ResultLink href={url} onClick={() => onResultClick} tabIndex={0}>
              <ResultTitle>{frontmatter.title}</ResultTitle>
              <ResultDescription>{frontmatter.summary}</ResultDescription>
            </ResultLink>
          </ResultItem>
        );
      })}
    </>
  );
}
