import { useSetAtom } from "jotai";
import { useCallback, useMemo, useRef } from "react";
import { debounce } from "@/shared/utils/debounce";
import { searchActionAtom } from "../store/search.atom";
import { useClearSearchAtom, useSearchQuery } from "./useSearchAtoms";

const SEARCH_DEBOUNCE_MS = 500;

export function useSearch() {
	const [query, setQuery] = useSearchQuery();
	const search = useSetAtom(searchActionAtom);
	const abortControllerRef = useRef<AbortController | null>(null);
	const clearSearch = useClearSearchAtom();

	const debouncedSearch = useMemo(
		() =>
			debounce(
				(
					value: string,
					abortController: React.MutableRefObject<AbortController | null>,
				) => {
					search(value, abortController).catch((error) => {
						console.error("검색 중 오류가 발생했습니다:", error);
					});
				},
				SEARCH_DEBOUNCE_MS,
			),
		[search],
	);

	const handleQueryChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setQuery(value);

			if (!value.trim()) {
				search(value, abortControllerRef).catch((error) => {
					console.error("검색 중 오류가 발생했습니다:", error);
				});
			} else {
				debouncedSearch(value, abortControllerRef);
			}
		},
		[setQuery, search, debouncedSearch],
	);

	return {
		query,
		clearSearch,
		handleQueryChange,
	};
}
