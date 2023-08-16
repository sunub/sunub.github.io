const stories = document.querySelector(".stories") as HTMLElement;
const state = {
	current_story: stories.firstElementChild?.lastElementChild,
};

export const navigationStories = (direction: string) => {
	const story = state.current_story;

	const lastItemUserStory = story?.parentElement?.firstElementChild;
	const firstItemUserStory = story?.parentElement?.lastElementChild;

	const hasNextUserStory = story?.parentElement?.nextElementSibling;
	const hasPrevUserStory = story?.parentElement?.previousElementSibling;

	if (direction === "next") {
		scrollToNextElement(story, lastItemUserStory, hasNextUserStory);
	} else if (direction === "prev") {
		scrollToPrevElement(story, firstItemUserStory, hasPrevUserStory);
	}
};

function scrollToNextElement(
	current: Element | any,
	last: Element | any,
	hasNext: Element | any
) {
	if (last === current && !hasNext) {
		return;
	} else if (last === current && hasNext) {
		state.current_story =
			current?.parentElement?.nextElementSibling?.lastElementChild;
		current?.parentElement?.nextElementSibling?.scrollIntoView({
			behavior: "smooth",
		});
	} else {
		current?.classList.add("seen");
		state.current_story = current?.previousElementSibling;
	}
}
function scrollToPrevElement(
	current: Element | any,
	first: Element | any,
	hasPrev: Element | any
) {
	if (first === current && !hasPrev) {
		return;
	} else if (first === current && hasPrev) {
		state.current_story =
			current?.parentElement?.previousElementSibling?.firstElementChild;
		current?.parentElement?.previousElementSibling?.scrollIntoView({
			behavior: "smooth",
		});
	} else {
		current?.classList.remove("seen");
		state.current_story = current?.nextElementSibling;
	}
}
