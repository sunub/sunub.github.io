"use client";

import React from "react";
import styled from "styled-components";

const SpacerSpan = styled.span`
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
}
