import { useEffect, useState } from "react";

const INITIAL_REVEAL_DURATION_MS = 700;

export function useRevealPhase() {
	const [isInitialRevealPhase, setIsInitialRevealPhase] = useState(true);

	useEffect(() => {
		if (!isInitialRevealPhase) {
			return;
		}

		const endInitialRevealPhase = () => {
			setIsInitialRevealPhase(false);
		};

		if (window.scrollY > 0) {
			endInitialRevealPhase();
			return;
		}

		const onScroll = () => {
			if (window.scrollY > 0) {
				endInitialRevealPhase();
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		const timeoutId = window.setTimeout(
			endInitialRevealPhase,
			INITIAL_REVEAL_DURATION_MS,
		);

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.clearTimeout(timeoutId);
		};
	}, [isInitialRevealPhase]);

	return isInitialRevealPhase;
}
