import React from "react";
import { SearchResult } from "../types";

function abortSearchIfEmptyQuery(
  q: string,
  abortController: React.MutableRefObject<AbortController | null>,
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): boolean {
  if (!q || q.trim() === "") {
    if (abortController.current)
      abortController.current.abort({ name: "AbortError" });
    setResults([]);
    setIsLoading(false);
    return true;
  }
  return false;
}

export async function fetchSearchResult(
  q: string,
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  abortController: React.MutableRefObject<AbortController | null>
) {
  if (abortSearchIfEmptyQuery(q, abortController, setResults, setIsLoading)) {
    return;
  }
  if (!abortController.current) {
    abortController.current = new AbortController();
  }
  try {
    const res = await fetch(`/api/search?query=${encodeURIComponent(q)}`, {
      signal: abortController.current.signal,
    });
    if (!res.ok) throw new Error("Network response was not ok");
    const { results } = await res.json();
    setResults(results);
    abortController.current = null;
    setIsLoading(false);
  } catch (err: unknown) {
    if (err instanceof Object && "name" in err) {
      if (err.name === "AbortError") {
        abortController.current = null;
        return;
      }
    }
    console.error(err);
  }
}
