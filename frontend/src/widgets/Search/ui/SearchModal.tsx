'use client';

import { useCallback, useRef } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { LoadingComponent } from './LoadingComponent';
import { NoResult } from './NoResult';
import { SearchInputHeader } from './SearchInputHeader';
import { SearchResultsList } from './SearchResultList';
import { useOpenCloseAnimations } from '../hook/useOpenCloseAnimations';
import { useKeyPress } from '../hook/useKeyPress';
import { useModalEnterAnimation } from '../hook/useModalEnterAnimation';
import { useOutsideClick } from '../hook/useOutsideClick';
import { useHasSearchResultsAtom, useIsSearchLoadingAtom } from '../hook/useSearchAtoms';
import { ResultsList, SearchContainer, SearchOverlay } from '../styles';

interface SearchModalProps {
  close: () => void;
}

function SearchModal({ close }: SearchModalProps) {
  const isLoading = useIsSearchLoadingAtom();
  const hasSearchResults = useHasSearchResultsAtom();
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isExpanded = true;
  const listboxId = 'search-results-listbox';

  const { initOpenAnimation, closeAnimation } = useOpenCloseAnimations(rootRef);

  const handleClose = useCallback(async () => {
    await closeAnimation();
    close();
  }, [closeAnimation, close]);

  useModalEnterAnimation(initOpenAnimation);
  useOutsideClick(contentRef, close);
  useKeyPress('Escape', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close();
    }
  });

  return (
    <ReactFocusLock>
      <SearchOverlay ref={rootRef} data-testid="search-modal__overlay">
        <SearchContainer
          role="dialog"
          aria-label="검색 다이알로그 창"
          id="search-input__content-wrapper"
          ref={contentRef}
          data-slot="search-modal"
        >
          <SearchInputHeader isExpanded={isExpanded} listboxId={listboxId} />
          <ResultsList id={listboxId} role="listbox" aria-label={'검색 결과'} data-slot="search-dialog-results-list">
            {isLoading ? (
              <LoadingComponent />
            ) : hasSearchResults ? (
              <SearchResultsList onResultClick={handleClose} />
            ) : (
              <NoResult />
            )}
          </ResultsList>
        </SearchContainer>
        <div
          data-testid={'search-modal__outside_position'}
          style={{
            position: 'absolute',
            top: 100,
            left: 100,
            width: '1px',
            height: '1px',
            zIndex: 10000,
          }}
        />
      </SearchOverlay>
    </ReactFocusLock>
  );
}

export { SearchModal };
