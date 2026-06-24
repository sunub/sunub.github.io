import type React from "react";

interface RefObjects {
	pathStartRef: React.RefObject<SVGPathElement | null>;
	pathMidRef: React.RefObject<SVGPathElement | null>;
	pathEndRef: React.RefObject<SVGPathElement | null>;
	gradientRef: React.RefObject<SVGLinearGradientElement | null>;
	floodWrapperRef: React.RefObject<HTMLDivElement | null>;
}

const paths = {
	step1: {
		unfilled:
			"M103.142 147.71C145.772 79.996 48.7316 11.0644 48.7316 -3.40841e-06L-3.05176e-05 -5.51618e-06L-8.05679e-05 1133L33.5865 1133C33.5865 1075.46 103.141 993.034 124.457 895.114C145.772 797.194 49.8534 734.679 36.3912 611.864C22.9289 489.049 126.14 466.367 87.9965 383.383C49.8534 300.4 49.8534 232.353 103.142 147.71Z",
		filled:
			"M330.448 147.71C276.59 96.9003 287.944 40.5 330.447 -1.53568e-06L3.05176e-05 4.28777e-06L-2.94064e-05 1133L330.447 1133C285.549 1081.5 342.117 966.05 330.447 895.114C314.883 800.5 405.875 714 330.448 611.864C271.409 531.922 298.121 455 330.447 383.383C363.051 311.153 407.073 220 330.448 147.71Z",
		x1: "245",
		x2: "7.07892e-05",
	},
	step2: {
		unfilled:
			"M155.759 147.71C198.369 79.996 101.375 11.0644 101.375 -2.92178e-06L0.000106812 -7.30652e-06L5.67612e-05 1133L86.2376 1133C86.2376 1075.46 168.927 1069.95 168.927 969.799C168.927 910.051 116.225 793.874 144.258 761.787C181.384 719.293 66.3265 760.128 89.0409 611.864C107.754 489.721 89.0409 430.407 140.621 383.383C208.443 321.553 102.497 232.353 155.759 147.71Z",
		filled:
			"M368.76 147.71C404.678 101 406.474 28 368.76 -1.88219e-06L-9.15527e-05 0.000138782L-0.000151477 1133L368.76 1133C468.909 1133 399.29 1028 368.76 969.799C346.145 926.688 422.637 843 368.76 761.788C331.022 704.904 419.095 695.696 368.76 611.864C313.602 520 393.284 440.106 368.76 383.383C344.814 328 324.912 204.733 368.76 147.71Z",
		x1: "366",
		x2: "-4.41982e-05",
	},
	step3: {
		unfilled:
			"M220.633 985.29C263.219 1053 191.301 1121.94 191.301 1133L6.10352e-05 1133L0.000111061 0.000111468L205.845 0.000120376C205.845 57.535 220.633 139.965 241.926 237.886C263.219 335.806 167.4 398.32 153.951 521.136C140.503 643.951 243.607 666.634 205.503 749.617C167.4 832.6 167.4 900.647 220.633 985.29Z",
		filled:
			"M432.704 985.29C485.785 1099.74 448.977 1083 432.703 1133L6.10352e-05 1133L0.000120929 -0.000139022L432.703 -0.000123382C432.703 57.535 382.529 159 432.703 237.886C490.535 328.809 317.407 442.309 432.703 521.136C539.279 594 371.066 663.153 432.703 749.617C497.848 841 395.699 905.5 432.704 985.29Z",
		x1: "556.732",
		x2: "0.000293918",
	},
};

const validateRefs = (refObjects: RefObjects) => {
	const { pathStartRef, pathMidRef, pathEndRef, gradientRef, floodWrapperRef } =
		refObjects;
	return (
		pathStartRef.current &&
		pathMidRef.current &&
		pathEndRef.current &&
		gradientRef.current &&
		floodWrapperRef.current
	);
};

const resetAndSet = (el: SVGElement | null, attr: string, val: string) => {
	if (!el) return;
	el.style.transition = "none";
	el.setAttribute(attr, val);
};

const applyAndSet = (
	el: SVGElement | null,
	attr: string,
	val: string,
	duration: number,
	ease: string,
) => {
	if (!el) return;
	el.style.transition = `all ${duration}s ${ease}`;
	el.setAttribute(attr, val);
};

export const getMoblieOpenAnimationTimeline = (refObjects: RefObjects) => {
	const { pathStartRef, pathMidRef, pathEndRef, gradientRef, floodWrapperRef } =
		refObjects;

	return {
		play: async () => {
			if (!validateRefs(refObjects)) return;

			// 1. Reset to unfilled state
			resetAndSet(pathStartRef.current, "d", paths.step1.unfilled);
			resetAndSet(pathMidRef.current, "d", paths.step2.unfilled);
			resetAndSet(pathEndRef.current, "d", paths.step3.unfilled);
			resetAndSet(gradientRef.current, "x1", paths.step1.x1);
			resetAndSet(gradientRef.current, "x2", paths.step1.x2);
			if (floodWrapperRef.current) {
				floodWrapperRef.current.style.transition = "none";
				floodWrapperRef.current.style.transform = "translateX(-100%)";
			}

			// Force reflow
			void floodWrapperRef.current?.getBoundingClientRect();

			// 2. Transition directly to filled state
			const duration = 0.6;
			const ease = "cubic-bezier(0.25, 1, 0.5, 1)"; // Smooth ease-out

			applyAndSet(
				pathStartRef.current,
				"d",
				paths.step1.filled,
				duration,
				ease,
			);
			applyAndSet(pathMidRef.current, "d", paths.step2.filled, duration, ease);
			applyAndSet(pathEndRef.current, "d", paths.step3.filled, duration, ease);
			applyAndSet(gradientRef.current, "x1", paths.step3.x1, duration, ease);
			applyAndSet(gradientRef.current, "x2", paths.step3.x2, duration, ease);
			if (floodWrapperRef.current) {
				floodWrapperRef.current.style.transition = `transform ${duration}s ${ease}`;
				floodWrapperRef.current.style.transform = "translateX(0%)";
			}

			await new Promise((resolve) => setTimeout(resolve, duration * 1000));
		},
	};
};

export const getMoblieCloseAnimationTimeline = (refObjects: RefObjects) => {
	const { pathStartRef, pathMidRef, pathEndRef, gradientRef, floodWrapperRef } =
		refObjects;

	return {
		play: async () => {
			if (!validateRefs(refObjects)) return;

			// 1. Reset to filled state
			resetAndSet(pathStartRef.current, "d", paths.step1.filled);
			resetAndSet(pathMidRef.current, "d", paths.step2.filled);
			resetAndSet(pathEndRef.current, "d", paths.step3.filled);
			resetAndSet(gradientRef.current, "x1", paths.step3.x1);
			resetAndSet(gradientRef.current, "x2", paths.step3.x2);
			if (floodWrapperRef.current) {
				floodWrapperRef.current.style.transition = "none";
				floodWrapperRef.current.style.transform = "translateX(0%)";
			}

			// Force reflow
			void floodWrapperRef.current?.getBoundingClientRect();

			// 2. Transition directly to unfilled state
			const duration = 0.4;
			const ease = "cubic-bezier(0.25, 1, 0.5, 1)";

			applyAndSet(
				pathStartRef.current,
				"d",
				paths.step1.unfilled,
				duration,
				ease,
			);
			applyAndSet(
				pathMidRef.current,
				"d",
				paths.step2.unfilled,
				duration,
				ease,
			);
			applyAndSet(
				pathEndRef.current,
				"d",
				paths.step3.unfilled,
				duration,
				ease,
			);
			applyAndSet(gradientRef.current, "x1", paths.step1.x1, duration, ease);
			applyAndSet(gradientRef.current, "x2", paths.step1.x2, duration, ease);
			if (floodWrapperRef.current) {
				floodWrapperRef.current.style.transition = `transform ${duration}s ${ease}`;
				floodWrapperRef.current.style.transform = "translateX(-100%)";
			}

			await new Promise((resolve) => setTimeout(resolve, duration * 1000));
		},
	};
};
