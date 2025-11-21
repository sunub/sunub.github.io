import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { RefObject } from "react";
import { scrollToElement } from "./scrollToElement";

export function handleKeyArrowDown(
	e: KeyboardEvent,
	indexRef: RefObject<number>,
	router: AppRouterInstance,
) {
	const key = e.key;
	if (key !== "ArrowDown") {
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

	indexRef.current = (indexRef.current + 1) % listItems.length;

	const currentItem = listItems[indexRef.current];
	const link = currentItem.querySelector("a");
	const href = link?.getAttribute("href");
	if (link && href) {
		router.prefetch(href);
	}

	if (link && searchResultList) {
		currentItem.setAttribute("aria-selected", "true");
		scrollToElement(currentItem as HTMLElement, searchResultList);
		(link as HTMLElement).focus();
	}
}
