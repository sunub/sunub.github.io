"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactFocusLock from "react-focus-lock";
import { ResultsList, SearchContainer, SearchOverlay } from "../styles";
import { SearchInputHeader } from "./SearchInputHeader";
import { useSearchResults } from "../hook/useSearchResults";
import { useAnimations } from "../hook/useAnimations";
import { useOutsideClick } from "../hook/useOutsideClick";
import { useKeyPress } from "../hook/useKeyPress";
import { SearchResultsList } from "./SearchResultList";
import { LoadingComponent } from "./LoadingComponent";

interface SearchModalProps {
  toggleOpen: () => void;
}

function SearchModal({ toggleOpen }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { results, fetchResults, clearResults } = useSearchResults();
  const { initOpenAnimation, closeAnimation } = useAnimations(rootRef);

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);
      fetchResults(value, setIsLoading);
    },
    [query]
  );

  const handleClear = () => {
    setQuery("");
    clearResults();
  };

  const handleClose = () => {
    closeAnimation().then(toggleOpen);
  };

  useOutsideClick(contentRef, handleClose);
  useKeyPress("Escape", handleClose);

  // Modal 바깥 부분 스크롤이 불가능하게끔 처리
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    initOpenAnimation();

    return () => {
      document.body.style.overflow = originalOverflow;
      handleClear();
    };
  }, []);

  return (
    <ReactFocusLock>
      <SearchOverlay ref={rootRef}>
        <SearchContainer id="search-input__content-wrapper" ref={contentRef}>
          <SearchInputHeader
            query={query}
            onQueryChange={handleQueryChange}
            onClear={handleClear}
          />
          <ResultsList>
            {isLoading ? (
              <LoadingComponent />
            ) : (
              <SearchResultsList
                results={results}
                onResultClick={handleClose}
              />
            )}
          </ResultsList>
        </SearchContainer>
      </SearchOverlay>
    </ReactFocusLock>
  );
}

export { SearchModal };
