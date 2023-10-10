import styled from "styled-components";

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
	$width: number;
	$height: number;
	$border: number;
	$distance: string;
	$usage: string;
}>`
	width: ${(props) => props.$width}px;
	height: ${(props) => props.$height}px;

	border: ${(props) => (props.$usage === "logo" ? 2 : 1)}px solid
		var(
			${(props) =>
				props.$usage === "logo"
					? "--color-bird"
					: "--default-border-color"}
		);
	border-radius: ${(props) => props.$border}px;
	background: var(--color-elevation);

	box-shadow: var(${(props) => getBoxShadow(props.$distance)});

	display: flex;
	justify-content: center;
	align-items: center;
`;

export default Elevation;
