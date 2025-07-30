import React, { useState, useMemo, useRef, useCallback } from "react";
import { debounce } from "@/shared/utils/debounce";
import { fetchSearchResult } from "../api/fetchSearchResult";
import { SearchResult } from "../types";

export function useSearchResults() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const debouncedFetch = useMemo(() => debounce(fetchSearchResult, 400), []);
  const abortControllerRef = useRef<AbortController | null>(null);
  const cleanUpAbortController = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort({ name: "AbortError" });
      abortControllerRef.current = null;
    }
  };

  const cancelPending = useCallback(() => {
    cleanUpAbortController();
    debouncedFetch.cancel();
  }, [debouncedFetch]);

  const fetchResults = (
    query: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    cleanUpAbortController();

    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      cancelPending();
      return;
    }

    setIsLoading(true);
    debouncedFetch(query, setResults, setIsLoading, abortControllerRef);
  };

  const clearResults = () => {
    setResults([]);
  };

  return {
    results,
    fetchResults,
    clearResults,
  };
}
