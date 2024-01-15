<<<<<<< HEAD
<<<<<<< HEAD
=======
"use client";

>>>>>>> dev-v2
=======
"use client";

>>>>>>> refs/remotes/origin/sunub
import React from "react";
import styled from "styled-components";

const SpacerSpan = styled.span`
<<<<<<< HEAD
<<<<<<< HEAD
	display: block;
	width: ${(props) => props.$width}px;
	min-width: ${(props) => props.$width}px;
	height: ${(props) => props.$height}px;
	min-height: ${(props) => props.$height}px;
=======
  display: block;
  width: ${(props) => props.$width}px;
  min-width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  min-height: ${(props) => props.$height}px;
>>>>>>> refs/remotes/origin/sunub
`;
function getWidth(axis, size) {
  return axis === "vertical" ? 1 : size;
}
function getHeight(axis, size) {
  return axis === "horizontal" ? 1 : size;
}

export default function Spacer({ axis, size }) {
  const width = getWidth(axis, size);
  const height = getHeight(axis, size);

<<<<<<< HEAD
	return <SpacerSpan $width={width} $height={height} />;
=======
  display: block;
  width: ${(props) => props.$width}px;
  min-width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  min-height: ${(props) => props.$height}px;
`;
function getWidth(axis, size) {
  return axis === "vertical" ? 1 : size;
}
function getHeight(axis, size) {
  return axis === "horizontal" ? 1 : size;
}

export default function Spacer({ axis, size }) {
  const width = getWidth(axis, size);
  const height = getHeight(axis, size);

  return <SpacerSpan $width={width} $height={height} />;
>>>>>>> dev-v2
=======
  return <SpacerSpan $width={width} $height={height} />;
>>>>>>> refs/remotes/origin/sunub
}
