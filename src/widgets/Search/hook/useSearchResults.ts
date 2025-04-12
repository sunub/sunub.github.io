import { useState, useMemo } from "react";
import { debounce } from "@/shared/utils/debounce";
import { fetchSearchResult } from "../api/fetchSearchResult";
import { SearchResult } from "../types/types";

export function useSearchResults() {
  const [results, setResults] = useState<SearchResult[]>([]);

  const debouncedFetch = useMemo(() => debounce(fetchSearchResult, 300), []);

  const fetchResults = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    debouncedFetch(query, setResults);
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
