import { animate } from "motion/react";
import type React from "react";

interface RefObjects {
	pathStartRef: React.RefObject<SVGPathElement | null>;
	pathMidRef: React.RefObject<SVGPathElement | null>;
	pathEndRef: React.RefObject<SVGPathElement | null>;
	gradientRef: React.RefObject<SVGLinearGradientElement | null>;
	floodWrapperRef: React.RefObject<HTMLDivElement | null>;
}

const animateSVGAttribute = async (
	element: SVGElement,
	attribute: string,
	targetValue: string,
	duration: number,
) => {
	return new Promise<void>((resolve) => {
		element.setAttribute(attribute, targetValue);
		setTimeout(resolve, duration * 1000);
	});
};

const paths = {
	step1: {
		unfilled:
			"M103.142 147.71C145.772 79.996 48.7316 11.0644 48.7316 -3.40841e-06L-3.05176e-05 -5.51618e-06L-8.05679e-05 1133L33.5865 1133C33.5865 1075.46 103.141 993.034 124.457 895.114C145.772 797.194 49.8534 734.679 36.3912 611.864C22.9289 489.049 126.14 466.367 87.9965 383.383C49.8534 300.4 49.8534 232.353 103.142 147.71Z",
		inBetween:
			"M206.539 147.71C141.524 88.123 254.5 -1.036e-05 134.425 -4.54574e-06L7.62939e-05 -1.036e-05L2.62436e-05 1133L114.352 1133C198 1133 238.5 1030.5 224 969.799C213.064 924.019 283.544 866.809 191.288 761.788C166 733 222.041 695.696 180 611.864C133.93 520 216 427 186.466 383.383C125.276 293.015 256.5 193.5 206.539 147.71Z",

		filled:
			"M330.448 147.71C276.59 96.9003 287.944 40.5 330.447 -1.53568e-06L3.05176e-05 4.28777e-06L-2.94064e-05 1133L330.447 1133C285.549 1081.5 342.117 966.05 330.447 895.114C314.883 800.5 405.875 714 330.448 611.864C271.409 531.922 298.121 455 330.447 383.383C363.051 311.153 407.073 220 330.448 147.71Z",
		x1: "245",
		x2: "7.07892e-05",
		offset: "0.144858",
	},
	step2: {
		unfilled:
			"M155.759 147.71C198.369 79.996 101.375 11.0644 101.375 -2.92178e-06L0.000106812 -7.30652e-06L5.67612e-05 1133L86.2376 1133C86.2376 1075.46 168.927 1069.95 168.927 969.799C168.927 910.051 116.225 793.874 144.258 761.787C181.384 719.293 66.3265 760.128 89.0409 611.864C107.754 489.721 89.0409 430.407 140.621 383.383C208.443 321.553 102.497 232.353 155.759 147.71Z",
		inBetween:
			"M257.826 147.71C176.666 88.123 317.696 -1.01991e-05 167.805 -5.67451e-06L6.10352e-05 -1.29325e-05L1.09848e-05 1133L142.748 1133C247.166 1133 297.723 1030.5 279.623 969.799C265.971 924.019 353.952 866.809 238.788 761.788C207.221 733 277.178 695.696 224.697 611.864C167.188 520 269.636 427 232.769 383.383C156.384 293.015 320.193 193.5 257.826 147.71Z",
		filled:
			"M368.76 147.71C404.678 101 406.474 28 368.76 -1.88219e-06L-9.15527e-05 0.000138782L-0.000151477 1133L368.76 1133C468.909 1133 399.29 1028 368.76 969.799C346.145 926.688 422.637 843 368.76 761.788C331.022 704.904 419.095 695.696 368.76 611.864C313.602 520 393.284 440.106 368.76 383.383C344.814 328 324.912 204.733 368.76 147.71Z",
		x1: "366",
		x2: "-4.41982e-05",
	},
	step3: {
		unfilled:
			"M220.633 985.29C263.219 1053 191.301 1121.94 191.301 1133L6.10352e-05 1133L0.000111061 0.000111468L205.845 0.000120376C205.845 57.535 220.633 139.965 241.926 237.886C263.219 335.806 167.4 398.32 153.951 521.136C140.503 643.951 243.607 666.634 205.503 749.617C167.4 832.6 167.4 900.647 220.633 985.29Z",
		inBetween:
			"M329.598 985.29C229.984 1057 395.5 1136.5 285.781 1133L-6.10302e-05 1133L-1.10046e-05 -0.000138475L307.507 -0.000125168C307.507 57.535 422 165.5 361.408 237.886C295.321 316.834 133.685 442.309 229.984 521.136C319 594 255.515 663.153 306.997 749.617C361.408 841 423.855 917.436 329.598 985.29Z",
		filled:
			"M432.704 985.29C485.785 1099.74 448.977 1083 432.703 1133L6.10352e-05 1133L0.000120929 -0.000139022L432.703 -0.000123382C432.703 57.535 382.529 159 432.703 237.886C490.535 328.809 317.407 442.309 432.703 521.136C539.279 594 371.066 663.153 432.703 749.617C497.848 841 395.699 905.5 432.704 985.29Z",
		x1: "556.732",
		x2: "0.000293918",
		offset: "0.173412",
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

export const getMoblieOpenAnimationTimeline = (refObjects: RefObjects) => {
	const { pathStartRef, pathMidRef, pathEndRef, gradientRef, floodWrapperRef } =
		refObjects;

	return {
		play: async () => {
			if (!validateRefs(refObjects)) return;

			if (floodWrapperRef.current) {
				floodWrapperRef.current.style.transform = "translateX(-100%)";
			}
			if (pathStartRef.current)
				pathStartRef.current.setAttribute("d", paths.step1.unfilled);
			if (pathMidRef.current)
				pathMidRef.current.setAttribute("d", paths.step2.unfilled);
			if (pathEndRef.current)
				pathEndRef.current.setAttribute("d", paths.step3.unfilled);
			if (gradientRef.current) {
				gradientRef.current.setAttribute("x1", paths.step1.x1);
				gradientRef.current.setAttribute("x2", paths.step1.x2);
			}

			const inBetweenDuration = 0.15;
			await Promise.all(
				[
					pathStartRef.current &&
						animateSVGAttribute(
							pathStartRef.current,
							"d",
							paths.step1.inBetween,
							inBetweenDuration,
						),
					pathMidRef.current &&
						animateSVGAttribute(
							pathMidRef.current,
							"d",
							paths.step2.inBetween,
							inBetweenDuration,
						),
					pathEndRef.current &&
						animateSVGAttribute(
							pathEndRef.current,
							"d",
							paths.step3.inBetween,
							inBetweenDuration,
						),
					gradientRef.current &&
						Promise.all([
							animateSVGAttribute(
								gradientRef.current,
								"x1",
								paths.step3.x1,
								inBetweenDuration,
							),
							animateSVGAttribute(
								gradientRef.current,
								"x2",
								paths.step3.x2,
								inBetweenDuration,
							),
						]),
					floodWrapperRef.current &&
						animate(
							floodWrapperRef.current,
							{ x: "0%" },
							{ duration: inBetweenDuration },
						),
				].filter(Boolean),
			);

			const filledDuration = 0.15;
			await Promise.all(
				[
					pathStartRef.current &&
						animateSVGAttribute(
							pathStartRef.current,
							"d",
							paths.step1.filled,
							filledDuration,
						),
					pathMidRef.current &&
						animateSVGAttribute(
							pathMidRef.current,
							"d",
							paths.step2.filled,
							filledDuration,
						),
					pathEndRef.current &&
						animateSVGAttribute(
							pathEndRef.current,
							"d",
							paths.step3.filled,
							filledDuration,
						),
					gradientRef.current &&
						Promise.all([
							animateSVGAttribute(
								gradientRef.current,
								"x1",
								paths.step3.x1,
								filledDuration,
							),
							animateSVGAttribute(
								gradientRef.current,
								"x2",
								paths.step3.x2,
								filledDuration,
							),
						]),
				].filter(Boolean),
			);
		},
	};
};

export const getMoblieCloseAnimationTimeline = (refObjects: RefObjects) => {
	const { pathStartRef, pathMidRef, pathEndRef, gradientRef, floodWrapperRef } =
		refObjects;

	return {
		play: async () => {
			if (!validateRefs(refObjects)) return;

			if (floodWrapperRef.current) {
				floodWrapperRef.current.style.transform = "translateX(0)";
			}
			if (pathStartRef.current)
				pathStartRef.current.setAttribute("d", paths.step1.filled);
			if (pathMidRef.current)
				pathMidRef.current.setAttribute("d", paths.step2.filled);
			if (pathEndRef.current)
				pathEndRef.current.setAttribute("d", paths.step3.filled);
			if (gradientRef.current) {
				gradientRef.current.setAttribute("x1", paths.step3.x1);
				gradientRef.current.setAttribute("x2", paths.step3.x2);
			}

			const toInBetweenDuration = 0.07;

			await Promise.all(
				[
					pathStartRef.current &&
						animateSVGAttribute(
							pathStartRef.current,
							"d",
							paths.step1.inBetween,
							toInBetweenDuration,
						),
					pathMidRef.current &&
						animateSVGAttribute(
							pathMidRef.current,
							"d",
							paths.step2.inBetween,
							toInBetweenDuration,
						),
					pathEndRef.current &&
						animateSVGAttribute(
							pathEndRef.current,
							"d",
							paths.step3.inBetween,
							toInBetweenDuration,
						),
					gradientRef.current &&
						Promise.all([
							animateSVGAttribute(
								gradientRef.current,
								"x1",
								paths.step3.x1,
								toInBetweenDuration,
							),
							animateSVGAttribute(
								gradientRef.current,
								"x2",
								paths.step3.x2,
								toInBetweenDuration,
							),
						]),
				].filter(Boolean),
			);

			const toUnfilledDuration = 0.07;
			await Promise.all(
				[
					pathStartRef.current &&
						animateSVGAttribute(
							pathStartRef.current,
							"d",
							paths.step1.unfilled,
							toUnfilledDuration,
						),
					gradientRef.current &&
						Promise.all([
							animateSVGAttribute(
								gradientRef.current,
								"x1",
								paths.step1.x1,
								toUnfilledDuration,
							),
							animateSVGAttribute(
								gradientRef.current,
								"x2",
								paths.step1.x2,
								toUnfilledDuration,
							),
						]),
					floodWrapperRef.current &&
						animate(
							floodWrapperRef.current,
							{ x: "-100%" },
							{ duration: toUnfilledDuration },
						),
				].filter(Boolean),
			);
		},
	};
};
