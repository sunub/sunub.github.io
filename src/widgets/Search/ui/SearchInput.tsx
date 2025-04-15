"use client";

import React, {
  useState,
  useEffect,
  useRef,
  Suspense,
  useDeferredValue,
} from "react";
import ReactFocusLock from "react-focus-lock";
import { SearchContainer, SearchOverlay } from "../styles";
import { SearchHeader } from "./SearchHeader";
import { useSearchResults } from "../hook/useSearchResults";
import { useAnimations } from "../hook/useAnimations";
import { useOutsideClick } from "../hook/useOutsideClick";
import { useKeyPress } from "../hook/useKeyPress";
import { SearchResultsList } from "./SearchResultList";

interface SearchInputProps {
  toggleOpen: () => void;
}

function SearchInput({ toggleOpen }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { results, fetchResults, clearResults } = useSearchResults();
  const { initOpenAnimation, closeAnimation } = useAnimations(rootRef);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    fetchResults(value);
  };

  const handleClear = () => {
    setQuery("");
    clearResults();
  };

  const handleClose = () => {
    closeAnimation().then(toggleOpen);
  };

  useOutsideClick(contentRef, handleClose);
  useKeyPress("Escape", handleClose);

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
          <SearchHeader
            query={deferredQuery}
            onQueryChange={handleQueryChange}
            onClear={handleClear}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <SearchResultsList results={results} onResultClick={handleClose} />
          </Suspense>
        </SearchContainer>
      </SearchOverlay>
    </ReactFocusLock>
  );
}

export { SearchInput };
