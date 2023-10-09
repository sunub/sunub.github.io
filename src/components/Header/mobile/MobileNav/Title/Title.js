"use client";

import React from "react";
import styled from "styled-components";
import { BirdLogo } from "../../../icon/Icons";
import Elevation from "@/constants/Elevation";
import { Spacer } from "@/constants/Spacer";

function Title() {
	return (
		<>
			<Elevation
				style={{
					border: "2px solid var(--color-text)",
					background: "transparent",
					padding: "2px",
				}}
				$width={45}
				$height={45}
				$border={8}
				$distance="short"
			>
				<BirdLogo stroke="" />
			</Elevation>
		</>
	);
}

export default Title;
