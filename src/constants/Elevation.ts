import styled from "styled-components";
import React from "react";

function getBoxShadow(distance: string) {
	let boxShadow: string;
	switch (distance) {
		case "short":
			boxShadow = "--short-shadow";
			break;
		case "mid":
			boxShadow = "--mid-shadow";
			break;
		case "long":
			boxShadow = "--mid-shadow";
			break;
		default:
			boxShadow = "--none-shadow";
			break;
	}
	return boxShadow;
}

const Elevation = styled.div<{
	$size: number;
	$distance: string;
	$usage: string;
}>`
	--mid-shadow: 0px 4px 8px 3px oklch(0% 0 11 / 0.15),
		0px 1px 3px 0px oklch(0% 0 11 / 0.3);
	--short-shadow: 0px 1px 2px 0px oklch(0% 0 11 / 0.3),
		0px 1px 3px 1px oklch(0% 0 11 / 0.15);
	--long-shadow: 0px 8px 12px 6px oklch(0% 0 11 / 0.15),
		0px 4px 4px 0px oklch(0% 0 11 / 0.3);
	--none-shadow: none;

	--higlight-border-color: oklch(73.44% 0.152 21.47);
	--default-border-color: oklch(61.8% 0.027 30.58 / 0.3);

	--default-bg-color: oklch(97.14% 0.011 31.07);
	--card-content-bg-color: oklch(98.8% 0 31.07);

	width: ${(props) => props.$size}px;
	height: ${(props) => props.$size}px;
	padding: 1rem;

	border: 2px solid
		var(
			${(props) =>
				props.$usage === "logo"
					? "--higlight-border-color"
					: "--default-border-color"}
		);
	border-radius: ${(props) => Math.floor(props.$size * 0.2)}px;
	background: var(
		${(props) =>
			props.$usage === "content"
				? "--card-content-bg-color"
				: "--default-bg-color"}
	);

	box-shadow: var(${(props) => getBoxShadow(props.$distance)});

	display: flex;
	justify-content: center;
	align-items: center;
`;

export default Elevation;
// hsla(10, 11%, 54%, 0.5)
