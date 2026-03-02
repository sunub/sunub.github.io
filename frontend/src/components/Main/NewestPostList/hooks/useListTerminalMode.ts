import { useEffect, useState } from "react";

type UseListTerminalModeOptions = {
	canLoadMore: boolean;
	isPending: boolean;
};

export const useListTerminalMode = ({
	canLoadMore,
	isPending,
}: UseListTerminalModeOptions): boolean => {
	const [isTerminalMode, setIsTerminalMode] = useState(false);

	useEffect(() => {
		if (canLoadMore || isPending) {
			if (isTerminalMode) {
				setIsTerminalMode(false);
			}
			return;
		}

		if (typeof window === "undefined") {
			return;
		}

		const frameId = requestAnimationFrame(() => {
			setIsTerminalMode(true);
		});

		return () => {
			cancelAnimationFrame(frameId);
		};
	}, [canLoadMore, isPending, isTerminalMode]);

	return isTerminalMode;
};
