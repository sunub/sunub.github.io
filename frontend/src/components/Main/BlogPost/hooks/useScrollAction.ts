import { type RefObject, useEffect } from "react";

export function useScrollAction(
	observeTarget: RefObject<HTMLDivElement | null>,
	loadMorePublishedPost: () => void,
) {
	useEffect(() => {
		if (!observeTarget.current) {
			return;
		}

		function observerCallback(entries: IntersectionObserverEntry[]) {
			if (entries[0].isIntersecting) {
				loadMorePublishedPost();
			}
		}

		const observer = new IntersectionObserver(observerCallback);
		observer.observe(observeTarget.current);
		return () => {
			observer.disconnect();
		};
	}, [observeTarget, loadMorePublishedPost]);
}
