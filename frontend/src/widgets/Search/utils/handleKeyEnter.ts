import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { RefObject } from "react";

export async function handleKeyEnter(
	e: KeyboardEvent,
	indexRef: RefObject<number>,
	router: AppRouterInstance,
	onResultClick: () => Promise<void>,
) {
	const key = e.key;
	if (key !== "Enter") {
		return;
	}

	e.preventDefault();
	const searchResultList = document.getElementById("search-results-listbox");
	const listItems = searchResultList?.querySelectorAll("li");
	if (!listItems || listItems.length === 0) {
		return;
	}

	if (indexRef.current >= 0) {
		listItems[indexRef.current].setAttribute("aria-selected", "false");
	}

	const currentItem = listItems[indexRef.current];
	const link = currentItem.querySelector("a");
	const href = link?.getAttribute("href");
	if (link && href && searchResultList) {
		await onResultClick();
		router.push(href);
	}
}
