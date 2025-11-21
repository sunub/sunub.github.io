"use client";

import styled from "styled-components";

type Axis = "horizontal" | "vertical";
type SpacerProps = {
	axis: Axis;
	size: number;
};

const SpacerSpan = styled.span<{ $width: number; $height: number }>`
  display: block;
  width: ${(props) => props.$width}px;
  min-width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  min-height: ${(props) => props.$height}px;
`;
function getWidth(axis: Axis, size: number) {
	return axis === "vertical" ? 1 : size;
}
function getHeight(axis: Axis, size: number) {
	return axis === "horizontal" ? 1 : size;
}

export default function Spacer({ axis, size }: SpacerProps) {
	const width = getWidth(axis, size);
	const height = getHeight(axis, size);

	return <SpacerSpan $width={width} $height={height} />;
}
