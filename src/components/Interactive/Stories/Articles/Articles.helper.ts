import React, { SetStateAction } from "react";

export function observingOfTheView(
	setter: React.Dispatch<SetStateAction<number>>
) {
	const root = document.querySelector(".stories__container") as HTMLElement;
	const targets = document.querySelectorAll(".story");

	const options = {
		root: root,
		margin: `10px`,
		threshold: 1,
	};
	const observer = new IntersectionObserver(chaningTheCurrentView, options);

	targets.forEach((target) => observer.observe(target));

	function chaningTheCurrentView(entries: IntersectionObserverEntry[]) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const currTarget = entry.target as HTMLElement;
				const prevTarget = document.querySelector(
					".current_story"
				) as HTMLElement;
				const index = currTarget?.getAttribute("aria-label");

				prevTarget?.classList.remove("current_story");
				currTarget?.classList.add("current_story");
				setter(Number(index));
			}
		});
	}
}
