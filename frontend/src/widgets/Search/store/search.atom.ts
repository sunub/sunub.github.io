import { atom } from 'jotai';
import type { RefObject } from 'react';
import type { SearchResult } from '../types';

export const searchQueryAtom = atom('');
export const searchResultsAtom = atom<SearchResult[]>([]);
export const isSearchLoadingAtom = atom(false);
export const isSearchModalOpenAtom = atom(false);
export const selectedSearchIndexAtom = atom(-1);

export const hasSearchResultsAtom = atom(get => get(searchResultsAtom).length > 0);
export const shouldShowResultsAtom = atom(get => {
  const query = get(searchQueryAtom);
  const isLoading = get(isSearchLoadingAtom);
  const hasResults = get(searchResultsAtom).length > 0;
  return query.length > 0 && (isLoading || hasResults);
});

export const searchActionAtom = atom(
  null,
  async (get, set, query: string, abortController: RefObject<AbortController | null>) => {
    set(searchQueryAtom, query);

    if (!query.trim()) {
      set(searchResultsAtom, []);
      set(isSearchLoadingAtom, false);
      return;
    }

    const isCurrentlyLoading = get(isSearchLoadingAtom);
    if (isCurrentlyLoading) {
      return;
    }

    set(isSearchLoadingAtom, true);
    try {
      if (abortController.current) {
        abortController.current.abort();
      }
    } catch {
      // abort 에러 무시
    } finally {
      abortController.current = null;
    }

    abortController.current = new AbortController();
    const currentController = abortController.current;
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`, {
        signal: currentController.signal,
      });
      if (currentController.signal.aborted) {
        return;
      }

      if (!res.ok) {
        throw new Error(`검색 요청 실패: ${res.status} ${res.statusText}`);
      }

      const data = (await res.json()) as { results?: SearchResult[] };
      if (!currentController.signal.aborted) {
        set(searchResultsAtom, data.results || []);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      if (!currentController.signal.aborted) {
        console.error('Search failed:', error);
        set(searchResultsAtom, []);
      }
    } finally {
      if (!currentController.signal.aborted) {
        set(isSearchLoadingAtom, false);
      }
      if (abortController.current === currentController) {
        abortController.current = null;
      }
    }
  }
);

export const clearSearchAtom = atom(null, (get, set) => {
  set(searchQueryAtom, '');
  set(searchResultsAtom, []);
  set(isSearchLoadingAtom, false);
  set(selectedSearchIndexAtom, -1);
});

export const closeSearchModalAtom = atom(null, (get, set) => {
  set(isSearchModalOpenAtom, false);
});
