import type { RefObject } from "react";
import { scrollToElement } from "./scrollToElement";

export function handleKeyUp(e: KeyboardEvent, indexRef: RefObject<number>) {
	const key = e.key;
	if (key !== "ArrowUp") {
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

	indexRef.current =
		indexRef.current <= 0 ? listItems.length - 1 : indexRef.current - 1;

	const currentItem = listItems[indexRef.current];
	const link = currentItem.querySelector("a");
	if (link && searchResultList) {
		currentItem.setAttribute("aria-selected", "true");
		scrollToElement(currentItem as HTMLElement, searchResultList);
		(link as HTMLElement).focus();
	}
}
