/**
 * Type declartino
 */

import React from "react";

type StoryStateSetter = {
	data: Element | null;
	setter: React.Dispatch<React.SetStateAction<Element | null>>;
};

/**
 * Functions
 */

export const navigationStories = (direction: string) => {
	const currentStory = document.querySelector(
		".current_story"
	) as HTMLElement;

	const progressbar = document.querySelector(
		".stories__container div"
	) as HTMLElement;
	const nextStory = currentStory?.nextElementSibling;
	const prevStory = currentStory?.previousElementSibling;

	if (direction === "next") {
		if (!nextStory) {
			return;
		}
		nextStory.scrollIntoView({ behavior: "smooth" });
	} else if (direction === "prev" && prevStory !== progressbar) {
		if (!prevStory || nextStory === progressbar) {
			return;
		}
		prevStory.scrollIntoView({ behavior: "smooth" });
	}
};
