import type { ComponentPropsWithoutRef } from "react";

const UNDERLINE_WAVE_PATH =
	"M3 5.19c4-1.69 14-4.31 16.5 0s4.833 3.747 8.5 0c2.684-2.742 6.472-3.093 9.5 0 3.667 3.747 6.26 3.31 9.5 0 2.633-2.69 6 3.31 11 0 3.459-2.29 5.333 3.747 9 0 3.667-3.746 5.292 5.81 13 0 4.896-3.69 5.248 4.566 11.5 0";

type WaveUnderlineProps = ComponentPropsWithoutRef<"svg"> & {
	strokeWidth?: number;
	pathLength?: number;
};

export function WaveUnderline({
	strokeWidth = 3,
	pathLength = 1,
	...props
}: WaveUnderlineProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 11"
			preserveAspectRatio="none"
			fill="none"
			aria-hidden="true"
			focusable="false"
			{...props}
		>
			<path
				d={UNDERLINE_WAVE_PATH}
				strokeWidth={strokeWidth}
				pathLength={pathLength}
			/>
		</svg>
	);
}
