import { useEffect, useState } from "react";

type UseListTerminalModeOptions = {
	shouldEnterTerminalMode: boolean;
};

export const useListTerminalMode = ({
	shouldEnterTerminalMode,
}: UseListTerminalModeOptions): boolean => {
	const [isTerminalMode, setIsTerminalMode] = useState(false);

	useEffect(() => {
		if (!shouldEnterTerminalMode) {
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
	}, [shouldEnterTerminalMode, isTerminalMode]);

	return isTerminalMode;
};
