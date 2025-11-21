import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
	clearSearchAtom,
	closeSearchModalAtom,
	hasSearchResultsAtom,
	isSearchLoadingAtom,
	isSearchModalOpenAtom,
	openSearchModalAtom,
	searchActionAtom,
	searchQueryAtom,
	searchResultsAtom,
	shouldShowResultsAtom,
} from "../store/search.atom";

export function useSearchAtoms() {
	const [query, setQuery] = useAtom(searchQueryAtom);
	const results = useAtomValue(searchResultsAtom);
	const isLoading = useAtomValue(isSearchLoadingAtom);
	const [isModalOpen, setIsModalOpen] = useAtom(isSearchModalOpenAtom);
	const hasResults = useAtomValue(hasSearchResultsAtom);
	const shouldShowResults = useAtomValue(shouldShowResultsAtom);

	const search = useSetAtom(searchActionAtom);
	const clearSearch = useSetAtom(clearSearchAtom);
	const closeModal = useSetAtom(closeSearchModalAtom);

	return {
		query,
		setQuery,
		results,
		isLoading,
		isModalOpen,
		setIsModalOpen,
		hasResults,
		shouldShowResults,

		// Actions
		search,
		clearSearch,
		closeModal,
	};
}

export function useClearSearchAtom() {
	const clearSearch = useSetAtom(clearSearchAtom);
	return clearSearch;
}

export function useSearchQuery() {
	return useAtom(searchQueryAtom);
}

export function useSearchResultsAtom() {
	return useAtom(searchResultsAtom);
}

export function useIsSearchLoadingAtom() {
	return useAtomValue(isSearchLoadingAtom);
}

export function useHasSearchResultsAtom() {
	return useAtomValue(hasSearchResultsAtom);
}

export function useSearchModal() {
	const [isOpen] = useAtom(isSearchModalOpenAtom);
	const close = useSetAtom(closeSearchModalAtom);
	const open = useSetAtom(openSearchModalAtom);

	return {
		isOpen,
		open,
		close,
	};
}
