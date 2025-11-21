"use client";

import styled from "styled-components";
import { MovingPen } from "../Icons/PenToolIcon";
import { WaveIcon } from "../Icons/WaveIcon";

export function Loader() {
	return (
		<Wrapper>
			<MovingPen id="loader-pen-tool-icon" />
			<WaveIcon />
		</Wrapper>
	);
}

const Wrapper = styled.div`
  position: relative;
  margin-top: 3rem;
`;
