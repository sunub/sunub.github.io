type Distance = "short" | "mid" | "long";
type Usage = "logo" | "other";

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

function Elevation(
	width: number,
	height: number,
	border: number,
	distance: Distance,
	usage: Usage
) {
	return `
	width: ${width}px;
	height: ${height}px;

	border: ${usage === "logo" ? 2 : 1}px solid
		var(${usage === "logo" ? "--color-bird" : "--default-border-color"});

	border-radius: ${border}px;
	background: var(--color-elevation);

	box-shadow: var(${getBoxShadow(distance)});

	display: flex;
	justify-content: center;
	align-items: center;
	`;
}

export default Elevation;
